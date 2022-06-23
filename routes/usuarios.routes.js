const express = require('express');
const router = express.Router();
const usuarioController = require('../controllers/usuarios.controllers.js');
const { check } = require('express-validator');


router.post('/', [
    check('nombre', 'El nombre es obligatorio').not().isEmpty(), //en este ejemplo validamos que no este vacio
    check('email', 'el email no es valido').isEmail(), //en este ejmeplo verificamos si tiene estructura de email valido
    check('password', 'el password debe tener al menos6 caracteres').isLength({ min: 6 }) //validamos nº caracteres
], usuarioController.crearUsuario)

module.exports = router;