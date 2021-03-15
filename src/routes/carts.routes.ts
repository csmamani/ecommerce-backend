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

cartsRouter.post('/:id?', (req: Request, res: Response) => {
  const { id } = req.params;
  const data = req.body;

  try {
    cartsService.addProductToCart(id, data);
    return res.status(200).json({ message: 'Producto agregado al carrito' });
  } catch (error) {
    return res.send(error);
  }
});

cartsRouter.delete('/:id', (req: Request, res: Response) => {
  const { id } = req.params;
  const { id_producto } = req.body;

  try {
    cartsService.deleteProductFromCart(id, id_producto);
    return res.status(200).json({ message: 'Producto eliminado del carrito' });
  } catch (error) {
    return res.send(error);
  }
});

/*No fue solicitado pero lo agregue para hacer pruebas */
cartsRouter.get('/', (req: Request, res: Response) => {
  const carts = cartsService.getAllCarts();
  res.send(carts);
});

export default cartsRouter;
