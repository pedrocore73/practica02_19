let jsonwebtoken = require('jsonwebtoken');

exports.checkToken = function (req, res, next) {
    let token = req.query.token;

    if(token) {
        jsonwebtoken.verify(token, 'hdsjdhkfhs', (err, decoded)=>{
            if(err) {
                return res.status(400).json({
                    mensaje: 'Operación no permitida '  
                })
            }
            req._id = decoded.usuario._id;
            next()
        })
    } else {
        return res.status(400).json({
            mensaje: 'Operación no permitida'  
        })
    }


}