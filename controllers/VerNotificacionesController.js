const mongoose = require('mongoose');

const notificacionM = require('../models/NotificacionModel');
const usuarioM = require('../models/UsuarioModel');

/**
 * VerNotificacionesController.js
 *
 * @description :: Server-side logic for managing VerNotificaciones.
 */
module.exports = {
    async VerNotificacion(req, res) {
        const idUsuario = req.session.usuario._id;
        const notificaciones = await notificacionM.aggregate([{ $unwind: '$usuarios' }, { $match: { $and: [{ 'usuarios.cvUsuario': mongoose.Types.ObjectId(idUsuario) }, { 'usuarios.estado': 'enviada' }] } }]);
        const idUsuariosCrea = [];
        notificaciones.forEach((notificacion) => {
            idUsuariosCrea.push(notificacion.cvUsuarioCrea);
        });

        const usuarios = await usuarioM.find({ _id: { $in: idUsuariosCrea } }).lean();
        console.log(usuarios);
        if (notificaciones.length > 0 && usuarios) {
            notificaciones.forEach((not) => {
                usuarios.forEach((us) => {
                    if (not.cvUsuarioCrea.toString() === us._id.toString()) {
                        not.cvUsuarioCrea = `${us.nombre} ${us.appPaterno} ${us.appMaterno}`;
                        return;
                    }
                });
            });
        }

        return notificaciones;
    },
    async cambiarVistNot(req, res) {
        const idNot = req.params.id;
        const idUsuario = req.session.usuario._id;
        const notificacion = await notificacionM.findOne({ _id: idNot });

        notificacion.usuarios.forEach((usuario) => {
            console.log(usuario.cvUsuario === idUsuario);
            if (usuario.cvUsuario == idUsuario) {
                usuario.estado = 'visto';
            }
        });
        notificacion.save((err, Notificacion) => {
            if (err) {
                return res.redirect('/welcome');
            }

            return res.redirect('/welcome');
        });
    },
    /* crear notificaciones */
    create(req, res) {
        const Notificacion = new notificacionM({
            fecha: req.body.fecha,
            tipoNotificacion: req.body.tipoNotificacion,
            contenidoNotificacion: req.body.contenidoNotificacion,
            cvUsuarioCrea: req.body.cvUsuarioCrea,
            usuarios: req.body.usuarios,
        });

        Notificacion.save((err, Notificacion) => {
            if (err) {
                return res.status(500).json({
                    message: 'Error when creating Notificacion',
                    error: err,
                });
            }

            return res.status(201).json(Notificacion);
        });
    },

};
