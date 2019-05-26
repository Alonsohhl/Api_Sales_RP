

var mongoose = require('mongoose');
mongoose.connect('mongodb+srv://admin:admin@dbbolsadetrabajo-3qw6r.mongodb.net/dbbolsadetrabajo', { useNewUrlParser: true });

// get reference to database
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));


module.exports = mongoose;