import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Cliente } from '../cliente';
import { ClienteService } from '../cliente.service';
import swal from 'sweetalert2';
import { HttpEventType } from '@angular/common/http';
import { ModalService } from './modal.service';



@Component({
  selector: 'detalle-cliente',
  templateUrl: './detalle.component.html',
  styleUrls: ['./detalle.component.css']
})
export class DetalleComponent implements OnInit {

  @Input() cliente :Cliente;

  titulo :String = "Detalle Cliente";
  modal : boolean = false;
  fotoSeleccionada :File;
  progreso :number =0;
  constructor(private clienteService : ClienteService, private activatedRoute :ActivatedRoute,
    public modalService : ModalService) { }

  ngOnInit() {

    /*this.activatedRoute.paramMap.subscribe( params =>{
      let id :number = +params.get("id");
      if (id){
        this.clienteService.getCliente(id).subscribe( cliente => {
            this.cliente = cliente
          }
        );
      }
    })*/
  }

  seleccionarFoto(event){
    this.fotoSeleccionada = event.target.files[0];
    this.progreso = 0;
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
      event =>{
        if(event.type === HttpEventType.UploadProgress){
            this.progreso =  Math.round((event.loaded / event.total) * 100)
        } else if(event.type === HttpEventType.Response){
            let response :any = event.body;
            this.cliente = response.cliente as Cliente;
            this.modalService.notificarUpload.emit(this.cliente);
            swal.fire('La imagen se ha subido con exito! : ',response.mensaje,'success')
        }
       // this.cliente = cliente;

      }
    );
  }
}
  cerrarModal(){
    this.modalService.cerrarModal();
    this.fotoSeleccionada = null;
    this.progreso = 0;
  }

}
