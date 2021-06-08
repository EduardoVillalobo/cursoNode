const Sequelize = require('sequelize')

const db = require('../config/db')
const Proyectos = require('../models/Proyectos')
const bcrypt = require('bcrypt-nodejs')

const Usuarios = db.define('usuarios', {
    id:{
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    email:{
        type: Sequelize.STRING(60),
        allowNull: false,
        validate:{
            isEmail:{
                msg:'Agregar un email valido'
            },
            notEmpty:{
                msg: 'El password no puede estar vacio'
            }
        },
        unique:{
            args: true,
            msg: 'El usuario ya está registrado'
        }
    },
    password:{
        type: Sequelize.STRING(60),
        allowNull: false,
        validate:{
            notEmpty:{
                msg: 'El password no puede estar vacio'
            }
        },

    }
},{
    hooks:{
        beforeCreate(usuario){
            usuario.password = bcrypt.hashSync(usuario.password, bcrypt.genSaltSync(10))
        }
    }
})

Usuarios.prototype.verificarPassword = function(password){
    return bcrypt.compareSync(password, this.password)
}

//Usuarios.hasMany(Proyectos)

module.exports = Usuarios
