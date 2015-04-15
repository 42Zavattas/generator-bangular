'use strict';

var request = require('request');

function handleError (res, err) {
  return res.status(500).send(err);
}

var apiUrl = 'http://www.restock.io/api/';

<% if (!filters.apidoc) { %>
/**
 * Get list of <%= objectName %>
 *
 * @param req
 * @param res
 */<% } else { %>
/**
 * @api {get} /<%= instancesName %> Get a list of <%= instancesName %>
 * @apiVersion 0.1.0
 * @apiName Get<%= objectsName %>
 * @apiGroup <%= objectsName %>
 *
 */<% } %>
exports.index = function (req, res) {
  request(apiUrl + '10{name:s}', function (err, resp, body) {
    if (err) { return handleError(res, err); }
    res.status(resp.statusCode).send(body);
  });
};

<% if (!filters.apidoc) { %>
/**
 * Get a single <%= objectName %>
 *
 * @param req
 * @param res
 */<% } else { %>
/**
 * @api {get} /<%= instancesName %>/:id Get a single <%= instanceName %>
 * @apiVersion 0.1.0
 * @apiName Get<%= objectName %>
 * @apiGroup <%= objectsName %>
 *
 */<% } %>
exports.show = function (req, res) {
  request(apiUrl + '{name:s}', function (err, resp, body) {
    if (err) { return handleError(res, err); }
    res.status(resp.statusCode).send(body);
  });
};

<% if (!filters.apidoc) { %>
/**
 * Creates a new <%= objectName %> in the DB.
 *
 * @param req
 * @param res
 */<% } else { %>
/**
 * @api {post} /<%= instancesName %> Create a new <%= instanceName %>
 * @apiVersion 0.1.0
 * @apiName Create<%= objectName %>
 * @apiGroup <%= objectsName %>
 *
 */<% } %>
exports.create = function (req, res) {
  res.status(201).json({});
};

<% if (!filters.apidoc) { %>
/**
 * Updates an existing <%= objectName %> in the DB.
 *
 * @param req
 * @param res
 */<% } else { %>
/**
 * @api {put} /<%= instancesName %>/:id Updates an existing <%= instanceName %>
 * @apiVersion 0.1.0
 * @apiName Update<%= objectName %>
 * @apiGroup <%= objectsName %>
 *
 */<% } %>
exports.update = function (req, res) {
  res.status(200).json({});
};

<% if (!filters.apidoc) { %>
/**
 * Deletes a <%= objectName %> from the DB.
 *
 * @param req
 * @param res
 */<% } else { %>
/**
 * @api {delete} /<%= instancesName %>/:id Deletes a <%= instanceName %>
 * @apiVersion 0.1.0
 * @apiName Remove<%= objectName %>
 * @apiGroup <%= objectsName %>
 *
 */<% } %>
exports.destroy = function (req, res) {
  return res.status(204);
};
