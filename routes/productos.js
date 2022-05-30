const router = require('express').Router();
const path = require('path');
const classContenedor = require('../classContenedor');
const productos = new classContenedor;


router.get('/', (req, res) => {
    const showAll = async () => {
        res.json(await productos.getAll());
    };

    try {
        showAll();
    } catch (error) {
        res.json({
            "Ocurrió un error": error
        });
    };
});

router.get('/new', (req, res) => {
    const indexPath = path.join(__dirname, "../");
    res.sendFile(indexPath + 'public/index.html');
});

router.post('/new', (req, res) => {
    const product = {
        title: req.body.title,
        price: req.body.price,
        thumbnail: req.body.thumbnail
    }

    const saveProducts = async (product) => {
        await productos.save(product);
        const all = await productos.getAll();
        res.json(all[all.length-1])
    };

    try {
        saveProducts(product);
    } catch (error) {
        res.json({
            "Ocurrió un error": error
        });
    }
});

router.put('/modify/:id', (req, res) => {
    const product = {
        title: req.body.title,
        price: req.body.price,
        thumbnail: req.body.thumbnail,
        id: parseInt(req.params.id)
    }

    const modifyProduct = async (product) => {
        const prodAnterior = await productos.getById(product.id);
        if (prodAnterior) {
            await productos.modify(product);
            const prodFinal = await productos.getById(product.id);
            res.json({
                "Producto anterior": prodAnterior,
                "Producto final": prodFinal
            });
        } else {
            res.json(`El producto con id: ${id} no existe`)
        };
    };

    try {
        modifyProduct(product)
    } catch (error) {
        res.json({
            "Ocurrió un error": error
        });
    };
});

router.delete('/:id', (req, res) => {
    const id = parseInt(req.params.id);

    const deleteProduct = async (id) => {
        await productos.deleteById(id);
        res.json(`El producto con id: ${id} fue eliminado correctamente`);
    };

    try {
        deleteProduct(id);
    } catch (error) {
        res.json({
            "Ocurrió un error": error
        });
    }
})


router.get('/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const showProductById = async (id) => {
        const product = await productos.getById(id);

        if (product) {
            res.json(product);
        } else {
            res.json({
                "Error": `producto con id ${id} no encontrado`
            });
        };
    };

    try {
        showProductById(id)
    } catch (error) {
        res.json({
            "Ocurrió un error": error
        });
    };
});


module.exports = router;