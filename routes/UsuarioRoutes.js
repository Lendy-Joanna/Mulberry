const express = require('express');

const router = express.Router();
const usuarioController = require('../controllers/UsuarioController.js');
const recuperar = require('../controllers/RecuperarContrasenaController');
const validationRute = require('../middleware/validate-login');
const validationEmail = require('../middleware/validate-email');
const validationPass = require('../middleware/validate-contrasenia');
const validationRegistro = require('../middleware/validate-registro');

//Rutas generales para iniciar en el sitio
router.get('/', usuarioController.indexView);
router.get('/logout', usuarioController.logout);
router.get('/home', usuarioController.home);
router.post('/login', validationRute.form, usuarioController.login);
router.get('/politicas', usuarioController.politicas);
router.get('/nosotros', usuarioController.nosotros);
router.get('/contacto', usuarioController.contactoView);
router.get('/maquillaje', usuarioController.maquillajeView);
router.get('/skincare', usuarioController.skincareView);
router.get('/manicura', usuarioController.manicuraView);
router.get('/accesorios', usuarioController.accesoriosView);
router.get('/comprar', usuarioController.comprarView);

// Rutas para registro
router.get('/registroView', usuarioController.registroView);
router.post('/registro', validationRegistro.form, usuarioController.registro);
router.get('/confirmarView', usuarioController.confirmarView);
router.post('/confirmar', usuarioController.confirmar);

// Rutas para restaurar contraseña
router.get('/recuperarContrasenia', recuperar.recuperarContrasenia);
router.post('/recuperar', validationEmail.form, recuperar.recuperarContraseniaToken);
router.post('/recuperarFinal', validationPass.form, recuperar.recuperarContraseniaCambiar);


/* Listado de rutas de rol mujer */
/* Listado de rutas de rol hombre*/
/* Listado de rutas de rol admin*/


module.exports = router;