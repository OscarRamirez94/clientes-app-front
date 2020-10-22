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
import { HttpClientModule} from '@angular/common/http';
import { ClienteService } from './cliente/cliente.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { DetalleComponent } from './cliente/detalle/detalle.component';



registerLocaleData(localeEsMx,'es');

const routes: Routes = [
  { path: '', redirectTo: '/clientes', pathMatch: 'full' },
  { path: 'clientes', component: ClienteComponent },
  { path: 'clientes/page/:page', component: ClienteComponent },
  { path: 'clientes/form', component: FormComponent },
  { path: 'clientes/detalle/:id', component: DetalleComponent },
  { path: 'clientes/form/:id', component: FormComponent }
];

@NgModule({
  declarations: [
    AppComponent,
      HeaderComponent,
      FooterComponent,
      ClienteComponent,
      PaginadorComponent,
      FormComponent,
      DetalleComponent

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
  providers: [ClienteService ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  bootstrap: [AppComponent]
})
export class AppModule { }
