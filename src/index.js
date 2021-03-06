const express = require('express');
const app = express();

const administrador = true;

app.set('PORT', process.env.PORT || 4000);

/*Middlewares*/
app.use(express.json());

/*Routes*/
app.use('/productos', require('./routes/productos'));
app.use('/carritos', require('./routes/carritos'));

/*Starting the server*/
app.listen(app.get('PORT'), () => {
  console.log(`Server on port ${app.get('PORT')}`);
});
