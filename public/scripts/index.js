"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _store = _interopRequireDefault(require("./store"));

var _actions = require("./store/actions");

var unsubscribe = _store["default"].subscribe(function () {
  console.log(_store["default"].getState());
});

var id = function id() {
  return Math.random().toString(36).substring(2, 6);
};

_store["default"].dispatch((0, _actions.addBug)("reset button dissapear when user want to click on it"));

_store["default"].dispatch((0, _actions.addBug)("app crashes after 32 mins of runtime"));

_store["default"].dispatch((0, _actions.addBug)("layout looks distorted on iPhone12"));

unsubscribe();

_store["default"].dispatch((0, _actions.resolveBug)(2));

_store["default"].dispatch((0, _actions.removeBug)(1));