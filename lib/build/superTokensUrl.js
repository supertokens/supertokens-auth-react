"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports["default"] = void 0;

var _superTokens = _interopRequireDefault(require("./superTokens"));

var _utils = require("./utils");

var _normalisedURLPath = _interopRequireDefault(require("./normalisedURLPath"));

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
}

function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
    }
}

/*
 * Class.
 */
var SuperTokensUrl = function SuperTokensUrl() {
    _classCallCheck(this, SuperTokensUrl);

    this.recipeId = (0, _utils.getRecipeIdFromSearch)(window.location.search);
    this.pathname = new _normalisedURLPath["default"](window.location.pathname);
    this.matchesBasePath = this.pathname.startsWith(_superTokens["default"].getAppInfo().websiteBasePath);
};

exports["default"] = SuperTokensUrl;
