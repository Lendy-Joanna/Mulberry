/* eslint-disable no-underscore-dangle */
const { validationResult, matchedData } = require('express-validator');
// Dando seguridad a la aplicación
const nodemailer = require('nodemailer');
const bcrypt = require('bcrypt');
const async = require('async');
const crypto = require('crypto');
const { constants } = require('buffer');
const UsuarioModel = require('../models/UsuarioModel');
const { roles } = require('../config/roles');
const utils = require('../middleware/utils');
const titles = require('../config/titles');
const moment = require('moment');
const EstudianteController = require('./EstudianteController');

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

                    if (user.role === 'estudiante') {
                        console.log('Login UsuarioController');
                        req.session.usuario = user;
                        res.redirect('/welcome');
                    } else if (user.role === 'docente') {
                        // Agrega código vista  docente
                        req.session.usuario = user;
                        res.redirect('/docente/tableroDocente');
                    } else if (user.role === 'admin') {
                        req.session.usuario = user;
                        res.redirect('/admin');
                    }
                }
            });
        }
    },


    /*
    Controlador para proyecto alternativo
    */
    indexView(req, res) {
        res.render('../views/index', { title: titles.view.home });
    },
    comprarView(req, res) {
        res.render('../views/pruebas/comprar', { title: titles.view.home });
    },
    contactoView(req, res) {
        res.render('../views/pruebas/contacto', { title: titles.view.home });
    },
    nosotrosView(req, res) {
        res.render('../views/pruebas/nosotros', { title: titles.view.home });
    },
    dulcesView(req, res) {
        res.render('../views/pruebas/dulces', { title: titles.view.home });
    },
    pinatasView(req, res) {
        res.render('../views/pruebas/piñatas', { title: titles.view.home });
    },
    globosView(req, res) {
        res.render('../views/pruebas/globos', { title: titles.view.home });
    },
    errorView(req, res) {
        res.render('../views/pruebas/error', { title: titles.view.home });
    },
    
    /*Aquí terminan sus rutas*/

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
            curp: req.body.curp,
            edad: req.body.edad,
            rutaFoto: req.body.rutaFoto,
            email: req.body.email,
            estado: false,
            contrasena: req.body.contrasena,
            nivelEducativo: req.body.nivelEducativo,
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
                    res.render('../views/usuario/registro', { mensaje: 'El email ya está registrado' });
                } else {
                    const hashedPassword = hashPassword(req.body.contrasena);
                    newUser.contrasena = hashedPassword;
                   
                    const buf = crypto.randomBytes(3);
                    newUser.token = buf.toString('hex');
                    console.log(newUser.token);

                    newUser.tokenExpiracion = Date.now() + 87000000; //24 hours
                    console.log(newUser);
                    newUser.save();
                    
                    if (newUser.role === 'estudiante') {
                        async.waterfall([
                            function (done) {
                                crypto.randomBytes(3, (err, buf) => {
                                    let token = buf.toString('hex');
                                    token = parseInt(token, 16);
                                    done(err, token);
                                });
                            },
                            async function main (token, usuario, done) {
                                const transporter = nodemailer.createTransport({
                                    host: 'smtp.gmail.com',
                                    port: 465,
                                    secure: true, // true for 465, false for other ports
                                    auth: {
                                        user: 'lendyjo2001@gmail.com', // generated ethereal user
                                        pass: 'gumball123', // generated ethereal password
                                    },
                                    tls: {
                                        // do not fail on invalid certs
                                        rejectUnauthorized: false
                                     }
                                });
                                const info = await transporter.sendMail({
                                    from: '"Zona Cero " <lendyjo2001@gmail.com>', // sender address
                                    to: newUser.email, // list of receivers
                                    subject: 'Confirmar cuenta', // Subject line
                                    text: '', // plain text body
                                    html: `${'<head>'
                                        + '<title>Alta de cuenta</title>'
                                        + '</head>'
                                        + '<body>'
                                        + '<h2>Estás a un paso de acceder a una gran cantidad de contenido</h2>'
                                        + '<p> Por favor, ingresa el siguiente código para poder activar tu cuenta.</p>'
                                        + '<h3>Código de confirmación:</h3><br>'
                                        + '<p>'
                                        + '<strong style="font-size:200%; border:solid">'}${newUser.token}</strong>`
                                        + '</p>'
                                        + '<p class="card-text"> O bien sigue este link y por favor ingresa el código proporcionado en este correo</p>'
                                        + '<a href="http://' + req.headers.host + '/confirmarView/' + token + '">Click Aqui</a>'
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
                    if (newUser.role === 'docente') {
                        
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
