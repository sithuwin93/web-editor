"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

/**
 * Return tail end of the string matching trigger upto the position.
 */
var _default = function _default(blockText, position, trigger) {
  var str = blockText.substr(0, position);
  var begin = str.lastIndexOf(trigger);
  var matchingString = str.slice(begin + trigger.length);
  var end = str.length;
  return {
    begin: begin,
    end: end,
    matchingString: matchingString
  };
};

exports.default = _default;