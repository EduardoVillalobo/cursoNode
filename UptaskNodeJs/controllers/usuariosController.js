const Usuarios = require('../models/Usuarios')
const enviarEmail = require('../handlers/email')

exports.formCrearCuenta = (req, res) => {
    res.render('crearCuenta', {
        nombrePagina: 'Crear cuenta en Uptask'
    })
}

exports.formIniciarSesion = (req, res) => {
    const { error } = res.locals.mensajes
    res.render('iniciarSesion', {
        nombrePagina: 'Iniciar Sesion en Uptask',
        error
    })
}

exports.crearCuenta = async(req, res) => {
    const { email, password } = req.body

    try {
        await Usuarios.create({
            email,
            password
        });
        //Crear un url para confirmar
        const confirmarUrl = `http://${req.headers.host}/confirmar/${email}`

        //Crear el objeto de usuario
        const usuario = {
            email
        }

        //enviar el email
        await enviarEmail.enviar({
            usuario,
            subject: 'Confirma tu cuenta en UpTask',
            confirmarUrl,
            archivo: 'confirmar-cuenta'
        });

        //redirigir
        req.flash('correcto', 'Enviamos un correo para confirmar tu cuenta')
        res.redirect('/iniciar-sesion')
    } catch (error) {
        req.flash('error', error.errors.map(error => error.message))
        res.render('crearCuenta', {
            mensajes: req.flash(),
            nombrePagina: 'Crear cuenta en Uptask',
            email,
            password
        })
    }

}

exports.formReestablecerPassword = (req, res) => {
    res.render('reestablecer', {
        nombrePagina: 'Reestablecer tu Contraseña'
    })
}

exports.confirmarCuenta = async(req, res) => {

    const { correo } = req.params

    const usuario = await Usuarios.findOne({
        where: {
            email: correo
        }
    })

    if (!usuario) {
        req.flash('error', 'Usuario no valido')
        res.redirect('/crear-cuenta')
    }

    usuario.activo = 1
    await usuario.save()

    req.flash('correcto', 'Cuenta activada correctamente')
    res.redirect('/iniciar-sesion')

}