"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports["default"] = void 0;

var _normalisedURLPath = _interopRequireDefault(require("../normalisedURLPath"));

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
var RecipeModule = function RecipeModule(config) {
    var _this = this;

    _classCallCheck(this, RecipeModule);

    this.getRecipeId = function() {
        return _this.recipeId;
    };

    this.getFeatures = function() {
        return _this.features;
    };

    this.canHandleRoute = function(url) {
        return _this.getRoutingComponent(url) !== undefined;
    };

    this.getRoutingComponent = function(url) {
        // If rId from URL exists and doesn't match, or if route path doesn't start with return undefined.
        if (url.recipeId !== null && url.recipeId !== _this.recipeId) {
            return undefined;
        }

        return _this.features[url.pathnameWithoutWebsiteBasePath.getAsStringDangerous()];
    };

    this.recipeId = config.recipeId;
    this.features = {}; // we store the normalised version of the path here.

    Object.keys(config.features).forEach(function(path) {
        var normalisedPath = new _normalisedURLPath["default"](path);
        _this.features[normalisedPath.getAsStringDangerous()] = config.features[path];
    });
};

exports["default"] = RecipeModule;
