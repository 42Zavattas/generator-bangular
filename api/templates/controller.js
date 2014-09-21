'use strict';

var _ = require('lodash');
var <%= _.capitalize(_.camelize(name)) %> = require('./<%= _.camelize(name) %>.model');

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
  <%= _.capitalize(_.camelize(name)) %>.find(function (err, <%= _.camelize(pluralName) %>) {
    if (err) { return handleError(res, err); }
    return res.status(200).json(<%= _.camelize(pluralName) %>);
  });
};

/**
 * Get a single <%= _.camelize(name) %>
 *
 * @param req
 * @param res
 */
exports.show = function (req, res) {
  <%= _.capitalize(_.camelize(name)) %>.findById(req.params.id, function (err, <%= _.camelize(name) %>) {
    if (err) { return handleError(res, err); }
    if (!<%= _.camelize(name) %>) { return res.send(404); }
    return res.status(200).json(<%= _.camelize(name) %>);
  });
};

/**
 * Creates a new <%= _.camelize(name) %> in the DB.
 *
 * @param req
 * @param res
 */
exports.create = function (req, res) {
  <%= _.capitalize(_.camelize(name)) %>.create(req.body, function (err, <%= _.camelize(name) %>) {
    if (err) { return handleError(res, err); }
    return res.status(201).json(<%= _.camelize(name) %>);
  });
};

/**
 * Updates an existing <%= _.camelize(name) %> in the DB.
 *
 * @param req
 * @param res
 */
exports.update = function (req, res) {
  if (req.body._id) { delete req.body._id; }
  <%= _.capitalize(_.camelize(name)) %>.findById(req.params.id, function (err, <%= _.camelize(name) %>) {
    if (err) { return handleError(res, err); }
    if (!<%= _.camelize(name) %>) { return res.send(404); }
    var updated = _.merge(thing, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.status(200).json(<%= _.camelize(name) %>);
    });
  });
};

/**
 * Deletes a <%= _.camelize(name) %> from the DB.
 *
 * @param req
 * @param res
 */
exports.destroy = function (req, res) {
  <%= _.capitalize(_.camelize(name)) %>.findById(req.params.id, function (err, <%= _.camelize(name) %>) {
    if (err) { return handleError(res, err); }
    if (!<%= _.camelize(name) %>) { return res.send(404); }
    <%= _.camelize(name) %>.remove(function (err) {
      if (err) { return handleError(res, err); }
      return res.send(204);
    });
  });
};
