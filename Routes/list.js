var express = require("express");



var app = express();


/* Definiendo body-parser*/
var bodyParser = require('body-parser');
app.use(bodyParser.json()); // body en formato json
app.use(bodyParser.urlencoded({ extended: false })); //body formulario    



// Importar Schema de List
var List = require("../models/list");


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

        res.status(200).json({
            ok: true,
            resultado: lista,
            mensaje: 'Operacion realizada con exito'
        })


    });


});

//===========================================
//        Crear una nueva lista
//===========================================
app.post('/', (req, res) => {
        var termino = req.body.termino;

        var newList = new List({
            termino: termino,
            complete: false
        })


        newList.save((error, newTermino) => {
            if (error) {
                res.status(400).json({
                    ok: false,
                    error: 'Error al cargar tarea'
                });
            }
            res.status(200).json({
                ok: true,
                lista: newTermino,
                mensaje: 'Agregado correctamente'
            });
        });


    })
    //===========================================
    //        Actualizar lista
    //===========================================
app.put('/:id', (req, res) => {

    var id = req.params.id;



    List.findById(id, (err, lista) => {


        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: 'Error al buscar usuario  ' + id,
                errors: err
            });
        }

        if (!lista) {
            return res.status(400).json({
                ok: false,
                mensaje: 'El usuario con el id ' + id + ' no existe',
                errors: { message: 'No existe un usuario con ese ID' }
            });
        }


        lista.termino = req.body.termino;
        lista.complete = req.body.complete;


        lista.save((err, listaUpdate) => {

            if (err) {
                return res.status(400).json({
                    ok: false,
                    mensaje: 'Error al actualizar Lista',
                    list: req.body,
                    errors: err
                });
            }

            return res.status(200).json({
                ok: true,
                usuario: listaUpdate

            });

        });



    });

    app.delete('/:id', (req, res) => {

        var id = req.params.id;

        Usuarios.findByIdAndRemove(id, (err, listaBorrada) => {

            if (err) {
                return res.status(500).json({
                    ok: false,
                    mensaje: 'Error al borrar lista',
                    errors: err
                });
            }

            if (!listaBorrada) {
                return res.status(400).json({
                    ok: false,
                    mensaje: 'No existe una lista con ese id'
                });
            }

            res.status(200).json({
                ok: true,
                lista: listaBorrada
            });

        });


    });




});
module.exports = app;