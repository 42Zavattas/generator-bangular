'use strict';

var request = require('request');

function handleError(res, err) {
  return res.send(500, err);
}

/**
 * Get list of <%= _.camelize(name) %>s
 *
 * @param req
 * @param res
 */
exports.index = function (req, res) {
  request('http://www.restock.io/api/10{name:s}', function (err, response, body) {
    if (err) { return handleError(res, err); }
    res.status(response.statusCode).send(body);
  });
};

/**
 * Get a single <%= _.camelize(name) %>
 *
 * @param req
 * @param res
 */
exports.show = function (req, res) {
  request('http://www.restock.io/api/{name:s}', function (err, response, body) {
    if (err) { return handleError(res, err); }
    res.status(response.statusCode).send(body);
  });
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
