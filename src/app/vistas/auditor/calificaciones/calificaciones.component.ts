import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../servicios/api/api.service';
import { ListaEmpleadosI } from '../../../modelos/listaEmpleados.interface';
import { Chart, registerables } from 'chart.js';
import { ActivatedRoute, Router } from '@angular/router';
import { ListaInformesI } from 'src/app/modelos/listaInformes.interface';
import { ListaEmpresasI } from 'src/app/modelos/listaEmpresas.interface';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { informesI } from 'src/app/modelos/informes.interface';
Chart.register(...registerables)

@Component({
  selector: 'app-calificaciones',
  templateUrl: './calificaciones.component.html',
  styleUrls: ['./calificaciones.component.scss']
})
export class CalificacionesComponent implements OnInit {

  empleados: ListaEmpleadosI[] = [];
  informes: ListaInformesI[] = [];
  opcion!: string;
  cedulaxx!: string | null;

  datosEmpleado: informesI = (
    {
      idInform: "",
      temaxxxx: "",
      requisit: "",
      evidenci: "",
      notaxxxx: "",
      observac: "",
      fechamax: "",
      nitEmpre: "",
      regfecxx: "",
      regestxx: "",
      aplicaxx: "",
      tipoxxxx: "",
    }
  );

  datosForm = new FormGroup({
    idInform: new FormControl(""),
    temaxxxx: new FormControl(""),
    requisit: new FormControl(""),
    evidenci: new FormControl(""),
    notaxxxx: new FormControl(""),
    observac: new FormControl(""),
    fechamax: new FormControl(""),
    nitEmpre: new FormControl(""),
    regfecxx: new FormControl(""),
    regestxx: new FormControl(""),
    aplicaxx: new FormControl(""),

    // nombreEm: new FormControl("", Validators.compose([Validators.required, Validators.pattern(/^[a-zA-Z áéíóúÁÉÍÓÚüÜñÑ\s]+$/)])),
    // direccio: new FormControl("", Validators.compose([Validators.required, Validators.pattern(/^[a-zA-Z áéíóúÁÉÍÓÚüÜñÑ0-9\s\+\-\/\(\)]*$/)])),
    // telefono: new FormControl("", Validators.compose([Validators.required, Validators.pattern(/^[0-9\+\-\/\(\)]+$/)])),
    // licencia: new FormControl("", Validators.compose([Validators.required, Validators.minLength(6), Validators.maxLength(10), Validators.pattern(/^[0-9]+$/)])),
  });

  constructor(private api: ApiService, private router: Router, private activeroute: ActivatedRoute) { }

  ngOnInit(): void {
    this.cedulaxx = this.activeroute.snapshot.paramMap.get('id');
    this.renderCharts();
    // this.api.getInformes().subscribe(data => {
    // console.log(data)
    // this.informes = data;
    // })
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

  // guardarEstado(estado: string): Observable<any> {
  //return this.api.post<any>(this.apiUrl, { estado });
  //this.api.getInformes().subscribe(data => {
  //  console.log(data)
  //  this.informes = data;
  //})
  // }

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
  actualizarInforme(id: any) {
    this.router.navigate(['editar', id]);
  }
  onEstadoChange(estado: any) {

  }
}