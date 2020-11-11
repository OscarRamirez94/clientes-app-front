import { BrowserModule } from '@angular/platform-browser';
import { NgModule,CUSTOM_ELEMENTS_SCHEMA  } from '@angular/core';
import {registerLocaleData } from '@angular/common';
import localeEsMx from '@angular/common/locales/es-MX';

import {RouterModule, Routes} from '@angular/router';
import {FormsModule} from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { ClienteComponent } from './cliente/cliente.component';
import { PaginadorComponent } from './paginador/paginador.component';
import { FormComponent } from './cliente/form.component';
import { HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import { ClienteService } from './cliente/cliente.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { DetalleComponent } from './cliente/detalle/detalle.component';
import { ModalService } from './cliente/detalle/modal.service';
import { LoginComponent } from './usuarios/login.component';
import { AuthGuard } from './usuarios/guards/auth.guard';
import { RoleGuard } from './usuarios/guards/role.guard';
import { TokenInterceptor } from './usuarios/interceptors/token.interceptor';
import { AuthInterceptor } from './usuarios/interceptors/auth.interceptor';
import { DetalleFacturaComponent } from './facturas/detalle-factura.component';



registerLocaleData(localeEsMx,'es');

const routes: Routes = [
  { path: '', redirectTo: '/clientes', pathMatch: 'full' },
  { path: 'clientes', component: ClienteComponent },
  { path: 'clientes/page/:page', component: ClienteComponent },
  { path: 'clientes/form', component: FormComponent, canActivate:[AuthGuard,RoleGuard], data: {role :'ROLE_ADMIN'} },
  //{ path: 'clientes/detalle/:id', component: DetalleComponent },
  { path: 'clientes/form/:id', component: FormComponent,canActivate:[AuthGuard,RoleGuard], data: {role :'ROLE_ADMIN'}},
  { path: 'facturas/:id', component: DetalleFacturaComponent},
  { path: 'login', component: LoginComponent }
];

@NgModule({
  declarations: [
    AppComponent,
      HeaderComponent,
      FooterComponent,
      ClienteComponent,
      PaginadorComponent,
      FormComponent,
      DetalleComponent,
      LoginComponent,
      DetalleFacturaComponent

   ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    RouterModule.forRoot(routes),
    BrowserAnimationsModule,
    MatDatepickerModule,
    MatMomentDateModule
  ],
  exports:[
    ClienteComponent
  ],
  providers: [ClienteService, ModalService,
    {provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  bootstrap: [AppComponent]
})
export class AppModule { }
