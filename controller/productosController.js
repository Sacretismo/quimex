const fs = require('fs');
const path = require('path');

const productosFilePath = path.join(__dirname, '../data/productos.json');
const productos = JSON.parse(fs.readFileSync(productosFilePath, 'utf-8'));

const productosController = {
    list: (req, res) =>{
        res.render('home', {productos})
    },

    create: (req, res) =>{
        res.render('productos/creacionProd');
    },
    stock:(req, res) =>{
       const {marca, modelo, precio} = req.body;
       const imagen = req.file ? req.file.filename : null;
       const nuevoProduct = {
        id: productos.length + 1,
        marca,
        modelo,
        precio,
        imagen
       };

       try{
        productos.push(nuevoProduct);
        fs.writeFileSync(productosFilePath, JSON.stringify(productos, null, " "));
        res.redirect("/")
       }
       catch(err){
        console.log("Error al guardar el producto")
        console.error(err)
        res.status(500).send("Error de servidor")
       }
    },


    edit: (req, res) =>{
        const id = req.params.id;
        const producto = productos.find(prod => prod.id == id)
        res.render('productos/editarProd', {producto})
    },

    update: (req, res) =>{
          const id = req.params.id;
          const {marca, modelo, precio} = req.body;
        const imagen = req.file ? req.file.filename : null;

        const productoIndex = productos.findIndex(prod => prod.id == id);
        if(productoIndex !== -1){
            productos[productoIndex] = {id: Number(id), marca, modelo, precio, imagen};
            try{
                 fs.writeFileSync(productosFilePath, JSON.stringify(productos, null, " "));
                res.redirect("/")
            }
            catch(err){
            console.log("Error al editar el producto")
            console.error(err)
            res.status(500).send("Error de servidor")
            }
        } else{
            res.status(400).send("Producto no encontrado")
        }
    },


    // ----------------------------------- Realizar delete ------------------------
    delete: (req, res) => {
        const id = req.params.id;
        const producto = productos.find(prod => prod.id == id);
        res.render('productos/eliminarProd', { producto });
    },

    destroy: (req, res) => {
        const id = req.params.id;
        const productoIndex = productos.findIndex(prod => prod.id == id);
        if (productoIndex !== -1) {
            productos.splice(productoIndex, 1);
            try {
                fs.writeFileSync(productosFilePath, JSON.stringify(productos, null, " "));
                res.redirect("/");
            } catch (err) {
                console.log("Error al eliminar el producto");
                console.error(err);
                res.status(500).send("Error al eliminar el producto");
            }
        } else {
            res.status(404).send("Producto no encontrado");
        }
    }
}

module.exports = productosController;