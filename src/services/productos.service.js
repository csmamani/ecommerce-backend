const Producto = require('../models/productos.model');
const fs = require('fs');

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

    fs.writeFileSync(
      './src/repositories/productos.txt',
      this.productos ? JSON.stringify(this.productos) : '[]',
      'utf-8'
    );

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

    fs.writeFileSync(
      './src/repositories/productos.txt',
      this.productos ? JSON.stringify(this.productos) : '[]',
      'utf-8'
    );

    return producto;
  }

  deleteProduct(id) {
    const found = this.getProductById(id);
    this.productos = this.productos.filter(
      (producto) => producto.id !== found.id
    );

    fs.writeFileSync(
      './src/repositories/productos.txt',
      this.productos ? JSON.stringify(this.productos) : '[]',
      'utf-8'
    );
  }
}

module.exports = ProductsService;
