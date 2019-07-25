
const express = require('express');
const router = express.Router();

router.use('/users', require('./users'));
router.use('/xd', (req) => { console.log('asd'); });

module.exports = router;
