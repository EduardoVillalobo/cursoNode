const express = require('express');
const { body } = require('express-validator/check');

const router = express.Router()

const proyectosController = require('../controllers/proyectoController')
const tareasController = require('../controllers/tareasController')
const usuariosController = require('../controllers/usuariosController')
const authController = require('../controllers/authController')

module.exports = function() {

    //Ruta para el home
    router.get('/', 
        authController.usuarioAutenticado,
        proyectosController.proyectosHome)
    
    //Rutas para proyectos
    router.get('/nuevo-proyecto', 
        authController.usuarioAutenticado,
        proyectosController.formularioProyecto)
    router.post('/nuevo-proyecto',
        body('nombre').not().isEmpty().trim().escape(),
        proyectosController.nuevoProyecto)
    router.get('/proyecto/:url', 
        authController.usuarioAutenticado,
        proyectosController.proyectoporURL)
    router.get('/proyecto/editar/:id', 
        authController.usuarioAutenticado,
        proyectosController.formularioEditar)
    router.post('/nuevo-proyecto/:id',
        authController.usuarioAutenticado,
        body('nombre').not().isEmpty().trim().escape(),
        proyectosController.actualizarProyecto)
    router.delete('/proyectos/:url', 
        authController.usuarioAutenticado,
        proyectosController.eliminarProyecto)


    //Rutas para tareas
    router.post('/proyectos/:url', 
        authController.usuarioAutenticado,
        tareasController.agregarTarea)
    router.patch('/tareas/:id', 
        authController.usuarioAutenticado,
        tareasController.cambiarEstadoTarea)
    router.delete('/tareas/:id', 
        authController.usuarioAutenticado,
        tareasController.eliminarTarea)

    //Rutas para usuarios
    router.get('/crear-cuenta', usuariosController.formCrearCuenta)
    router.post('/crear-cuenta', usuariosController.crearCuenta)
    //Inciar Sesion
    router.get('/iniciar-sesion', usuariosController.formIniciarSesion)
    //Autenticar usuario
    router.post('/iniciar-sesion', authController.autenticarUsuario)
    router.get('/cerrar-sesion', authController.cerrarSesion)

    return router
}