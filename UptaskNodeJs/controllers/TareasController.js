const Proyectos = require('../models/Proyectos')
const Tareas = require('../models/Tareas')

exports.agregarTarea = async(req, res, next) => {
    const proyecto = await Proyectos.findOne({
        where: {
            url: req.params.url
        }
    })

    const { tarea } = req.body
    const estado = 0
    const proyectoId = proyecto.id

    const resultado = await Tareas.create({ tarea, estado, proyectoId })

    if (!resultado) {
        return next()
    }

    res.redirect(`/proyecto/${req.params.url}`)

}

exports.cambiarEstadoTarea = async(req, res, next) => {
    const { id } = req.params

    const tarea = await Tareas.findOne({
        where: {
            id: id
        }
    })

    //cambiar estado
    let estado = 0
    if (tarea.estado === estado) {
        estado = 1
    }

    tarea.estado = estado

    const resultado = await tarea.save()

    if (!resultado) return next()

    res.status(200).send('Cambió el estado de la tarea')
}

exports.eliminarTarea = async(req, res, next) => {

    const { id } = req.params

    const resultado = await Tareas.destroy({
        where: {
            id
        }
    })

    //Si no puede elminarlo
    if (!resultado) return next()

    res.status(200).send('Tarea Eliminada!')
}