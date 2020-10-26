import { EventEmitter, Injectable } from '@angular/core';

@Injectable()
export class ModalService {
  modal :boolean =  false;
  private _notificaUpload = new EventEmitter();
  constructor() { }


  get notificarUpload(): EventEmitter<any>{
   return this._notificaUpload;
  }

  public abriModal(){

    this.modal =  true;
    console.log("abrir");
  }
  public cerrarModal(){
    this.modal = false;

    console.log("cierra()");

  }
}
