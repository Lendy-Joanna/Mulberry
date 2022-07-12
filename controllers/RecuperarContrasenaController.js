const { validationResult } = require('express-validator');
const async = require('async');
const crypto = require('crypto');
const bcrypt = require('bcrypt');
//Configuraciones para el envío de correo
const nodemailer = require('nodemailer');
const { google } = require('googleapis');
const config = require('../config.js');
const OAuth2 = google.auth.OAuth2;
const OAuth2_client = new OAuth2(config.clientId, config.clientSecret);
OAuth2_client.setCredentials( { refresh_token : config.refreshToken});
//Extras
const { NotExtended } = require('http-errors');
const titles = require('../config/titles');
const Usuario = require('../models/UsuarioModel');

function hashPassword(password) {
    return bcrypt.hashSync(password, 10);
}

const usuarioController = {};

usuarioController.recuperarContrasenia = function desplegarVista(req, res) {
    res.render('../views/usuario/recuperarContrasenia', { title: titles.view.recuperarContrasenia });
};

usuarioController.recuperarContraseniaToken = (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        const errorsMsg = errors.mapped();
        const inputData = req.body;
        res.render('../views/usuario/recuperarContrasenia', {
            errors: errorsMsg,
            inputData,
            title: titles.view.recuperarContrasenia,
        });
    } else {
        async.waterfall([
            function crearCodigo(done) {
                crypto.randomBytes(3, (err, buf) => {
                    let token = buf.toString('hex');
                    token = parseInt(token, 16);
                    done(err, token);
                });
            },
            function buscaUsuario(token, done) {
                Usuario.findOne({ email: req.body.email }).then((user) => {
                    const usuario = user;
                    // console.log(usuario);
                    if (!usuario) {
                        req.flash('error', 'El correo no esta registrado!!');
                        // console.log('uno');
                        return res.render('../views/usuario/recuperarContrasenia', { title: titles.view.recuperarContrasenia, mensaje: titles.mensajes.correoNoRegistrado });
                    }
                    usuario.resetPasswordToken = token;
                    usuario.resetPasswordExperies = Date.now() + 3600000; // 3 hour
                    usuario.save((err) => {
                        done(err, token, usuario);
                    });
                    return false;
                });
            },
            async (token, usuario) => {
                const accessToken = OAuth2_client.getAccessToken();
                const transporter = nodemailer.createTransport({
                    host: 'smtp.gmail.com',
                    port: 465,
                    secure: true,
                    auth: {
                        type: "OAuth2",
                        user: config.user,
                        clientId: config.clientId,
                        clientSecret: config.clientSecret,
                        refreshToken: config.refreshToken,
                        accessToken: accessToken,
                    },
                    tls: {
                        // do not fail on invalid certs
                        rejectUnauthorized: false
                     }
                });

                await transporter.sendMail({
                    from: `Mulberry <${config.user}>`,
                    to: req.body.email,
                    subject: 'Recuperacion de Contraseña ✔',
                    text: '',
                    html: `${'<head>'
                        + '<title>Restablece tu contraseña</title>'
                        + '</head>'
                        + '<body>'
                        + '<h1>Hemos recibido una petición para restablecer la contraseña de tu cuenta.</h1>'
                        + '<p>Si hiciste esta petición, usa el siguiente codigo, si no hiciste esta petición puedes ignorar este correo.</p>'
                        + '<p>'
                        + '<h3>Código de recuperación:</h3><br>'
                        + '<strong style="font-size:200%; border:solid">'}${token}</strong>`
                        + '</p>'
                        + '</body>',
                });
                // console.log('Message sent: %s', info.messageId);
                // var e = req.body.email;
                return res.render('../views/usuario/recuperarContraseniaToken',
                    {
                        title: titles.view.recuperarContrasenia,
                        mensaje: titles.mensajes.correoEnviado,
                        us: usuario,
                        email: usuario.email,
                        nombre: usuario.appPaterno,
                    });
            },

        ]);
    }
};

usuarioController.recuperarContraseniaCambiar = function cambiarContrasenaFinal(req, res) {
    const errors = validationResult(req);
    const inputData = req.body;
    if (!errors.isEmpty()) {
        const errorsMsg = errors.mapped();
        // const inputData = matchedData(req);
        res.render('../views/usuario/recuperarContraseniaToken', {
            errors: errorsMsg,
            inputData,
            title: titles.view.recuperarContrasenia,
        });
    } else {
        async.waterfall([
            function cambiarContrasena(done) {
                Usuario.findOne(
                    {
                        resetPasswordToken: req.body.token,
                        resetPasswordExperies: { $gt: Date.now() },
                    },
                ).then((user) => {
                    const usuario = user;
                    // console.log(req.body.token);
                    // console.log(usuario);
                    if (!usuario) {
                        req.flash('error', 'EL token de reseteo ya expiró');
                        return res.render('../views/usuario/recuperarContraseniaToken', {
                            title: titles.view.recuperarContrasenia,
                            mensaje: titles.mensajes.codigoNoValido,
                            inputData,
                        });
                    }
                    const hashedPassword = hashPassword(req.body.password);
                    usuario.contrasena = hashedPassword;
                    usuario.resetPasswordToken = undefined;
                    usuario.resetPasswordExperies = undefined;

                    usuario.save((err) => {
                        done(err, usuario);
                    });
                    return res.render('../views/home', {
                        mensaje: 'Se cambio contraseña',
                    });
                });
            },
        ], (err) => {
            if (err) return NotExtended(err);
            return res.render('../views/usuario/recuperarContraseniaToken', { mensaje: 'error con la contraseña' });
        });
    }
};

module.exports = usuarioController;
