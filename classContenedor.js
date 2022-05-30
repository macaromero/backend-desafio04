const fs = require('fs');

// Clase Contenedor
class Contenedor {

    static encoding = 'utf-8';
    static ruta = './productos.json';

    constructor(product, products) {
        this.id = 0;
        this.product = product;
        this.products = products;
    };

    async save (producto) {
        try {
            const all = await this.getAll();
            let idAnterior = 0;

            all.map(p => {
                return idAnterior = p.id;
            });

            producto.id = idAnterior + 1;
            idAnterior ++;
            all.push(producto)
                
            await fs.promises.writeFile(Contenedor.ruta, JSON.stringify(all, null, 2));
        } catch (error) {
            console.log("Ocurrió un error, volvé a intentarlo");
            console.log(error);
        };
    };

    async getById(id) {
        try {
            const all = await this.getAll();
            this.product = all.find(p => {
                return p.id === id
            });
            return this.product;
        } catch (error) {
            console.log("Ocurrió un error, volvé a intentarlo");
            console.log(error);
        };
    };

    async getAll() {
        try {
            const prod = await fs.promises.readFile(Contenedor.ruta, Contenedor.encoding);
            this.products = [];
            if (prod != "") {
                return this.products = JSON.parse(prod);
            };
            return this.products;
        } catch (error) {
            console.log("Ocurrió un error, volvé a intentarlo");
            console.log(error);
        };
    };

    async modify(obj) {
        try {
            const all = await this.getAll();
            const modify = all.map(p => {
                if (p.id === obj.id) {
                    return p = obj
                }
                return p
            });
            await fs.promises.writeFile(Contenedor.ruta, JSON.stringify(modify, null, 2));
        } catch (error) {
            console.log("Ocurrió un error, volvé a intentarlo");
            console.log(error);
        }
    }

    async deleteById(id) {
        try {
            const all = await this.getAll();
            const del = all.filter(p => {
                return p.id != id;
            });
            await fs.promises.writeFile(Contenedor.ruta, JSON.stringify(del, null, 2));
            console.log(`El producto con id ${id} se borró correctamente`);
        } catch (error) {
            console.log("Ocurrió un error, volvé a intentarlo");
            console.log(error);
        };
    };

    async deleteAll() {
        try {
            const all = await this.getAll();
            await fs.promises.writeFile(Contenedor.ruta, "");
            console.log("Todos los productos fueron eliminados");
        } catch (error) {
            console.log("Ocurrió un error, volvé a intentarlo");
            console.log(error);
        };
    };
};

module.exports = Contenedor;