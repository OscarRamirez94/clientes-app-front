import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Factura } from '../models/factura';
import { Producto } from '../models/producto';

@Injectable({
  providedIn: 'root'
})
export class FacturaService {
  url :string =  "http://localhost:8084/api/facturas";
  constructor(private http: HttpClient) { }

  getFactura(id :number) :Observable<Factura>{
    return this.http.get<Factura>(`${this.url}/${id}`);
 }

 filtrarProductos(nombre :string) :Observable<Producto[]>{
  return this.http.get<Producto[]>(`${this.url}/filtrar-productos/${nombre}`);
}

 deleteFactura(id :number) :Observable<void>{
  return this.http.delete<void>(`${this.url}/${id}`);
}
createFactura(factura :Factura) :Observable<Factura>{
  return this.http.post<Factura>(this.url,factura);
}

}
