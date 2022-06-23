const mongoose = require('mongoose');

const PoryectoSchema = mongoose.Schema({
    nombre: {
        type: String,
        required: true,
        trim: true
    },
    dueño: {
        //aquí le decimos que tome el id de un elemnto de otro shcema, por lo tanto en "ref:"" le decimos cual es ese es Scuema al que nos referimos.
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Usuario'
    },
    fecha: {
        type: Date,
        default: Date.now()
    }
})

module.exports = mongoose.model('Proyecto', PoryectoSchema);