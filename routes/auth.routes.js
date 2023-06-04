const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.controller.js');
const authMiddleware = require('../middleware/authMiddleware.js')

//Ruta: api/auth
router.post('/', authController.authenticateUser);

router.get('/',
    authMiddleware,
    authController.authenticatedUser
)


module.exports = router;