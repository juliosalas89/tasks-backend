const Proyecto = require('../models/Proyecto.js');
const { validationResult } = require('express-validator');

exports.crearProyecto = async (req, res) => {
    const errores = validationResult(req)
    if (!errores.isEmpty()) {
        return res.status(400).json({ errores: errores.array() })
    }

    try {
        const proyecto = new Proyecto(req.body)
        proyecto.dueño = req.usuario.id //el req.usuario viene del authMidleware, que al verificar el JWT nos manda el usuario a traves del req
        await proyecto.save();
        res.status(200).json({ proyecto })
    } catch (error) {
        console.log(error)
        res.status(500).json({ mensaje: 'algo salio mal' })
    }
};

exports.obtenerProyectos = async (req, res) => {
    try {
        const proyectos = await Proyecto.find({ dueño: req.usuario.id }).sort({ creado: -1}) 
        //.find() me trae todos los objetos que tienen el atributo que le paso como parametro
        //.sort({creado: -1}) es para que se devuelvan los elementos en el orden correcto, sino salen al reves
        res.json({proyectos})
    } catch (error) {
        console.log(error);
        res.status(500).json({mensaje: 'algo salió mal'})
    }
};

exports.editarProyecto = async (req,res) => {
    const errores = validationResult(req)
    if (!errores.isEmpty()) {
        return res.status(400).json({ errores: errores.array() })
    };
    const { nombre } = req.body;
    const proyectoEditado = {}; 

    if (nombre) proyectoEditado.nombre = nombre;

    try {
        //revisar el id del proyecto, si existe o no
        let proyecto = await Proyecto.findById(req.params.id)
        if (!proyecto) return res.status(404).json({mensaje: 'proyecto no ecnontrado'})
        
        //verificar el creador del proyecto
        if (proyecto.dueño.toString() !== req.usuario.id) {
            return res.status(401).json({mensaje: 'No autorizado'})
        }
        //actualizar el proyecto
        proyecto = await Proyecto.findByIdAndUpdate({_id: req.params.id}, {set: proyectoEditado}, {new: true});
        
        res.json({proyecto})
    } catch (error) {
        console.log(error);
        res.status(500).json({mensaje: 'algo salio mal'});
    }
}

exports.eliminarProyecto = async (req,res) => {
    try {
        //revisar el id del proyecto, si existe o no
        let proyecto = await Proyecto.findById(req.params.id)
        if (!proyecto) return res.status(404).json({mensaje: 'proyecto no ecnontrado'})
        
        //verificar el creador del proyecto
        if (proyecto.dueño.toString() !== req.usuario.id) {
            return res.status(401).json({mensaje: 'No autorizado'})
        }
        //actualizar el proyecto
        await Proyecto.findOneAndRemove({_id: req.params.id});
        res.status(200).json({mensaje: 'proyecto eliminado'})

    } catch (error) {
        console.log(error);
        res.status(500).json({mensaje: 'algo salio mal'});
    }
}