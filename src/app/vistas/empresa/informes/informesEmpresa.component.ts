import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../servicios/api/api.service';
import { ListaEmpleadosI } from '../../../modelos/listaEmpleados.interface';
import { Chart, registerables } from 'chart.js';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
Chart.register(...registerables)

@Component({
  selector: 'app-informes-Empresa',
  templateUrl: './informesEmpresa.component.html',
  styleUrls: ['./informesEmpresa.component.scss']
})
export class InformesEmpresaComponent implements OnInit {

  empleados: ListaEmpleadosI[] = [];
  opcion!: string;
  cedulaxx!: string | null;
  nitEmpresa!: string | null;
  nombreEmpresa!: string | null;
  dateFinish!: string | undefined;

  requisitos: any[] = []; // Aquí irían los datos reales
  cumplimientoRequisitos: number = 0;

  controles: any[] = []; // Aquí irían los datos reales
  cumplimientoControles: number = 0;

  informes: any[] = []; // Aquí guardaremos los datos de informes
  controlesTabla: any[] = []; // Aquí guardaremos los datos de informes

  constructor(private api: ApiService, private router: Router, private activeroute: ActivatedRoute) { }

  ngOnInit(): void {
    this.cedulaxx = this.activeroute.snapshot.paramMap.get('id');
    this.nitEmpresa = this.activeroute.snapshot.paramMap.get('nit');
    // alert("Para una evaluación efectiva, se requerirá la siguiente información y documentación de su empresa: \n1. Políticas y Procedimientos: - Políticas de seguridad de la información. - Procedimientos de gestión de incidentes. - Procedimientos de control de acceso. \n2. Organigrama y Roles: - Estructura organizacional. - Descripciones de puestos y responsabilidades en seguridad de la información. \n3. Inventario de Activos: - Lista detallada de activos de información (hardware, software, datos, personas). - Valoración de activos y clasificación de información. \n4. Arquitectura de Red y Sistemas: - Diagramas de red actualizados. - Configuraciones de servidores y dispositivos de red. \n5. Historial de Incidentes: - Registros de incidentes de seguridad y acciones correctivas tomadas. - Informes de auditorías previas y evaluaciones de riesgo. \n6. Controles y Medidas de Seguridad: - Detalles sobre autenticación, autorizaciones y gestión de identidades. - Políticas de backup y recuperación ante desastres. - Controles físicos y ambientales en el centro de datos. \nAl ingresar, está aceptando los requerimientos para la evaluación eficaz de su SGSI.");
    Swal.fire({
      title: '¿Estás seguro?',
      html: `<div class="justified-text">
          Para una evaluación efectiva, se requerirá la siguiente información y documentación de su empresa:<br><br>
          1. <strong>Políticas y Procedimientos:</strong><br>
          - Políticas de seguridad de la información.<br>
          - Procedimientos de gestión de incidentes.<br>
          - Procedimientos de control de acceso.<br><br>
          2. <strong>Organigrama y Roles:</strong><br>
          - Estructura organizacional.<br>
          - Descripciones de puestos y responsabilidades en seguridad de la información.<br><br>
          3. <strong>Inventario de Activos:</strong><br>
          - Lista detallada de activos de información (hardware, software, datos, personas).<br>
          - Valoración de activos y clasificación de información.<br><br>
          4. <strong>Arquitectura de Red y Sistemas:</strong><br>
          - Diagramas de red actualizados.<br>
          - Configuraciones de servidores y dispositivos de red.<br><br>
          5. <strong>Historial de Incidentes:</strong><br>
          - Registros de incidentes de seguridad y acciones correctivas tomadas.<br>
          - Informes de auditorías previas y evaluaciones de riesgo.<br><br>
          6. <strong>Controles y Medidas de Seguridad:</strong><br>
          - Detalles sobre autenticación, autorizaciones y gestión de identidades.<br>
          - Políticas de backup y recuperación ante desastres.<br>
          - Controles físicos y ambientales en el centro de datos.<br><br>
          Al ingresar, está aceptando los requerimientos para la evaluación eficaz de su SGSI.
        </div>`,
      customClass: {
        htmlContainer: 'text-justify',
        popup: 'small-swal' // Clase personalizada
      },
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, continuar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        // El usuario confirmó
        console.log('Acción confirmada');
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        this.goInicio()
      }
    });

    this.api.getUnaEmpresa(this.nitEmpresa).subscribe(data => {
      this.nombreEmpresa = data.nombreEm;
    })

