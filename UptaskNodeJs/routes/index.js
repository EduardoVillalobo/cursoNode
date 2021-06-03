const express = require('express');
const {body} = require('express-validator/check');

const router = express.Router()

const proyectosController = require('../controllers/proyectoController')

module.exports = function() {

    //Ruta para el home
    router.get('/', proyectosController.proyectosHome)
    router.get('/nuevo-proyecto', proyectosController.formularioProyecto)
    router.post('/nuevo-proyecto', 
            body('nombre').not().isEmpty().trim().escape(),
            proyectosController.nuevoProyecto
    )

    router.get('/proyecto/:url', proyectosController.proyectoporURL)

    return router
}