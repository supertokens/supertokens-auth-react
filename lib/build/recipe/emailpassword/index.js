"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "SignInAndUp", {
    enumerable: true,
    get: function get() {
        return _SignInAndUp["default"];
    }
});
Object.defineProperty(exports, "SignInAndUpTheme", {
    enumerable: true,
    get: function get() {
        return _default["default"];
    }
});
exports.init = exports.EmailPasswordAPIWrapper = exports["default"] = void 0;

var _emailPassword = _interopRequireDefault(require("./emailPassword"));

var _SignInAndUp = _interopRequireDefault(require("./components/signInAndUp/SignInAndUp"));

var _default = _interopRequireDefault(require("./components/signInAndUp/themes/default"));

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
var EmailPasswordAPIWrapper = /*#__PURE__*/ (function() {
    function EmailPasswordAPIWrapper() {
        _classCallCheck(this, EmailPasswordAPIWrapper);
    }

    _createClass(EmailPasswordAPIWrapper, null, [
        {
            key: "init",
            value: function init(config) {
                return _emailPassword["default"].init(config);
            }
        }
    ]);

    return EmailPasswordAPIWrapper;
})();

exports.EmailPasswordAPIWrapper = exports["default"] = EmailPasswordAPIWrapper;
var init = EmailPasswordAPIWrapper.init;
exports.init = init;
