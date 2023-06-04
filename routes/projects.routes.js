const express = require('express');
const router = express.Router();
const projectsController = require('../controllers/projects.controller.js');
const authMiddleware = require('../middleware/authMiddleware.js');
const { check } = require('express-validator');

router.post('/',
    authMiddleware,
    [
        check('name', 'Project name is mandatory').not().isEmpty()
    ],
    projectsController.insertProject
);

router.get('/',
    authMiddleware,
    projectsController.getProjects
);

router.put('/:id',
    authMiddleware,
    [
        check('name', 'Project name is mandatory').not().isEmpty()
    ],
    projectsController.editProject
);

//eliminar un proyecto
router.delete('/:id',
    authMiddleware,
    projectsController.deleteProject
);

module.exports = router;