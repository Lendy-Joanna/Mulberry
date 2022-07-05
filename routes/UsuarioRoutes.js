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
router.get('/contacto', usuarioController.contacto);

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
/*router.get('/comprar', usuarioController.comprarView);
router.get('/contacto', usuarioController.contactoView);
router.get('/nosotros', usuarioController.nosotrosView);
router.get('/dulces', usuarioController.dulcesView);
router.get('/globos', usuarioController.globosView);
router.get('/pinatas', usuarioController.pinatasView);
router.get('/error', usuarioController.errorView);
*/

module.exports = router;