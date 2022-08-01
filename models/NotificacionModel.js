const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const NotificacionSchema = new Schema({
	'fecha' :{type:Date, default: Date.now},
	'tipoNotificacion' : {type:String, enum: ['Pop-up','Alerta','Dentro de la seccion','Chat','Emergentes']},
	'contenidoNotificacion' : {type:String,minLength: [50,'Extencion minima de comentario de 50'], maxLength: [200,'Extencion maxima de comentario de 200'], required:[true,'El contenido de la notificacion es requerido']},
	'cvUsuarioCrea' : {type: mongoose.Types.ObjectId,ref:'Usuario'},
	'usuarios': [
        {
            'cvUsuario':{type: mongoose.Types.ObjectId,ref:'Usuario'},
            'estado':{type:String,enum:['enviada','visto'], default: 'enviada',}
        }
        ],
});

module.exports = mongoose.model('Notificacion', NotificacionSchema);
