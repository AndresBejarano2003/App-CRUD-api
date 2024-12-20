import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../servicios/api/api.service';
import { ListaEmpleadosI } from '../../../modelos/listaEmpleados.interface';
import { Chart, registerables } from 'chart.js';
import { ActivatedRoute, Router } from '@angular/router';
import { ListaEmpresasI } from 'src/app/modelos/listaEmpresas.interface';
Chart.register(...registerables)

@Component({
  selector: 'app-informes-Auditor',
  templateUrl: './informesAuditor.component.html',
  styleUrls: ['./informesAuditor.component.scss']
})
export class InformesAuditorComponent implements OnInit {

  empresas: ListaEmpresasI[] = [];
  empleados: ListaEmpleadosI[] = [];
  opcion!: string;
  cedulaxx!: string | null;

  constructor(private api: ApiService, private router: Router, private activeroute: ActivatedRoute) { }

  ngOnInit(): void {
    this.cedulaxx = this.activeroute.snapshot.paramMap.get('id');
    this.api.getEmpresas().subscribe(data => {
      console.log("data")
      console.log(data)
      this.empresas = data;
    })
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
  actualizarEmpresa(id: any) {
    this.router.navigate(['editarEmpresa', this.cedulaxx, id]);
  }
  //Se direcciona para editar un empleado
  dashboardEmpresa(id: any) {
    this.router.navigate(['dashboardEmpresaAuditor', this.cedulaxx, id]);
  }
}