"use strict";

var genericComponentOverrideContext = require("./genericComponentOverrideContext.js");
var jsxRuntime = require("react/jsx-runtime");
var React = require("react");
var NormalisedURLPath = require("supertokens-web-js/utils/normalisedURLPath");
var translationContext = require("./translationContext.js");
var reactDom = require("react-dom");
var componentOverrideContext = require("./multitenancy-shared.js");
var recipe = require("./session-shared2.js");

function _interopDefault(e) {
    return e && e.__esModule ? e : { default: e };
}

var React__default = /*#__PURE__*/ _interopDefault(React);
var NormalisedURLPath__default = /*#__PURE__*/ _interopDefault(NormalisedURLPath);

var ComponentOverrideContext = React__default.default.createContext("IS_DEFAULT");

/*
 * Component.
 */
var ErrorBoundary = /** @class */ (function (_super) {
    genericComponentOverrideContext.__extends(ErrorBoundary, _super);
    function ErrorBoundary(props) {
        var _this = _super.call(this, props) || this;
        _this.state = { hasError: false };
        return _this;
    }
    ErrorBoundary.getDerivedStateFromError = function () {
        return { hasError: true };
    };
    ErrorBoundary.prototype.componentDidCatch = function (error, errorInfo) {
        console.info(error, errorInfo);
    };
    ErrorBoundary.prototype.render = function () {
        if (this.state.hasError) {
            return jsxRuntime.jsx(React.Fragment, {});
        }
        return this.props.children;
    };
    return ErrorBoundary;
})(React__default.default.Component);

var dynamicLoginMethodsContext = React__default.default.createContext(undefined);
var useDynamicLoginMethods = function () {
    var value = React__default.default.useContext(dynamicLoginMethodsContext);
    if (value === undefined) {
        throw new Error("useDynamicLoginMethods used outside of a valid provider (FeatureWrapper)");
    }
    return value;
};
var DynamicLoginMethodsProvider = function (_a) {
    var value = _a.value,
        children = _a.children;
    var contextValue = value === undefined ? { loaded: false } : { loaded: true, loginMethods: value };
    return jsxRuntime.jsx(
        dynamicLoginMethodsContext.Provider,
        genericComponentOverrideContext.__assign({ value: contextValue }, { children: children })
    );
};

var UserContextContext = React__default.default.createContext(undefined);
var useUserContext = function () {
    return React__default.default.useContext(UserContextContext);
};
var UserContextProvider = function (_a) {
    var children = _a.children,
        userContext = _a.userContext;
    var currentUserContext = React.useState(genericComponentOverrideContext.getNormalisedUserContext(userContext))[0];
    return jsxRuntime.jsx(
        UserContextContext.Provider,
        genericComponentOverrideContext.__assign({ value: currentUserContext }, { children: children })
    );
};

function FeatureWrapper(_a) {
    var children = _a.children,
        useShadowDom = _a.useShadowDom,
        defaultStore = _a.defaultStore;
    var userContext = useUserContext();
    var _b = React.useState(undefined),
        error = _b[0],
        setError = _b[1];
    var _c = React.useState(undefined),
        loadedDynamicLoginMethods = _c[0],
        setLoadedDynamicLoginMethods = _c[1];
    var st = genericComponentOverrideContext.SuperTokens.getInstanceOrThrow();
    React.useEffect(
        function () {
            if (loadedDynamicLoginMethods) {
                return;
            }
            genericComponentOverrideContext.Multitenancy.getInstanceOrThrow()
                .getCurrentDynamicLoginMethods({ userContext: userContext })
                .then(
                    function (loginMethods) {
                        return setLoadedDynamicLoginMethods(loginMethods);
                    },
                    function (err) {
                        return setError(err);
                    }
                );
        },
        [loadedDynamicLoginMethods, setLoadedDynamicLoginMethods]
    );
    if (error) {
        throw error;
    }
    if (genericComponentOverrideContext.SuperTokens.usesDynamicLoginMethods && !loadedDynamicLoginMethods) {
        return jsxRuntime.jsx(DynamicLoginMethodsSpinner, {});
    }
    return jsxRuntime.jsx(
        DynamicLoginMethodsProvider,
        genericComponentOverrideContext.__assign(
            { value: loadedDynamicLoginMethods },
            {
                children: jsxRuntime.jsx(ErrorBoundary, {
                    children: jsxRuntime.jsx(
                        translationContext.TranslationContextProvider,
                        genericComponentOverrideContext.__assign(
                            {
                                defaultLanguage: st.languageTranslations.defaultLanguage,
                                defaultStore: genericComponentOverrideContext.mergeObjects(
                                    defaultStore,
                                    st.languageTranslations.userTranslationStore
                                ),
                                translationControlEventSource: st.languageTranslations.translationEventSource,
                                userTranslationFunc: st.languageTranslations.userTranslationFunc,
                            },
                            {
                                children: jsxRuntime.jsx(
                                    WithOrWithoutShadowDom,
                                    genericComponentOverrideContext.__assign(
                                        { useShadowDom: useShadowDom },
                                        { children: children }
                                    )
                                ),
                            }
                        )
                    ),
                }),
            }
        )
    );
}
function WithShadowDom(_a) {
    var children = _a.children;
    var rootDiv = React.useRef(null);
    var _b = React.useState(),
        shadowRoot = _b[0],
        setShadowRoot = _b[1];
    React.useEffect(
        function () {
            if (rootDiv.current) {
                // defaults from react-shadow
                setShadowRoot(function (os) {
                    return (
                        os ||
                        rootDiv.current.shadowRoot ||
                        rootDiv.current.attachShadow({ mode: "open", delegatesFocus: false })
                    );
                });
            }
        },
        [rootDiv]
    );
    // Otherwise, use shadow dom.
    return jsxRuntime.jsx(
        "div",
        genericComponentOverrideContext.__assign(
            { id: genericComponentOverrideContext.ST_ROOT_ID, ref: rootDiv },
            { children: shadowRoot && reactDom.createPortal(children, shadowRoot) }
        )
    );
}
function WithOrWithoutShadowDom(_a) {
    var children = _a.children,
        useShadowDom = _a.useShadowDom;
    // If explicitely specified to not use shadow dom.
    if (useShadowDom === false) {
        return jsxRuntime.jsxs(
            "div",
            genericComponentOverrideContext.__assign(
                { id: genericComponentOverrideContext.ST_ROOT_ID },
                { children: [children, jsxRuntime.jsx(DisableAutoFillInput, {})] }
            )
        );
    }
    return jsxRuntime.jsxs(WithShadowDom, { children: [children, jsxRuntime.jsx(DisableAutoFillInput, {})] });
}
function DisableAutoFillInput() {
    /* eslint-disable react/jsx-no-literals */
    return jsxRuntime.jsx(
        "style",
        genericComponentOverrideContext.__assign(
            { type: "text/css" },
            {
                children:
                    "input.supertokens-input:-webkit-autofill,input.supertokens-input:-webkit-autofill:focus,input.supertokens-input:-webkit-autofill:hover,select:-webkit-autofill,select:-webkit-autofill:focus,select:-webkit-autofill:hover,textarea:-webkit-autofill,textarea:-webkit-autofill:focus,textarea:-webkit-autofill:hover{transition:background-color 5000s ease-in-out 0s}",
            }
        )
    );
    /* eslint-enable react/jsx-no-literals */
}

