'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var <%= objectName %>Schema = new Schema({
  name: String
});

module.exports = mongoose.model('<%= objectName %>', <%= objectName %>Schema);
