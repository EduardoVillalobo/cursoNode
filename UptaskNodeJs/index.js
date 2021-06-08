const express = require('express')
const routes = require('./routes')
const path = require('path')
const bodyParser = require('body-parser')
const expressValidator = require('express-validator')
const flash = require('connect-flash')
const session = require('express-session')
const cookie = require('cookie-parser')
const passport = require('./config/passport')

//Helpers
const helpers = require('./helpers')

//Conectarse a la base de datos
const db = require('./config/db')

//Importar el modelo para crear las tablas si no existen
require('./models/Proyectos')
require('./models/Tareas')
require('./models/Usuarios')

db.sync()
    .then(() => console.log('Conectado a la base de datos'))
    .catch(error => console.log(error))

//Crear la app de express
const app = express()

//habilitar el bodyparser
app.use(bodyParser.urlencoded({
    extended: true
}))

//Uso express validator en toda la aplicacion
app.use(expressValidator())

//archivos estaticos
app.use(express.static('public'))

//habilitar pug
app.set('view engine', 'pug')

//añadir carpetas de las vistas
app.set('views', path.join(__dirname, './views'))

app.use(flash())

app.use(cookie())

app.use(session({
    secret: 'secreto',
    resave: false,
    saveUninitialized: false
}))

app.use(passport.initialize())
app.use(passport.session())

//vardump
app.use((req, res, next) => {
    res.locals.vardump = helpers.vardump;
    res.locals.mensajes = req.flash();
    next()
})



app.use('/', routes())

app.listen(5000)