'use strict';

var _ = require('lodash');
var <%= objectName %> = require('./<%= fileName %>.model');

function handleError (res, err) {
  return res.status(500).send(err);
}

/**
 * Get list of <%= objectName %>
 *
 * @param req
 * @param res
 */
exports.index = function (req, res) {
  <%= _.capitalize(objectName) %>.find(function (err, <%= instancesName %>) {
    if (err) { return handleError(res, err); }
    return res.status(200).json(<%= instancesName %>);
  });
};

/**
 * Get a single <%= objectName %>
 *
 * @param req
 * @param res
 */
exports.show = function (req, res) {
  <%= _.capitalize(objectName) %>.findById(req.params.id, function (err, <%= instanceName %>) {
    if (err) { return handleError(res, err); }
    if (!<%= instanceName %>) { return res.status(404).end(); }
    return res.status(200).json(<%= instanceName %>);
  });
};

/**
 * Creates a new <%= objectName %> in the DB.
 *
 * @param req
 * @param res
 */
exports.create = function (req, res) {
  <%= _.capitalize(objectName) %>.create(req.body, function (err, <%= instanceName %>) {
    if (err) { return handleError(res, err); }
    return res.status(201).json(<%= instanceName %>);
  });
};

/**
 * Updates an existing <%= objectName %> in the DB.
 *
 * @param req
 * @param res
 */
exports.update = function (req, res) {
  if (req.body._id) { delete req.body._id; }
  <%= _.capitalize(objectName) %>.findById(req.params.id, function (err, <%= instanceName %>) {
    if (err) { return handleError(res, err); }
    if (!<%= instanceName %>) { return res.status(404).end(); }
    var updated = _.merge(<%= instanceName %>, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.status(200).json(<%= instanceName %>);
    });
  });
};

/**
 * Deletes a <%= objectName %> from the DB.
 *
 * @param req
 * @param res
 */
exports.destroy = function (req, res) {
  <%= _.capitalize(objectName) %>.findById(req.params.id, function (err, <%= instanceName %>) {
    if (err) { return handleError(res, err); }
    if (!<%= instanceName %>) { return res.status(404).end(); }
    <%= instanceName %>.remove(function (err) {
      if (err) { return handleError(res, err); }
      return res.status(204).end();
    });
  });
};
