const Project = require('../models/Project.js');
const { validationResult } = require('express-validator');

exports.insertProject = async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({ error: errors.array() })
    }

    try {
        const project = new Project(req.body)
        project.userId = req.user.id 
        await project.save();
        res.status(200).json({ project })
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: 'Something went wrong' })
    }
};

exports.getProjects = async (req, res) => {
    try {
        const projects = await Project.find({ user: req.user.id }).sort({ date: -1}) 
        res.json({ projects })
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Something went wrong' })
    }
};

exports.editProject = async (req,res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({ error: errors.array() })
    };
    const { name } = req.body;
    const editedProject = {}; 

    if (name) editedProject.name = name;

    try {
        let project = await Project.findById(req.params.id)
        if (!project) return res.status(404).json({ message: 'project not found' })
        
        if (project.userId.toString() !== req.user.id) {
            return res.status(401).json({ message: 'Authorization required' })
        }
        project = await Project.findByIdAndUpdate({ _id: req.params.id }, { set: editedProject }, { new: true });
        
        res.json({ project })

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Something went wrong' });
    }
}

exports.deleteProject = async (req,res) => {
    try {
        let project = await Project.findById(req.params.id)
        if (!project) return res.status(404).json({ message: 'project not found' })
        
        if (project.userId.toString() !== req.user.id) {
            return res.status(401).json({ message: 'Authorization required' })
        }
        await Project.findOneAndRemove({ _id: req.params.id });
        res.status(200).json({ message: 'project deleted' })

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Something went wrong' });
    }
}