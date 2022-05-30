const express = require('express');
const app = express();
const PORT = 8080;
const productos = require('./routes/productos');

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use(express.static('public'));

app.use('/api/productos', productos);

app.listen(PORT, () => {
    console.log(`Server running on port: ${PORT}`);
});