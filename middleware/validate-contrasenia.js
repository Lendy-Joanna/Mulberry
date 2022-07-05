const { check } = require('express-validator');
const mensajes = require('../config/titles.js');

exports.form = [
    check('password').trim().notEmpty().withMessage(mensajes.error.passwordVacio)
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
    check('password2').trim().notEmpty().withMessage(mensajes.error.passwordVacioConfirmar),
];
