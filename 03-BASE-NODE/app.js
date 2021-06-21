const {crearArchivo} = require('./helpers/multiplicar');
const argv = require('./config/yargs');
require('colors');

console.clear();

console.log('base>yargs', argv.base);
const base = argv.base;
const list = argv.list;
const hasta = argv.hasta;

crearArchivo(base, list, hasta)
    .then( nombreArchivo => console.log(nombreArchivo.rainbow, 'creado'))
    .catch( err => console.log(err));