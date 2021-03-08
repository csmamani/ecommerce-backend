class Carrito {
  constructor(idCarrito) {
    this.idCarrito = idCarrito;
    this.timestamp = Date.now();
    this.productos = [];
  }
}

module.exports = Carrito;
