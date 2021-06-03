const { response } = require("express")
const Proyecto = require('../models/Proyectos')


exports.proyectosHome = async (request, response) => {
    const proyectos = await Proyecto.findAll()
    response.render("index", {
        nombrePagina: 'Proyectos',
        proyectos
    })
}

exports.formularioProyecto = async (req, res) => {
    const proyectos = await Proyecto.findAll()
    res.render("nuevoProyecto", {
        nombrePagina: 'Nuevo Proyecto',
        proyectos
    })
}

exports.nuevoProyecto = async (req, res) => {    
    const proyectos = await Proyecto.findAll()
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
        const proyecto = await Proyecto.create({nombre})
        res.redirect('/')
    }
}

exports.proyectoporURL = async (req, res, next) => {
    const proyectos = await Proyecto.findAll()
    const proyecto = await Proyecto.findOne({
        where:{
            url: req.params.url
        }
    })

    if(!proyecto) return next()

    res.render("tareas",{
            nombrePagina: "Tareas del proyecto",
            proyecto,
            proyectos
        })

}