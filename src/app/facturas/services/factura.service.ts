import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Factura } from '../models/factura';

@Injectable({
  providedIn: 'root'
})
export class FacturaService {
  url :string =  "http://localhost:8084/api/facturas";
  constructor(private http: HttpClient) { }

  getFactura(id :number) :Observable<Factura>{
    return this.http.get<Factura>(`${this.url}/${id}`);
 }

 deleteFactura(id :number) :Observable<void>{
  return this.http.get<void>(`${this.url}/${id}`);
}

}
