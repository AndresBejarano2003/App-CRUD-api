import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../servicios/api/api.service';
import { Router } from '@angular/router';
import { ListaEmpleadosI } from '../../modelos/listaEmpleados.interface';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  empleados: ListaEmpleadosI[] = [];

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
