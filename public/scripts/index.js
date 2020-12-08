"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _store = _interopRequireDefault(require("./store"));

var _actions = require("./store/actions");

// import * as Actions from './store/actions'
_store["default"].subscribe(function () {
  console.log(_store["default"].getState());
});

_store["default"].dispatch((0, _actions.addBug)("test bug"));

_store["default"].dispatch((0, _actions.addBug)("another bug"));

_store["default"].dispatch((0, _actions.resolveBug)(2));

_store["default"].dispatch((0, _actions.removeBug)(1));

_store["default"].dispatch((0, _actions.addBug)("login button dissapears on click"));