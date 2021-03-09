import { v4 as uuid4 } from 'uuid';

export interface Product {
  id: string;
  nombre: string;
  timestamp: Date;
  descripcion: string;
  codigo: string;
  foto: string;
  precio: number;
  stock: number;
}

export class ProductClass implements Product {
  public id: string;
  public timestamp: Date;

  constructor(
    public nombre: string,
    public descripcion: string,
    public codigo: string,
    public foto: string,
    public precio: number,
    public stock: number
  ) {
    this.id = uuid4();
    this.timestamp = new Date(Date.now());
    this.nombre = nombre;
    this.descripcion = descripcion;
    this.codigo = codigo;
    this.foto = foto;
    this.precio = precio;
    this.stock = stock;
  }
}
