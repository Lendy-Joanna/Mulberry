'use strict';

const express = require('express');

const router = express.Router();
const UsuarioController = require('../controllers/UsuarioController');
const HombreController = require('../controllers/HombreController.js');

router.get('/welcomehh', HombreController.welcomehh);