/* Copyright (c) 2021, VRAI Labs and/or its affiliates. All rights reserved.
 *
 * This software is licensed under the Apache License, Version 2.0 (the
 * "License") as published by the Apache Software Foundation.
 *
 * You may not use this file except in compliance with the License. You may
 * obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
 * License for the specific language governing permissions and limitations
 * under the License.
 */
/*
 * Imports.
 */
/*
 * Component.
 */
function SpinnerIcon() {
    return jsxRuntime.jsx(
        "svg",
        genericComponentOverrideContext.__assign(
            { version: "1.1", viewBox: "25 25 50 50", "data-supertokens": "spinnerIcon" },
            {
                children: jsxRuntime.jsxs(
                    "circle",
                    genericComponentOverrideContext.__assign(
                        {
                            cx: "50",
                            cy: "50",
                            r: "20",
                            fill: "none",
                            stroke: "rgb(var(--palette-primary))",
                            strokeWidth: "5",
                            strokeLinecap: "round",
                            strokeDashoffset: "0",
                            strokeDasharray: "100, 200",
                        },
                        {
                            children: [
                                jsxRuntime.jsx("animateTransform", {
                                    attributeName: "transform",
                                    attributeType: "XML",
                                    type: "rotate",
                                    from: "0 50 50",
                                    to: "360 50 50",
                                    dur: "4s",
                                    repeatCount: "indefinite",
                                }),
                                jsxRuntime.jsx("animate", {
                                    attributeName: "stroke-dashoffset",
                                    values: "0;-30;-124",
                                    dur: "2s",
                                    repeatCount: "indefinite",
                                }),
                                jsxRuntime.jsx("animate", {
                                    attributeName: "stroke-dasharray",
                                    values: "0,200;110,200;110,200",
                                    dur: "2s",
                                    repeatCount: "indefinite",
                                }),
                            ],
                        }
                    )
                ),
            }
        )
    );
}

var useComponentOverride = function (overrideKey) {
    var ctx = React.useContext(ComponentOverrideContext);
    if (ctx === "IS_DEFAULT") {
        throw new Error("Cannot use component override outside ComponentOverrideContext provider.");
    }
    var OverrideComponent = ctx[overrideKey];
    return OverrideComponent === undefined ? null : OverrideComponent;
};

var withOverride = function (overrideKey, DefaultComponent) {
    var finalKey = overrideKey + "_Override";
    DefaultComponent.displayName = finalKey;
    return function (props) {
        var OverrideComponent = useComponentOverride(finalKey);
        if (OverrideComponent !== null) {
            return jsxRuntime.jsx(
                OverrideComponent,
                genericComponentOverrideContext.__assign({ DefaultComponent: DefaultComponent }, props)
            );
        }
        return jsxRuntime.jsx(DefaultComponent, genericComponentOverrideContext.__assign({}, props));
    };
};

