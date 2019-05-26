var express = require('express')
    path = require('path'),//para manejar cadenas con el path
    bodyParser = require('body-parser') //para parsear el parametro body que enviaremos
    expressValidator = require('express-validator');
    ;

const app = express();
require('dotenv').config(); //check enviroment variables


app.use((req,res,next)=>{
    res.header("Access-Control-Allow-Origin","*");
    res.header("Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    if (req.method==='OPTIONS'){
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
        return res.status(200).json({})
    }
    next()
});

/* ==== SETTINGS =====*/
app.set('port', process.env.PORT || 3000);  //puerto

// ==== MIDDLEWARE =====

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: false }));

app.use(expressValidator()); //Valida los de entrada desde la url 

const BTRoutes = require('./app/routes/appRoutes');
app.use('/', BTRoutes);


/**
 * ! tenemos que sacar esto rapido
 */
// app.use(express.static(path.join(__dirname, 'public'))); para las url publicas


// ======== launch app ========
app.listen(app.get('port'), () => {
    console.log(`server on port ${app.get('port')}`);
});