const express = require('express')
const router = express.Router()

router.use('/products', require('./products'))
router.use('/users', require('./users'))
router.use('/ventas', require('./ventas'))
router.use('/clients', require('./clients'))

module.exports = router
