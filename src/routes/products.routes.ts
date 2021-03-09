import express, { Application, Request, Response } from 'express';
import ProductsService from '../services/products.service';

const productsRouter = express.Router();

const productsService = new ProductsService();

productsRouter.get('/', (req: Request, res: Response) => {
  const productos = productsService.getAllProducts();
  res.send(productos);
});

productsRouter.get('/:id', (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const producto = productsService.getProductById(id);
    res.send(producto);
  } catch (error) {
    res.send({ error: 'Producto no encontrado' });
  }
});

productsRouter.post('/', (req: Request, res: Response) => {
  const data = req.body;
  productsService.addProduct(data);
  res.status(200).json({ message: 'Producto agregado' });
});

productsRouter.patch('/:id', (req: Request, res: Response) => {
  const { id } = req.params;
  const data = req.body;
  productsService.updateProduct(id, data);
  res.status(200).json({ message: 'Producto modificado' });
});

productsRouter.delete('/:id', (req: Request, res: Response) => {
  const { id } = req.params;
  productsService.deleteProduct(id);
  res.status(200).json({ message: 'Producto eliminado' });
});

export default productsRouter;
