const empController = {};
var pool = require('../db/connection')

empController.insert = async (req, res) => {
  const { body: { reqEmp } } = req;

  if (reqEmp) {
    res.end();
  }

  await pool.query('insert into t01fcli  set  ?', [reqEmp])
    .catch(err => {
      res.send('Error:  ' + err.sqlMessage)
      throw (err)
    })
  console.log('Emp Inserted')
  res.send('Emp Insert')
  //   res.end();
};

module.exports = empController;
