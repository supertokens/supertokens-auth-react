"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.init = exports.SessionAPIWrapper = exports["default"] = void 0;

var _session = _interopRequireDefault(require("./session"));

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
}

function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
    }
}

function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
    }
}

function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    return Constructor;
}

/*
 * Class.
 */
var SessionAPIWrapper = /*#__PURE__*/ (function() {
    function SessionAPIWrapper() {
        _classCallCheck(this, SessionAPIWrapper);
    }

    _createClass(SessionAPIWrapper, null, [
        {
            key: "init",
            value: function init(config) {
                return _session["default"].init(config);
            }
        }
    ]);

    return SessionAPIWrapper;
})();

exports.SessionAPIWrapper = exports["default"] = SessionAPIWrapper;
var init = SessionAPIWrapper.init;
exports.init = init;
