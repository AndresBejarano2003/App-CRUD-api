import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'edad'
})
export class EdadPipe implements PipeTransform {

  actualDate = new Date();
  coleccionFecha:string[] = [];
  concatenacion="";
  fechaEmpleado!:Date;

  transform(value: string, ...args: unknown[]): unknown {   

    console.log("value: " + value);
    

for(let i = 0; i < value.length; i++){
  if(value.charAt(i) != "T"){
    this.coleccionFecha[i]=value.charAt(i);
  } else{
    break;
  }
}

for(let i = 0; i < this.coleccionFecha.length;i++){
this.concatenacion = this.concatenacion+this.coleccionFecha[i];
}
console.log("concatenacion: " + this.concatenacion);

this.fechaEmpleado = new Date(this.concatenacion);

/*
console.log("año: " + this.fechaEmpleado.getFullYear() + " mes: " + this.fechaEmpleado.getMonth() + " dia: " + this.fechaEmpleado.getDate());
*/
    let edad = this.actualDate.getFullYear() - this.fechaEmpleado.getFullYear();
 /* 
    console.log("Año actual: " + this.actualDate.getFullYear() + " Año de nacimiento: " + this.fechaEmpleado.getFullYear());
    
    console.log("Mes actual: " + this.actualDate.getMonth() + " Mes de nacimiento: " + this.fechaEmpleado.getMonth() );

    console.log("Dia actual: " + this.actualDate.getDate() + " Dia de nacimiento: " + this.fechaEmpleado.getDate());
  */
    let mesActual = this.actualDate.getMonth()+1;
    let mesNacimiento = this.fechaEmpleado.getMonth()+1;
    let diaNacimiento = this.fechaEmpleado.getDate()+1;
/*
  console.log("----------------------------------------");

  
    console.log("Año actual: " + this.actualDate.getFullYear() + " Año de nacimiento: " + this.fechaEmpleado.getFullYear());
    
    console.log("Mes actual: " + mesActual + " Mes de nacimiento: " + mesNacimiento);

    console.log("Dia actual: " + this.actualDate.getDate() + " Dia de nacimiento: " + diaNacimiento);
*/
    if(mesActual <= mesNacimiento){
      //Revisar esta parte para indicar la edad exacta
      //if(this.actualDate.getDate() < diaNacimiento){               
        edad -= 1;
      //}  
    }
    //console.log("---------//-------------------//------------");
    
    
    return edad;
  }

}
