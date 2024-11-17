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
import { InformesAuditorComponent } from './vistas/auditor/informes/informesAuditor.component';
import { MiCuentaAuditorComponent } from './vistas/auditor/micuenta/micuentaAuditor.component';
import { CalificacionesComponent } from './vistas/auditor/calificaciones/calificaciones.component';
import { ActualizarEmpresaComponent } from './vistas/auditor/actualizarEmpresa/actualizarEmpresa.component';
import { EvidenciasComponent } from './vistas/auditor/evidencias/evidencias.component';
import { DashboardEmpresaAuditorComponent } from './vistas/auditor/dashboardEmpresa/dashboardEmpresa.component';


const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  //MODULOS DEL ADMINISTRADOR
  { path: 'dashboard', component: DashboardComponent },
  { path: 'nuevo', component: NuevoComponent },
  { path: 'editar/:id', component: EditarComponent },
  //MÓDULOS DE LA EMPRESA
  { path: 'dashboardEmpresa/:id/:nit', component: DashboardEmpresaComponent },
  { path: 'informesEmpresa/:id/:nit', component: InformesEmpresaComponent },
  { path: 'miCuentaEmpresa/:id/:nit', component: MiCuentaEmpresaComponent },
  //MÓDULOS DE LA AUDITOR
  { path: 'dashboardAuditor/:id', component: DashboardAuditorComponent },
  { path: 'informesAuditor/:id', component: InformesAuditorComponent },
  { path: 'miCuentaAuditor/:id', component: MiCuentaAuditorComponent },
  { path: 'calificaciones/:id', component: CalificacionesComponent },
  { path: 'editarEmpresa/:id/:nit', component: ActualizarEmpresaComponent },
  { path: 'evidencias/:id', component: EvidenciasComponent },
  { path: 'dashboardEmpresaAuditor/:id/:nit', component: DashboardEmpresaAuditorComponent },
  //{ path: 'assessment', component: AssessmentComponent },  // Asegúrate de tener este componente creado
  //{ path: 'account', component: AccountComponent },  // Asegúrate de tener este componente creado
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingComponents = [
  LoginComponent, 
  DashboardComponent, 
  EditarComponent, 
  NuevoComponent,
  DashboardAuditorComponent, 
  DashboardEmpresaComponent, 
  InformesEmpresaComponent, 
  MiCuentaEmpresaComponent, 
  DashboardAuditorComponent, 
  InformesAuditorComponent, 
  MiCuentaAuditorComponent,
  CalificacionesComponent,
  ActualizarEmpresaComponent,
  EvidenciasComponent,
]
