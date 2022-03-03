const express = require('express');

const Contenedor = require('./app');
const productos = new Contenedor('productos');

const app = express();
const port = 8080;
const server = app.listen(port, () => {
    console.log(`Servidor iniciado en puerto: ${server.address().port}`);
});

app.get('/', ( req , res ) => {
    res.send('Hola mundo');
});

app.get('/productos', ( req , res ) => {
    const arrProductos = productos.getAll();
    arrProductos.then( contenido => {
        const contenidoStr = JSON.stringify(contenido,null,2);
        res.type('json');
        res.send(contenidoStr);
    })
});

app.get('/productoRandom', ( req , res ) => {
    const numRandom = Math.floor( Math.random()*(4 - 1) + 1);
    const producto = productos.getById(numRandom);
    producto.then( contenido => {
        res.type('json');
        res.send(JSON.stringify(contenido,null,2));
    })
});