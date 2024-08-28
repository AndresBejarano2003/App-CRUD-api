import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../servicios/api/api.service';
import { Router } from '@angular/router';
import { ListaEmpleadosI } from '../../../modelos/listaEmpleados.interface';

@Component({
  selector: 'app-dashboard-Auditor',
  templateUrl: './dashboardAuditor.component.html',
  styleUrls: ['./dashboardAuditor.component.scss']
})
export class DashboardAuditorComponent implements OnInit {

  empleados: ListaEmpleadosI[] = [];
  opcion!:string;

  constructor(private api:ApiService, private router:Router) { }

  ngOnInit(): void {
    this.api.getEmployees().subscribe(data =>{
      console.log(data)
      this.empleados=data;
    })    
  }

  //Se direcciona para crear un nuevo empleado
  nuevoEmpleado(){
    this.router.navigate(['nuevo']);
  }

  //Se direcciona para editar un empleado
  actualizarEmpleado(id:any){
    this.router.navigate(['editar', id]);
  }

  //Se direcciona hacia el login
  login(){
    this.router.navigate(['login']);
  }

}
