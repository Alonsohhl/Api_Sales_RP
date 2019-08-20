
const express = require('express');
const router = express.Router();

router.use('/products', require('./products'));
router.use('/users', require('./users'));

module.exports = router;