    let mFechasInformes: string[] = [];
    this.requisitos = [];
    this.api.getInformesAuditor(this.nitEmpresa).subscribe(data => {
      data.forEach(element => {
        mFechasInformes.push(element.fechamax);
        if (element.tipoxxxx == "REQUISITOS") {
          this.requisitos.push({ id: element.idInform, cumple: (element.regestxx == "En Cumplimiento") ? true : false });
        } else if (element.tipoxxxx == "CONTROLES") {
          this.controles.push({ id: element.idInform, cumple: (element.regestxx == "En Cumplimiento") ? true : false });
        }
      });
      data?.forEach((informe: any) => {
        const mappedInforme = {
          ...informe,
          idInform: informe?.idInform,
          temaxxxx: informe?.temaxxxx,
          requisit: informe?.requisit,
          evidenci: informe?.evidenci,
          notaxxxx: informe?.notaxxxx,
          observac: informe?.observac,
          fechamax: informe?.fechamax,
          nitEmpre: informe?.nitEmpre,
          regfecxx: informe?.regfecxx,
          regestxx: informe?.regestxx,
          aplicaxx: informe?.aplicaxx,
          tipoxxxx: informe?.tipoxxxx,
          estadoSeleccionado: informe?.regestxx
        };

        // Condicional para separar entre requisitos y controles
        if (mappedInforme.tipoxxxx === 'REQUISITOS') {
          this.informes.push(mappedInforme);
        } else {
          this.controlesTabla.push(mappedInforme);
        }
      });

      this.updateProgressBar('requisitos');
      this.updateProgressBar('controles');

      let fechaAsignacion = this.getMaxDate(mFechasInformes)?.toLocaleString() || "2024-11-17";
      let mFechaAsignacion = fechaAsignacion?.split(", ");

      // Validar que mFechaAsignacion es un array con al menos un elemento
      if (mFechaAsignacion && mFechaAsignacion.length > 0) {
        this.dateFinish = mFechaAsignacion[0];
      } else {
        this.dateFinish = "2024-11-17"; // Valor por defecto en caso de error
      }
    })
  }

  updateProgressBar(section: string): void {
    const items = section === 'requisitos' ? this.requisitos : this.controles;
    const compliantItems = items.filter(item => item.cumple);
    const percentage = (compliantItems.length / items.length) * 100;
    if (section === 'requisitos') {
      this.cumplimientoRequisitos = percentage;
    } else {
      this.cumplimientoControles = percentage;
    }
  }

  getProgressBarClass(percentage: number): string {
    if (percentage <= 33) {
      return 'bg-danger';
    } else if (percentage <= 66) {
      return 'bg-warning';
    } else {
      return 'bg-success';
    }
  }

  getMaxDate(dates: string[]): Date | null {
    if (dates.length === 0) return null; // Manejo de array vacío

    // Convertir las cadenas de fecha a objetos Date
    const dateObjects = dates.map(dateString => {
      const [datePart, timePart, period] = dateString.split(' ');
      const [day, month, year] = datePart.split('/').map(Number);
      const [hours, minutes, seconds] = timePart.split(':').map(Number);

      let adjustedHours = hours;
      if (period.toLowerCase() === 'p. m.' && hours < 12) {
        adjustedHours += 12; // Convertir PM a formato 24 horas
      } else if (period.toLowerCase() === 'a. m.' && hours === 12) {
        adjustedHours = 0; // Manejar medianoche
      }

      return new Date(year, month - 1, day, adjustedHours, minutes, seconds);
    });

    // Encontrar la fecha mayor
    return dateObjects.reduce((max, current) => (current > max ? current : max));
  }

  onFileSelected(event: Event): void {
    alert("Se subió el archivo de manera satisfactoria")
    const fileInput = event.target as HTMLInputElement;
    if (fileInput.files && fileInput.files.length > 0) {
      const file = fileInput.files[0];
      console.log('Archivo seleccionado:', file);

      // Aquí puedes procesar el archivo, por ejemplo, subirlo a tu API
      this.uploadFile(file);
    }
  }

  uploadFile(file: File): void {
    const formData = new FormData();
    formData.append('file', file);

    console.log("formData");
    console.log(formData);
    
     this.api.uploadFile(formData).subscribe(
       response => {
         console.log('Archivo subido correctamente:', response);
         // alert('Archivo subido y guardado con éxito');
       },
       error => {
         console.error('Error al subir el archivo:', error);
         //alert('Hubo un problema al subir el archivo');
       }
     );
  }


  //Se direcciona hacia el login
  logout() {
    this.router.navigate(['login']);
  }
  //Se direcciona hacia el dashboard
  goInicio() {
    this.router.navigate(['dashboardEmpresa', this.cedulaxx, this.nitEmpresa]);
  }
  //Se direcciona hacia los informes
  goInformes() {
    this.router.navigate(['informesEmpresa', this.cedulaxx, this.nitEmpresa]);
  }
  //Se direcciona hacia los datos de la cuenta
  goCuenta() {
    this.router.navigate(['miCuentaEmpresa', this.cedulaxx, this.nitEmpresa]);
  }
}