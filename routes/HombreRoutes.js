const express = require('express');

const router = express.Router();
const UsuarioController = require('../controllers/UsuarioController');
const HombreController = require('../controllers/HombreController.js');

router.get('/welcomeh', HombreController.welcomeh);


module.exports = router;