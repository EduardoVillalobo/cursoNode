const fs = require('fs');
const colors = require('colors');

const crearArchivo = async ( base = 5, list = false, hasta = 10 ) => {
    try {

        let salida = '';
        let consola = '';
        for (let i = 0; i <= hasta; i++) {
            //console.log(`${base } x ${ i } = ${base*i}`)
            consola += `${base } ${'x'.green} ${ i } ${'='.green} ${base*i}\n`;
            salida += `${base } x ${ i } = ${base*i}\n`;
        }

        if(list){
            console.log('====================='.green);
            console.log('     Tabla del '.green, colors.blue(base));
            console.log('====================='.green);
            console.log(consola);
        }
        
        fs.writeFileSync(`./salida/tabla-${base}.txt`, salida);

        return `tabla-${base}.txt`;
    } catch (error) {
        throw error
    }
    
}

module.exports = {
   crearArchivo
}