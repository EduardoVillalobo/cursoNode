const nodemailer = require('nodemailer')
const pug = require('pug')
const juice = require('juice')
const htmlToText = require('html-to-text')
const util = require('util')
const emailConfig = require('../config/email')

let transport = nodemailer.createTransport({
    host: emailConfig.host,
    port: emailConfig.port,
    auth: {
        user: emailConfig.user,
        pass: emailConfig.pass
    }
});

//genera el html
const generaHTML = (archivo, opciones) => {
    const HTML = pug.renderFile(`${__dirname}/../views/emails/${archivo}.pug`, opciones)
    return juice(HTML)
}

exports.enviar = async(opciones) => {
    const html = generaHTML(opciones.archivo, opciones)
    const text = htmlToText.fromString(html)
    let opcionesEmail = {
        from: "UpTask <no-reply@uptask.com>",
        to: opciones.usuario.email,
        subject: opciones.subject,
        text,
        html: generaHTML(opciones.archivo, opciones)
    }

    const enviarEmail = util.promisify(transport.sendMail, transport)
    return enviarEmail.call(transport, opcionesEmail)

}