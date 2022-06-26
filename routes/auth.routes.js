const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.controller.js');
const { check } = require('express-validator');
const authMiddleware = require('../middleware/authMiddleware.js')

//Ruta: api/auth
router.post('/', authController.autenticarUsuario);

router.get('/',
    authMiddleware,
    authController.usuarioAutenticado
)


module.exports = router;