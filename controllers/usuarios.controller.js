const Usuario = require('../models/Usuario.js')
const bcryptjs = require('bcryptjs');
const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');

exports.crearUsuario = async (req, res) => {
    const errores = validationResult(req)
    if (!errores.isEmpty()) {
        return res.status(400).json({ errores: errores.array() })
    }
    const { email, password } = req.body
    console.log(password)
    try {
        //Revvisamos que el usuario registrado sea unico:
        let usuario = await Usuario.findOne({ email })

        if (usuario) {
            return res.status(400).json({
                mensaje: 'Ya existe un usuario registrado con ese dirección de Email'
            })
        }
        usuario = new Usuario(req.body)

        const salt = await bcryptjs.genSalt(10)
        usuario.password = await bcryptjs.hash(password, salt);


        //creamos la instancia de usuario con los datos del req

        //guardamos el usuario
        await usuario.save();

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

            //si se crea el usuario correctamente devolvemos el token en la res:
            res.json({ token: token })
        })

    } catch (error) {
        console.log(error);
        res.status(400).send('hubo un error')
    }
}