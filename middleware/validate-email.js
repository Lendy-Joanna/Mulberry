const { check } = require('express-validator');
const mensajes = require('../config/titles.js');

exports.form = [
    check('email').notEmpty().withMessage(mensajes.error.emailVacio)
        .isEmail()
        .normalizeEmail()
        .withMessage(mensajes.error.emailIncorrecto),
];
