const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.controller.js');
const { check } = require('express-validator');

//RUuta: api/auth
router.post('/', [ 
    check('email', 'el email no es valido').isEmail(),
    check('password', 'el password debe tener al menos6 caracteres').isLength({ min: 6 })
], authController.autenticarUsuario)

module.exports = router;