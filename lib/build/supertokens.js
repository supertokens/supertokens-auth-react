"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports["default"] = void 0;

var _constants = require("./constants");

var _superTokensUrl = _interopRequireDefault(require("./superTokensUrl"));

var _utils = require("./utils");

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

var _require = require("./components/superTokensRoute"),
    _getSuperTokensRoutesForReactDomRouter = _require.getSuperTokensRoutesForReactDomRouter;
/*
 * Class.
 */

var SuperTokens = /*#__PURE__*/ (function() {
    /*
     * Static Attributes.
     */

    /*
     * Instance Attributes.
     */

    /*
     * Constructor.
     */
    function SuperTokens(config) {
        var _this = this;

        _classCallCheck(this, SuperTokens);

        this.recipeList = [];

        this.getAppInfo = function() {
            return _this.appInfo;
        };

        this.canHandleRoute = function() {
            var url = new _superTokensUrl["default"](); // If pathname doesn't start with websiteBasePath, return false.

            if (!url.matchesBasePath) {
                return false;
            }

            return _this.recipeList.some(function(recipe) {
                return recipe.canHandleRoute(url);
            });
        };

        this.getRoutingComponent = function() {
            var url = new _superTokensUrl["default"](); // If pathname doesn't start with websiteBasePath, return false.

            if (!url.matchesBasePath) {
                return undefined;
            }

            var component;

            for (var i = 0; i < _this.recipeList.length; i++) {
                component = _this.recipeList[i].getRoutingComponent(url);

                if (component !== undefined) {
                    break;
                }
            }

            return component;
        };

        this.getRecipeList = function() {
            return _this.recipeList;
        };

        this.appInfo = {
            appName: config.appInfo.appName,
            apiDomain: (0, _utils.normaliseURLDomainOrThrowError)(config.appInfo.apiDomain),
            websiteDomain: (0, _utils.normaliseURLDomainOrThrowError)(config.appInfo.websiteDomain),
            apiBasePath: SuperTokens.getNormalisedURLPathOrDefault(
                _constants.DEFAULT_API_BASE_PATH,
                config.appInfo.apiBasePath
            ),
            websiteBasePath: SuperTokens.getNormalisedURLPathOrDefault(
                _constants.DEFAULT_WEBSITE_BASE_PATH,
                config.appInfo.websiteBasePath
            ),
            logoFullURL: config.appInfo.logoFullURL
        };

        if (config.recipeList === undefined) {
            throw new Error("No recipeList provided to SuperTokens."); // TODO Add link to appropriate docs.
        }

        this.recipeList = config.recipeList;
    }
    /*
     * Static Methods.
     */

    _createClass(SuperTokens, null, [
        {
            key: "init",
            value: function init(config) {
                if (SuperTokens.instance !== undefined) {
                    throw new Error("SuperTokens was already initialized");
                }

                SuperTokens.instance = new SuperTokens(config);
            }
        },
        {
            key: "getInstanceIfDefined",
            value: function getInstanceIfDefined() {
                if (SuperTokens.instance === undefined) {
                    throw new Error("SuperTokens must be initialized before calling this method.");
                }

                return SuperTokens.instance;
            }
        },
        {
            key: "getAppInfo",
            value: function getAppInfo() {
                return SuperTokens.getInstanceIfDefined().getAppInfo();
            }
        },
        {
            key: "canHandleRoute",
            value: function canHandleRoute() {
                return SuperTokens.getInstanceIfDefined().canHandleRoute();
            }
        },
        {
            key: "getRoutingComponent",
            value: function getRoutingComponent() {
                return SuperTokens.getInstanceIfDefined().getRoutingComponent();
            }
        },
        {
            key: "getRecipeList",
            value: function getRecipeList() {
                return SuperTokens.getInstanceIfDefined().getRecipeList();
            }
        },
        {
            key: "getNormalisedURLPathOrDefault",
            value: function getNormalisedURLPathOrDefault(defaultPath, path) {
                if (path !== undefined) {
                    return (0, _utils.normaliseURLPathOrThrowError)(path);
                } else {
                    return defaultPath;
                }
            }
        },
        {
            key: "getSuperTokensRoutesForReactDomRouter",
            value: function getSuperTokensRoutesForReactDomRouter() {
                return _getSuperTokensRoutesForReactDomRouter();
            }
            /*
             * Instance Methods.
             */
        },
        {
            key: "reset",

            /*
             * Tests methods.
             */
            value: function reset() {
                if (!(0, _utils.isTest)()) {
                    return;
                }

                SuperTokens.instance = undefined;
                return;
            }
        }
    ]);

    return SuperTokens;
})();

exports["default"] = SuperTokens;
