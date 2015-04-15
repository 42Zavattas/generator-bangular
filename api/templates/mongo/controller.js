'use strict';

var _ = require('lodash');
var <%= objectName %> = require('./<%= fileName %>.model');

function handleError (res, err) {
  return res.status(500).send(err);
}
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
 * @apiDescription Get all the <%= instanceName %>.
 * @apiGroup <%= objectsName %>
 *
 */<% } %>
exports.index = function (req, res) {
  <%= objectName %>.find(function (err, <%= instancesName %>) {
    if (err) { return handleError(res, err); }
    return res.status(200).json(<%= instancesName %>);
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
 * @apiDescription Get only one unique element of <%= instanceName %> based on its unique id.
 * @apiGroup <%= objectsName %>
 *
 * @apiParam {String} id <%= objectsName %> unique id.
 *
 */<% } %>
exports.show = function (req, res) {
  <%= objectName %>.findById(req.params.id, function (err, <%= instanceName %>) {
    if (err) { return handleError(res, err); }
    if (!<%= instanceName %>) { return res.status(404).end(); }
    return res.status(200).json(<%= instanceName %>);
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
 * @apiDescription Creates a new <%= instanceName %>.
 * @apiGroup <%= objectsName %>
 *
 */<% } %>
exports.create = function (req, res) {
  <%= objectName %>.create(req.body, function (err, <%= instanceName %>) {
    if (err) { return handleError(res, err); }
    return res.status(201).json(<%= instanceName %>);
  });
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
 * @apiDescription Update an element of <%= instanceName %> based on its unique id.
 * @apiGroup <%= objectsName %>
 *
 * @apiParam {String} id <%= objectsName %> unique id.
 *
 */<% } %>
exports.update = function (req, res) {
  if (req.body._id) { delete req.body._id; }
  <%= objectName %>.findById(req.params.id, function (err, <%= instanceName %>) {
    if (err) { return handleError(res, err); }
    if (!<%= instanceName %>) { return res.status(404).end(); }
    var updated = _.merge(<%= instanceName %>, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.status(200).json(<%= instanceName %>);
    });
  });
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
 * @apiDescription Delete an element of <%= instanceName %> based on its unique id.
 * @apiGroup <%= objectsName %>
 *
 * @apiParam {String} id <%= objectsName %> unique id.
 *
 */<% } %>
exports.destroy = function (req, res) {
  <%= objectName %>.findById(req.params.id, function (err, <%= instanceName %>) {
    if (err) { return handleError(res, err); }
    if (!<%= instanceName %>) { return res.status(404).end(); }
    <%= instanceName %>.remove(function (err) {
      if (err) { return handleError(res, err); }
      return res.status(204).end();
    });
  });
};
