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
    curp: {
        type: String,
        required: [true, 'La CURP es requerida'],
        minLength: [16, 'El mínimo de carácteres requeridos son 16'],
        maxLength: [18, 'El máximo de carácteres requeridos son 18'],
    },
    edad: {
        type: Number,
        required: [true, 'La edad es requerida'],
        minLength: [2, 'La edad mínima es 12'],
        maxLength: [2, 'La edad máxima es 99'],
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
    nivelEducativo: {
        type: String,
        lowercase: true,
        required: [true, 'El Nivel Educativo es requerido'],
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
        default: 'estudiante',
        enum: ['estudiante', 'docente', 'admin'],
    },
    resetPasswordToken: {
        type: String, required: false,
    },
    resetPasswordExperies: {
        type: Date, required: false,
    },
});

module.exports = mongoose.model('Usuario', usuarioSchema);
