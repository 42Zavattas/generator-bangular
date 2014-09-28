'use strict';

var fs = require('fs');

function handleError(res, err) {
  return res.status(500).send(err);
}

/**
 * Get list of <%= _.camelize(name) %>s
 *
 * @param req
 * @param res
 */
exports.index = function (req, res) {
  fs.readFile('server/api/<%= name %>/<%= name %>.data.json', 'utf-8', function (err, <%= pluralName %>) {
    if (err) { return handleError(res, err); }
    res.status(200).json(JSON.parse(<%= pluralName %>));
  });
};

/**
 * Get a single <%= _.camelize(name) %>
 *
 * @param req
 * @param res
 */
exports.show = function (req, res) {
  res.status(200).json({});
};

/**
 * Creates a new <%= _.camelize(name) %>
 *
 * @param req
 * @param res
 */
exports.create = function (req, res) {
  res.status(201).json({});
};

/**
 * Updates an existing <%= _.camelize(name) %>
 *
 * @param req
 * @param res
 */
exports.update = function (req, res) {
  res.status(200).json({});
};

/**
 * Deletes a <%= _.camelize(name) %>
 *
 * @param req
 * @param res
 */
exports.destroy = function (req, res) {
  return res.send(204);
};
