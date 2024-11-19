import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/modelos/Usuario';
import { ApiService } from 'src/app/servicios/api/api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  date = new Date().getFullYear();
  mensaje = "";
  activarSuccess: boolean = false;
  activarDanger: boolean = false;

  loginForms = new FormGroup({
    username: new FormControl("", Validators.required),
    password: new FormControl("", Validators.required)
  });

  constructor(private api: ApiService, private router: Router) { }

  ngOnInit(): void {
  }

  onLogin(form: any) {
    console.log("form");
    console.log(form);

    this.api.getValidarUsuario(form.username, form.password).subscribe({
      next: (data) => {
        console.log('Usuario válido:', data);

        switch (data.tipouser) {
          case "ADMIN":
            this.router.navigate(['dashboard'])
            break;
          case "AUDITOR":
            this.router.navigate(['dashboardAuditor', data.cedulaxx])
            break;
          case "EMPRESA":
            // Aquí puedes manejar la respuesta exitosa, por ejemplo, redirigir al usuario
            this.api.getUnaEmpresa(data.idEmpres).subscribe(dataEmpresa => {
              if (dataEmpresa.licencia == "ACTIVA") {
                this.router.navigate(['dashboardEmpresa', data.cedulaxx, data.idEmpres])
              } else {
                alert("Su licencia se encuentra inactiva, por favor comunicarse con su auditor.")
              }
            })
            break;
        }
      },
      error: (err) => {
        console.error('Error:', err.error);
        alert(err.error);  // Muestra el mensaje de error en una alerta
      }
    });
  }

}
