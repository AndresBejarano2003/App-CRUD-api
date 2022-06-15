import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  date = new Date().getFullYear();

  loginForms = new FormGroup({
    username : new FormControl("", Validators.required),
    password : new FormControl("", Validators.required)
  });

  constructor(private router:Router) { }

  ngOnInit(): void {
  }

  onLogin(form: any){
   this.router.navigate(['dashboard'])
  }

}
