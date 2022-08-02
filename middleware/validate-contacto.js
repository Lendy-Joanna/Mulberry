const { check } = require('express-validator');
const mensajes = require('../config/titles.js');

exports.form = [

    check('email').notEmpty().withMessage(mensajes.error.emailVacio).normalizeEmail()
        .isEmail()
        .withMessage(mensajes.error.emailIncorrecto),

    check('telefono').notEmpty().trim()
        .escape()
        .withMessage(mensajes.error.telefono)
        .isLength({ min: 8 }).withMessage(mensajes.error.telefonoLongitudMinima)
        .isLength({ max: 15}).withMessage(mensajes.error.telefonoLongitudMaxima),


    check('asunto').notEmpty().trim()
        .escape()
        .withMessage(mensajes.error.asunto)
        .isLength({ min: 3 }).withMessage(mensajes.error.asuntoLongitudMinima)
        .isLength({ max: 50}).withMessage(mensajes.error.asuntoLongitudMaxima),

    check('mensaje').notEmpty().trim()
        .escape()
        .withMessage(mensajes.error.mensaje)
        .isLength({ min: 10 }).withMessage(mensajes.error.mensajeLongitudMinima)
        .isLength({ max: 100}).withMessage(mensajes.error.mensajeLongitudMaxima),
];
