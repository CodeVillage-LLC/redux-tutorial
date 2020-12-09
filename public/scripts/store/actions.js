"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.removeBug = exports.resolveBug = exports.addBug = void 0;

/**
 * store = [
 * {
 *    id: 1,
 *    description: "...",
 *    resolved: false
 * }
 * ]
 */
var addBug = function addBug(description) {
  return {
    type: "ADD_BUG",
    payload: {
      description: description
    }
  };
};

exports.addBug = addBug;

var resolveBug = function resolveBug(id) {
  return {
    type: "RESOLVE_BUG",
    payload: {
      id: id
    }
  };
};

exports.resolveBug = resolveBug;

var removeBug = function removeBug(id) {
  return {
    type: "REMOVE_BUG",
    payload: {
      id: id
    }
  };
};

exports.removeBug = removeBug;