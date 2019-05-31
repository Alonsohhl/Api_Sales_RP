const userController = {}

var pool = require('./db/connection')

userController.insert = async (req, res) => {
  // eslint-disable-next-line camelcase
  const { Dni_Cli, Nom_Cli, App_Cli, Apm_Cli, Correo_Cli, Sexo_Cli } = req.body
  const newUser = {
    Dni_Cli,
    Nom_Cli,
    App_Cli,
    Apm_Cli,
    Correo_Cli,
    Sexo_Cli
  }
  await pool.query('insert into t01fcli  set  ?', [newUser])
    .catch(err => {
      res.send('Error:  ' + err.sqlMessage)
      throw (err)
    })
  console.log('User Insert')
  // console.dir(pool)
  res.send('User Insert')
}

userController.udpUser = async (req, res) => {
  // eslint-disable-next-line camelcase
  const { Dni_Cli, App_Cli } = req.body
  // eslint-disable-next-line camelcase
  await pool.query('UPDATE    t01fcli    SET    App_Cli= ?    WHERE    Dni_Cli = ?', [App_Cli, Dni_Cli])
    .catch(err => {
      res.send('Error:  ' + err.sqlMessage)
      throw (err)
    })

  //    TODO usar linter
  res.send('Updated')
}

module.exports = userController
