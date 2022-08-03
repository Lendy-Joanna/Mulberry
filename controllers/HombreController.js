const Notificacion = require('./VerNotificacionesController');
const titles = require('../config/titles');
const utils = require('../middleware/utils');

module.exports = {

    async welcomeh(req, res) {
        console.log('Verificando sesión ', utils.verifySession(req));
        if (utils.verifySession(req)) {
            const user = req.session.usuario;
            // Constante que guarda el resultado de la consulta de VerNotificacion del
            // controlador VerNotificacionesController
            const notificacion = await Notificacion.VerNotificacion(req, res);
            console.log('Welcome Data Sesión ', user);
            const name = `${utils.capitalize(user.nombre)}`;
            res.render('../views/hombre/home', {
                title: titles.view.home, nombre: name, user, notificacion,
            });
        } else {
            res.redirect('/');
        }
    },
    accesoriosView(req, res) {
        res.render('../views/hombre/accesorios', { title: titles.view.accesorios });
    },
    skincareView(req, res) {
        res.render('../views/hombre/skincare', { title: titles.view.skincare });
    },
    cabelloView(req, res) {
        res.render('../views/hombre/cabello', { title: titles.view.cabello });
    },
    coloniasView(req, res) {
        res.render('../views/hombre/colonias', { title: titles.view.colonias });
    },
    comprarView(req, res) {
        res.render('../views/hombre/comprar', { title: titles.view.comprar });
    },
};