"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.resolveBug = exports.removeBug = exports.addBug = void 0;

var addBug = function addBug(description) {
  return {
    type: "ADD_BUG",
    payload: {
      description: description
    }
  };
};

exports.addBug = addBug;

var removeBug = function removeBug(id) {
  return {
    type: "REMOVE_BUG",
    payload: {
      id: id
    }
  };
};

exports.removeBug = removeBug;

var resolveBug = function resolveBug(id) {
  return {
    type: "RESOLVE_BUG",
    payload: {
      id: id
    }
  };
};

exports.resolveBug = resolveBug;