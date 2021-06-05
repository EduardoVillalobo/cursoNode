const express = require('express')
const routes = require('./routes')
const path = require('path')
const bodyParser = require('body-parser')
const expressValidator = require('express-validator')

//Helpers
const helpers = require('./helpers')

//Conectarse a la base de datos
const db = require('./config/db')

//Importar el modelo para crear las tablas si no existen
require('./models/Proyectos')
require('./models/Tareas')

db.sync()
    .then(() => console.log('Conectado a la base de datos'))
    .catch(error => console.log(error))

//Crear la app de express
const app = express()

//Uso express validator en toda la aplicacion
app.use(expressValidator())

//archivos estaticos
app.use(express.static('public'))

//habilitar pug
app.set('view engine', 'pug')

//añadir carpetas de las vistas
app.set('views', path.join(__dirname, './views'))

//vardump
app.use((req, res, next) => {
    res.locals.vardump = helpers.vardump;
    next()
})

//habilitar el bodyparser
app.use(bodyParser.urlencoded({
    extended: true
}))

app.use('/', routes())

app.listen(5000)