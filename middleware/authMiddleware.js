const jwt = require('jsonwebtoken');

module.exports = function(req, res, next) {
    const token = req.header('x-auth-token');
    
    if(!token) return res.status(401).json({ message: 'You must LogIn to create projects' });

    try {
        const encoded = jwt.verify(token, process.env.SECRET);
        req.user = encoded.user;
        next(); 
    } catch (error) {
        console.log(error);
        res.status(401).json({ message: 'Invalid Token' });
    }

}