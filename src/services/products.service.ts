import { ProductClass, Product } from '../models';
import fs from 'fs';

const saveDataToFile = (data: Product[]) => {
  fs.writeFileSync(
    './src/repositories/productos.txt',
    data ? JSON.stringify(data) : '[]',
    'utf-8'
  );
};

class ProductsService {
  products: Product[];
  constructor() {
    this.products = [];
  }

  getAllProducts() {
    return this.products;
  }

  getProductById(id: string) {
    const found = this.products.find((product) => product.id === id);

    if (!found) {
      throw new Error('Producto no encontrado');
    }

    return found;
  }

  addProduct(data: any) {
    const { nombre, descripcion, codigo, foto, precio, stock } = data;

    const newProduct: Product = new ProductClass(
      nombre,
      descripcion,
      codigo,
      foto,
      precio,
      stock
    );

    this.products = [...this.products, newProduct];

    saveDataToFile(this.products);

    return this.products;
  }

  updateProduct(id: string, data: any) {
    const product = this.getProductById(id);
    const { nombre, descripcion, codigo, foto, precio, stock } = data;

    product.nombre = nombre;
    product.descripcion = descripcion;
    product.codigo = codigo;
    product.foto = foto;
    product.precio = precio;
    product.stock = stock;

    this.products = Object.assign(this.products, product);

    saveDataToFile(this.products);

    return product;
  }

  deleteProduct(id: string) {
    const found = this.getProductById(id);
    this.products = this.products.filter((product) => product.id !== found.id);

    saveDataToFile(this.products);
  }
}

export default ProductsService;
