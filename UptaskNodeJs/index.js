const express = require('express')
const routes = require('./routes')
const path = require('path')
const bodyParser = require('body-parser')

//Crear la app de express
const app = express()

//archivos estaticos
app.use(express.static('public'))

//habilitar pug
app.set('view engine', 'pug')

//añadir carpetas de las vistas
app.set('views', path.join(__dirname, './views'))

//habilitar el bodyparser
app.use(bodyParser.urlencoded({
    extended: true
}))

app.use('/', routes())

app.listen(5000)