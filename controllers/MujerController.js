//const EstudianteModel = require('../models/EstudianteModel.js');
//const CursoModel = require('../models/CursoModel');
const Notificacion = require('./VerNotificacionesController');
const titles = require('../config/titles');
const utils = require('../middleware/utils');

module.exports = {

    async welcome(req, res) {
        console.log('Verificando sesión ', utils.verifySession(req));
        if (utils.verifySession(req)) {
            const user = req.session.usuario;
            // Constante que guarda el resultado de la consulta de VerNotificacion del
            // controlador VerNotificacionesController
            const notificacion = await Notificacion.VerNotificacion(req, res);
            console.log('Welcome Data Sesión ', user);
            const name = `${utils.capitalize(user.nombre)} ${utils.capitalize(user.appPaterno)} ${utils.capitalize(user.appMaterno)}`;
            res.render('../views/mujer/home', {
                title: titles.view.home, nombre: name, curso, user, notificacion,
            });
        } else {
            res.redirect('/');
        }
    },
};
