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
            const name = `${utils.capitalize(user.nombre)}`;
            res.render('../views/mujer/home', {
                title: titles.view.home, nombre: name, user, notificacion,
            });
        } else {
            res.redirect('/');
        }
    },
    serumsView(req, res) {
        res.render('../views/mujer/serums', { title: titles.view.serums });
    },
    manosView(req, res) {
        res.render('../views/mujer/manos', { title: titles.view.accesorios });
    },
    sombrasView(req, res) {
        res.render('../views/mujer/sombras', { title: titles.view.sombras });
    },
    comprarView(req, res) {
        res.render('../views/mujer/comprar', { title: titles.view.comprar });
    },
};