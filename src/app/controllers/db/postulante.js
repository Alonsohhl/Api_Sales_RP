


var mongoose_con = require('./connection');
var Schema = mongoose_con.Schema;


    var postulanteSchema = new Schema({
    post_usuario: String,
    post_nombre: Number,
    post_email: String,
    post_password: String,
    post_prop: { type: Schema.ObjectId, ref: "propuestas" } 
    });



module.exports = mongoose_con.model("postulante", postulanteSchema);

