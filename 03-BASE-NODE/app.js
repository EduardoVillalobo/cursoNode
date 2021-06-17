const fs = require('fs')
console.clear();
console.log('=====================');
console.log('    Tabla del 5');
console.log('=====================');

const base = 3;
let salida = '';
for (let i = 0; i <= 10; i++) {
    //console.log(`${base } x ${ i } = ${base*i}`)
    salida += `${base } x ${ i } = ${base*i}\n`;
}

console.log(salida);

fs.writeFile(`tabla-${base}.txt`, salida, (error)=>{
    if(error) throw error;

    console.log(`Archivo de la tabla del ${base} creada`)
} )