var styles =
    '[data-supertokens~="container"] {\n    --palette-background: 255, 255, 255;\n    --palette-inputBackground: 250, 250, 250;\n    --palette-inputBorder: 224, 224, 224;\n    --palette-primary: 255, 155, 51;\n    --palette-primaryBorder: 238, 141, 35;\n    --palette-success: 65, 167, 0;\n    --palette-successBackground: 217, 255, 191;\n    --palette-error: 255, 23, 23;\n    --palette-errorBackground: 255, 241, 235;\n    --palette-textTitle: 34, 34, 34;\n    --palette-textLabel: 34, 34, 34;\n    --palette-textInput: 34, 34, 34;\n    --palette-textPrimary: 101, 101, 101;\n    --palette-textLink: 0, 118, 255;\n    --palette-buttonText: 255, 255, 255;\n    --palette-textGray: 128, 128, 128;\n    --palette-superTokensBrandingBackground: 242, 245, 246;\n    --palette-superTokensBrandingText: 173, 189, 196;\n\n    --font-size-0: 12px;\n    --font-size-1: 14px;\n    --font-size-2: 16px;\n    --font-size-3: 19px;\n    --font-size-4: 24px;\n}\n/*\n * Default styles.\n */\n@-webkit-keyframes slideTop {\n    0% {\n        -webkit-transform: translateY(-5px);\n                transform: translateY(-5px);\n    }\n    100% {\n        -webkit-transform: translateY(0px);\n                transform: translateY(0px);\n    }\n}\n@keyframes slideTop {\n    0% {\n        -webkit-transform: translateY(-5px);\n                transform: translateY(-5px);\n    }\n    100% {\n        -webkit-transform: translateY(0px);\n                transform: translateY(0px);\n    }\n}\n@-webkit-keyframes swing-in-top-fwd {\n    0% {\n        -webkit-transform: rotateX(-100deg);\n        transform: rotateX(-100deg);\n        -webkit-transform-origin: top;\n        transform-origin: top;\n        opacity: 0;\n    }\n    100% {\n        -webkit-transform: rotateX(0deg);\n        transform: rotateX(0deg);\n        -webkit-transform-origin: top;\n        transform-origin: top;\n        opacity: 1;\n    }\n}\n@keyframes swing-in-top-fwd {\n    0% {\n        -webkit-transform: rotateX(-100deg);\n        transform: rotateX(-100deg);\n        -webkit-transform-origin: top;\n        transform-origin: top;\n        opacity: 0;\n    }\n    100% {\n        -webkit-transform: rotateX(0deg);\n        transform: rotateX(0deg);\n        -webkit-transform-origin: top;\n        transform-origin: top;\n        opacity: 1;\n    }\n}\n[data-supertokens~="container"] {\n    font-family: "Rubik", sans-serif;\n    margin: 12px auto;\n    margin-top: 26px;\n    margin-bottom: 26px;\n    width: 420px;\n    text-align: center;\n    border-radius: 8px;\n    box-shadow: 1px 1px 10px rgba(0, 0, 0, 0.16);\n    background-color: rgb(var(--palette-background));\n}\n@media (max-width: 440px) {\n    [data-supertokens~="container"] {\n        width: 95vw;\n    }\n}\n[data-supertokens~="row"] {\n    margin: 0 auto;\n    width: 76%;\n    padding-top: 30px;\n    padding-bottom: 10px;\n}\n[data-supertokens~="superTokensBranding"] {\n    display: block;\n    margin: 0 auto;\n    background: rgb(var(--palette-superTokensBrandingBackground));\n    color: rgb(var(--palette-superTokensBrandingText));\n    text-decoration: none;\n    width: -webkit-fit-content;\n    width: -moz-fit-content;\n    width: fit-content;\n    border-radius: 6px 6px 0 0;\n    padding: 4px 9px;\n    font-weight: 300;\n    font-size: var(--font-size-0);\n    letter-spacing: 0.4px;\n}\n[data-supertokens~="generalError"] {\n    background: rgb(var(--palette-errorBackground));\n    padding-top: 10px;\n    padding-bottom: 10px;\n    margin-bottom: 15px;\n    padding-left: 18px;\n    padding-right: 18px;\n    letter-spacing: 0.2px;\n    font-size: var(--font-size-1);\n    border-radius: 8px;\n    color: rgb(var(--palette-error));\n    -webkit-animation: swing-in-top-fwd 1s cubic-bezier(0.175, 0.885, 0.32, 1.275) both;\n            animation: swing-in-top-fwd 1s cubic-bezier(0.175, 0.885, 0.32, 1.275) both;\n    word-wrap: break-word;\n}\n[data-supertokens~="headerTitle"] {\n    font-size: var(--font-size-4);\n    line-height: 40px;\n    letter-spacing: 0.58px;\n    font-weight: 800;\n    margin-bottom: 2px;\n    color: rgb(var(--palette-textTitle));\n}\n[data-supertokens~="headerSubtitle"] {\n    margin-bottom: 21px;\n}\n[data-supertokens~="privacyPolicyAndTermsAndConditions"] {\n    max-width: 300px;\n    margin-top: 10px;\n}\n[data-supertokens~="privacyPolicyAndTermsAndConditions"] a {\n    line-height: 21px;\n}\n/* TODO: split the link style into separate things*/\n/* We add this before primary and secondary text, because if they are applied to the same element the other ones take priority */\n[data-supertokens~="link"] {\n    padding-left: 3px;\n    padding-right: 3px;\n    color: rgb(var(--palette-textLink));\n    font-size: var(--font-size-1);\n    cursor: pointer;\n    letter-spacing: 0.16px;\n    line-height: 26px;\n}\n[data-supertokens~="primaryText"] {\n    font-size: var(--font-size-1);\n    font-weight: 500;\n    letter-spacing: 0.4px;\n    line-height: 21px;\n    color: rgb(var(--palette-textLabel));\n}\n[data-supertokens~="secondaryText"] {\n    font-size: var(--font-size-1);\n    font-weight: 300;\n    letter-spacing: 0.4px;\n    color: rgb(var(--palette-textPrimary));\n}\n[data-supertokens~="divider"] {\n    margin-top: 1em;\n    margin-bottom: 1em;\n    border-bottom: 0.3px solid #dddddd;\n    align-items: center;\n    padding-bottom: 5px;\n}\n[data-supertokens~="headerTinyTitle"] {\n    margin-top: 13px;\n    font-size: var(--font-size-3);\n    letter-spacing: 1.1px;\n    font-weight: 500;\n    line-height: 28px;\n}\n[data-supertokens~="secondaryLinkWithArrow"] {\n    margin-top: 10px;\n    margin-bottom: 30px;\n    cursor: pointer;\n}\n[data-supertokens~="secondaryLinkWithArrow"]:hover {\n    position: relative;\n    left: 2px;\n    word-spacing: 4px;\n}\n[data-supertokens~="generalSuccess"] {\n    color: rgb(var(--palette-success));\n    font-size: var(--font-size-1);\n    background: rgb(var(--palette-successBackground));\n    -webkit-animation: swing-in-top-fwd 1s cubic-bezier(0.175, 0.885, 0.32, 1.275) both;\n            animation: swing-in-top-fwd 1s cubic-bezier(0.175, 0.885, 0.32, 1.275) both;\n    padding: 9px 15px 9px 15px;\n    border-radius: 6px;\n    display: inline-block;\n}\n[data-supertokens~="spinner"] {\n    width: 80px;\n    height: auto;\n    padding-top: 20px;\n    padding-bottom: 40px;\n    margin: 0 auto;\n}\n[data-supertokens~="error"] {\n    color: rgb(var(--palette-error));\n}\n[data-supertokens~="linkButton"] {\n    background-color: transparent;\n    border: 0;\n}\n[data-supertokens~="secondaryLinkWithLeftArrow"] {\n    margin-top: 10px;\n    margin-bottom: 40px;\n    cursor: pointer;\n}\n[data-supertokens~="secondaryLinkWithLeftArrow"] svg {\n    margin-right: 0.3em;\n}\n[data-supertokens~="secondaryLinkWithLeftArrow"]:hover svg {\n    position: relative;\n    left: -4px;\n}\n[data-supertokens~="button"] {\n    background-color: rgb(var(--palette-primary));\n    color: rgb(var(--palette-buttonText));\n    width: 100%;\n    height: 34px;\n    font-weight: 700;\n    border-width: 1px;\n    border-style: solid;\n    border-radius: 6px;\n    border-color: rgb(var(--palette-primaryBorder));\n    background-position: center;\n    transition: all 0.4s;\n    background-size: 12000%;\n    cursor: pointer;\n}\n[data-supertokens~="button"]:disabled {\n    border: none;\n    cursor: no-drop;\n}\n[data-supertokens~="button"]:active {\n    outline: none;\n    transition: all 0s;\n    background-size: 100%;\n    -webkit-filter: brightness(0.85);\n            filter: brightness(0.85);\n}\n[data-supertokens~="button"]:focus {\n    outline: none;\n}\n[data-supertokens~="delayedRender"] {\n    -webkit-animation-duration: 0.1s;\n            animation-duration: 0.1s;\n    -webkit-animation-name: animate-fade;\n            animation-name: animate-fade;\n    -webkit-animation-delay: 0.2s;\n            animation-delay: 0.2s;\n    -webkit-animation-fill-mode: backwards;\n            animation-fill-mode: backwards;\n}\n@-webkit-keyframes animate-fade {\n    0% {\n        opacity: 0;\n    }\n    100% {\n        opacity: 1;\n    }\n}\n@keyframes animate-fade {\n    0% {\n        opacity: 0;\n    }\n    100% {\n        opacity: 1;\n    }\n}\n';

var ThemeBase = function (_a) {
    var children = _a.children,
        userStyles = _a.userStyles,
        loadDefaultFont = _a.loadDefaultFont;
    return jsxRuntime.jsxs(React.Fragment, {
        children: [
            children,
            loadDefaultFont &&
                jsxRuntime.jsx("link", {
                    href: "//fonts.googleapis.com/css?family=Rubik:wght@300;400;600;500;700",
                    rel: "stylesheet",
                    type: "text/css",
                }),
            jsxRuntime.jsxs("style", { children: [styles, userStyles.join("\n")] }),
        ],
    });
};

