import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../servicios/api/api.service';
import { ListaEmpleadosI } from '../../../modelos/listaEmpleados.interface';
import { Chart, registerables } from 'chart.js';
import { ActivatedRoute, Router } from '@angular/router';
Chart.register(...registerables)

@Component({
  selector: 'app-dashboard-Empresa',
  templateUrl: './dashboardEmpresa.component.html',
  styleUrls: ['./dashboardEmpresa.component.scss']
})
export class DashboardEmpresaComponent implements OnInit {

  empleados: ListaEmpleadosI[] = [];
  opcion!: string;
  cedulaxx!: string | null;
  nitEmpresa!: string | null;
  nombreEmpresa!: string | null;
  dateFinish!: string | undefined;
  auditor!: string | undefined;

  informes: any[] = []; // Aquí guardaremos los datos de informes

  constructor(private api: ApiService, private router: Router, private activeroute: ActivatedRoute) { }

  ngOnInit(): void {
    this.cedulaxx = this.activeroute.snapshot.paramMap.get('id');
    this.nitEmpresa = this.activeroute.snapshot.paramMap.get('nit');

    this.api.getUnaEmpresa(this.nitEmpresa).subscribe(data => {
      this.nombreEmpresa = data.nombreEm;
    })

    // this.renderCharts();
    let mFechasInformes: string[] = [];
    let mEstadoInformes: string[] = [];
    this.api.getInformesAuditor(this.nitEmpresa).subscribe(data => {
      data.forEach(element => {
        mFechasInformes.push(element.fechamax);
        mEstadoInformes.push(element.regestxx);
      });
      

      this.renderCharts(mEstadoInformes);
      let fechaAsignacion = this.getMaxDate(mFechasInformes)?.toLocaleString() || "2024-11-17";
      let mFechaAsignacion = fechaAsignacion?.split(", ");

      // Validar que mFechaAsignacion es un array con al menos un elemento
      if (mFechaAsignacion && mFechaAsignacion.length > 0) {
        this.dateFinish = mFechaAsignacion[0];
      } else {
        this.dateFinish = "2024-11-17"; // Valor por defecto en caso de error
      }
      // Almacena los informes y asegúrate de que cada uno tenga un campo para el estado seleccionado
      this.informes.push(data?.map((informe: any) => ({
        ...informe,
        estadoSeleccionado: informe?.regestxx // Preseleccionamos el estado que viene de la BD
      })))

      console.log("this.informes");
      console.log(this.informes);

    })

    this.api.getDataUser(this.cedulaxx).subscribe(dataEmpre => {
      this.api.getDataUser(dataEmpre.idAuditor).subscribe(dataAudit => {
        this.auditor = dataAudit.nombresx;
      }, rest => {})
    }, rest => {})
  }

  
  recargarDashboar() {
    let mEstadoInformes: string[] = [];
    this.api.getInformesAuditor(this.nitEmpresa).subscribe(data => {
      data.forEach(element => {
        mEstadoInformes.push(element.regestxx);
      });

      this.renderCharts(mEstadoInformes);
    })
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
    this.router.navigate(['dashboardEmpresa', this.cedulaxx,this.nitEmpresa]);
  }
  //Se direcciona hacia los informes
  goInformes() {
    this.router.navigate(['informesEmpresa', this.cedulaxx,this.nitEmpresa]);
  }
  //Se direcciona hacia los datos de la cuenta
  goCuenta() {
    this.router.navigate(['miCuentaEmpresa', this.cedulaxx,this.nitEmpresa]);
  }
}