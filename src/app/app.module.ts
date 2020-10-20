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



registerLocaleData(localeEsMx,'es');

const routes: Routes = [
  { path: '', redirectTo: '/clientes', pathMatch: 'full' },
  { path: 'clientes', component: ClienteComponent },
  { path: 'clientes/page/:page', component: ClienteComponent },
  { path: 'clientes/form', component: FormComponent },
  { path: 'clientes/form/:id', component: FormComponent }
];

@NgModule({
  declarations: [
    AppComponent,
      HeaderComponent,
      FooterComponent,
      ClienteComponent,
      PaginadorComponent,
      FormComponent

   ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    RouterModule.forRoot(routes)
  ],
  exports:[
    ClienteComponent
  ],
  providers: [ClienteService ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  bootstrap: [AppComponent]
})
export class AppModule { }
