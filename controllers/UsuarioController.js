/* eslint-disable no-underscore-dangle */
const { validationResult, matchedData } = require('express-validator');
//Configuraciones para el envío de correo
const nodemailer = require('nodemailer');
const { google } = require('googleapis');
const config = require('../config.js');
const OAuth2 = google.auth.OAuth2;
const OAuth2_client = new OAuth2(config.clientId, config.clientSecret);
OAuth2_client.setCredentials( { refresh_token : config.refreshToken});

// Dando seguridad a la aplicación
const bcrypt = require('bcrypt');
const async = require('async');
const crypto = require('crypto');
const { constants } = require('buffer');
const UsuarioModel = require('../models/UsuarioModel');
const { roles } = require('../config/roles.js');
const utils = require('../middleware/utils');
const titles = require('../config/titles');
const moment = require('moment');
//const mujer = require('./MujerController');

function hashPassword(password) {
    return bcrypt.hashSync(password, 10);
}

function validatePassword(plainPassword, hashedPassword) {
    return bcrypt.compareSync(plainPassword, hashedPassword);
}

/**
 * UsuarioController.js
 *
 * @description :: Lógica del lado del servidor para validar el usuario.
 */
module.exports = {

    /**
     * UsuarioController.home()
     */
    home(req, res) {
        res.render('home', { title: titles.view.home });
    },

    /**
     * Controla el Ingreso al Usuario
     */
    login(req, res) {
        const errors = validationResult(req);

        // Verifica errores de validación
        if (!errors.isEmpty()) {
            const errorsMsg = errors.mapped();
            const inputData = matchedData(req);
            console.log(`Hay errores!! en Login ${errorsMsg}`);

            // Regresa a pantalla principal con los errores
            res.render('home', {
                errors: errorsMsg,
                inputData,
                title: titles.view.home,
            });
        } else {
            const inputData = matchedData(req);
            const { email, password } = req.body;

            UsuarioModel.findOne({ email }).exec((error, user) => {
                if (error) {
                    res.render('home', {
                        title: titles.view.home,
                        errors: { errors: { msg: titles.error.errorInesperado } },
                    });
                } else if (!user) {
                    res.render('home', {
                        title: titles.view.home,
                        errors: { errors: { msg: titles.error.emailIncorrecto } },
                    });
                } else {
                    const validPassword = validatePassword(password, user.contrasena);

                    if (!validPassword) {
                        res.render('home', {
                            title: titles.view.home,
                            errors: { errors: { msg: titles.error.passwordIncorrecto } },
                        });
                        return;
                    }

                    const accessToken = utils.generateAccessToken(user);

                    UsuarioModel.findByIdAndUpdate(user._id, { accessToken });

                    if (user.role === 'mujer') {
                        console.log('Login UsuarioController');
                        req.session.usuario = user;
                        res.redirect('/welcome');
                    } else if (user.role === 'hombre') {
                        // Agrega código vista  hombre
                        req.session.usuario = user;
                        res.redirect('/hombre/tableroHombre');
                    } else if (user.role === 'admin') {
                        req.session.usuario = user;
                        res.redirect('/admin/tableroAdmin');
                    }
                }
            });
        }
    },
    indexView(req, res) {
        res.render('../views/index', { title: titles.view.index });
    },
    politicas(req, res) {
        res.render('../views/generales/politicas', { title: titles.view.politicas });
    },
    nosotros(req, res) {
        res.render('../views/generales/nosotros', { title: titles.view.nosotros });
    },
    contactoView(req, res) {
        res.render('../views/generales/contacto', { title: titles.view.contacto });
    },
    maquillajeView(req, res) {
        res.render('../views/generales/maquillaje', { title: titles.view.maquillaje });
    },
    skincareView(req, res) {
        res.render('../views/generales/skincare', { title: titles.view.skincare });
    },
    manicuraView(req, res) {
        res.render('../views/generales/manicura', { title: titles.view.manicura });
    },
    accesoriosView(req, res) {
        res.render('../views/generales/accesorios', { title: titles.view.accesorios });
    },
    comprarView(req, res) {
        res.render('../views/generales/comprar', { title: titles.view.comprar });
    },
    registroView(req, res) {
        res.render('../views/usuario/registro', { title: titles.view.home });
    },
    confirmarView(req, res) {
        res.render('../views/usuario/confirmarRegistro', { title: titles.view.home });
    },
    confirmar(req, res) {
        const errors = validationResult(req);
        const inputData = req.body;
        if (!errors.isEmpty()) {
            const errorsMsg = errors.mapped();
            res.render('../views/usuario/confirmarRegistro', {
                errors: errorsMsg,
                inputData,
                title: titles.view.confirmarRegistro,
            });
        } else {
            async.waterfall([
                function confirmar (done) {
                    var today = moment(new Date()).format('YYYY-MM-DD[T00:00:00.000Z]');
                    console.log(req.body.token);
                    var tok=req.body.token;
                    UsuarioModel.findOne(
                        {
                            token: tok,
                            tokenExpiracion: { $gte: today}
                        },
                    ).then((user) => {
                        const usuario = user;
                        console.log('usuario encontrado ',usuario);
                        if (!usuario) {
                            req.flash('error', 'EL token de activación ya expiró');
                            return res.render('../views/usuario/confirmarRegistro', {
                                title: titles.view.confirmarRegistro,
                                mensaje: titles.mensajes.codigoNoValido,
                                inputData,
                            });
                        }
                        usuario.estado = true;
                        usuario.confirmar = 'si';

                        usuario.save((err) => {
                            done(err, usuario);
                        });
                        return res.render('../views/home', {
                            mensaje: 'Se activó la cuenta',
                        });
                    });
                },
            ], (err) => {
                if (err) return NotExtended(err);
                return res.render('../views/usuario/confirmarRegistro',
                { mensaje: 'error inesperado' });
            });
        }
    },
    registro(req, res) {
        const errors = validationResult(req);

        const newUser = new UsuarioModel({
            nombre: req.body.nombre,
            appPaterno: req.body.appPaterno,
            appMaterno: req.body.appMaterno,
            edad: req.body.edad,
            rutaFoto: req.body.rutaFoto,
            email: req.body.email,
            estado: false,
            contrasena: req.body.contrasena,
            role: req.body.role,
            fechaIngreso: new Date(),
            token: '',
            resetPasswordToken: '',
            resetPasswordExperies: '',
        });

        if (!errors.isEmpty()) {
            const errorsMsg = errors.mapped();
            const inputData = req.body;
            res.render('../views/usuario/registro', {
                mensaje: errorsMsg,
                inputData,
                title: titles.view.registro,
            });
        } else {
            UsuarioModel.findOne({ email: newUser.email }).exec((err, user) => {
                if (user != null) {
                    res.render('../views/usuario/registro', { mensaje: [{msg: 'El email ya está registrado' }] });
                } else {
                    const hashedPassword = hashPassword(req.body.contrasena);
                    newUser.contrasena = hashedPassword;
                   
                    const buf = crypto.randomBytes(3);
                    newUser.token = buf.toString('hex');
                    console.log(newUser.token);

                    newUser.tokenExpiracion = Date.now() + 87000000; //24 hours
                    console.log(newUser);
                    newUser.save();
                    
                    if (newUser.role === 'mujer') {
                        async.waterfall([
                            function (done) {
                                crypto.randomBytes(3, (err, buf) => {
                                    let token = buf.toString('hex');
                                    token = parseInt(token, 16);
                                    done(err, token);
                                });
                            },
                            async function main (token, usuario, done) {
                                const accessToken = OAuth2_client.getAccessToken();

                                const transporter = nodemailer.createTransport({
                                    host: 'smtp.gmail.com',
                                    service: 'gmail',//esto se agregó
                                    port: 465,
                                    secure: true, // true for 465, false for other ports
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
                                const info = await transporter.sendMail({
                                    from: `'Mulberry${config.user}`, // sender address
                                    to: newUser.email, // list of receivers
                                    subject: 'Confirmar cuenta', // Subject line
                                    text: '', // plain text body
                                    html: `${'<head>'
                                        + '<title>Alta de cuenta </title>'
                                        + '</head>'
                                        + '<body>'
                                        + '<h2>Estás a un paso de acceder a una gran cantidad de contenido</h2>'
                                        + '<p> Por favor, ingresa el siguiente código para poder activar tu cuenta.</p>'
                                        + '<h3>Código de confirmación:</h3><br>'
                                        + '<p>'
                                        + '<strong style="font-size:200%; border:solid">'}${newUser.token}</strong>`
                                        + '</p>'
                                        + '<p class="card-text"> O bien sigue este link y por favor ingresa el código proporcionado en este correo</p>'
                                        + '<a href="http://' + req.headers.host + '/confirmarRegistro/' + token + '">Click Aqui</a>'
                                        + '</body>',
                                });

                                console.log('Message sent: %s', info.messageId);
                                res.render('../views/usuario/confirmarRegistro',
                                    {
                                        title: titles.view.confirmarRegistro,
                                        mensaje: titles.mensajes.correoEnviado,
                                        us: usuario,
                                        email: newUser.email,
                                        token: newUser.token,
                                    });
                            },
                            
                        ]);
                    }
                    if (newUser.role === 'hombre') {
                        
                        newUser.estado = true;
                        newUser.confirmar = 'si';
                        newUser.save();
                        res.render('../views/home', {
                            mensaje: 'Cuenta activada',
                        });
                    }
                }
            });
        }
    },
    grantAccess(action, resource) {
        return async (req, res, next) => {
            try {
                const permission = roles.can(req.user.role)[action](resource);
                if (!permission.granted) {
                    return res.status(401).json({
                        error: titles.error.permiso,
                    });
                }
                next();
            } catch (error) {
                next(error);
            }
        };
    },
    allowIfLoggedin(req, res, next) {
        try {
            const user = res.locals.loggedInUser;
            console.log(`Accediendo ${user}`);
            if (!user) {
                res.render('home', { title: titles.view.home, errors: titles.error.loggedInUser });
                return;
            }
            req.user = user;
            next();
        } catch (error) {
            next(error);
        }
    },
    logout(req, res) {
        req.session.destroy();
        res.render('home', { title: titles.view.home });
    },
};