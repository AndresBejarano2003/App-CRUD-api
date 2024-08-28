import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { EmpleadoI } from '../../modelos/empleado.interface';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ApiService } from '../../servicios/api/api.service';
import { debounceTime } from 'rxjs/operators';//Para el tiempo de inactividad
import { ListaEmpleadosI } from '../../modelos/listaEmpleados.interface';

@Component({
  selector: 'app-nuevo',
  templateUrl: './nuevo.component.html',
  styleUrls: ['./nuevo.component.scss']
})
export class NuevoComponent implements OnInit {

  constructor(private router:Router, private activeroute:ActivatedRoute, private api:ApiService) { 
    this.api.getEmployees().subscribe(data=>{
      this.empleado = data;             
    })
  }

  datos!:string;
  empleado :ListaEmpleadosI[]=[];
  mensaje! : any;
  activarSuccess: boolean = false;
  activarDanger: boolean = false;
  used!:Boolean;
  codigoId!:any;
  nombre!:string;
  apellido!:string;
  cedula!:string;
  sexo!:string;
  fechaNacimiento!:string;

  datosEmpleado!: EmpleadoI;
  crearForm = new FormGroup({    
    id:new FormControl("", Validators.compose([Validators.required,Validators.pattern(/^[0-9]+$/)])),
    nombre:new FormControl("", Validators.compose([Validators.required,Validators.pattern(/^[a-zA-Z áéíóúÁÉÍÓÚüÜñÑ\s]+$/)])),
    apellido:new FormControl("", Validators.compose([Validators.required,Validators.pattern(/^[a-zA-Z áéíóúÁÉÍÓÚüÜñÑ\s]+$/)])),
    cedula:new FormControl("", Validators.compose([Validators.required, Validators.minLength(6),Validators.maxLength(10),Validators.pattern(/^[0-9]+$/)])),
    sexo:new FormControl(""),
    fechaNacimiento: new FormControl("", Validators.required)
  });

  ngOnInit(): void {
    console.log("Id: "+this.codigoId+"\nNombre: "+this.nombre+"\nApellido: "+this.apellido+"\nCedula: "+this.cedula+"\nSexo: "+this.sexo+"\nFecha de nacimiento: "+this.fechaNacimiento);
    
  }

  checkId(idForm:any){
    //let used:Boolean=false;
    console.log("Se ejecuta metodo checkId");
    
        

     for (let i = 0; i < this.empleado.length;i++){
      console.log("se ejecuta el for");
      
        let id = this.empleado[i].id
        let nombre = this.empleado[i].nombre;
        let numeroEmpleado = i+1;   
        console.log("i: " + i);
        if(idForm==id){
          //Muestra el usuario con el que concuerda
          //console.log("id tomado " + idForm + " es igual al del empleado " + nombre + " con el id " + id);
          this.used = true;
          break;
        }      
      }        
                   
  }

  postForm(form:any,idToCheck:any){
    this.checkId(idToCheck);

    if(this.used == true){
      console.log("El id YA está usado");
      this.mensaje="El id ingresado está en uso, digite otro";
      this.activarDanger=true;
      this.activarSuccess=false;
    }else{
      this.api.postEmployees(form).subscribe(data =>{
        console.log("Nuevo empleado:")
        console.log(data)
        this.mensaje="Se ha creado un nuevo usuario"      
        this.crearForm.reset();
        this.activarSuccess=true;
        this.activarDanger=false;
      }, rest =>{      
        this.mensaje = "Error ";
        this.activarDanger=true;
        this.activarSuccess=false;
      })
            
    }  
    console.log("Se termina de ejecutar el metodo postForm");
  }

  dashboard(){
    this.router.navigate(['dashboard']);
  }

  resetActivar(){
    this.activarSuccess = false;
    this.activarDanger = false;
    this.used=false;
  }

}
