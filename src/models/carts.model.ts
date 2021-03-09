import { v4 as uuid4 } from 'uuid';
import { Product } from '../models/products.model';

export interface Cart {
  id: string;
  timestamp: Date;
  productos: Product[];
}

export class CartClass implements Cart {
  public id: string;
  public timestamp: Date;
  public productos: Product[];

  constructor() {
    this.id = uuid4();
    this.timestamp = new Date(Date.now());
    this.productos = [];
  }
}
