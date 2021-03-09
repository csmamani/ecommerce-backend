class Carrito {
  constructor(id) {
    this.id = id;
    this.timestamp = Date.now();
    this.productos = [];
  }
}

module.exports = Carrito;
