const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const routerProducto = require('./routes/productoRouter');
const mainRouter = require('./routes/mainRouter');
// const multer = require('multer');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(methodOverride('_method'));
app.use(express.static("public"));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use('/', routerProducto);
app.use('/', mainRouter);
app.listen(3000, () =>{
    console.log('Server is running en port 3000')
});