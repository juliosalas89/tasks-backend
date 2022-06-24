const mongoose = require('mongoose');


const TareaSchema = mongoose.Schema({
    nombre:{
        type: String,
        required: true,
        trim: true
    },
    estado: {
        type: Boolean,
        default: false
    },
    fecha: {
        type: Date,
        default: Date.now()
    },
    proyectoId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Proyecto'
    }
});

module.exports = mongoose.model('Tarea', TareaSchema);