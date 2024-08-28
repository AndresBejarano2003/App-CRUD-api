import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { EmpleadoI } from '../../modelos/empleado.interface';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ApiService } from '../../servicios/api/api.service';

@Component({
  selector: 'app-editar',
  templateUrl: './editar.component.html',
  styleUrls: ['./editar.component.scss']
})
export class EditarComponent implements OnInit {

  constructor(private router: Router, private activeroute: ActivatedRoute, private api: ApiService) { }

  mensaje = "";
  activarSuccess: boolean = false;
  activarDanger: boolean = false;
  desactivarBotones: boolean = false;
  fechaNacimiento!: string;

  datosEmpleado: EmpleadoI = (
    {
      fechaNacimiento: "",
      id: "",
      nombre: "",
      apellido: "",
      cedula: "",
      sexo: "",
    }
  );

  datosForm = new FormGroup({
    fechaNacimiento: new FormControl("", Validators.required),
    id: new FormControl("", Validators.compose([Validators.required, Validators.pattern(/^[0-9]+$/)])),
    nombre: new FormControl("", Validators.compose([Validators.required, Validators.pattern(/^[a-zA-Z áéíóúÁÉÍÓÚüÜñÑ\s]+$/)])),
    apellido: new FormControl("", Validators.compose([Validators.required, Validators.pattern(/^[a-zA-Z áéíóúÁÉÍÓÚüÜñÑ\s]+$/)])),
    cedula: new FormControl("", Validators.compose([Validators.required, Validators.minLength(6), Validators.maxLength(10), Validators.pattern(/^[0-9]+$/)])),
    sexo: new FormControl("No registrado", { nonNullable: true })
  });

  ngOnInit(): void {
    let idEmployee = this.activeroute.snapshot.paramMap.get('id');
    console.log("Codigo del empleado seleccionado: " + idEmployee);
    this.api.getOneEmployee(idEmployee).subscribe(data => {
      this.datosEmpleado = data
      this.datosForm.setValue({
        'fechaNacimiento': this.datosEmpleado.fechaNacimiento,
        'id': this.datosEmpleado.id,
        'nombre': this.datosEmpleado.nombre,
        'apellido': this.datosEmpleado.apellido,
        'cedula': this.datosEmpleado.cedula,
        'sexo': this.datosEmpleado.sexo
      });
    })
  }

  putEmployees(form: any) {
    this.api.putEmployees(form,form?.id).subscribe(data => {
      console.log(data)
      console.log(data.fechaNacimiento);
      this.mensaje = "Se han actualizado los datos"
      this.activarDanger = false;
      this.activarSuccess = true;
    }, rest => {
      this.mensaje = "Error";
      this.activarDanger = true;
      this.activarSuccess = false;
    })
  }

  eliminar(id: any): void {
    console.log(id);
    this.api.deleteEmployees(id).subscribe(data => {
      console.log(data)
      this.mensaje = "Se ha eliminado el empleado"
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

}
