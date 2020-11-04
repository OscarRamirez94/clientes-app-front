import { Injectable } from '@angular/core';

import {formatDate,DatePipe } from '@angular/common';
import localeEsMx from '@angular/common/locales/es-MX';
import {Cliente} from './cliente';

import {of,Observable, throwError} from 'rxjs';
import {HttpClient,HttpEvent,HttpHeaders, HttpRequest} from '@angular/common/http';
import {map,catchError,tap} from 'rxjs/operators';
import swal from 'sweetalert2';
import {Router} from '@angular/router';
import { Region } from './region';
import { AuthService } from '../usuarios/auth.service';

@Injectable({
  providedIn: 'root',
})
export class ClienteService {
  url :string =  "http://localhost:8084/api/clientes";
  httpHeaders = new HttpHeaders({'Content-type': 'application/json'});


constructor(private http: HttpClient, private router :Router,public authService :AuthService) { }

  agregarAuthorizationHeaders(){
    let token =  this.authService.token;
    if(token != null){
      return this.httpHeaders.append('Authorization', 'Bearer ' + token);
    }
    return this.httpHeaders;
  }
isNoAutorizado(e) :boolean{
  if(e.status== 401 ){

    if(this.authService.isAuthenticaded()){
      this.authService.logout();
    }
    this.router.navigate(['/login'])
    return true;
  }

  if(e.status== 403 ){

    this.router.navigate(['/clientes'])
    swal.fire('Acceso denegado','No tienes permiso para este recurso : ' + this.authService.usuario.username,'warning');
    return true;
  }
  return false;
}
getRegiones() :Observable<Region[]>{
return this.http.get<Region[]>(this.url + '/regiones',{headers : this.agregarAuthorizationHeaders() }).pipe(
  catchError(e => {
    this.isNoAutorizado(e);
    return throwError(e);
  })
)
}

getClientes(page :number) : Observable<any> {
  //return of(CLIENTES);
  //return CLIENTES.asObservable();
  return this.http.get(this.url + '/page/' + page).pipe(
    tap((response :any) =>{

        (response.content as Cliente[]).forEach(
          cliente =>{
            console.log("tap 1 object to cliente ::", cliente.nombre);
          }
        )
    }),
    map((response :any) => {

      (response.content as Cliente[]).map( cliente =>{

      let  datePipe = new DatePipe('es');
        cliente.nombre = cliente.nombre.toUpperCase();
        cliente.apellido= cliente.apellido.toUpperCase();
        cliente.createAt= datePipe.transform(cliente.createAt,'EEEE dd, MMMM yyyy');
        return cliente;
      })
      return response;
    }),
    tap(response =>{
      (response.content as Cliente[]).forEach(
          cliente =>{
            console.log("tap 2 clientes :: " , cliente.region.nombre);
          }
        )
    }),
  )

}
create(cliente :Cliente) :Observable<any>{
  return this.http.post<any>(this.url,cliente,{headers: this.agregarAuthorizationHeaders()}).pipe(
    catchError (e =>{
        if(e.status == 400){
          return throwError(e);
        }
      swal.fire(e.error.mensaje,e.error.error,'error');
      return throwError(e);
    })
  );
}
getCliente(id) :Observable<Cliente>{

   return this.http.get<Cliente>(`${this.url}/${id}`,{headers:this.agregarAuthorizationHeaders()}).pipe(
     catchError (e =>{
       if(this.isNoAutorizado(e)){
         return throwError(e);
       }
       if(e.status == 400){
         return throwError(e);
       }
       this.router.navigate(["/clientes"]);
       swal.fire('Error al editar!',e.error.mensaje,'error');
       return throwError(e);
     })
   );
}

update(cliente :Cliente) :Observable<any>{
  return this.http.put<any>(`${this.url}/${cliente.id}`,cliente,{headers: this.agregarAuthorizationHeaders()}).pipe(
    catchError (e =>{
      if(this.isNoAutorizado(e)){
        return throwError(e);
      }
      swal.fire(e.error.mensaje,e.error.error,'error');
      return throwError(e);
    })
  );
}

delete(id) :Observable<Cliente>{

   return this.http.delete<Cliente>(`${this.url}/${id}`,{headers:this.agregarAuthorizationHeaders()}).pipe(
     catchError (e =>{

      if(this.isNoAutorizado(e)){

        return throwError(e);
      }
      console.error(e.error.error);
       swal.fire(e.error.mensaje,e.error.error,'error');
       return throwError(e);
     })
   );
}

subirFoto(archivo :File, id ) :Observable<HttpEvent<{}>>{
  let formData = new FormData();
  formData.append("archivo",archivo);
  formData.append("id",id);
  let httpHeaders = new HttpHeaders();
  let token = this.authService.token;
  if(token !=null){
    httpHeaders = httpHeaders.append('Authorization', 'Bearer ' + token);
  }

  const req = new HttpRequest('POST',`${this.url}/upload/`,formData,{
    reportProgress: true,
    headers: httpHeaders
  });
  return this.http.request(req).pipe(
    catchError(e => {

      this.isNoAutorizado(e);
      return throwError(e);
    })
  );
}
}
