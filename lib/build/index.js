"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.getSuperTokensRoutesForReactDomRouter = exports.getRoutingComponent = exports.init = exports.canHandleRoute = exports[
    "default"
] = void 0;

var _superTokens = _interopRequireDefault(require("./superTokens"));

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
 * API Wrapper exposed to user.
 */
var SuperTokensAPIWrapper = /*#__PURE__*/ (function() {
    function SuperTokensAPIWrapper() {
        _classCallCheck(this, SuperTokensAPIWrapper);
    }

    _createClass(SuperTokensAPIWrapper, null, [
        {
            key: "init",
            value: function init(config) {
                _superTokens["default"].init(config);
            }
        },
        {
            key: "canHandleRoute",
            value: function canHandleRoute() {
                return _superTokens["default"].canHandleRoute();
            }
        },
        {
            key: "getRoutingComponent",
            value: function getRoutingComponent() {
                return _superTokens["default"].getRoutingComponent();
            }
        },
        {
            key: "getSuperTokensRoutesForReactDomRouter",
            value: function getSuperTokensRoutesForReactDomRouter() {
                return _superTokens["default"].getSuperTokensRoutesForReactDomRouter();
            }
        }
    ]);

    return SuperTokensAPIWrapper;
})();

exports["default"] = SuperTokensAPIWrapper;
var canHandleRoute = SuperTokensAPIWrapper.canHandleRoute;
exports.canHandleRoute = canHandleRoute;
var init = SuperTokensAPIWrapper.init;
exports.init = init;
var getRoutingComponent = SuperTokensAPIWrapper.getRoutingComponent;
exports.getRoutingComponent = getRoutingComponent;
var getSuperTokensRoutesForReactDomRouter = _superTokens["default"].getSuperTokensRoutesForReactDomRouter;
exports.getSuperTokensRoutesForReactDomRouter = getSuperTokensRoutesForReactDomRouter;
