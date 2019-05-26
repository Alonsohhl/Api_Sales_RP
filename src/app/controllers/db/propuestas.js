

var mongoose_con = require('./connection');
var Schema = mongoose_con.Schema;
//var ObjectId = mongoose_con.Schema.Types.ObjectId;
//https://mongoosejs.com/docs/populate.html


/* ============== SCHEMA PROPUESTA ====================== */
var propSchema = new Schema({
  _id                   :Schema.Types.ObjectId,
  propDescripcion       :String ,
  propJornada           :String ,
  propSueldo            :{ type: Number, min: 0 },
  propExperiencia       :String ,
  propResponsabilidades :String ,
  propHabilidades       :String ,
  propFecPublicacion    :{ type: Date, default: Date.now() },
  propFecVencimiento    :{ type: Date, default: Date.now() + 14*24*60*60*1000},
  
  empresa: { type: Schema.Types.ObjectId, ref: 'empresa' },

 });

 /* ============== SCHEMA EMPRESA ====================== */
var empSchema = new Schema({
  _id: Schema.Types.ObjectId,
  emp_razsoc:  String,
/* emp_ruc:  {
     type: String,
     required: [true, 'Ruc no valido']
   },*/
// _id:           ObjectId,
 
  emp_Dir:       String,
  emp_FecAni:    String,
  emp_TerTel:    String,
  emp_TerWebUrl: String,
// stories: [{ type: Schema.Types.ObjectId, ref: 'Story' }],
  propuestas: [{ type: Schema.Types.ObjectId, ref: 'propuesta' }],  

 //propuestas: [propSchema] 
});

/* ============== SCHEMA USUARIO ====================== */
//var Autor = mongoose_con.model('usuarios');
var usuariosSchema = new Schema({

    usuUsuario: {
          type: String,
          lowercase: true,
    },
    usuNombre   :String,
    usuCodAlumno:String, // usercode example 2005701731
    usuPassword :String,
    usuPrograma :String,
    usuTipUsuario: {
      type: String,
      enum: ["admin", "alumno"],
      default:"alumno",
      lowercase: true,
},
    
 // usuIntereses:string,
  propuestas: [{ type: Schema.ObjectId, ref: "propuesta" }] 
});


module.exports = mongoose_con.model("propuestas", empSchema);

module.exports.Propuestas   = mongoose_con.model("propuesta", propSchema);
module.exports.Usuarios     = mongoose_con.model("usuario", usuariosSchema);
module.exports.Empresa   = mongoose_con.model("empresa", empSchema);

/*
module.exports.Alumnos = function () { 
  console.log(msg);
};*/