import express, { Application } from 'express';
import { productsRouter, cartsRouter } from './routes';

const app: Application = express();

const administrador = true;

app.set('PORT', process.env.PORT || 4000);

app.use(express.json());

/*Routes*/
app.use('/productos', productsRouter);
app.use('/carritos', cartsRouter);

/*Starting the server*/
app.listen(app.get('PORT'), () => {
  console.log(`Server on port ${app.get('PORT')}`);
});
