import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Cliente } from '../cliente';
import { ClienteService } from '../cliente.service';
import swal from 'sweetalert2';

@Component({
  selector: 'detalle-cliente',
  templateUrl: './detalle.component.html',
  styleUrls: ['./detalle.component.css']
})
export class DetalleComponent implements OnInit {

  titulo :String = "Detalle Cliente";
  cliente :Cliente;
  private fotoSeleccionada :File;
  constructor(private clienteService : ClienteService, private activatedRoute :ActivatedRoute) { }

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe( params =>{
      let id :number = +params.get("id");
      if (id){
        this.clienteService.getCliente(id).subscribe( cliente => {
            this.cliente = cliente
          }
        );
      }
    })
  }

  seleccionarFoto(event){
    this.fotoSeleccionada = event.target.files[0];
    if(this.fotoSeleccionada.type.indexOf("image") < 0){
      swal.fire('Error al cargar : ','Debe seleccionar un archivo de tipo imagen','error');
      this.fotoSeleccionada = null;
    }

  }

  subirFoto(){
    console.log("entra en subir foto()");
    console.log("foto:: " , this.fotoSeleccionada);
    if(!this.fotoSeleccionada){
      swal.fire('Error : ','Selecciona alguna foto!','error');
    } else {


    this.clienteService.subirFoto(this.fotoSeleccionada,this.cliente.id).subscribe(
      cliente =>{
        this.cliente = cliente;
        swal.fire('La imagen se ha subido con exito! : ',`${this.cliente.foto}`,'success')
      }
    );
  }
}

}
