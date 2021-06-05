const express = require('express');
const { body } = require('express-validator/check');

const router = express.Router()

const proyectosController = require('../controllers/proyectoController')
const tareasController = require('../controllers/tareasController')

module.exports = function() {

    //Ruta para el home
    router.get('/', proyectosController.proyectosHome)
    router.get('/nuevo-proyecto', proyectosController.formularioProyecto)
    router.post('/nuevo-proyecto',
        body('nombre').not().isEmpty().trim().escape(),
        proyectosController.nuevoProyecto
    )

    router.get('/proyecto/:url', proyectosController.proyectoporURL)
    router.get('/proyecto/editar/:id', proyectosController.formularioEditar)
    router.post('/nuevo-proyecto/:id',
        body('nombre').not().isEmpty().trim().escape(),
        proyectosController.actualizarProyecto
    )

    router.delete('/proyectos/:url', proyectosController.eliminarProyecto)


    //Router para tareas
    router.post('/proyectos/:url', tareasController.agregarTarea)
    router.patch('/tareas/:id', tareasController.cambiarEstadoTarea)

    return router
}