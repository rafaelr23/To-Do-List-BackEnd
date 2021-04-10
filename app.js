// Importaciones
var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var CONEXION = require('./constant/BD').CONEXION;



// inizializando express
var app = express();




//=================================
//          CORS
//=================================
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});



// Body Parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());



//Creando Rutas

var listRoutes = require("./Routes/list");

// Conexion a la base de datos
mongoose.connection.openUri(CONEXION, (error, res) => {
    if (error) throw error;
    console.log('Base de Datos: \x1b[32m%s\x1b[0m', 'online');

});

//Dominio y conexion con las rutas
app.use('/', listRoutes);


//Escuchando peticiones
app.listen(3000, () => {
    console.log('Express server puerto 3000: \x1b[32m%s\x1b[0m', 'online');
});