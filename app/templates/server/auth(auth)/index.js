'use strict';

var express = require('express');
var router = express.Router();

require('./local/passport');

router.use('/local', require('./local'));

module.exports = router;
