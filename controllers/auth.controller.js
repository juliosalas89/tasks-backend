const User = require('../models/User.js')
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.authenticateUser = async (req,res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "This email doesn't match with any registered user" })
        }
        
        const correctPassword = await bcryptjs.compare(password, user.password);
        if(!correctPassword) {
            return res.status(400).json({mensaje: 'Invalid Password'})
        }

        const payload = { user: { id: user.id } }
        jwt.sign(payload, process.env.SECRET, {
            expiresIn: 3600
        }, (error, token) => {
            if (error) throw error;
            res.json({ token: token })
        })

    } catch (error) {
        console.log(error)
    }
};

exports.authenticatedUser = async (req,res) => {
    try {
        const authenticatedUser = await User.findById(req.user.id).select('-password');
        res.json({authenticatedUser})
    } catch (error) {
        console.log(error);
        res.status(500).json({mensaje: 'Something went wrong'})
    }
}