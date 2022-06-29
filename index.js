const express = require('express');
//importamos la funcion de conexion a la BD
const conectarDB = require('./config/db.js')
//importamos cors
const cors = require('cors');

//creamos un servidor
const app = express();

//ejecutamos la funcion de conexion a la DB, importada desde db.js:
conectarDB();

//habilitamos cors
app.use(cors())

//Habilitamos express.json, nos permitira leer archivos json
app.use(express.json({ extend: true }))

// determinamos un puerto para el servidor
const port = process.env.PORT || 4000;

//importamos las rutas
app.use('/api/usuarios', require('./routes/usuarios.routes.js'));
app.use('/api/auth', require('./routes/auth.routes.js'));
app.use('/api/proyectos', require('./routes/proyectos.routes.js'));
app.use('/api/tareas', require('./routes/tareas.routes.js'));

//arrancamos la app en el puerto
app.listen(port, '0.0.0.0', () => {
    console.log(`el servidor esta funcionando en el puerto ${port}`)
})