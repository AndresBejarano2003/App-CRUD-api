import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../servicios/api/api.service';
import { ListaEmpleadosI } from '../../../modelos/listaEmpleados.interface';
import { Chart, registerables } from 'chart.js';
import { ActivatedRoute, Router } from '@angular/router';
import { ListaInformesI } from 'src/app/modelos/listaInformes.interface';
import { informesI } from 'src/app/modelos/informes.interface';
Chart.register(...registerables)

@Component({
  selector: 'app-dashboard-Empresa',
  templateUrl: './dashboardEmpresa.component.html',
  styleUrls: ['./dashboardEmpresa.component.scss']
})
export class DashboardEmpresaAuditorComponent implements OnInit {

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
  // Ejemplo de uso:
  fechas = [
    "30/11/2024 12:00:00 a. m.",
    "15/10/2023 03:45:00 p. m.",
    "25/11/2024 06:30:00 a. m."
  ];

  constructor(private api: ApiService, private router: Router, private activeroute: ActivatedRoute) { }

  ngOnInit(): void {
    this.cedulaxx = this.activeroute.snapshot.paramMap.get('id');
    this.nitEmpresa = this.activeroute.snapshot.paramMap.get('nit');
    this.api.getUnaEmpresa(this.nitEmpresa).subscribe(data => {
      this.nombreEmpresa = data.nombreEm;
    })
    let mFechasInformes: string[] = [];
    let mEstadoInformes: string[] = [];
    this.requisitos = [];
    this.api.getInformesAuditor(this.nitEmpresa).subscribe(data => {
      data.forEach(element => {
        mFechasInformes.push(element.fechamax);
        mEstadoInformes.push(element.regestxx);
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

      this.renderCharts(mEstadoInformes);
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

  recargarDashboar() {
    let mEstadoInformes: string[] = [];
    this.requisitos = [];
    this.api.getInformesAuditor(this.nitEmpresa).subscribe(data => {
      data.forEach(element => {
        mEstadoInformes.push(element.regestxx);
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

      this.renderCharts(mEstadoInformes);
    })
  }

  renderCharts(requisitos: any[]) {
    const cumplimiento = Object.values(requisitos).filter(value => value === 'En Cumplimiento').length;
    const pendiente = Object.values(requisitos).filter(value => value === 'Pendiente').length;
    const noCumple = Object.values(requisitos).filter(value => value === 'No Cumple').length;

    // Verifica si el gráfico ya existe y destrúyelo antes de crear uno nuevo
    if (Chart.getChart('complianceChart')) {
      Chart.getChart('complianceChart')?.destroy();
    }
    if (Chart.getChart('isoComplianceChart')) {
      Chart.getChart('isoComplianceChart')?.destroy();
    }

    var ctx1 = document.getElementById('complianceChart') as HTMLCanvasElement;
    new Chart(ctx1, {
      type: 'doughnut',
      data: {
        labels: ['En Cumplimiento', 'Pendiente', 'No Cumple'],
        datasets: [{
          data: [cumplimiento, pendiente, noCumple],
          backgroundColor: ['#28a745', '#ffc107', '#dc3545']
        }]
      }
    });

    var ctx2 = document.getElementById('isoComplianceChart') as HTMLCanvasElement;
    new Chart(ctx2, {
      type: 'doughnut',
      data: {
        labels: ['Compliant', 'Non-compliant'],
        datasets: [{
          data: [45, 55],
          backgroundColor: ['#007bff', '#dc3545']
        }]
      }
    });
  }

  //Se direcciona hacia el login
  logout() {
    this.router.navigate(['login']);
  }
  //Se direcciona hacia el dashboard
  goInicio() {
    this.router.navigate(['dashboardAuditor', this.cedulaxx]);
  }
  //Se direcciona hacia los informes
  goInformes() {
    this.router.navigate(['informesAuditor', this.cedulaxx]);
  }
  //Se direcciona hacia los informes
  goCalificaciones() {
    this.router.navigate(['calificaciones', this.cedulaxx]);
  }
  //Se direcciona hacia los datos de la cuenta
  goCuenta() {
    this.router.navigate(['miCuentaAuditor', this.cedulaxx]);
  }
  //Se direcciona para editar un empleado
  actualizarEmpresa() {
    this.router.navigate(['editarEmpresa', this.cedulaxx, this.nitEmpresa]);
  }
  //Se direcciona para editar un empleado
  dashboardEmpresa() {
    this.router.navigate(['dashboardEmpresaAuditor', this.cedulaxx, this.nitEmpresa]);
  }


  onEstadoChange(event: Event, nRequisito: any): void {
    const estado: string = (event.target as HTMLSelectElement).value; // Realizamos un cast

    console.log('Estado seleccionado:', estado);
    console.log('ID asociado:', nRequisito);

    let dataInforme: informesI;
    this.api.getUnInformesAuditor(this.nitEmpresa, nRequisito).subscribe(data => {
      dataInforme = data;
      dataInforme.regestxx = estado;

      ///////////////////////////////////////////////////////////////////////////////////////
      let fechamax = dataInforme.fechamax.split(" ");
      console.log(fechamax);
      let mFechamax = fechamax[0].split("/");
      console.log("mFechamax");
      console.log(mFechamax);
      if (parseInt(mFechamax[0]) < 10) {
        mFechamax[0] = "0" + mFechamax[0];
      }
      console.log(mFechamax[2] + "-" + mFechamax[1] + "-" + mFechamax[0]);

      dataInforme.fechamax = mFechamax[2] + "-" + mFechamax[1] + "-" + mFechamax[0];
      ///////////////////////////////////////////////////////////////////////////////////////

      ///////////////////////////////////////////////////////////////////////////////////////
      let regfecxx = dataInforme.regfecxx.split(" ");
      console.log(regfecxx);
      let mregfecxx = regfecxx[0].split("/");
      console.log("mregfecxx");
      console.log(mregfecxx);
      if (parseInt(mregfecxx[0]) < 10) {
        mregfecxx[0] = "0" + mregfecxx[0];
      }
      console.log(mregfecxx[2] + "-" + mregfecxx[1] + "-" + mregfecxx[0]);

      dataInforme.regfecxx = mregfecxx[2] + "-" + mregfecxx[1] + "-" + mregfecxx[0];
      ///////////////////////////////////////////////////////////////////////////////////////

      this.api.putEstadoInforme(dataInforme, nRequisito).subscribe(data => {
        console.log("Actualizar empresa:")
        console.log(data)
        this.recargarDashboar();
        // this.getDataUser(this.cedulaxx);
        // this.mensaje = "Se ha actualizado el usuario";
        // this.datosForm.reset();
        // this.activarSuccess = true;
        // this.activarDanger = false;
      }, rest => {
        alert(rest);
        console.log(rest);
        // this.mensaje = "Error ";
        // this.activarDanger = true;
        // this.activarSuccess = false;
      })
    });
  }
}