import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './vistas/login/login.component';
import { DashboardComponent } from './vistas/dashboard/dashboard.component';
import { EditarComponent } from './vistas/editar/editar.component';
import { NuevoComponent } from './vistas/nuevo/nuevo.component';
import { DashboardEmpresaComponent } from './vistas/empresa/dashboard/dashboardEmpresa.component';
import { DashboardAuditorComponent } from './vistas/auditor/dashboard/dashboardAuditor.component';


const routes: Routes = [
  {path:'', redirectTo:'login', pathMatch:'full'},
  {path:'login', component:LoginComponent},
  {path:'dashboard', component:DashboardComponent},
  {path:'dashboardAuditor', component:DashboardAuditorComponent},
  {path:'dashboardEmpresa', component:DashboardEmpresaComponent},
  {path:'nuevo', component:NuevoComponent},
  {path:'editar/:id', component:EditarComponent},
  //{ path: 'assessment', component: AssessmentComponent },  // Asegúrate de tener este componente creado
  //{ path: 'account', component: AccountComponent },  // Asegúrate de tener este componente creado
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingComponents = [  LoginComponent,  DashboardComponent,  EditarComponent,  NuevoComponent]
