const Usuario = require('../models/Usuario.js')
const bcryptjs = require('bcryptjs');
const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');

exports.autenticarUsuario = async (req,res) => {
    const { email, password } = req.body;

    try {
        //primero vemos si existe el usuario, buscado su email:
        let usuario = await Usuario.findOne({ email });
        if (!usuario) {
            return res.status(400).json({mensaje: 'La dirección de correo no pertenece a una cuenta registrada'})
        }
        
        //una vez verificado el usuario tenemos que verificar el password
        const passCorrecto = await bcryptjs.compare(password, usuario.password);
        if(!passCorrecto) {
            return res.status(400).json({mensaje: 'Password incorrecto'})
        }

        //si todo es correcto entonces creamos el jwt, igual que cuando creamos un usuario nuevo:
        //crear y firmar el jwt:
        const payload = {
            usuario: {
                id: usuario.id
            }
        }
        jwt.sign(payload, process.env.SECRETA, {
            expiresIn: 3600
        }, (error, token) => {
            if (error) throw error;
            res.json({ token: token })
        })

    } catch (error) {
        console.log(error)
    }
};

exports.usuarioAutenticado = async (req,res) => {
    try {
        const usuarioAutenticado = await Usuario.findById(req.usuario.id).select('-password');
        //con el .select('-password') le estoy diciendo que envie todo menos el password
        res.json({usuarioAutenticado})
    } catch (error) {
        console.log(error);
        res.status(500).json({mensaje: 'Algo salio mal'})
    }
}