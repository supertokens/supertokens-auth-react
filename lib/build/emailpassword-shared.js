"use strict";

var jsxRuntime = require("react/jsx-runtime");
var utils = require("./utils.js");
require("./index.js");
var translationContext = require("./translationContext.js");

// This component tries to get the recipe instance and returns an empty div for SSR environments if it fails (throws in non SSR)
var SSRSafeWrapper = function (props) {
    var getRecipe = props.getRecipe,
        getFeatureComponent = props.getFeatureComponent,
        componentName = props.componentName;
    var recipeInstance;
    try {
        recipeInstance = getRecipe();
    } catch (e) {
        // eslint-disable-next-line supertokens-auth-react/no-direct-window-object
        if (typeof window === "undefined") {
            return jsxRuntime.jsx(jsxRuntime.Fragment, {});
        }
        throw e;
    }
    return getFeatureComponent(componentName, recipeInstance);
};

// eslint-disable-next-line comma-spacing
var getRecipeFeaturesSSRSafe = function (getRecipeInstance, getRecipefeatures) {
    var recipeInstance;
    try {
        recipeInstance = getRecipeInstance();
    } catch (e) {
        // eslint-disable-next-line supertokens-auth-react/no-direct-window-object
        if (typeof window === "undefined") {
            return {};
        }
        throw e;
    }
    return getRecipefeatures(recipeInstance);
};

/*
 * Component.
 */
function Button(_a) {
    var type = _a.type,
        label = _a.label,
        disabled = _a.disabled,
        isLoading = _a.isLoading,
        onClick = _a.onClick;
    var t = translationContext.useTranslation();
    if (disabled === undefined) {
        disabled = false;
    }
    return jsxRuntime.jsxs(
        "button",
        utils.__assign(
            { type: type, disabled: disabled, onClick: onClick, "data-supertokens": "button" },
            { children: [t(label), isLoading && "..."] }
        )
    );
}

exports.Button = Button;
exports.SSRSafeWrapper = SSRSafeWrapper;
exports.getRecipeFeaturesSSRSafe = getRecipeFeaturesSSRSafe;
//# sourceMappingURL=emailpassword-shared.js.map
