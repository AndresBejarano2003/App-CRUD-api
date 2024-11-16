import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { EmpleadoI } from 'src/app/modelos/empleado.interface';
import { ApiService } from 'src/app/servicios/api/api.service';
import { ListaEmpresasI } from 'src/app/modelos/listaEmpresas.interface';

@Component({
  selector: 'app-actualizarEmpresa',
  templateUrl: './actualizarEmpresa.component.html',
  styleUrls: ['./actualizarEmpresa.component.scss']
})
export class ActualizarEmpresaComponent implements OnInit {

  constructor(private router: Router, private activeroute: ActivatedRoute, private api: ApiService) { }

  mensaje = "";
  activarSuccess: boolean = false;
  activarDanger: boolean = false;
  desactivarBotones: boolean = false;
  fechaNacimiento!: string;
  cedulaxx!: string | null;
  nitEmpresa!: string | null;

  datosEmpleado: ListaEmpresasI = (
    {
      nitEmpre: "",
      nombreEm: "",
      direccio: "",
      telefono: "",
      licencia: "",  
    }
  );

  datosForm = new FormGroup({
    nitEmpre: new FormControl("", Validators.required),
    nombreEm: new FormControl("", Validators.compose([Validators.required, Validators.pattern(/^[a-zA-Z áéíóúÁÉÍÓÚüÜñÑ\s]+$/)])),
    direccio: new FormControl("", Validators.compose([Validators.required, Validators.pattern(/^[a-zA-Z áéíóúÁÉÍÓÚüÜñÑ0-9\s\+\-\/\(\)]*$/)])),
    telefono: new FormControl("", Validators.compose([Validators.required, Validators.pattern(/^[0-9\+\-\/\(\)]+$/)])),
    licencia: new FormControl("", Validators.compose([Validators.required, Validators.minLength(6), Validators.maxLength(10), Validators.pattern(/^[0-9]+$/)])),
  });

  ngOnInit(): void {
    
    this.cedulaxx = this.activeroute.snapshot.paramMap.get('id');
    this.nitEmpresa = this.activeroute.snapshot.paramMap.get('nit');
    console.log("Codigo del empleado seleccionado: " + this.cedulaxx);
    this.api.getUnaEmpresa(this.nitEmpresa).subscribe(data => {
      this.datosEmpleado = data
      this.datosForm.setValue({
        'nitEmpre': this.datosEmpleado.nitEmpre,
        'nombreEm': this.datosEmpleado.nombreEm,
        'direccio': this.datosEmpleado.direccio,
        'telefono': this.datosEmpleado.telefono,
        'licencia': this.datosEmpleado.licencia,
      });
    })
  }

  putEmpresa(form: any) {
    console.log("form");
    console.log(form);
    this.api.putEmpresa(form,form?.nitEmpre).subscribe(data => {
      this.mensaje = "Se han actualizado los datos"
      this.activarDanger = false;
      this.activarSuccess = true;
    }, rest => {
      this.mensaje = "Error";
      this.activarDanger = true;
      this.activarSuccess = false;
    })
  }

  eliminar(nitEmpre: any): void {
    console.log(nitEmpre);
    this.api.deleteEmpresa(nitEmpre).subscribe(data => {
      console.log(data)
      this.mensaje = "Se ha eliminado la empresa"
      this.activarDanger = false;
      this.activarSuccess = true;
      this.desactivarBotones = true;
    }, rest => {
      this.mensaje = "Error";
      this.activarDanger = true;
      this.activarSuccess = false;
    });
  }

  dashboard() {
    this.router.navigate(['dashboard'])
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
  actualizarEmpresa() {
    this.router.navigate(['editarEmpresa', this.cedulaxx, this.nitEmpresa]);
  }
  //Se direcciona para editar un empleado
  dashboardEmpresa() {
    this.router.navigate(['dashboardEmpresaAuditor', this.cedulaxx, this.nitEmpresa]);
  }
}
