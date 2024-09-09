import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule, routingComponents} from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './plantillas/header/header.component';
import { FooterComponent } from './plantillas/footer/footer.component';
import { HttpClientModule } from '@angular/common/http';
import { MensajeDangerComponent } from './plantillas/mensaje-danger/mensaje-danger.component';
import { MensajeSuccessComponent } from './plantillas/mensaje-success/mensaje-success.component';
import { EdadPipe } from './pipes/edad.pipe';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    routingComponents,
    MensajeDangerComponent,
    MensajeSuccessComponent,
    EdadPipe
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    ReactiveFormsModule, 
    FormsModule,
    HttpClientModule,
    NgxChartsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
