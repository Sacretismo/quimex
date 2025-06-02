const express = require('express');
const router = express.Router();
const productoController = require("../controller/productosController");

// Ruta principal (home)
router.get("/", productoController.list);

// Ruta contacto
router.get("/contacto", (req, res) => {
  res.render("contacto");
});

//Ruta Nosotros
router.get("/nosotros", (req, res) => {
  res.render("nosotros");
});

module.exports = router;
