var express = require('express');
// const passport = require('passport');
// var path = require('path')//    para manejar cadenas con el path
var bodyParser = require('body-parser')//   para parsear el parametro body que enviaremos
var expressValidator = require('express-validator')
const app = express();
const session = require('express-session');
// Requiring passport as we've configured it
var passport = require('./app/config/passport');

const BTRoutes = require('./app/routes');
var db = require('./app/db');

require('dotenv').config(); //  check enviroment variables

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization'
  );
  if (req.method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
    return res.status(200).json({})
  }
  next()
});

/* ==== SETTINGS ===== */
app.set('port', process.env.PORT || 3000); // port
// Configure isProduction variable
const isProduction = process.env.NODE_ENV === 'production';
if (!isProduction) {
//   app.use(errorHandler());
  console.log('es Desarrollo pe');
}

// ==== MIDDLEWARE =====
app.use(require('morgan')('dev'));// Use morgan to log
// app.use(session({ secret: 'passport-tutorial', cookie: { maxAge: 60000 }, resave: false, saveUninitialized: false }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false })); // para limitar archivos que se envian por la url como  imagenes etc
app.use(expressValidator()); // Valida los de entrada desde la url
//   Passport middleware
app.use(session({ secret: 'keyboard cat', resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

// require('./models/Users');

app.use('/', BTRoutes);

// ======== launch app ========
// app.listen(app.get('port'), () => {
//   console.log(`Running on port ${app.get('port')}`);
// });

db.sequelize.sync().then(function () {
  app.listen(app.get('port'), function () {
    console.log('==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser.', app.get('port'), app.get('port'));
  });
});
