const passport = require('passport')
const Usuarios = require('../models/Usuarios')
const Sequelize = require('sequelize')
const Op = Sequelize.Op
const crypto = require('crypto')
const bcrypt = require('bcrypt-nodejs')
const enviarEmail = require('../handlers/email')

exports.autenticarUsuario = passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/iniciar-sesion',
    failureFlash: true,
    badRequestMessage: 'Ambos campos son obligatorios'
})

exports.usuarioAutenticado = (req, res, next) => {

    if (req.isAuthenticated()) {
        return next()
    }

    return res.redirect('/iniciar-sesion')
}

exports.cerrarSesion = (req, res) => {
    req.session.destroy(() => {
        res.redirect('/iniciar-sesion')
    })
}

//Genera un token si el usuario es valido
exports.enviarToken = async(req, res) => {
    const { email } = req.body
    const usuario = await Usuarios.findOne({
        where: {
            email
        }
    })

    if (!usuario) {
        req.flash('error', 'No existe ese usuario')
        res.redirect('/reestablecer')

    }

    usuario.token = crypto.randomBytes(20).toString('hex')
    usuario.expiracion = Date.now() + 3600000

    await usuario.save()

    const resetUrl = `http://${req.headers.host}/reestablecer/${usuario.token}`

    //Enviar el correo con el token
    await enviarEmail.enviar({
        usuario,
        subject: 'Password Reset',
        resetUrl,
        archivo: 'reestablecer-password'
    })

    req.flash('correcto', 'Se envio un mensaje a tu correo')
    res.redirect('iniciar-sesion')

}

exports.validarToken = async(req, res) => {
    const { token } = req.params
    const usuario = await Usuarios.findOne({
        where: {
            token
        }
    })
    if (!usuario) {
        req.flash('error', 'No valido')
        res.redirect('/reestablecer')
    }

    res.render('resetPassword', {
        nombrePagina: 'Reestablecer la contraseña'
    })
}

exports.actualizarPassword = async(req, res) => {
    const { token } = req.params
    const { password } = req.body
    const usuario = await Usuarios.findOne({
        where: {
            token,
            expiracion: {
                [Op.gte]: Date.now()
            }
        }
    })

    if (!usuario) {
        req.flash('error', 'No valido')
        res.redirect('/reestablecer')
    }

    usuario.password = bcrypt.hashSync(password, bcrypt.genSaltSync(10))
    usuario.token = null
    usuario.expiracion = null

    await usuario.save()

    req.flash('correcto', 'Tu contraseña fue modificada con exito')
    res.redirect('/iniciar-sesion')


}