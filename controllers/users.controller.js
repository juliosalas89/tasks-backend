const User = require('../models/User.js')
const bcryptjs = require('bcryptjs');
const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');

exports.insertUser = async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({ error: errors.array() })
    }
    const { email, password } = req.body
    try {
        let user = await User.findOne({ email })

        if (user) {
            return res.status(400).json({
                mensaje: 'There is already a User registered with this email.'
            })
        }
        user = new User(req.body)

        const salt = await bcryptjs.genSalt(10)
        user.password = await bcryptjs.hash(password, salt);

        await user.save();

        const payload = {
            user: {
                id: user.id
            }
        }

        jwt.sign(payload, process.env.SECRET, {
            expiresIn: 36000
        }, (error, token) => {
            if (error) throw error;

            res.json({ token: token })
        })

    } catch (error) {
        console.log(error);
        res.status(400).send('Someting went wrong')
    }
}