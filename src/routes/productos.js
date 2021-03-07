const express = require('express');
const router = express.Router();
const ProductsService = require('../services/productos.service');

const productsService = new ProductsService();

router.get('/', (req, res) => {
  productsService.getAllProducts();
});

router.get('/:id', (req, res) => {
  const { id } = req.params;
  productsService.getProductById(id);
});

router.post('/', (req, res) => {
  const data = req.body;
  productsService.addProduct(data);
});

router.patch('/:id', (req, res) => {
  const { id } = req.params;
  const data = req.body;
  productsService.updateProduct(id, data);
});

router.delete('/:id', (req, res) => {
  const { id } = req.params;
  productsService.deleteProduct(id);
});

module.exports = router;
