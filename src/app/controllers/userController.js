const cliController = {};
var pool = require('../db/connection')

cliController.insert = async (req, res) => {
  const { body: { reqEmp } } = req;

  if (reqEmp) {
    res.end();
  }

  await pool.query('insert into t01fcli  set  ?', [reqEmp])
    .catch(err => {
      res.send('Error:  ' + err.sqlMessage)
      throw (err)
    })
  console.log('Cli Inserted')
  res.send('Cli Insert')
};

module.exports = cliController;
