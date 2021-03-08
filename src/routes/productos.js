const express = require('express');
const router = express.Router();
const ProductsService = require('../services/productos.service');

const productsService = new ProductsService();

router.get('/', (req, res) => {
  const productos = productsService.getAllProducts();
  res.send(productos);
});

router.get('/:id', (req, res) => {
  const { id } = req.params;
  try {
    const producto = productsService.getProductById(id);
    res.send(producto);
  } catch (error) {
    res.send({ error: 'Producto no encontrado' });
  }
});

router.post('/', (req, res) => {
  const data = req.body;
  productsService.addProduct(data);
  res.status(200).json({ message: 'Producto agregado' });
});

router.patch('/:id', (req, res) => {
  const { id } = req.params;
  const data = req.body;
  productsService.updateProduct(id, data);
  res.status(200).json({ message: 'Producto modificado' });
});

router.delete('/:id', (req, res) => {
  const { id } = req.params;
  productsService.deleteProduct(id);
  res.status(200).json({ message: 'Producto eliminado' });
});

module.exports = router;