var MultitenancyDynamicLoginMethodsSpinnerTheme = function () {
    return jsxRuntime.jsx(
        "div",
        genericComponentOverrideContext.__assign(
            { "data-supertokens": "container delayedRender" },
            {
                children: jsxRuntime.jsx(
                    "div",
                    genericComponentOverrideContext.__assign(
                        { "data-supertokens": "row" },
                        {
                            children: jsxRuntime.jsx(
                                "div",
                                genericComponentOverrideContext.__assign(
                                    { "data-supertokens": "spinner delayedRender" },
                                    { children: jsxRuntime.jsx(SpinnerIcon, {}) }
                                )
                            ),
                        }
                    )
                ),
            }
        )
    );
};
var DynamicLoginMethodsSpinnerThemeWithOverride = withOverride(
    "MultitenancyDynamicLoginMethodsSpinnerTheme",
    MultitenancyDynamicLoginMethodsSpinnerTheme
);
var DynamicLoginMethodsSpinnerTheme = function (props) {
    return jsxRuntime.jsx(
        ThemeBase,
        genericComponentOverrideContext.__assign(
            { loadDefaultFont: false, userStyles: [props.config.rootStyle] },
            { children: jsxRuntime.jsx(DynamicLoginMethodsSpinnerThemeWithOverride, {}) }
        )
    );
};

// This is a special "feature" component:
//  - it's used inside FeatureWrapper & RoutingComponent (meaning it can't use FeatureWrapper)
//  - it's not used in any specific route (multitenancy doesn't have a pre-built UI)
var DynamicLoginMethodsSpinner = function () {
    var recipe = genericComponentOverrideContext.Multitenancy.getInstanceOrThrow();
    var recipeComponentOverrides = componentOverrideContext.useContext();
    return jsxRuntime.jsx(
        ComponentOverrideContext.Provider,
        genericComponentOverrideContext.__assign(
            { value: recipeComponentOverrides },
            {
                children: jsxRuntime.jsx(ErrorBoundary, {
                    children: jsxRuntime.jsx(
                        WithOrWithoutShadowDom,
                        genericComponentOverrideContext.__assign(
                            { useShadowDom: recipe.config.useShadowDom },
                            { children: jsxRuntime.jsx(DynamicLoginMethodsSpinnerTheme, { config: recipe.config }) }
                        )
                    ),
                }),
            }
        )
    );
};

