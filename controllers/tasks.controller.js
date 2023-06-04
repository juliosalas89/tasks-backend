const Task = require('../models/Task.js');
const Project = require('../models/Project.js');
const { validationResult } = require('express-validator');

exports.insertTask = async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({ error: errors.array() })
    }
    const { projectId } = req.body;

    try {
        const project = await Project.findById(projectId);
        if (!project) return res.status(404).json({ message: 'Project not found.' });

        if( project.userId.toString() !== req.user.id) {
            return res.status(400).json({ message: 'Authorization required' });
        }

        const task = new Task(req.body);
        await task.save();
        res.json({ task })

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Something went wrong' })
    }
}

exports.getProjectTasks = async (req,res) => {
    const { projectId } = req.query;
    
    try {
        const project = await Project.findById(projectId);
        if (!project) return res.status(404).json({ message: 'Project not found.' });
        
        if( project.userId.toString() !== req.user.id) {
            return res.status(400).json({ message: 'Authorization required' });
        }
        
        const tasks = await Task.find({ projectId }).sort({ date: -1 });
        res.json({ tasks });

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Something went wrong' })
    }
}

exports.editTask = async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({ error: errors.array() })
    }

    const { projectId, name, state } = req.body;

    try {
        let task = await Task.findById(req.params.id);
        if (!task) return res.status(404).json({ message: 'Task not found' });
        
        const project = await Project.findById(projectId);
        if( project.userId.toString() !== req.user.id) {
            return res.status(400).json({ message: 'Authorization required' });
        }
        
        const editedTask = { name, state };

        task = await Task.findOneAndUpdate({ _id: req.params.id }, editedTask, { new: true });
        res.json({ task });


    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Something went wrong' })
    }
}

exports.deleteTask = async (req,res) => {
    
    const { projectId } = req.query;

    try {
        let task = await Task.findById(req.params.id);
        if (!task) return res.status(404).json({ message: 'Task not found' });
        
        const project = await Project.findById(projectId);
        if( project.userId.toString() !== req.user.id) {
            return res.status(400).json({ message: 'Authorization required' });
        }
        
        await Task.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: 'Task deleted' });
        
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Something went wrong' })
    }
}