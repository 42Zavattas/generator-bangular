'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var <%= _.capitalize(_.camelize(name)) %>Schema = new Schema({
  name: String
});

module.exports = mongoose.model('<%= _.capitalize(_.camelize(name)) %>', <%= _.capitalize(_.camelize(name)) %>Schema);
