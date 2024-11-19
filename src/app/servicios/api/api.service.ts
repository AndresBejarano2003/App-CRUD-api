import { Injectable } from '@angular/core';
import { ResponseI } from '../../modelos/response.interface';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, observable, of } from 'rxjs';
import { ListaEmpleadosI } from '../../modelos/listaEmpleados.interface'
import { EmpleadoI } from '../../modelos/empleado.interface';
import { ControllerApiList } from 'src/app/modelos/ControllerUrl';
import { Usuario } from 'src/app/modelos/Usuario';
import { salesdata } from 'src/app/modelos/salesdata';
import { ListaInformesI } from 'src/app/modelos/listaInformes.interface';
import { ListaEmpresasI } from 'src/app/modelos/listaEmpresas.interface';
import { informesI } from 'src/app/modelos/informes.interface';

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

  getEmpresas(): Observable<ListaEmpresasI[]> {
    return this.http.get<ListaEmpresasI[]>(`${ControllerApiList.Auditor.ListarEmpresas}`);
  }
  getEmployees(): Observable<ListaEmpleadosI[]> {
    let direccion = this.url + 'Listado';
    console.log(direccion);
    return this.http.get<ListaEmpleadosI[]>(direccion);
  }
  getEmployees2(): Observable<Usuario[]> {
    let direccion = this.url + 'ListadoUsuario';
    console.log(direccion);
    return this.http.get<Usuario[]>(direccion);
  }
  getInformes(): Observable<ListaInformesI[]> {
    return this.http.get<ListaInformesI[]>(
      `${ControllerApiList.Auditor.ListarInformes}`);
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

  putEmpresa(form: ListaEmpresasI, nitEmpre: string): Observable<ListaEmpresasI> {
    form.nitEmpre = nitEmpre;
    const EMPRESA = this.http.put<ListaEmpresasI>(
      `${ControllerApiList.Auditor.ActualizarEmpresa}`,
      form
    );
    return EMPRESA;
  }

  putUsuarioEmpresa(form: Usuario, idUsuario: string): Observable<Usuario> {
    form.cedulaxx = idUsuario;
    console.log("form");
    console.log(form);
    
    const EMPRESA = this.http.put<Usuario>(
      `${ControllerApiList.Empresa.ActualizarUsuarioEmpresa}`,
      form
    );
    return EMPRESA;
  }

  putEstadoInforme(informe: informesI, idInform: any): Observable<Usuario> {
    informe.idInform = idInform;
    console.log("informe");
    console.log(informe);
    
    const EMPRESA = this.http.put<Usuario>(
      `${ControllerApiList.Auditor.ActualizarInforme}`,
      informe
    );
    return EMPRESA;
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
  
  getUnaEmpresa(idEmpresa: any): Observable<ListaEmpresasI> {
    let params = new HttpParams().set("idEmpresa", idEmpresa);
    console.log(params);
    return this.http.get<ListaEmpresasI>(
      `${ControllerApiList.Auditor.ListarPorId}`,
      {
        params: params,
      });
  }

  uploadFile(formData: FormData): Observable<any> {
    //const url = 'http://localhost:5000/api/upload'; // URL de tu API
    //return this.http.post(url, formData);
    const ARCHIVO = this.http.put<ListaInformesI>(
      `${ControllerApiList.Empresa.UploadArchivo}`,
      formData
    );
    return ARCHIVO;
  }
  

  getInformesAuditor(nitEmpre: any): Observable<informesI[]> {
    let params = new HttpParams().set("nitEmpre", nitEmpre);
    console.log(params);
    return this.http.get<informesI[]>(
      `${ControllerApiList.Auditor.DataInforme}`,
      {
        params: params,
      });
  }
  
  getUnInformesAuditor(nitEmpre: any,idInform:any): Observable<informesI> {
    let params = new HttpParams().set("idInform", idInform).set("nitEmpre", nitEmpre);
    console.log(params);
    return this.http.get<informesI>(
      `${ControllerApiList.Auditor.DataUnInforme}`,
      {
        params: params,
      });
  }

  deleteEmpresa(idEmpresa: any): Observable<{}> {
    console.log("idEmpresa", idEmpresa);
    
    let params = new HttpParams().set("idEmpresa", idEmpresa);
    console.log(params);
    return this.http.delete(
      `${ControllerApiList.Auditor.Eliminar}`,
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

  // Simulación de datos de la base de datos
  private requisitos = [
    {
      tema: 'Requisito 1',
      estado: '',
      pregunta: 'Describa cómo se cumple este requisito.',
    },
    {
      tema: 'Requisito 2',
      estado: '',
      pregunta: 'Proporcione evidencia del cumplimiento.',
    },
  ];

  // Método para obtener los datos simulados
  getRequisitos(): Observable<any[]> {
    return of(this.requisitos); // Simula una llamada a la base de datos
  }

}
