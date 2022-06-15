import { Injectable } from '@angular/core';
import { ResponseI } from '../../modelos/response.interface';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, observable } from 'rxjs';
import { ListaEmpleadosI } from '../../modelos/listaEmpleados.interface'
import { EmpleadoI } from '../../modelos/empleado.interface';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  url:string = "http://api.ci.saludplusweb.com/Api/Empleados/";

  constructor(private http:HttpClient) { }

  postEmployees(form:EmpleadoI):Observable<ResponseI>{
    let direccion = this.url + 'Crear';
    console.log(direccion);
    return this.http.post<ResponseI>(direccion,form);
  }

  getEmployees():Observable<ListaEmpleadosI[]>{
    let direccion = this.url + 'Listado';
    console.log(direccion);
    return this.http.get<ListaEmpleadosI[]>(direccion);
  }

  getOneEmployee(id:any):Observable<EmpleadoI>{
    let direccion = this.url + 'Consulta/' + id;
    console.log(direccion);
    return this.http.get<EmpleadoI>(direccion);
  }

  putEmployees(form:EmpleadoI):Observable<ResponseI>{
    let direccion = this.url + "Actualizar";
    console.log(direccion);
    return this.http.put<ResponseI>(direccion, form);
  }

  deleteEmployees(id:any):Observable<{}>{
    let direccion = this.url + "Eliminar?Id=" + id;
    console.log(direccion);
    return this.http.delete(direccion);
  }

}
