import { Component, OnInit } from '@angular/core';

import {Cliente} from './cliente';
import {ClienteService} from './cliente.service';
import {Router, ActivatedRoute} from '@angular/router';
import swal from 'sweetalert2';


@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {
  public cliente :Cliente = new Cliente();
  public titulo :string = "Crear Cliente";
  public errores :String[];

  constructor(private clienteService :ClienteService, private router :Router ,private activatedRoute :ActivatedRoute) { }

  ngOnInit(): void {
    this.cargarCliente();
  }
  cargarCliente ():void{
    this.activatedRoute.params.subscribe( params =>{
      let id = params['id']
      if (id){
          this.clienteService.getCliente(id).subscribe( cliente =>
             this.cliente = cliente )
           }
    })
  }

  public create() :void{
    this.clienteService.create(this.cliente).subscribe(
      (response) =>{
       this.router.navigate(['/clientes'])
       swal.fire('Nuevo Cliente!',`${response.mensaje} : ${response.cliente.nombre}`,'success')
     },
     err =>{
       this.errores = err.error.errors as String[];
       console.error("Codigo error backend :: ", err.status);
       console.error("Errores", err.error.errors)
     }
    )
  }

  public update() :void{
      this.clienteService.update(this.cliente).subscribe(
        (response) =>{
           this.router.navigate(['/clientes'])
           swal.fire('Cliente actualizado!',`${response.mensaje} : ${response.cliente.nombre}`,'success')
        },
        err =>{
          this.errores = err.error.errors as String[];
          console.error("Codigo error backend :: ", err.status);
          console.error("Errores", err.error.errors)
        }
      )
  }

}
