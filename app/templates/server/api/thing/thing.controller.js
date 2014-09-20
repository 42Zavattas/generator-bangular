'use strict';

var _ = require('lodash');
var Thing = require('./thing.model');

function handleError(res, err) {
  return res.send(500, err);
}

/**
 * Get list of things
 *
 * @param req
 * @param res
 */
exports.index = function (req, res) {
  Thing.find(function (err, things) {
    if (err) { return handleError(res, err); }
    return res.status(200).json(things);
  });
};

/**
 * Get a single thing
 *
 * @param req
 * @param res
 */
exports.show = function (req, res) {
  Thing.findById(req.params.id, function (err, thing) {
    if (err) { return handleError(res, err); }
    if (!thing) { return res.send(404); }
    return res.status(200).json(thing);
  });
};

/**
 * Creates a new thing in the DB.
 *
 * @param req
 * @param res
 */
exports.create = function (req, res) {
  Thing.create(req.body, function (err, thing) {
    if (err) { return handleError(res, err); }
    return res.status(201).json(thing);
  });
};

/**
 * Updates an existing thing in the DB.
 *
 * @param req
 * @param res
 */
exports.update = function (req, res) {
  if (req.body._id) { delete req.body._id; }
  Thing.findById(req.params.id, function (err, thing) {
    if (err) { return handleError(res, err); }
    if (!thing) { return res.send(404); }
    var updated = _.merge(thing, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.status(200).json(thing);
    });
  });
};

/**
 * Deletes a thing from the DB.
 *
 * @param req
 * @param res
 */
exports.destroy = function (req, res) {
  Thing.findById(req.params.id, function (err, thing) {
    if (err) { return handleError(res, err); }
    if (!thing) { return res.send(404); }
    thing.remove(function (err) {
      if (err) { return handleError(res, err); }
      return res.send(204);
    });
  });
};
