
var pool = require('./connection')
const empModel = {};

const toAuthJSON = function () {
  return {
    _id: this._id,
    email: this.email,
    token: this.generateJWT()
  };
};

empModel.insert = async (req, res) => {
  await pool.query('insert into t01fcli  set  ?', [req.newUser])
    .catch(err => {
      res.send('Error:  ' + err.sqlMessage)
      throw (err)
    })
  // res.json({ user: finalUser.toAuthJSON() });
  console.log('User Insert')
  res.send('User Insert');
};

module.exports = empModel;
