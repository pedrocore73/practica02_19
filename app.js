let express = require('express');
let bodyParser = require('body-parser');
let mongoose = require('mongoose');
let cors = require('cors');

let app = express();

let usuario = require('./routes/usuario');

mongoose.Promise = require('bluebird');
mongoose.connect('mongodb://localhost:27017/shop', {useNewUrlParser: true})
            .then(()=>{
                console.log('Conectado a DB')
            })
            .catch((err)=>{
                console.log(err);
            });

app.use(cors());

app.use(bodyParser.json({strict: false}));
app.use(bodyParser.urlencoded({'extended':'false'}));

app.use('/usuario', usuario);

app.listen(8080, ()=>{
    console.log('Servidor escuchando en http://localhost:8080');
});