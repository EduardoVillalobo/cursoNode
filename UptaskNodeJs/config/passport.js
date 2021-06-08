const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy

const Usuarios = require('../models/Usuarios')
const bcrypt = require('bcrypt-nodejs')

passport.use(
    new LocalStrategy(
        {
            usernameField: 'email',
            passwordField: 'password'
        },
        async (email, password, done) => {
            
            try {
                //Buscar usuario
                const usuario = await Usuarios.findOne({
                    where:{
                        email:email
                    }
                })
                //El password es incorrecto
                if(!usuario.verificarPassword(password)){
                    return done(null, false, {
                        message: 'El password es incorrecto'
                    })
                }
                //El password y el usuario están bien
                return done(null, usuario)
            } catch (error) {
                return done(null, false, {
                    message: 'Esa cuenta no existe'
                })
            }
        }
    )
)

passport.serializeUser((usuario, callback) =>{
    callback(null, usuario)
})

passport.deserializeUser((usuario, callback) =>{
    callback(null, usuario)
})

module.exports = passport