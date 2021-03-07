const Producto = require('../models/productos.model');

class ProductsService {
  constructor() {
    this.productos = [];
  }

  getAllProducts() {
    return this.productos;
  }

  getProductById(id) {
    const found = this.productos.find((producto) => producto.id === id);

    if (!found) {
      throw new Error({ error: 'Producto no encontrado' });
    }

    return found;
  }

  addProduct(data) {
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

    this.productos = [...this.productos, nuevoProducto];

    return this.productos;
  }

  updateProduct(id, data) {
    const producto = this.getProductById(id);
    const { nombre, descripcion, codigo, foto, precio, stock } = data;

    producto.nombre = nombre;
    producto.descripcion = descripcion;
    producto.codigo = codigo;
    producto.foto = foto;
    producto.precio = precio;
    producto.stock = stock;

    this.productos = Object.assign(this.productos, producto);

    return producto;
  }

  deleteProduct(id) {}
}

module.exports = ProductsService;
