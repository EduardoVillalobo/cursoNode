const { response } = require("express")
const Proyecto = require('../models/Proyectos')
const Tareas = require('../models/Tareas')


exports.proyectosHome = async(req, res) => {

    const usuarioId = res.locals.usuario.id

    const proyectos = await Proyecto.findAll({
        where: {
            usuarioId
        }
    })

    res.render("index", {
        nombrePagina: 'Proyectos',
        proyectos
    })
}

exports.formularioProyecto = async(req, res) => {
    const usuarioId = res.locals.usuario.id
    const proyectos = await Proyecto.findAll({
        where: {
            usuarioId
        }
    })
    res.render("nuevoProyecto", {
        nombrePagina: 'Nuevo Proyecto',
        proyectos
    })
}

exports.nuevoProyecto = async(req, res) => {
    const usuarioId = res.locals.usuario.id
    const proyectos = await Proyecto.findAll({
            where: {
                usuarioId
            }
        })
        //Valir el input con deconstruction
    const { nombre } = req.body
    let errores = [];

    if (!nombre) {
        errores.push({ 'texto': 'Agregar nombre al proyecto' })
    }

    //Si hay errores
    if (errores.length > 0) {
        res.render('nuevoProyecto', {
            nombrePagina: 'Nuevo Proyecto',
            errores,
            proyectos
        })
    } else {
        //Insertar en la BD
        const usuarioId = res.locals.usuario.id
        await Proyecto.create({ nombre, usuarioId })
        res.redirect('/')
    }
}

exports.proyectoporURL = async(req, res, next) => {
    const usuarioId = res.locals.usuario.id
    const proyectospromise = Proyecto.findAll({
        where: {
            usuarioId
        }
    })

    const proyectopromise = Proyecto.findOne({
        where: {
            url: req.params.url,
            usuarioId
        }
    })

    const [proyectos, proyecto] = await Promise.all([proyectospromise, proyectopromise])

    //Consultar tareas del proyecto
    const tareas = await Tareas.findAll({
        where: {
            proyectoId: proyecto.id
        }
        /* ,
                include: [{
                    model: Proyecto
                }] */
    })

    if (!proyecto) return next()

    res.render("tareas", {
        nombrePagina: "Tareas del proyecto",
        proyecto,
        proyectos,
        tareas
    })

}

exports.formularioEditar = async(req, res, next) => {
    const usuarioId = res.locals.usuario.id
    const proyectospromise = Proyecto.findAll({
        where: {
            usuarioId
        }
    })

    const proyectopromise = Proyecto.findOne({
        where: {
            id: req.params.id,
            usuarioId
        }
    })

    const [proyectos, proyecto] = await Promise.all([proyectospromise, proyectopromise])

    res.render('nuevoProyecto', {
        nombrePagina: 'Editar Proyecto',
        proyectos,
        proyecto
    })
}

exports.actualizarProyecto = async(req, res) => {
    const usuarioId = res.locals.usuario.id
    const proyectos = await Proyecto.findAll({
            where: {
                usuarioId
            }
        })
        //Valir el input con deconstruction
    const { nombre } = req.body
    let errores = [];

    if (!nombre) {
        errores.push({ 'texto': 'Agregar nombre al proyecto' })
    }

    //Si hay errores
    if (errores.length > 0) {
        res.render('nuevoProyecto', {
            nombrePagina: 'Nuevo Proyecto',
            errores,
            proyectos
        })
    } else {
        //Insertar en la BD
        await Proyecto.update({
            nombre: nombre
        }, {
            where: {
                id: req.params.id
            }
        })
        res.redirect('/')
    }
}

exports.eliminarProyecto = async(req, res, next) => {
    console.log(req.query)
    const { urlProyecto } = req.query

    const resultado = await Proyecto.destroy({
        where: {
            url: urlProyecto
        }
    })

    res.status(200).send('Proyecto eliminado correctamente')
}