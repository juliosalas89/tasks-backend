const express = require('express');
const router = express.Router();
const tasksController = require('../controllers/tasks.controller.js');
const authMiddleware = require('../middleware/authMiddleware.js');
const { check } = require('express-validator');

router.post('/',
    authMiddleware,
    [
        check('name', 'Task name is mandatory').not().isEmpty(),
        check('projectId', 'Task must be related to a project').not().isEmpty()
    ],
    tasksController.insertTask
)

router.get('/',
    authMiddleware,
    tasksController.getProjectTasks
);

router.put('/:id',
    authMiddleware,
    [
        check('name', 'Task name is mandatory').not().isEmpty(),
        check('projectId', 'Task must be related to a project').not().isEmpty()
    ],
    tasksController.editTask
);

router.delete('/:id',
    authMiddleware,
    tasksController.deleteTask
);

module.exports = router