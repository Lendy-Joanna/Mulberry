// Soportorá la funcionalidad para el registro de los usuarios participantes

const mongoose = require('mongoose');

const { Schema } = mongoose;

const contactoSchema = new Schema({
    cveContacto: { type: mongoose.Types.ObjectId },

    email: {
        type: String,
        required: [true, 'El correo electrónico es requerido'],
        match: /.+\@.+\..+/,
        unique: true,
        index: true,
    },
    telefono: {
        type: String,
        required: [true, 'El teléfono es requerido'],
        minLength: [8, 'El mínimo de carácteres requeridos son 10'],
        maxLength: [15, 'El máximo de carácteres requeridos son 10'],
        lowercase: true,
        index: true,
    },
    asunto: {
        type: String,
        required: [true, 'El asunto es requerido'],
        minLength: [3, 'El mínimo de carácteres requeridos son 3'],
        maxLength: [50, 'El máximo de carácteres requeridos son 50'],
        lowercase: true,
    },
    mensaje: {
        type: String,
        required: [true, 'El mensaje es requerido'],
        minLength: [10, 'El mínimo de carácteres requeridos son 10'],
        maxLength: [100, 'El máximo de carácteres requeridos son 100'],
        lowercase: true,
    },
});

module.exports = mongoose.model('Contacto', contactoSchema);