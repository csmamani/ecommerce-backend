import { CartClass, Cart, ProductClass, Product } from '../models';
import fs from 'fs';

const saveDataToFile = (data: Cart[]) => {
  fs.writeFileSync(
    './src/repositories/carritos.txt',
    data ? JSON.stringify(data) : '[]',
    'utf-8'
  );
};

class CartsService {
  carts: Cart[];

  constructor() {
    this.carts = [];
  }

  getCartById(id: string) {
    const found = this.carts.find((carrito) => carrito.id === id);

    if (!found) {
      throw new Error('Carrito no encontrado');
    }

    return found;
  }

  addProductToCart(cartId: string, data: any) {
    const { nombre, descripcion, codigo, foto, precio, stock } = data;
    let cart: Cart;

    const newProduct: Product = new ProductClass(
      nombre,
      descripcion,
      codigo,
      foto,
      precio,
      stock
    );

    if (!cartId) {
      cart = new CartClass();
      this.carts = [...this.carts, cart];
    } else {
      cart = this.getCartById(cartId);
    }

    cart.productos = [...cart.productos, newProduct];

    saveDataToFile(this.carts);

    return cart;
  }

  deleteProductFromCart(cartId: string, productId: string) {
    const cart = this.getCartById(cartId);

    cart.productos = cart.productos.filter(
      (product) => product.id !== productId
    );

    saveDataToFile(this.carts);

    return cart;
  }

  /*No fue solicitado pero lo agregue para poder hacer pruebas*/
  getAllCarts() {
    return this.carts;
  }
}

export default CartsService;
