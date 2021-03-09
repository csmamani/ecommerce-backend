const express = require('express');
const router = express.Router();
const CarritosService = require('../services/carritos.service');

const carritosService = new CarritosService();

router.get('/:id', (req, res) => {
  const { id } = req.params;
  try {
    const carrito = carritosService.getCartById(id);
    res.send(carrito);
  } catch (error) {
    res.send(error);
  }
});

router.patch('/:id', (req, res) => {
  const { id } = req.params;
  const data = req.body;

  try {
    if (!data.delete) {
      carritosService.addProductToCart(id, data);
      res.status(200).json({ message: 'Producto agregado al carrito' });
    } else {
      carritosService.deleteProductFromCart(id, data.id);
      res.status(200).json({ message: 'Producto eliminado del carrito' });
    }
  } catch (error) {
    res.send(error);
  }
});

/*No fueron solicitados pero los agregue para hacer pruebas */
router.get('/', (req, res) => {
  const carritos = carritosService.getAllCarts();
  res.send(carritos);
});

router.post('/', (req, res) => {
  const data = req.body;
  carritosService.addCart(data);
  res.status(200).json({ message: 'Carrito agregado' });
});

module.exports = router;
