const express = require('express');
const router = express.Router();
const proyectoController = require('../controllers/proyecto.controller.js');
const authMiddleware = require('../middleware/authMiddleware.js');
const { check } = require('express-validator');

//Ruta: /api/proyectos
router.post('/',
    authMiddleware,
    [
        check('nombre', 'El nombre del proyecto es obligatorio').not().isEmpty()
    ],
    proyectoController.crearProyecto
);

router.get('/',
    authMiddleware,
    proyectoController.obtenerProyectos
);
//aquí el auth hace la autenticacion del usuario, y si esta bien ejecuta el controller

//editar un proyecto
router.put('/:id',
    authMiddleware,
    [
        check('nombre', 'EL nombre del proyecto es obligatorio').not().isEmpty()
    ],
    proyectoController.editarProyecto
);

//eliminar un proyecto
router.delete('/:id',
    authMiddleware,
    proyectoController.eliminarProyecto
);

module.exports = router;