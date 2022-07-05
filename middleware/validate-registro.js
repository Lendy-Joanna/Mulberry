const { check } = require('express-validator');
const mensajes = require('../config/titles.js');

exports.form = [
    check('nombre').notEmpty().trim()
        .escape()
        .withMessage(mensajes.error.nombreVacio)
        .isLength({ min: 3 }).withMessage(mensajes.error.nombreLongitudMinima)
        .isLength({ max: 100}).withMessage(mensajes.error.nombreLongitudMaxima),

    check('appPaterno').notEmpty().trim()
        .escape()
        .withMessage(mensajes.error.appPaterno)
        .isLength({ min: 3 }).withMessage(mensajes.error.appPaternoLongitudMinima)
        .isLength({ max: 100}).withMessage(mensajes.error.appPaternoLongitudMaxima),

    check('appMaterno').notEmpty().trim()
        .escape()
        .withMessage(mensajes.error.appMaterno)
        .isLength({ min: 3 }).withMessage(mensajes.error.appMaternoLongitudMinima)
        .isLength({ max: 100}).withMessage(mensajes.error.appMaternoLongitudMaxima),

    check('rutaFoto').notEmpty().trim()
        .escape()
        .withMessage(mensajes.error.rutaFoto),
        
    check('email').notEmpty().withMessage(mensajes.error.emailVacio).normalizeEmail()
        .isEmail()
        .withMessage(mensajes.error.emailIncorrecto),

    check('role').notEmpty().trim()
        .escape()
        .withMessage(mensajes.error.role),

    check('contrasena').trim().notEmpty().withMessage(mensajes.error.passwordVacio)
        .isLength({ min: 5 })
        .withMessage(mensajes.error.passwordLongitudMinima)
        .isLength({ max: 15 })
        .withMessage(mensajes.error.passwordLongitudMaxima)
        .matches(/(?=.*?[A-Z])/)
        .withMessage(mensajes.error.passwordAlmenosUnCaracterMayuscula)
        .matches(/(?=.*?[a-z])/)
        .withMessage(mensajes.error.passwordAlmenosUnCaracterMinuscula)
        .matches(/(?=.*?[0-9])/)
        .withMessage(mensajes.error.passwordAlmenosUnCaracterNumero)
        .matches(/(?=.*?[#?!@$%^&*-])/)
        .withMessage(mensajes.error.passwordAlmenosUnCaracterEspecial)
        .not()
        .matches(/^$|\s+/)
        .withMessage(mensajes.error.passwordSinEspacios),
        
    check('contrasena2').trim().notEmpty().withMessage(mensajes.error.passwordVacioConfirmar),
];
