import { Factura } from '../facturas/models/factura';
import { Region } from './region';


export class Cliente {
  id :number;
  nombre :String;
  apellido :String;
  createAt :String;
  correo: String;
  foto : String;
  region : Region;
  facturas :Array<Factura> = [];
}