var RecipeRouter = /** @class */ (function () {
    function RecipeRouter() {
        var _this = this;
        this.getPathsToFeatureComponentWithRecipeIdMap = function () {
            // Memoized version of the map.
            if (_this.pathsToFeatureComponentWithRecipeIdMap !== undefined) {
                return _this.pathsToFeatureComponentWithRecipeIdMap;
            }
            var pathsToFeatureComponentWithRecipeIdMap = {};
            var features = _this.getFeatures();
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
    }
    RecipeRouter.getMatchingComponentForRouteAndRecipeIdFromPreBuiltUIList = function (
        normalisedUrl,
        preBuiltUIList,
        defaultToStaticList,
        dynamicLoginMethods
    ) {
        var _a;
        var path = normalisedUrl.getAsStringDangerous();
        var routeComponents = preBuiltUIList.reduce(function (components, c) {
            var routes = c.getPathsToFeatureComponentWithRecipeIdMap();
            for (var _i = 0, _a = Object.entries(routes); _i < _a.length; _i++) {
                var _b = _a[_i],
                    routePath = _b[0],
                    routeComps = _b[1];
                if (
                    routePath === path ||
                    new RegExp("^" + routePath.replace(/:\w+/g, "[^/]+").replace(/\/\*/g, "/[^/]+") + "$").test(path)
                ) {
                    components = components.concat(routeComps);
                }
            }
            return components;
        }, []);
        var componentMatchingRid = routeComponents.find(function (c) {
            return c.matches();
        });
        if (genericComponentOverrideContext.SuperTokens.usesDynamicLoginMethods === false || defaultToStaticList) {
            if (routeComponents.length === 0) {
                return undefined;
            } else if (componentMatchingRid !== undefined) {
                return componentMatchingRid;
            } else {
                return routeComponents[0];
            }
        }
        if (dynamicLoginMethods === undefined) {
            throw new Error(
                "Should never come here: dynamic login methods info has not been loaded but recipeRouter rendered"
            );
        }
        // The related ADR: https://supertokens.com/docs/contribute/decisions/multitenancy/0006
        var priorityOrder = [
            { rid: "thirdpartyemailpassword", includes: ["thirdparty", "emailpassword"] },
            { rid: "thirdpartypasswordless", includes: ["thirdparty", "passwordless"] },
            { rid: "emailpassword", includes: ["emailpassword"] },
            { rid: "passwordless", includes: ["passwordless"] },
            { rid: "thirdparty", includes: ["thirdparty"] },
        ];
        if (
            componentMatchingRid && // if we find a component matching by rid
            (!priorityOrder
                .map(function (a) {
                    return a.rid;
                })
                .includes(componentMatchingRid.recipeID) || // from a non-auth recipe
                ((_a = dynamicLoginMethods[componentMatchingRid.recipeID]) === null || _a === void 0
                    ? void 0
                    : _a.enabled) === true) // or an enabled auth recipe
        ) {
            return componentMatchingRid;
        }
        var matchingNonAuthComponent = routeComponents.find(function (comp) {
            return !priorityOrder
                .map(function (a) {
                    return a.rid;
                })
                .includes(comp.recipeID);
        });
        if (matchingNonAuthComponent) {
            return matchingNonAuthComponent;
        }
        var enabledRecipeCount = Object.keys(dynamicLoginMethods).filter(function (key) {
            return dynamicLoginMethods[key].enabled;
        }).length;
        var _loop_1 = function (rid, includes) {
            if (
                enabledRecipeCount === includes.length &&
                includes.every(function (subRId) {
                    return dynamicLoginMethods[subRId].enabled;
                })
            ) {
                var matchingComp = routeComponents.find(function (comp) {
                    return comp.recipeID === rid;
                });
                if (matchingComp) {
                    return { value: matchingComp };
                }
            }
        };
        // We first try to find an exact match
        for (var _i = 0, priorityOrder_1 = priorityOrder; _i < priorityOrder_1.length; _i++) {
            var _b = priorityOrder_1[_i],
                rid = _b.rid,
                includes = _b.includes;
            var state_1 = _loop_1(rid, includes);
            if (typeof state_1 === "object") return state_1.value;
        }
        var _loop_2 = function (rid, includes) {
            if (
                includes.some(function (subRId) {
                    return dynamicLoginMethods[subRId].enabled;
                })
            ) {
                var matchingComp = routeComponents.find(function (comp) {
                    return comp.recipeID === rid;
                });
                if (matchingComp) {
                    return { value: matchingComp };
                }
            }
        };
        // We try to find a partial match
        for (var _c = 0, priorityOrder_2 = priorityOrder; _c < priorityOrder_2.length; _c++) {
            var _d = priorityOrder_2[_c],
                rid = _d.rid,
                includes = _d.includes;
            var state_2 = _loop_2(rid, includes);
            if (typeof state_2 === "object") return state_2.value;
        }
        return undefined;
    };
    return RecipeRouter;
})();

function RoutingComponent(props) {
    var _a, _b;
    var userContext = useUserContext();
    var _c = React.useState(undefined),
        error = _c[0],
        setError = _c[1];
    var _d = React.useState(undefined),
        loadedDynamicLoginMethods = _d[0],
        setLoadedDynamicLoginMethods = _d[1];
    var history =
        (_a = props.getReactRouterDomWithCustomHistory()) === null || _a === void 0 ? void 0 : _a.useHistoryCustom();
    var path = props.path;
    var location =
        (_b = props.getReactRouterDomWithCustomHistory()) === null || _b === void 0 ? void 0 : _b.useLocation();
    var componentToRender = React__default.default.useMemo(
        function () {
            var normalizedPath = new NormalisedURLPath__default.default(path);
            // During development, this runs twice so as to warn devs of if there
            // are any side effects that happen here. So in tests, it will result in
            // the console log twice
            if (
                loadedDynamicLoginMethods !== undefined ||
                genericComponentOverrideContext.SuperTokens.usesDynamicLoginMethods === false
            ) {
                var result = RecipeRouter.getMatchingComponentForRouteAndRecipeIdFromPreBuiltUIList(
                    normalizedPath,
                    props.preBuiltUIList,
                    false,
                    loadedDynamicLoginMethods
                );
                if (
                    result === undefined &&
                    genericComponentOverrideContext.SuperTokens.usesDynamicLoginMethods === true
                ) {
                    void redirectToAuth({ history: history, redirectBack: false });
                }
                return result;
            }
            return undefined;
            // location dependency needs to be kept in order to get new component on url change
            // eslint-disable-next-line react-hooks/exhaustive-deps
        },
        [path, location, loadedDynamicLoginMethods, props.preBuiltUIList]
    );
    React.useEffect(
        function () {
            if (loadedDynamicLoginMethods) {
                return;
            }
            genericComponentOverrideContext.Multitenancy.getInstanceOrThrow()
                .getCurrentDynamicLoginMethods({ userContext: userContext })
                .then(
                    function (loginMethods) {
                        return setLoadedDynamicLoginMethods(loginMethods);
                    },
                    function (err) {
                        return setError(err);
                    }
                );
        },
        [loadedDynamicLoginMethods, setLoadedDynamicLoginMethods]
    );
    if (error) {
        throw error;
    }
    if (
        genericComponentOverrideContext.SuperTokens.usesDynamicLoginMethods &&
        loadedDynamicLoginMethods === undefined
    ) {
        return jsxRuntime.jsx(DynamicLoginMethodsSpinner, {});
    }
    if (
        componentToRender === undefined ||
        (loadedDynamicLoginMethods === undefined && genericComponentOverrideContext.SuperTokens.usesDynamicLoginMethods)
    ) {
        return null;
    }
    return jsxRuntime.jsx(componentToRender.component, { history: history });
}

/*
 * Component.
 */
function getSuperTokensRoutesForReactRouterDom$1(_a) {
    var getReactRouterDomWithCustomHistory = _a.getReactRouterDomWithCustomHistory,
        recipeList = _a.recipeList,
        basePath = _a.basePath;
    var routerInfo = getReactRouterDomWithCustomHistory();
    if (routerInfo === undefined) {
        return [];
    }
    var Route = routerInfo.router.Route;
    return Object.values(
        recipeList.reduce(function (routes, recipe) {
            var pathsToFeatureComponentWithRecipeIdMap = recipe.getPathsToFeatureComponentWithRecipeIdMap();
            Object.keys(pathsToFeatureComponentWithRecipeIdMap).forEach(function (path) {
                path = path === "" ? "/" : path;
                var pathForRouter = path;
                if (basePath !== undefined) {
                    if (pathForRouter.startsWith(basePath)) {
                        pathForRouter = pathForRouter.slice(basePath.length);
                        if (!pathForRouter.startsWith("/")) {
                            pathForRouter = "/" + pathForRouter;
                        }
                    } else {
                        throw new Error("basePath has to be a prefix of websiteBasePath passed to SuperTokens.init");
                    }
                }
                if (!(path in routes)) {
                    routes[path] = jsxRuntime.jsx(
                        Route,
                        genericComponentOverrideContext.__assign(
                            { exact: true, path: pathForRouter },
                            {
                                children: jsxRuntime.jsx(RoutingComponent, {
                                    getReactRouterDomWithCustomHistory: getReactRouterDomWithCustomHistory,
                                    preBuiltUIList: recipeList,
                                    path: path,
                                }),
                            }
                        ),
                        "st-".concat(path)
                    );
                }
            });
            return routes;
        }, {})
    );
}

/*
 * Component.
 */
function getSuperTokensRoutesForReactRouterDomV6(_a) {
    var getReactRouterDomWithCustomHistory = _a.getReactRouterDomWithCustomHistory,
        recipeList = _a.recipeList,
        basePath = _a.basePath;
    var routerInfo = getReactRouterDomWithCustomHistory();
    if (routerInfo === undefined) {
        return [];
    }
    var Route = routerInfo.router.Route;
    return Object.values(
        recipeList.reduce(function (routes, recipe) {
            var pathsToFeatureComponentWithRecipeIdMap = recipe.getPathsToFeatureComponentWithRecipeIdMap();
            Object.keys(pathsToFeatureComponentWithRecipeIdMap).forEach(function (path) {
                path = path === "" ? "/" : path;
                var pathForRouter = path;
                if (basePath !== undefined) {
                    if (pathForRouter.startsWith(basePath)) {
                        pathForRouter = pathForRouter.slice(basePath.length);
                        if (!pathForRouter.startsWith("/")) {
                            pathForRouter = "/" + pathForRouter;
                        }
                    } else {
                        throw new Error("basePath has to be a prefix of websiteBasePath passed to SuperTokens.init");
                    }
                }
                if (!(path in routes)) {
                    routes[path] = jsxRuntime.jsx(
                        Route,
                        {
                            path: pathForRouter,
                            element: jsxRuntime.jsx(RoutingComponent, {
                                getReactRouterDomWithCustomHistory: getReactRouterDomWithCustomHistory,
                                preBuiltUIList: recipeList,
                                path: path,
                            }),
                        },
                        "st-".concat(path)
                    );
                }
            });
            return routes;
        }, {})
    );
}

var UI = /** @class */ (function () {
    function UI() {}
    UI.getSuperTokensRoutesForReactRouterDom = function (reactRouterDom, preBuiltUiClassList, basePath) {
        if (preBuiltUiClassList === void 0) {
            preBuiltUiClassList = [];
        }
        if (reactRouterDom === undefined || preBuiltUiClassList.length === 0) {
            throw new Error(
                // eslint-disable-next-line @typescript-eslint/quotes
                'Please use getSuperTokensRoutesForReactRouterDom like getSuperTokensRoutesForReactRouterDom(require("react-router-dom"), [EmailPasswordPreBuiltUI]) in your render function'
            );
        }
        var recipeList = preBuiltUiClassList.map(function (r) {
            return r.getInstanceOrInitAndGetInstance();
        });
        if (UI.reactRouterDomIsV6 === undefined) {
            UI.reactRouterDomIsV6 = reactRouterDom.withRouter === undefined;
        }
        if (UI.reactRouterDomIsV6) {
            if (UI.reactRouterDom === undefined) {
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
                UI.reactRouterDom = {
                    router: reactRouterDom,
                    useHistoryCustom: useNavigateHookForRRDV6,
                    useLocation: reactRouterDom.useLocation,
                };
            }
            return getSuperTokensRoutesForReactRouterDomV6({
                getReactRouterDomWithCustomHistory: UI.getReactRouterDomWithCustomHistory,
                recipeList: recipeList,
                basePath: basePath,
            });
        }
        if (UI.reactRouterDom === undefined) {
            UI.reactRouterDom = {
                router: reactRouterDom,
                useHistoryCustom: reactRouterDom.useHistory,
                useLocation: reactRouterDom.useLocation,
            };
        }
        return getSuperTokensRoutesForReactRouterDom$1({
            getReactRouterDomWithCustomHistory: UI.getReactRouterDomWithCustomHistory,
            recipeList: recipeList,
            basePath: basePath,
        });
    };
    UI.canHandleRoute = function (preBuiltUiClassList) {
        var recipeList = preBuiltUiClassList.map(function (r) {
            return r.getInstanceOrInitAndGetInstance();
        });
        return (
            RecipeRouter.getMatchingComponentForRouteAndRecipeIdFromPreBuiltUIList(
                genericComponentOverrideContext.getCurrentNormalisedUrlPath(),
                recipeList,
                true
            ) !== undefined
        );
    };
    UI.getRoutingComponent = function (preBuiltUiClassList) {
        var recipeList = preBuiltUiClassList.map(function (r) {
            return r.getInstanceOrInitAndGetInstance();
        });
        return jsxRuntime.jsx(RoutingComponent, {
            getReactRouterDomWithCustomHistory: UI.getReactRouterDomWithCustomHistory,
            path: genericComponentOverrideContext.getCurrentNormalisedUrlPath().getAsStringDangerous(),
            preBuiltUIList: recipeList,
        });
    };
    UI.getReactRouterDomWithCustomHistory = function () {
        return UI.reactRouterDom;
    };
    return UI;
})();
var getSuperTokensRoutesForReactRouterDom = UI.getSuperTokensRoutesForReactRouterDom;
var canHandleRoute = UI.canHandleRoute;
var getRoutingComponent = UI.getRoutingComponent;

function UserContextWrapper(props) {
    /**
     * If we receive a userContext as a props we should assume that the user
     * is either trying to use a theme component as standalone or that they
     * want to override an existing value for userContext.
     *
     * In this case we should always return a Provider with the value of userContext
     */
    if (props.userContext !== undefined) {
        return jsxRuntime.jsx(
            UserContextProvider,
            genericComponentOverrideContext.__assign({ userContext: props.userContext }, { children: props.children })
        );
    }
    return jsxRuntime.jsx(UserContextContext.Consumer, {
        children: function (value) {
            /**
             * value is undefined only if there is no Provider in the tree. In this case it is safe to
             * assume that the theme component is not being rendered by the SDK and that the user is not
             * using this as a child of one of the pre-built feature components.
             *
             * In this case we return a provider so that the userContext hook can be used by the children
             * of this theme component
             */
            if (value === undefined) {
                return jsxRuntime.jsx(UserContextProvider, { children: props.children });
            }
            /**
             * If value is not undefined then a provider exists in the tree. This means that this component
             * is either being rendered by the SDK or the user has added it as a child of the pre-built
             * feature components. In either case the userContext hook will be available so simply
             * return the theme component.
             */
            return props.children;
        },
    });
}

var SessionContext = React__default.default.createContext({
    loading: true,
    isDefault: true,
});

var SessionAuth = function (_a) {
    var _b;
    var children = _a.children,
        props = genericComponentOverrideContext.__rest(_a, ["children"]);
    var requireAuth = React.useRef(props.requireAuth);
    if (props.requireAuth !== requireAuth.current) {
        throw new Error(
            // eslint-disable-next-line @typescript-eslint/quotes
            'requireAuth prop should not change. If you are seeing this, it probably means that you are using SessionAuth in multiple routes with different values for requireAuth. To solve this, try adding the "key" prop to all uses of SessionAuth like <SessionAuth key="someUniqueKeyPerRoute" requireAuth={...}>'
        );
    }
    // Reusing the parent context was removed because it caused a redirect loop in an edge case
    // because it'd also reuse the invalid claims part until it loaded.
    var _c = React.useState({ loading: true }),
        context = _c[0],
        setContext = _c[1];
    var session = React.useRef();
    // We store this here, to prevent the list of called hooks changing even if a history hook is added later to SuperTokens.
    var historyHookRef = React.useRef(
        (_b = UI.getReactRouterDomWithCustomHistory()) === null || _b === void 0 ? void 0 : _b.useHistoryCustom
    );
    var history;
    try {
        if (historyHookRef.current) {
            history = historyHookRef.current();
        }
    } catch (_d) {
        // We catch and ignore errors here, because this is may throw if
        // the app is using react-router-dom but added a session auth outside of the router.
    }
    var userContext = useUserContext();
    var redirectToLogin = React.useCallback(function () {
        void genericComponentOverrideContext.SuperTokens.getInstanceOrThrow().redirectToAuth({
            history: history,
            redirectBack: true,
        });
    }, []);
    var buildContext = React.useCallback(function () {
        return genericComponentOverrideContext.__awaiter(void 0, void 0, void 0, function () {
            var sessionExists, invalidClaims, err_1, err_2;
            var _a;
            return genericComponentOverrideContext.__generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (session.current === undefined) {
                            session.current = recipe.Session.getInstanceOrThrow();
                        }
                        return [
                            4 /*yield*/,
                            session.current.doesSessionExist({
                                userContext: userContext,
                            }),
                        ];
                    case 1:
                        sessionExists = _b.sent();
                        if (sessionExists === false) {
                            return [
                                2 /*return*/,
                                {
                                    loading: false,
                                    doesSessionExist: false,
                                    accessTokenPayload: {},
                                    invalidClaims: [],
                                    userId: "",
                                },
                            ];
                        }
                        _b.label = 2;
                    case 2:
                        _b.trys.push([2, 4, , 6]);
                        return [
                            4 /*yield*/,
                            session.current.validateClaims({
                                overrideGlobalClaimValidators: props.overrideGlobalClaimValidators,
                                userContext: userContext,
                            }),
                        ];
                    case 3:
                        invalidClaims = _b.sent();
                        return [3 /*break*/, 6];
                    case 4:
                        err_1 = _b.sent();
                        return [
                            4 /*yield*/,
                            session.current.doesSessionExist({
                                userContext: userContext,
                            }),
                        ];
                    case 5:
                        // These errors should only come from getAccessTokenPayloadSecurely inside validateClaims if refreshing a claim cleared the session
                        // Which means that the session was most likely cleared, meaning returning false is right.
                        // This might also happen if the user provides an override or a custom claim validator that throws (or if we have a bug)
                        // In which case the session will not be cleared so we rethrow the error
                        if (_b.sent()) {
                            throw err_1;
                        }
                        return [
                            2 /*return*/,
                            {
                                loading: false,
                                doesSessionExist: false,
                                accessTokenPayload: {},
                                invalidClaims: [],
                                userId: "",
                            },
                        ];
                    case 6:
                        _b.trys.push([6, 9, , 11]);
                        _a = {
                            loading: false,
                            doesSessionExist: true,
                            invalidClaims: invalidClaims,
                        };
                        return [
                            4 /*yield*/,
                            session.current.getAccessTokenPayloadSecurely({
                                userContext: userContext,
                            }),
                        ];
                    case 7:
                        _a.accessTokenPayload = _b.sent();
                        return [
                            4 /*yield*/,
                            session.current.getUserId({
                                userContext: userContext,
                            }),
                        ];
                    case 8:
                        return [2 /*return*/, ((_a.userId = _b.sent()), _a)];
                    case 9:
                        err_2 = _b.sent();
                        return [
                            4 /*yield*/,
                            session.current.doesSessionExist({
                                userContext: userContext,
                            }),
                        ];
                    case 10:
                        if (_b.sent()) {
                            throw err_2;
                        }
                        // This means that loading the access token or the userId failed
                        // This may happen if the server cleared the error since the validation was done which should be extremely rare
                        return [
                            2 /*return*/,
                            {
                                loading: false,
                                doesSessionExist: false,
                                accessTokenPayload: {},
                                invalidClaims: [],
                                userId: "",
                            },
                        ];
                    case 11:
                        return [2 /*return*/];
                }
            });
        });
    }, []);
    var setInitialContextAndMaybeRedirect = React.useCallback(
        function (toSetContext) {
            return genericComponentOverrideContext.__awaiter(void 0, void 0, void 0, function () {
                var failureRedirectInfo;
                return genericComponentOverrideContext.__generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (context.loading === false) {
                                return [2 /*return*/];
                            }
                            if (!(props.doRedirection !== false)) return [3 /*break*/, 4];
                            if (!toSetContext.doesSessionExist && props.requireAuth !== false) {
                                redirectToLogin();
                                return [2 /*return*/];
                            }
                            if (!(toSetContext.invalidClaims.length !== 0)) return [3 /*break*/, 4];
                            return [
                                4 /*yield*/,
                                recipe.getFailureRedirectionInfo({
                                    invalidClaims: toSetContext.invalidClaims,
                                    overrideGlobalClaimValidators: props.overrideGlobalClaimValidators,
                                    userContext: userContext,
                                }),
                            ];
                        case 1:
                            failureRedirectInfo = _a.sent();
                            if (!(failureRedirectInfo.redirectPath !== undefined)) return [3 /*break*/, 3];
                            setContext(toSetContext);
                            return [
                                4 /*yield*/,
                                genericComponentOverrideContext.SuperTokens.getInstanceOrThrow().redirectToUrl(
                                    failureRedirectInfo.redirectPath,
                                    history
                                ),
                            ];
                        case 2:
                            return [2 /*return*/, _a.sent()];
                        case 3:
                            if (
                                props.accessDeniedScreen !== undefined &&
                                failureRedirectInfo.failedClaim !== undefined
                            ) {
                                console.warn({
                                    message: "Showing access denied screen because a claim validator failed",
                                    claimValidationError: failureRedirectInfo.failedClaim,
                                });
                                return [
                                    2 /*return*/,
                                    setContext(
                                        genericComponentOverrideContext.__assign(
                                            genericComponentOverrideContext.__assign({}, toSetContext),
                                            { accessDeniedValidatorError: failureRedirectInfo.failedClaim }
                                        )
                                    ),
                                ];
                            }
                            _a.label = 4;
                        case 4:
                            setContext(toSetContext);
                            return [2 /*return*/];
                    }
                });
            });
        },
        [
            context.loading,
            props.doRedirection,
            props.requireAuth,
            props.overrideGlobalClaimValidators,
            props.accessDeniedScreen,
            redirectToLogin,
            userContext,
            history,
        ]
    );
    genericComponentOverrideContext.useOnMountAPICall(buildContext, setInitialContextAndMaybeRedirect);
    // subscribe to events on mount
    React.useEffect(
        function () {
            function onHandleEvent(event) {
                return genericComponentOverrideContext.__awaiter(this, void 0, void 0, function () {
                    var _a, invalidClaims, failureRedirectInfo;
                    return genericComponentOverrideContext.__generator(this, function (_b) {
                        switch (_b.label) {
                            case 0:
                                _a = event.action;
                                switch (_a) {
                                    case "SESSION_CREATED":
                                        return [3 /*break*/, 1];
                                    case "REFRESH_SESSION":
                                        return [3 /*break*/, 1];
                                    case "ACCESS_TOKEN_PAYLOAD_UPDATED":
                                        return [3 /*break*/, 1];
                                    case "API_INVALID_CLAIM":
                                        return [3 /*break*/, 1];
                                    case "SIGN_OUT":
                                        return [3 /*break*/, 7];
                                    case "UNAUTHORISED":
                                        return [3 /*break*/, 8];
                                }
                                return [3 /*break*/, 9];
                            case 1:
                                return [
                                    4 /*yield*/,
                                    session.current.validateClaims({
                                        overrideGlobalClaimValidators: props.overrideGlobalClaimValidators,
                                        userContext: userContext,
                                    }),
                                ];
                            case 2:
                                invalidClaims = _b.sent();
                                if (!(props.doRedirection !== false)) return [3 /*break*/, 6];
                                return [
                                    4 /*yield*/,
                                    recipe.getFailureRedirectionInfo({
                                        invalidClaims: invalidClaims,
                                        overrideGlobalClaimValidators: props.overrideGlobalClaimValidators,
                                        userContext: userContext,
                                    }),
                                ];
                            case 3:
                                failureRedirectInfo = _b.sent();
                                if (!failureRedirectInfo.redirectPath) return [3 /*break*/, 5];
                                setContext(
                                    genericComponentOverrideContext.__assign(
                                        genericComponentOverrideContext.__assign({}, event.sessionContext),
                                        { loading: false, invalidClaims: invalidClaims }
                                    )
                                );
                                return [
                                    4 /*yield*/,
                                    genericComponentOverrideContext.SuperTokens.getInstanceOrThrow().redirectToUrl(
                                        failureRedirectInfo.redirectPath,
                                        history
                                    ),
                                ];
                            case 4:
                                return [2 /*return*/, _b.sent()];
                            case 5:
                                if (
                                    props.accessDeniedScreen !== undefined &&
                                    failureRedirectInfo.failedClaim !== undefined
                                ) {
                                    console.warn({
                                        message: "Showing access denied screen because a claim validator failed",
                                        claimValidationError: failureRedirectInfo.failedClaim,
                                    });
                                    return [
                                        2 /*return*/,
                                        setContext(
                                            genericComponentOverrideContext.__assign(
                                                genericComponentOverrideContext.__assign({}, event.sessionContext),
                                                {
                                                    loading: false,
                                                    invalidClaims: invalidClaims,
                                                    accessDeniedValidatorError: failureRedirectInfo.failedClaim,
                                                }
                                            )
                                        ),
                                    ];
                                }
                                _b.label = 6;
                            case 6:
                                setContext(
                                    genericComponentOverrideContext.__assign(
                                        genericComponentOverrideContext.__assign({}, event.sessionContext),
                                        { loading: false, invalidClaims: invalidClaims }
                                    )
                                );
                                return [2 /*return*/];
                            case 7:
                                setContext(
                                    genericComponentOverrideContext.__assign(
                                        genericComponentOverrideContext.__assign({}, event.sessionContext),
                                        { loading: false, invalidClaims: [] }
                                    )
                                );
                                return [2 /*return*/];
                            case 8:
                                setContext(
                                    genericComponentOverrideContext.__assign(
                                        genericComponentOverrideContext.__assign({}, event.sessionContext),
                                        { loading: false, invalidClaims: [] }
                                    )
                                );
                                if (props.onSessionExpired !== undefined) {
                                    props.onSessionExpired();
                                } else if (props.requireAuth !== false && props.doRedirection !== false) {
                                    redirectToLogin();
                                }
                                return [2 /*return*/];
                            case 9:
                                return [2 /*return*/];
                        }
                    });
                });
            }
            if (session.current === undefined) {
                session.current = recipe.Session.getInstanceOrThrow();
            }
            if (context.loading === false) {
                // we return here cause addEventListener returns a function that removes
                // the listener, and this function will be called by useEffect when
                // onHandleEvent changes or if the component is unmounting.
                return session.current.addEventListener(onHandleEvent);
            }
            return undefined;
        },
        [props, setContext, context.loading, userContext, history, redirectToLogin]
    );
    if (props.requireAuth !== false && (context.loading || !context.doesSessionExist)) {
        return null;
    }
    if (!context.loading && context.accessDeniedValidatorError && props.accessDeniedScreen) {
        return jsxRuntime.jsx(props.accessDeniedScreen, {
            userContext: userContext,
            history: history,
            validationError: context.accessDeniedValidatorError,
        });
    }
    return jsxRuntime.jsx(
        SessionContext.Provider,
        genericComponentOverrideContext.__assign({ value: context }, { children: children })
    );
};
var SessionAuthWrapper = function (props) {
    return jsxRuntime.jsx(
        UserContextWrapper,
        genericComponentOverrideContext.__assign(
            { userContext: props.userContext },
            { children: jsxRuntime.jsx(SessionAuth, genericComponentOverrideContext.__assign({}, props)) }
        )
    );
};

