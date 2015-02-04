'use strict';

var request = require('request');

function handleError(res, err) {
  return res.status(500).send(err);
}

var apiUrl = 'http://www.restock.io/api/';

/**
 * Get list of <%= _.camelize(name) %>s
 *
 * @param req
 * @param res
 */
exports.index = function (req, res) {
  request(apiUrl + '10{name:s}', function (err, resp, body) {
    if (err) { return handleError(res, err); }
    res.status(resp.statusCode).send(body);
  });
};

/**
 * Get a single <%= _.camelize(name) %>
 *
 * @param req
 * @param res
 */
exports.show = function (req, res) {
  request(apiUrl + '{name:s}', function (err, resp, body) {
    if (err) { return handleError(res, err); }
    res.status(resp.statusCode).send(body);
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
  return res.status(204);
};
