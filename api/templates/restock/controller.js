'use strict';

var request = require('request');

function handleError (res, err) {
  return res.status(500).send(err);
}

var apiUrl = 'http://www.restock.io/api/';

/**
 * Get list of <%= objectsName %>
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
 * Get a single <%= objectName %>
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
