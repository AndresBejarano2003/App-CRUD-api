import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../servicios/api/api.service';
import { ListaEmpleadosI } from '../../../modelos/listaEmpleados.interface';
import { Chart, registerables } from 'chart.js';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Usuario } from 'src/app/modelos/Usuario';
import { DatePipe } from '@angular/common';

Chart.register(...registerables)

@Component({
  selector: 'app-micuenta-Auditor',
  templateUrl: './micuentaAuditor.component.html',
  styleUrls: ['./micuentaAuditor.component.scss']
})
export class MiCuentaAuditorComponent implements OnInit {

  empleados: ListaEmpleadosI[] = [];
  opcion!: string;
  fecNacim!: string;
  activarSuccess: boolean = false;
  activarDanger: boolean = false;
  used!: Boolean;
  mensaje!: any;

  datosUsuario: Usuario = (
    {
      cedulaxx: "",
      nombresx: "",
      apellido: "",
      fecNacim: new Date(),
      sexoxxxx: "No registrado",
      emailxxx: "",
      telefono: "",
      celularx: "",
      direccio: "",
      idCiudad: 0,
      idMunici: 0,
      idPaisxx: 0,
      fotoxxxx: "",
      username: "",
      password: "",
      tipouser: "",
      usercrea: "",
      fechcrea: new Date(),
      horacrea: "",
      usermodi: "",
      fechmodi: new Date(),
      horamodi: "",
      idEmpres: "",
    }
  );

  datosForm = new FormGroup({

    cedulaxx: new FormControl("", Validators.compose([Validators.required, Validators.minLength(6), Validators.maxLength(10), Validators.pattern(/^[0-9]+$/)])),
    nombresx: new FormControl("", Validators.compose([Validators.required, Validators.pattern(/^[a-zA-Z áéíóúÁÉÍÓÚüÜñÑ\s]+$/)])),
    apellido: new FormControl("", Validators.compose([Validators.required, Validators.pattern(/^[a-zA-Z áéíóúÁÉÍÓÚüÜñÑ\s]+$/)])),
    fecNacim: new FormControl(new Date(), Validators.required),
    sexoxxxx: new FormControl("No registrado", Validators.required),
    emailxxx: new FormControl("", Validators.required),
    telefono: new FormControl("", Validators.compose([Validators.required, Validators.pattern(/^[0-9]+$/)])),
    celularx: new FormControl("", Validators.required),
    direccio: new FormControl(""),
    idCiudad: new FormControl(0),
    idMunici: new FormControl(0),
    idPaisxx: new FormControl(0),
    fotoxxxx: new FormControl(""),
    username: new FormControl(""),
    password: new FormControl(""),
    tipouser: new FormControl(""),
    usercrea: new FormControl(""),
    fechcrea: new FormControl(new Date()),
    horacrea: new FormControl(""),
    usermodi: new FormControl(""),
    fechmodi: new FormControl(new Date()),
    horamodi: new FormControl(""),
  });
  cedulaxx!: string | null;

  constructor(private api: ApiService, private router: Router, private activeroute: ActivatedRoute, private datePipe: DatePipe) { }

  ngOnInit(): void {
    this.cedulaxx = this.activeroute.snapshot.paramMap.get('id');
    this.getDataUser(this.cedulaxx);
  }

  getDataUser(idUser: any) {
    this.api.getDataUser(idUser).subscribe(data => {
      //this.mensaje = "Se ha creado un nuevo usuario"
      this.datosUsuario = data
      let mMatriz = this.datosUsuario.fecNacim.split(" ");
      console.log(mMatriz);
      let mFecha = mMatriz[0].split("/");
      console.log("mFecha");
      console.log(mFecha);
      if (mFecha[0] < 10) {
        mFecha[0] = "0" + mFecha[0];
      }
      console.log(mFecha[2] + "-" + mFecha[1] + "-" + mFecha[0]);

      this.datosUsuario.fecNacim = mFecha[2] + "-" + mFecha[1] + "-" + mFecha[0];
      this.datosForm.setValue({
        'cedulaxx': this.datosUsuario.cedulaxx,
        'nombresx': this.datosUsuario.nombresx,
        'apellido': this.datosUsuario.apellido,
        'fecNacim': this.datosUsuario.fecNacim,
        'sexoxxxx': this.datosUsuario.sexoxxxx,
        'emailxxx': this.datosUsuario.emailxxx,
        'telefono': this.datosUsuario.telefono,
        'celularx': this.datosUsuario.celularx,
        'direccio': this.datosUsuario.direccio,
        'idCiudad': this.datosUsuario.idCiudad,
        'idMunici': this.datosUsuario.idMunici,
        'idPaisxx': this.datosUsuario.idPaisxx,
        'fotoxxxx': this.datosUsuario.fotoxxxx,
        'username': this.datosUsuario.username,
        'password': this.datosUsuario.password,
        'tipouser': this.datosUsuario.tipouser,
        'usercrea': this.datosUsuario.usercrea,
        'fechcrea': this.datosUsuario.fechcrea,
        'horacrea': this.datosUsuario.horacrea,
        'usermodi': this.datosUsuario.usermodi,
        'fechmodi': this.datosUsuario.fechmodi,
        'horamodi': this.datosUsuario.horamodi,
      });
      //this.activarSuccess = true;
      //this.activarDanger = false;
    }, rest => {
      this.mensaje = "Error ";
      this.activarDanger = true;
      this.activarSuccess = false;
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

  postForm(form: any) {

    let fechcrea = form.fechcrea.split(" ");
    console.log(fechcrea);
    let mFechcrea = fechcrea[0].split("/");
    console.log("mFechcrea");
    console.log(mFechcrea);
    if (mFechcrea[0] < 10) {
      mFechcrea[0] = "0" + mFechcrea[0];
    }
    console.log(mFechcrea[2] + "-" + mFechcrea[1] + "-" + mFechcrea[0]);

    form.fechcrea = mFechcrea[2] + "-" + mFechcrea[1] + "-" + mFechcrea[0];

    let fechmodi = form.fechmodi.split(" ");
    console.log(fechmodi);
    let mFechmodi = fechmodi[0].split("/");
    console.log("mFechmodi");
    console.log(mFechmodi);
    if (mFechmodi[0] < 10) {
      mFechmodi[0] = "0" + mFechmodi[0];
    }
    console.log(mFechmodi[2] + "-" + mFechmodi[1] + "-" + mFechmodi[0]);

    form.fechmodi = mFechmodi[2] + "-" + mFechmodi[1] + "-" + mFechmodi[0];


    this.api.putUsuarioEmpresa(form, form.cedulaxx).subscribe(data => {
      console.log("Actualizar empresa:")
      console.log(data)
      this.getDataUser(this.cedulaxx);
      this.mensaje = "Se ha actualizado el usuario";
      this.datosForm.reset();
      this.activarSuccess = true;
      this.activarDanger = false;
    }, rest => {
      alert(rest);
      console.log(rest);

      this.mensaje = "Error ";
      this.activarDanger = true;
      this.activarSuccess = false;
    })
    console.log("Se termina de ejecutar el metodo postForm");
  }

  resetActivar() {
    this.activarSuccess = false;
    this.activarDanger = false;
    this.used = false;
  }

  formatDate(dateString2: any): Date {

    console.log("FECHA 1");
    console.log(dateString2);
    console.log("new Date('YYYY-MM-AA');");
    console.log(new Date("YYYY-MM-AA"));
    return new Date("YYYY-MM-AA");
  }


}