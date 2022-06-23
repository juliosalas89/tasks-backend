const jwt = require('jsonwebtoken');

module.exports = function(req, res, next) {
    //leer el token del header
    const token = req.header('x-auth-token');
    
    //revisar si no hay token
    if(!token) return res.status(401).json({msg: 'No hay token, debe iniciar sesión para crear proyectos'});

    //validar el token, si llegamos hasta aquí es porque hay un token en el header, entonces tenemos que validarlo
    try {
        const cifrado = jwt.verify(token, process.env.SECRETA);
        req.usuario = cifrado.usuario; //así mandamos el usuario junto con el req, cosa que podamos acceder a el en el controller
        next(); //esta funcion es para que el codigo pase al siguiente middleware, en este caso el controller
    } catch (error) {
        console.log(error);
        res.status(401).json({msg: 'Token invalido'});
    }

}