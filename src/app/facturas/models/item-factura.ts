import { Producto } from './producto';

export class ItemFactura {

  cantidad :number = 1;
  importe :number;
  producto :Producto;

  public calcularImporte():number{
    return this.cantidad * this.producto.precio;
  }
}
