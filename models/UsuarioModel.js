// Soportorá la funcionalidad para el registro de los usuarios participantes

const mongoose = require('mongoose');

const { Schema } = mongoose;

const usuarioSchema = new Schema({
    cveUsuario: { type: mongoose.Types.ObjectId },
    estado: {
        type: Boolean,
        default: false,
    }, // Cuenta activada=true o no=false
    nombre: {
        type: String,
        required: [true, 'El Nombre de usuario es requerido'],
        minLength: [3, 'El mínimo de carácteres requeridos son 3'],
        maxLength: [100, 'El máximo de carácteres requeridos son 100'],
        lowercase: true,
    },
    appPaterno: {
        type: String,
        required: [true, 'El apellido Paterno es requerido'],
        minLength: [3, 'El mínimo de carácteres requeridos son 3'],
        maxLength: [100, 'El máximo de carácteres requeridos son 100'],
        lowercase: true,
        index: true,
    },
    appMaterno: {
        type: String,
        required: [true, 'El apellido Materno es requerido'],
        minLength: [3, 'El mínimo de carácteres requeridos son 3'],
        maxLength: [100, 'El máximo de carácteres requeridos son 100'],
        lowercase: true,
    },
    rutaFoto: {
        type: String,
        default: '',
    },
    email: {
        type: String,
        required: [true, 'El correo electrónico es requerido'],
        match: /.+\@.+\..+/,
        unique: true,
        index: true,
    },
    contrasena: {
        type: String,
    },
    fechaIngreso: {
        type: Date,
        default: Date.now,
    },
    token: {
        type: String,
    },
    tokenExpiracion: { 
        type: Date, 
        default: '' 
    },
    confirmar: {
        type: String,
        default: 'no',
        lowercase: true,
        enum: ['si', 'expirado', 'no'],
    }, // Si=token confirmado, Expirado=token vencido, No= Sin confirmación
    role: {
        type: String,
        lowercase: true,
        default: 'mujer',
        enum: ['mujer', 'hombre', 'admin'],
    },
    resetPasswordToken: {
        type: String, required: false,
    },
    resetPasswordExperies: {
        type: Date, required: false,
    },
});

module.exports = mongoose.model('Usuario', usuarioSchema);
