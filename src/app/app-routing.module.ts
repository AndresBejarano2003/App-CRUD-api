import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './vistas/login/login.component';
import { DashboardComponent } from './vistas/dashboard/dashboard.component';
import { EditarComponent } from './vistas/editar/editar.component';
import { NuevoComponent } from './vistas/nuevo/nuevo.component';
import { DashboardEmpresaComponent } from './vistas/empresa/dashboard/dashboardEmpresa.component';
import { DashboardAuditorComponent } from './vistas/auditor/dashboard/dashboardAuditor.component';
import { InformesEmpresaComponent } from './vistas/empresa/informes/informesEmpresa.component';
import { MiCuentaEmpresaComponent } from './vistas/empresa/micuenta/micuentaEmpresa.component';


const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  //MODULOS DEL ADMINISTRADOR
  { path: 'dashboard', component: DashboardComponent },
  { path: 'nuevo', component: NuevoComponent },
  { path: 'editar/:id', component: EditarComponent },
  //MÓDULOS DEL AUDITOR
  { path: 'dashboardAuditor', component: DashboardAuditorComponent },
  //MÓDULOS DE LA EMPRESA
  { path: 'dashboardEmpresa', component: DashboardEmpresaComponent },
  { path: 'informesEmpresa', component: InformesEmpresaComponent },
  { path: 'miCuentaEmpresa', component: MiCuentaEmpresaComponent },
  //{ path: 'assessment', component: AssessmentComponent },  // Asegúrate de tener este componente creado
  //{ path: 'account', component: AccountComponent },  // Asegúrate de tener este componente creado
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingComponents = [LoginComponent, DashboardComponent, EditarComponent, NuevoComponent]
