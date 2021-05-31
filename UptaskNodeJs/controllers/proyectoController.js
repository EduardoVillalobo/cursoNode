const { response } = require("express")

exports.proyectosHome = (request, response) => {
    response.render("index", {
        nombrePagina: 'Proyectos'
    })
}

exports.formularioProyecto = (req, res) => {
    res.render("nuevoProyecto", {
        nombrePagina: 'Nuevo Proyecto'
    })
}

exports.nuevoProyecto = (req, res) => {
    /* console.log(req.body) */

    //Valir el input
    const { nombre } = req.body
    let errores = [];

    if (!nombre) {
        errores.push({ 'texto': 'Agregar nombre al proyecto' })
    }

    //Si hay errores
    if (errores.length > 0) {
        res.render('nuevoProyecto', {
            nombrePagina: 'Nuevo Proyecto',
            errores
        })
    } else {
        //Insertar en la BD
    }
}