var db = require('../../db')

module.exports = {
  getFacNum: async (ser) => {
    return db.T01FCBO.findOne({
      where: { Ser_Boleta: ser },
      order: [['createdAt', 'DESC']]
    })
      .then((record) => {
        if (!!!record) {
          return 1
        } else {
          return ++record.dataValues.Num_Boleta
        }
      })
      .catch((err) => {
        return 0
      })
  },
  test: () => {
    return 1
  }
}
