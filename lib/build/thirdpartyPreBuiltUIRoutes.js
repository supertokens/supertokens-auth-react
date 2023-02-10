"use strict";

var jsxRuntime = require("react/jsx-runtime");
var React = require("react");
var sessionAuth = require("./session-shared.js");
var recipe = require("./thirdparty-shared.js");
require("supertokens-web-js/utils/cookieHandler");
require("supertokens-web-js/utils/normalisedURLDomain");
require("supertokens-web-js/utils/normalisedURLPath");
require("supertokens-web-js/utils/windowHandler");
require("supertokens-web-js/utils/postSuperTokensInitCallbacks");
require("supertokens-web-js/recipe/session/recipe");
require("./authRecipe-shared.js");
require("./translationContext.js");
require("./session-shared2.js");
require("supertokens-web-js/recipe/session");
require("./index2.js");
require("react-dom");
require("supertokens-web-js/utils/error");
require("./spinnerIcon.js");
require("supertokens-web-js/recipe/thirdparty/recipeImplementation");

function _interopDefault(e) {
    return e && e.__esModule ? e : { default: e };
}

var React__default = /*#__PURE__*/ _interopDefault(React);

var RecipeRoutes = /** @class */ (function () {
    function RecipeRoutes(recipe) {
        var _this = this;
        this.recipe = recipe;
        /*
         * Instance Methods.
         */
        this.canHandleRoute = function () {
            return (
                _this.getMatchingComponentForRouteAndRecipeId(sessionAuth.getCurrentNormalisedUrlPath()) !== undefined
            );
        };
        this.getReactRouterDomWithCustomHistory = function () {
            return RecipeRoutes.reactRouterDom;
        };
        this.getRoutingComponent = function () {
            return jsxRuntime.jsx(sessionAuth.RoutingComponent, {
                path: sessionAuth.getCurrentNormalisedUrlPath().getAsStringDangerous(),
                supertokensInstance: _this,
            });
        };
        this.getPathsToFeatureComponentWithRecipeIdMap = function () {
            // Memoized version of the map.
            if (_this.pathsToFeatureComponentWithRecipeIdMap !== undefined) {
                return _this.pathsToFeatureComponentWithRecipeIdMap;
            }
            var pathsToFeatureComponentWithRecipeIdMap = {};
            var features = _this.recipe.getFeatures();
            var featurePaths = Object.keys(features);
            for (var j = 0; j < featurePaths.length; j++) {
                // If no components yet for this route, initialize empty array.
                var featurePath = featurePaths[j];
                if (pathsToFeatureComponentWithRecipeIdMap[featurePath] === undefined) {
                    pathsToFeatureComponentWithRecipeIdMap[featurePath] = [];
                }
                pathsToFeatureComponentWithRecipeIdMap[featurePath].push(features[featurePath]);
            }
            _this.pathsToFeatureComponentWithRecipeIdMap = pathsToFeatureComponentWithRecipeIdMap;
            return _this.pathsToFeatureComponentWithRecipeIdMap;
        };
        this.getMatchingComponentForRouteAndRecipeId = function (normalisedUrl) {
            var path = normalisedUrl.getAsStringDangerous();
            var routeComponents = _this.getPathsToFeatureComponentWithRecipeIdMap()[path];
            if (routeComponents === undefined) {
                return undefined;
            }
            var component = routeComponents.find(function (c) {
                return c.matches();
            });
            if (component !== undefined) {
                return component;
            }
            // Otherwise, If no recipe Id provided, or if no recipe id matches, return the first matching component.
            return routeComponents[0];
        };
    }
    RecipeRoutes.getRoutes = function (reactRouterDom, instance) {
        if (reactRouterDom === undefined) {
            throw new Error(
                // eslint-disable-next-line @typescript-eslint/quotes
                'Please use getSuperTokensRoutesForReactRouterDom like getSuperTokensRoutesForReactRouterDom(require("react-router-dom")) in your render function'
            );
        }
        RecipeRoutes.reactRouterDom = reactRouterDom;
        if (RecipeRoutes.reactRouterDomIsV6 === undefined) {
            RecipeRoutes.reactRouterDomIsV6 = reactRouterDom.withRouter === undefined;
        }
        if (RecipeRoutes.reactRouterDomIsV6) {
            // this function wraps the react-router-dom v6 useNavigate function in a way
            // that enforces that it runs within a useEffect. The reason we do this is
            // cause of https://github.com/remix-run/react-router/issues/7460
            // which gets shown when visiting a social auth callback url like
            // /auth/callback/github, without a valid code or state. This then
            // doesn't navigate the user to the auth page.
            var useNavigateHookForRRDV6 = function () {
                var navigateHook = reactRouterDom.useNavigate();
                var _a = React__default.default.useState(undefined),
                    to = _a[0],
                    setTo = _a[1];
                React__default.default.useEffect(
                    function () {
                        if (to !== undefined) {
                            setTo(undefined);
                            navigateHook(to);
                        }
                    },
                    [to, navigateHook, setTo]
                );
                return setTo;
            };
            RecipeRoutes.reactRouterDom = {
                router: reactRouterDom,
                useHistoryCustom: useNavigateHookForRRDV6,
            };
            return sessionAuth.getSuperTokensRoutesForReactRouterDomV6(instance);
        }
        RecipeRoutes.reactRouterDom = {
            router: reactRouterDom,
            useHistoryCustom: reactRouterDom.useHistory,
        };
        return sessionAuth.getSuperTokensRoutesForReactRouterDom(instance);
    };
    RecipeRoutes.reactRouterDomIsV6 = undefined;
    return RecipeRoutes;
})();

var getThirdPartyPreBuiltUIRoutes = function (router) {
    var ThirdPartPrebuiltRoutes = new RecipeRoutes(recipe.ThirdParty.getInstanceOrThrow());
    return RecipeRoutes.getRoutes(router, ThirdPartPrebuiltRoutes);
};

exports.getThirdPartyPreBuiltUIRoutes = getThirdPartyPreBuiltUIRoutes;
//# sourceMappingURL=thirdpartyPreBuiltUIRoutes.js.map
