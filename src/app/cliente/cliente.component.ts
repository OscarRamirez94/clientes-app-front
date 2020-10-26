import { Component, OnInit } from '@angular/core';

import {Cliente} from './cliente';
import {ClienteService} from './cliente.service';
import swal from 'sweetalert2';
import {map, tap} from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import { ModalService } from './detalle/modal.service';
import { Region } from './region';

@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.component.html',
  styleUrls: ['./cliente.component.css']
})
export class ClienteComponent implements OnInit {
  clientes : Cliente[];
  paginador :any;
  clienteSeleccionado :Cliente;
  region :Region;

  constructor(private clienteService :ClienteService, private activatedRoute :ActivatedRoute, private modalService :ModalService) { }

  ngOnInit() {

    this.activatedRoute.paramMap.subscribe(params => {
      let page: number = +params.get('page');

      if (!page) {
        page = 0;
      }

      this.clienteService.getClientes(page)
        .pipe(
          tap(response => {
            console.log('ClientesComponent: tap 3');
            (response.content as Cliente[]).forEach(cliente => console.log(cliente.nombre));
          })
        ).subscribe(response => {
          this.clientes = response.content as Cliente[];
          this.paginador = response;
        });
    });
    this.modalService.notificarUpload.subscribe( cliente =>{
      this.clientes = this.clientes.map(clienteOrginal =>{
        if(cliente.id == clienteOrginal.id ){
          clienteOrginal.foto = cliente.foto;
        }
        return clienteOrginal;
      })
    })
  }

  public delete (cliente :Cliente) :void{

    swal.fire({
  title: 'Estas seguro?',
  text: `Estas seguro que deseas eliminar  ${cliente.nombre} ${cliente.apellido} ? `,
  icon: 'warning',
  showCancelButton: true,
  cancelButtonText: 'No, cancelar!',
  confirmButtonColor: '#3085d6',
  cancelButtonColor: '#d33',
  confirmButtonText: 'Si, eliminar!'
}).then((result) => {
  if (result.isConfirmed) {
    this.clientes = this.clientes.filter(cli => cli !== cliente)
    this.clienteService.delete(cliente.id).subscribe(
      response => {
        swal.fire(
          'Eliminado!',
          ` El cliente ${cliente.nombre} ${cliente.apellido} se eliminó! `,
          'success'
        )
      }
    )

  }
})

  }
  abrirModal(cliente :Cliente){

    console.log("cliente:: ", cliente);
    this.clienteSeleccionado = cliente;
    this.modalService.abriModal();
  }

}
