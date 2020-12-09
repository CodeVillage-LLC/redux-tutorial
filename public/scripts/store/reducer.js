"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

var _default = function _default() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  var action = arguments.length > 1 ? arguments[1] : undefined;

  switch (action.type) {
    case "ADD_BUG":
      return [].concat((0, _toConsumableArray2["default"])(state), [{
        id: state.length + 1,
        description: action.payload.description,
        resolve: false
      }]);
      break;

    case "RESOLVE_BUG":
      return state.map(function (bug) {
        if (bug.id === action.payload.id) bug.resolved = true;
        return bug;
      });
      break;

    case "REMOVE_BUG":
      return state.filter(function (bug) {
        return bug.id !== action.payload.id;
      });
      break;

    default:
      return state;
      break;
  }
};

exports["default"] = _default;