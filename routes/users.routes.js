const express = require('express');
const router = express.Router();
const usersController = require('../controllers/users.controller.js');
const { check } = require('express-validator');

router.post('/', [
    check('name', 'Name is mandatory').not().isEmpty(),
    check('email', 'invalid email').isEmail(),
    check('password', 'password must be at least 6 characters length').isLength({ min: 6 }) 
], usersController.insertUser)

module.exports = router;