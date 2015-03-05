'use strict';

var fs = require('fs');

function handleError (res, err) {
  return res.status(500).send(err);
}

/**
 * Get list of <%= objectsName %>s
 *
 * @param req
 * @param res
 */
exports.index = function (req, res) {
  fs.readFile('server/api/<%= fileName %>/<%= fileName %>.data.json', 'utf-8', function (err, <%= instancesName %>) {
    if (err) { return handleError(res, err); }
    res.status(200).json(JSON.parse(<%= instancesName %>));
  });
};

/**
 * Get a single <%= objectName %>
 *
 * @param req
 * @param res
 */
exports.show = function (req, res) {
  res.status(200).json({});
};

/**
 * Creates a new <%= objectName %>
 *
 * @param req
 * @param res
 */
exports.create = function (req, res) {
  res.status(201).json({});
};

/**
 * Updates an existing <%= objectName %>
 *
 * @param req
 * @param res
 */
exports.update = function (req, res) {
  res.status(200).json({});
};

/**
 * Deletes a <%= objectName %>
 *
 * @param req
 * @param res
 */
exports.destroy = function (req, res) {
  return res.status(204);
};
