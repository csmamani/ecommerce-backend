const Carrito = require('../models/carritos.model');
const Producto = require('../models/productos.model');

class CarritosService {
  constructor() {
    this.carritos = [];
  }

  getCartById(idCarrito) {
    const found = this.carritos.find(
      (carrito) => carrito.idCarrito === idCarrito
    );

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

    return carrito;
  }

  deleteProductFromCart(id, idProducto) {
    const carrito = this.getCartById(id);

    carrito.productos = carrito.productos.filter(
      (producto) => producto.id !== idProducto
    );

    return carrito;
  }

  /*No fueron solicitados pero los agregue para poder hacer pruebas*/
  getAllCarts() {
    return this.carritos;
  }

  addCart(data) {
    const { idCarrito } = data;

    const nuevoCarrito = new Carrito(idCarrito);

    this.carritos = [...this.carritos, nuevoCarrito];
  }
}

module.exports = CarritosService;
