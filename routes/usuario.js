let express = require('express');
let bcryptjs = require('bcryptjs');

let app = express();
let Usuario = require('../models/usuario');
let protectHttp = require('../middleware/protecthttp');


app.get('/', protectHttp.checkToken, (req, res) =>{
    let _id = req._id;
    Usuario.findById(_id).exec((err, usuario) => {
        if(err) {
            return res.status(500).json({
                error: err
            });
        }
        res.status(200).json({
            usuario: usuario
        })
    })
})

app.post('/', (req, res) => {
    let body = req.body;
    let usuario = new Usuario({
        nombre: body.nombre,
        email: body.email,
        password: bcryptjs.hashSync(body.password, 10),
        imagen: 'user.svg'
    });
    usuario.save((err, usuario)=>{
        if(err) {
            return res.status(500).json({
                error: err
            });
        }
        res.status(200).json({
            mensaje: 'Usuario creado correctamente'
        });
    });
});

app.put('/', protectHttp.checkToken, (req, res) =>{
    let _id = req._id;
    let body = req.body;

    Usuario.findById(_id).exec((err, usuario) => {
        if(err) {
            return res.status(500).json({
                error: err
            });
        }
        usuario.nombre = body.nombre;
        usuario.direccion = body.direccion;
        usuario.cp = body.cp;
        usuario.localidad = body.localidad;
        usuario.imagen = body.imagen;

        usuario.save((err, data)=>{
            if(err) {
                return res.status(400).json({
                    error: err
                })
            }
            res.status(200).json({
                mensaje: 'Usuario actualizado correctamente'
            })
        })
    })
})

module.exports = app;
