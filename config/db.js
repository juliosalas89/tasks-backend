const mongoose = require('mongoose');

require('dotenv').config({ path: 'variables.env' });

const connectDB = () => {
    try {
        mongoose.connect(process.env.DB_MONGO, {
            autoIndex: false,
            maxPoolSize: 10,
            serverSelectionTimeoutMS: 5000,
            socketTimeoutMS: 45000,
            family: 4
        });
        console.log('DB connected')
    } catch (error) {
        console.log(error);
        process.exit(1)
    }
}

module.exports = connectDB 