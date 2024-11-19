import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../servicios/api/api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ListaEmpleadosI } from '../../../modelos/listaEmpleados.interface';

@Component({
  selector: 'app-dashboard-Auditor',
  templateUrl: './dashboardAuditor.component.html',
  styleUrls: ['./dashboardAuditor.component.scss']
})
export class DashboardAuditorComponent implements OnInit {

  empleados: ListaEmpleadosI[] = [];
  opcion!: string;
  cedulaxx!: string | null;

  constructor(private api: ApiService, private router: Router, private activeroute: ActivatedRoute) { }

  ngOnInit(): void {
    this.cedulaxx = this.activeroute.snapshot.paramMap.get('id');
    this.api.getEmployees().subscribe(data => {
      console.log(data)
      this.empleados = data;
    });
    this.goInformes();
  }

  //Se direcciona para crear un nuevo empleado
  nuevoEmpleado() {
    this.router.navigate(['nuevo']);
  }

  //Se direcciona para editar un empleado
  actualizarEmpleado(id: any) {
    this.router.navigate(['editar', id]);
  }

  //Se direcciona hacia el login
  login() {
    this.router.navigate(['login']);
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

}
