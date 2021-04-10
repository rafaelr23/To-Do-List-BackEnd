var express = require("express");



var app = express();


/* Definiendo body-parser*/
var bodyParser = require('body-parser');
app.use(bodyParser.json()); // body en formato json
app.use(bodyParser.urlencoded({ extended: false })); //body formulario    


// Importar Schema de List
var List = require("../models/list");
var lst = [];

//===========================================
//        Obtener toda la lista
//===========================================
app.set('view engine', 'ejs');

app.get("/", (req, res, next) => {


    List.find({}).populate('list', 'termino').exec((error, lista) => {
        if (error) {
            res.status(500).json({
                ok: false,
                mensaje: "Error en la consulta de lista",
                error: error
            });

        }
        List.count({}, (error, conteo) => {

            lst = lista;

            res.render('index.ejs', { todo: lst });
        });

    });


});

//===========================================
//        Crear una nueva lista
//===========================================
app.post('/', (req, res) => {
    var termino = req.body.termino;

    var newList = new List({
        termino: termino
    })
    if (termino != "") {

        newList.save((error, newTermino) => {
            if (error) {
                res.status(400).json({
                    ok: false,
                    error: 'Error al cargar tarea'
                });
            }
        });
    }
    List.find({}).populate('list', 'termino').exec((error, lista) => {
        List.count({}, (error, conteo) => {
            lst = lista;
            res.redirect('/');
        });
    });

})


module.exports = app;