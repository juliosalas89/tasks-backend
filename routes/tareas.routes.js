const express = require('express');
const router = express.Router();
const tareasController = require('../controllers/tarea.controller.js');
const authMiddleware = require('../middleware/authMiddleware.js');
const { check } = require('express-validator');

//Ruta: /api/tareas
router.post('/',
    authMiddleware,
    [
        check('nombre', 'El nombre de la tarea es obligatorio').not().isEmpty(),
        check('proyectoId', 'La tarea debe estar asignada a un proyecto').not().isEmpty()
    ],
    tareasController.agregarTarea
)

router.get('/',
    authMiddleware,
    tareasController.obtenerTareasDeProyecto
);

router.put('/:id',
    authMiddleware,
    [
        check('nombre', 'El nombre de la tarea es obligatorio').not().isEmpty(),
        check('proyectoId', 'La tarea debe estar asignada a un proyecto').not().isEmpty()
    ],
    tareasController.editarTarea
);

router.delete('/:id',
    authMiddleware,
    tareasController.eliminarTarea
);

module.exports = router