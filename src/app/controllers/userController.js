const userController = {};

var pool=require("./db/connection")

userController.insert = async (req,res) =>{

    const {Dni_Cli,Nom_Cli,App_Cli,Apm_Cli,Correo_Cli,Sexo_Cli} = req.body;
    const newUser = {
        Dni_Cli,
        Nom_Cli,
        App_Cli,
        Apm_Cli,
        Correo_Cli,
        Sexo_Cli
    }
    await pool.query("insert into t01fcli  set  ?",[newUser])
    .catch( err => {
        res.send('Error:  '+err.sqlMessage);
        throw(error);
    });
    console.log("User Insert");
    // console.dir(pool)
    res.send('received');
}

module.exports = userController;