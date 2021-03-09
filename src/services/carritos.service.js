const Carrito = require('../models/carritos.model');
const Producto = require('../models/productos.model');
const fs = require('fs');

class CarritosService {
  constructor() {
    this.carritos = [];
  }

  getCartById(id) {
    const found = this.carritos.find((carrito) => carrito.id === id);

    if (!found) {
      throw new Error({ error: 'Carrito no encontrado' });
    }

    return found;
  }

  addProductToCart(idCarrito, data) {
    const carrito = this.getCartById(idCarrito);
    const {
      id,
      timestamp,
      nombre,
      descripcion,
      codigo,
      foto,
      precio,
      stock,
    } = data;

    const nuevoProducto = new Producto(
      id,
      timestamp,
      nombre,
      descripcion,
      codigo,
      foto,
      precio,
      stock
    );

    carrito.productos = [...carrito.productos, nuevoProducto];

    fs.writeFileSync(
      './src/repositories/carritos.txt',
      this.carritos ? JSON.stringify(this.carritos) : '[]',
      'utf-8'
    );

    return carrito;
  }

  deleteProductFromCart(idCarrito, idProducto) {
    const carrito = this.getCartById(idCarrito);

    carrito.productos = carrito.productos.filter(
      (producto) => producto.id !== idProducto
    );

    fs.writeFileSync(
      './src/repositories/carritos.txt',
      this.carritos ? JSON.stringify(this.carritos) : '[]',
      'utf-8'
    );

    return carrito;
  }

  /*No fueron solicitados pero los agregue para poder hacer pruebas*/
  getAllCarts() {
    return this.carritos;
  }

  addCart(data) {
    const { id } = data;

    const nuevoCarrito = new Carrito(id);

    this.carritos = [...this.carritos, nuevoCarrito];

    fs.writeFileSync(
      './src/repositories/carritos.txt',
      JSON.stringify(this.carritos),
      'utf-8'
    );
  }
}

module.exports = CarritosService;
