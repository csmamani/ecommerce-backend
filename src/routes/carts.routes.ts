import express, { Application, Request, Response } from 'express';
import CartsService from '../services/carts.service';

const cartsRouter = express.Router();

const cartsService = new CartsService();

cartsRouter.get('/:id', (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const cart = cartsService.getCartById(id);
    res.send(cart);
  } catch (error) {
    res.send(error);
  }
});

cartsRouter.patch('/:id', (req: Request, res: Response) => {
  const { id } = req.params;
  const data = req.body;

  try {
    if (!data.delete) {
      cartsService.addProductToCart(id, data);
      res.status(200).json({ message: 'Producto agregado al carrito' });
    } else {
      cartsService.deleteProductFromCart(id, data.id);
      res.status(200).json({ message: 'Producto eliminado del carrito' });
    }
  } catch (error) {
    res.send(error);
  }
});

/*No fueron solicitados pero los agregue para hacer pruebas */
cartsRouter.get('/', (req: Request, res: Response) => {
  const carts = cartsService.getAllCarts();
  res.send(carts);
});

cartsRouter.post('/', (req: Request, res: Response) => {
  const data = req.body;
  cartsService.addCart(data);
  res.status(200).json({ message: 'Carrito agregado' });
});

export default cartsRouter;
