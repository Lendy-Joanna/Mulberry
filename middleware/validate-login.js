const { check } = require('express-validator');
const mensajes = require('../config/titles.js');

exports.form = [

    // Validación de correo electronico
    check('email').notEmpty().withMessage(mensajes.error.emailVacio).normalizeEmail()
        .isEmail()
        .withMessage(mensajes.error.emailIncorrecto),

    // Validación de contraseña
    check('password').trim().notEmpty().withMessage(mensajes.error.passwordVacio)
        .isLength({ min: 5 })
        .withMessage(mensajes.error.passwordLongitudMinima)
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
];