var SuperTokensWrapper = function (props) {
    return jsxRuntime.jsx(
        SessionAuthWrapper,
        genericComponentOverrideContext.__assign({}, props, { requireAuth: false, doRedirection: false })
    );
};

/* Copyright (c) 2021, VRAI Labs and/or its affiliates. All rights reserved.
 *
 * This software is licensed under the Apache License, Version 2.0 (the
 * "License") as published by the Apache Software Foundation.
 *
 * You may not use this file except in compliance with the License. You may
 * obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
 * License for the specific language governing permissions and limitations
 * under the License.
 */
/*
 * API Wrapper exposed to user.
 */
var SuperTokensAPIWrapper = /** @class */ (function () {
    function SuperTokensAPIWrapper() {}
    SuperTokensAPIWrapper.init = function (config) {
        genericComponentOverrideContext.SuperTokens.init(config);
    };
    SuperTokensAPIWrapper.changeLanguage = function (language) {
        return genericComponentOverrideContext.SuperTokens.getInstanceOrThrow().changeLanguage(language);
    };
    SuperTokensAPIWrapper.loadTranslation = function (store) {
        return genericComponentOverrideContext.SuperTokens.getInstanceOrThrow().loadTranslation(store);
    };
    var _a;
    _a = SuperTokensAPIWrapper;
    SuperTokensAPIWrapper.SuperTokensWrapper = SuperTokensWrapper;
    SuperTokensAPIWrapper.redirectToAuth = function (options) {
        return genericComponentOverrideContext.__awaiter(void 0, void 0, void 0, function () {
            var _b;
            return genericComponentOverrideContext.__generator(_a, function (_c) {
                return [
                    2 /*return*/,
                    genericComponentOverrideContext.SuperTokens.getInstanceOrThrow().redirectToAuth(
                        genericComponentOverrideContext.__assign(
                            genericComponentOverrideContext.__assign({}, options),
                            {
                                redirectBack:
                                    (_b = options === null || options === void 0 ? void 0 : options.redirectBack) !==
                                        null && _b !== void 0
                                        ? _b
                                        : true,
                            }
                        )
                    ),
                ];
            });
        });
    };
    SuperTokensAPIWrapper.useTranslation = translationContext.useTranslation;
    SuperTokensAPIWrapper.useUserContext = useUserContext;
    return SuperTokensAPIWrapper;
})();
var init = SuperTokensAPIWrapper.init;
var changeLanguage = SuperTokensAPIWrapper.changeLanguage;
var loadTranslation = SuperTokensAPIWrapper.loadTranslation;
var redirectToAuth = SuperTokensAPIWrapper.redirectToAuth;

exports.ComponentOverrideContext = ComponentOverrideContext;
exports.FeatureWrapper = FeatureWrapper;
exports.RecipeRouter = RecipeRouter;
exports.SessionAuthWrapper = SessionAuthWrapper;
exports.SessionContext = SessionContext;
exports.SpinnerIcon = SpinnerIcon;
exports.SuperTokensAPIWrapper = SuperTokensAPIWrapper;
exports.SuperTokensWrapper = SuperTokensWrapper;
exports.UI = UI;
exports.UserContextContext = UserContextContext;
exports.UserContextWrapper = UserContextWrapper;
exports.canHandleRoute = canHandleRoute;
exports.changeLanguage = changeLanguage;
exports.getRoutingComponent = getRoutingComponent;
exports.getSuperTokensRoutesForReactRouterDom = getSuperTokensRoutesForReactRouterDom;
exports.init = init;
exports.loadTranslation = loadTranslation;
exports.redirectToAuth = redirectToAuth;
exports.useDynamicLoginMethods = useDynamicLoginMethods;
exports.useUserContext = useUserContext;
exports.withOverride = withOverride;
