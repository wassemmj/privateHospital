const jwt = require('jsonwebtoken') ;

module.exports = (req , res , next) => {
    const token = req.header('token') ;
    if (!token) return res.status(401).send('Access denied.No Token Provided.') ;

    try {
        req.doctor = jwt.verify(token, 'MySecureKey') ;
        next() ;
    } catch (e) {
        res.status(400).send('Invalid token.') ;
    }
}