const mongoose = require('mongoose'); //esta es la vieja forma de importar

require('dotenv').config({ path: 'variables.env' });

const conectarDB = () => {
    try {
        mongoose.connect(process.env.DB_MONGO, {
            //ESTO ESCRIBE EL VAGO DE Udemi (y no escribe nada de lo que yo tengo)
            // useNewUrlParser: true,
            // useUnifiedTopology: true,
            // useFindAndModify: false
            autoIndex: false,
            maxPoolSize: 10,
            serverSelectionTimeoutMS: 5000,
            socketTimeoutMS: 45000,
            family: 4
        });
        console.log('DB conectada')
    } catch (error) {
        console.log(error);
        process.exit(1) // si hay u error con la coneion detiene la app
    }
}

module.exports = conectarDB //esta es la vieja forma de exportar