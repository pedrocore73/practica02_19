let express = require('express');
let bcryptjs = require('bcryptjs');
let jsonwebtoken = require('jsonwebtoken');

let Usuario = require('../models/usuario');

let app = express();

app.post('/', (req, res)=>{
    let body = req.body;
    Usuario.findOne({email: body.email}, (err, usuario)=>{
       if (err) {
           return res.status(500).json({
               error: err
           })
       }
       if (!usuario) {
           return res.status(400).json({
               mensaje: 'El email no corresponde a ningún usuario'
           })
       } 
       if (!bcryptjs.compareSync(body.password, usuario.password)) {
            return res.status(400).json({
                mensaje: 'Contraseña incorrecta'
            })
       }

       let token = jsonwebtoken.sign({usuario: usuario}, 'hdsjdhkfhs', {expiresIn: 24*60*60*1000});
       res.status(200).json({
           token: token
       });

    })
})

module.exports = app;
