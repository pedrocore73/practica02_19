let express = require('express');
let bodyParser = require('body-parser');
let mongoose = require('mongoose');
let cors = require('cors');

let app = express();

let usuario = require('./routes/usuario');
let login = require('./routes/login');

let multer = require('multer');

const DIR = './imagenes';

let storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, DIR)
    },
    filename: function (req, file, cb) {
        cb(null, req.body.imagen)
    }  
})

let upload = multer({storage: storage});


mongoose.Promise = require('bluebird');
mongoose.connect('mongodb://localhost:27017/shop', {useNewUrlParser: true})
            .then(()=>{
                console.log('Conectado a DB')
            })
            .catch((err)=>{
                console.log(err);
            });

app.use(cors({
    credentials: true,
    origin: 'http://localhost:4200'
}));

app.use(bodyParser.json({strict: false}));
app.use(bodyParser.urlencoded({'extended':'false'}));

app.post('/imagenes', upload.single('file'), function (req, res, next){

});

app.use('/usuario', usuario);
app.use('/login', login);
app.use('/imagenes', express.static('imagenes'));

app.listen(8080, ()=>{
    console.log('Servidor escuchando en http://localhost:8080');
});