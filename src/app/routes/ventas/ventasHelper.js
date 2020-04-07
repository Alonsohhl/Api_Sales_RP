var db = require('../../db')
const Sequelize = require('sequelize')

module.exports = {
  getFacNum: async (ser) => {
    return db.T01FCBO.max('Num_Boleta', { where: { Ser_Boleta: ser } }) // 10

      .then((record) => {
        return ++record
      })
      .catch((err) => {
        console.log(err)
        return 0
      })
  }
}
