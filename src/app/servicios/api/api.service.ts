import { Injectable } from '@angular/core';
import { ResponseI } from '../../modelos/response.interface';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, observable } from 'rxjs';
import { ListaEmpleadosI } from '../../modelos/listaEmpleados.interface'
import { EmpleadoI } from '../../modelos/empleado.interface';
import { ControllerApiList } from 'src/app/modelos/ControllerUrl';
import { Usuario } from 'src/app/modelos/Usuario';
import { salesdata } from 'src/app/modelos/salesdata';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  url: string = "https://localhost:7106/empleado/";

  constructor(private http: HttpClient) { }

  postEmployees(form: EmpleadoI): Observable<ResponseI> {
    return this.http.post<ResponseI>(
      `${ControllerApiList.Empleado.Guardar}`,
      form
    );
  }

  getEmployees(): Observable<ListaEmpleadosI[]> {
    let direccion = this.url + 'Listado';
    console.log(direccion);
    return this.http.get<ListaEmpleadosI[]>(direccion);
  }

  getOneEmployee(idEmpleado: any): Observable<EmpleadoI> {
    let params = new HttpParams().set("idEmpleado", idEmpleado);
    console.log(params);
    return this.http.get<EmpleadoI>(
      `${ControllerApiList.Empleado.ListarPorId}`,
      {
        params: params,
      });
  }

  putEmployees(form: EmpleadoI, idEmpleado: string): Observable<ResponseI> {
    form.id = idEmpleado;
    const empleado = this.http.put<EmpleadoI>(
      `${ControllerApiList.Empleado.Actualizar}`,
      form
    );
    return empleado;
  }

  deleteEmployees(idEmpleado: any): Observable<{}> {
    let params = new HttpParams().set("idEmpleado", idEmpleado);
    console.log(params);
    return this.http.delete(
      `${ControllerApiList.Empleado.Eliminar}`,
      {
        params: params,
      });
  }

  getValidarUsuario(username: string, password: string): Observable<Usuario> {
    let params = new HttpParams().set("username", username).set("password", password);
    console.log(params);
    return this.http.get<Usuario>(
      `${ControllerApiList.Empleado.ValidarUsuario}`,
      {
        params: params,
      });
  }

  getDataUser(idUser: any): Observable<Usuario> {
    let params = new HttpParams().set("idUser", idUser);
    console.log(params);
    return this.http.get<Usuario>(
      `${ControllerApiList.Empleado.getDataUser}`,
      {
        params: params,
      });
  }

  loadsalesdata(){
    return this.http.get<salesdata[]>("http://localhost:3000/sales")
  }

}
