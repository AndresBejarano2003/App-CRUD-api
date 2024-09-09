import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../servicios/api/api.service';
import { ListaEmpleadosI } from '../../../modelos/listaEmpleados.interface';
import { Chart, registerables } from 'chart.js';
import { Router } from '@angular/router';
Chart.register(...registerables)

@Component({
  selector: 'app-dashboard-Empresa',
  templateUrl: './dashboardEmpresa.component.html',
  styleUrls: ['./dashboardEmpresa.component.scss']
})
export class DashboardEmpresaComponent implements OnInit {

  empleados: ListaEmpleadosI[] = [];
  opcion!: string;

  constructor(private api: ApiService, private router: Router) { }

  ngOnInit(): void {
    this.renderCharts();
  }

  renderCharts() {
    var ctx1 = document.getElementById('complianceChart') as HTMLCanvasElement;
    new Chart(ctx1, {
      type: 'doughnut',
      data: {
        labels: ['En Cumplimiento', 'Pendiente', 'No Cumple'],
        datasets: [{
          data: [60, 25, 15],
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
    this.router.navigate(['dashboardEmpresa']);
  }
  //Se direcciona hacia los informes
  goInformes() {
    this.router.navigate(['informesEmpresa']);
  }
  //Se direcciona hacia los datos de la cuenta
  goCuenta() {
    this.router.navigate(['miCuentaEmpresa']);
  }
}