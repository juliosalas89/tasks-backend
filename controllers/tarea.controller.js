const Tarea = require('../models/Tarea.js');
const Proyecto = require('../models/Proyecto.js');
const { validationResult } = require('express-validator');

exports.agregarTarea = async (req, res) => {
    const errores = validationResult(req)
    if (!errores.isEmpty()) {
        return res.status(400).json({ errores: errores.array() })
    }
    //extraer el proyecto de la tarea 
    const { proyectoId } = req.body;

    try {
        //controlar si existe
        const proyecto = await Proyecto.findById(proyectoId);
        if (!proyecto) return res.status(404).json({ mensaje: 'proyecto no encontrado' });

        //ver si el usuario es el dueño del proyecto
        if( proyecto.dueño.toString() !== req.usuario.id) {
            return res.status(400).json({mensaje: 'no autorizado'});
        }

        const tarea = new Tarea(req.body);
        await tarea.save();
        res.json({tarea})

    } catch (error) {
        console.log(error);
        res.status(500).json({ mensaje: 'algo salió mal' })
    }
}

exports.obtenerTareasDeProyecto = async (req,res) => {
    //extraer el proyecto de la tarea 
    const { proyectoId } = req.body;
    
    try {
        //controlar si existe
        const proyecto = await Proyecto.findById(proyectoId);
        if (!proyecto) return res.status(404).json({ mensaje: 'proyecto no encontrado' });
        
        //ver si el usuario es el dueño del proyecto
        if( proyecto.dueño.toString() !== req.usuario.id) {
            return res.status(400).json({mensaje: 'no autorizado'});
        }
        
        const tareas = await Tarea.find({ proyectoId });
        res.json({tareas});

    } catch (error) {
        console.log(error);
        res.status(500).json({ mensaje: 'algo salió mal' })
    }
}

exports.editarTarea = async (req,res) => {
    const errores = validationResult(req)
    if (!errores.isEmpty()) {
        return res.status(400).json({ errores: errores.array() })
    }

    const { proyectoId, nombre, estado } = req.body;

    try {
        //controlar si existe la tarea que se esta editando
        let tarea = await Tarea.findById(req.params.id);
        if (!tarea) return res.status(404).json({ mensaje: 'tarea inexistente' });
        
        //ver si el usuario es el dueño del proyecto y la tarea en cuestion:
        const proyecto = await Proyecto.findById(proyectoId);
        if( proyecto.dueño.toString() !== req.usuario.id) {
            return res.status(400).json({mensaje: 'no autorizado'});
        }
        
        const tareaEditada = {};
        if(nombre) tareaEditada.nombre = nombre;
        if(estado) tareaEditada.estado = estado;

        tarea = await Tarea.findOneAndUpdate({_id: req.params.id}, tareaEditada, {new: true});
        res.json(tarea);


    } catch (error) {
        console.log(error);
        res.status(500).json({ mensaje: 'algo salió mal' })
    }
}

exports.eliminarTarea = async (req,res) => {
    
    const { proyectoId } = req.body;

    try {
        //controlar si existe la tarea que se esta editando
        let tarea = await Tarea.findById(req.params.id);
        if (!tarea) return res.status(404).json({ mensaje: 'tarea inexistente' });
        
        //ver si el usuario es el dueño del proyecto y la tarea en cuestion:
        const proyecto = await Proyecto.findById(proyectoId);
        if( proyecto.dueño.toString() !== req.usuario.id) {
            return res.status(400).json({mensaje: 'no autorizado'});
        }
        
        await Tarea.findByIdAndDelete(req.params.id);
        res.status(200).json({mensaje: 'tarea eliminada'});
        
    } catch (error) {
        console.log(error);
        res.status(500).json({ mensaje: 'algo salió mal' })
    }
}