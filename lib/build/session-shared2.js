"use strict";

var utils = require("./utils.js");
var jsxRuntime = require("react/jsx-runtime");
var WebJSSessionRecipe = require("supertokens-web-js/recipe/session");
var utils$1 = require("./recipeModule-shared.js");
var React = require("react");
var reactDom = require("react-dom");
var uiEntry = require("./index2.js");
var windowHandler = require("supertokens-web-js/utils/windowHandler");
var utils$2 = require("supertokens-web-js/utils");

function _interopDefault(e) {
    return e && e.__esModule ? e : { default: e };
}

var WebJSSessionRecipe__default = /*#__PURE__*/ _interopDefault(WebJSSessionRecipe);
var React__default = /*#__PURE__*/ _interopDefault(React);

var UserContextContext = React__default.default.createContext(undefined);
var useUserContext = function () {
    return React__default.default.useContext(UserContextContext);
};
var UserContextProvider = function (_a) {
    var children = _a.children,
        userContext = _a.userContext;
    var currentUserContext = React.useState(utils.getNormalisedUserContext(userContext))[0];
    return jsxRuntime.jsx(
        UserContextContext.Provider,
        utils.__assign({ value: currentUserContext }, { children: children })
    );
};

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
            utils.__assign({ userContext: props.userContext }, { children: props.children })
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

var _a = utils$1.createGenericComponentsOverrideContext(),
    useContext = _a[0],
    Provider = _a[1];

var ComponentOverrideContext = React__default.default.createContext("IS_DEFAULT");

var errCB = function () {
    throw new Error("Cannot use translation func outside TranslationContext provider.");
};
var TranslationContext = React__default.default.createContext({
    translate: errCB,
});
var useTranslation = function () {
    return React.useContext(TranslationContext).translate;
};
var TranslationContextProvider = function (_a) {
    var children = _a.children,
        defaultLanguage = _a.defaultLanguage,
        userTranslationFunc = _a.userTranslationFunc,
        defaultStore = _a.defaultStore,
        translationControlEventSource = _a.translationControlEventSource;
    var _b = React.useState(defaultStore),
        translationStore = _b[0],
        setTranslationStore = _b[1];
    var _c = React.useState(undefined),
        currentLanguage = _c[0],
        setCurrentLanguage = _c[1];
    React.useEffect(
        function () {
            function loadLanguageFromCookies() {
                return utils.__awaiter(this, void 0, void 0, function () {
                    var cookieLang, cookieLangTemp;
                    return utils.__generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                return [4 /*yield*/, utils$1.getCurrentLanguageFromCookie()];
                            case 1:
                                cookieLang = _a.sent();
                                cookieLangTemp = cookieLang === null ? defaultLanguage : cookieLang;
                                /**
                                 * If current is not undefined, it means that something else has set the language.
                                 * For example if the user calls SuperTokens.changeLanguage before this
                                 *
                                 * We want to use the language preference from cookies only if something else has
                                 * not set language before this
                                 */
                                setCurrentLanguage(function (current) {
                                    return current !== undefined ? current : cookieLangTemp;
                                });
                                return [2 /*return*/];
                        }
                    });
                });
            }
            void loadLanguageFromCookies();
        },
        [defaultLanguage, setCurrentLanguage]
    );
    React.useEffect(function () {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        var changeHandler = function (_eventName, detail) {
            setCurrentLanguage(detail);
        };
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        var loadHandler = function (_eventName, detail) {
            setTranslationStore(function (os) {
                return utils.mergeObjects(os, detail);
            });
        };
        translationControlEventSource.on("LanguageChange", changeHandler);
        translationControlEventSource.on("TranslationLoaded", loadHandler);
        return function () {
            translationControlEventSource.off("LanguageChange", changeHandler);
            translationControlEventSource.off("TranslationLoaded", loadHandler);
        };
    });
    var translateFunc = React.useCallback(
        function (key) {
            if (userTranslationFunc !== undefined) {
                return userTranslationFunc(key);
            }
            if (currentLanguage !== undefined) {
                var res = translationStore[currentLanguage] && translationStore[currentLanguage][key];
                var fallback = translationStore[defaultLanguage] && translationStore[defaultLanguage][key];
                if (res === undefined) {
                    if (fallback !== undefined) {
                        return fallback;
                    }
                    return key;
                }
                return res;
            }
            throw new Error("Should never come here");
        },
        [translationStore, currentLanguage, defaultLanguage, userTranslationFunc]
    );
    if (currentLanguage === undefined) {
        return null;
    }
    return jsxRuntime.jsx(
        TranslationContext.Provider,
        utils.__assign({ value: { translate: translateFunc } }, { children: children })
    );
};

/*
 * Component.
 */
var ErrorBoundary = /** @class */ (function (_super) {
    utils.__extends(ErrorBoundary, _super);
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

function FeatureWrapper(_a) {
    var children = _a.children,
        useShadowDom = _a.useShadowDom,
        defaultStore = _a.defaultStore;
    var st = utils$1.SuperTokens.getInstanceOrThrow();
    return jsxRuntime.jsx(ErrorBoundary, {
        children: jsxRuntime.jsx(
            TranslationContextProvider,
            utils.__assign(
                {
                    defaultLanguage: st.languageTranslations.defaultLanguage,
                    defaultStore: utils.mergeObjects(defaultStore, st.languageTranslations.userTranslationStore),
                    translationControlEventSource: st.languageTranslations.translationEventSource,
                    userTranslationFunc: st.languageTranslations.userTranslationFunc,
                },
                {
                    children: jsxRuntime.jsx(
                        WithOrWithoutShadowDom,
                        utils.__assign({ useShadowDom: useShadowDom }, { children: children })
                    ),
                }
            )
        ),
    });
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
                    return os || rootDiv.current.attachShadow({ mode: "open", delegatesFocus: false });
                });
            }
        },
        [rootDiv]
    );
    // Otherwise, use shadow dom.
    return jsxRuntime.jsx(
        "div",
        utils.__assign(
            { id: utils.ST_ROOT_ID, ref: rootDiv },
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
            utils.__assign({ id: utils.ST_ROOT_ID }, { children: [children, jsxRuntime.jsx(DisableAutoFillInput, {})] })
        );
    }
    return jsxRuntime.jsxs(WithShadowDom, { children: [children, jsxRuntime.jsx(DisableAutoFillInput, {})] });
}
function DisableAutoFillInput() {
    /* eslint-disable react/jsx-no-literals */
    return jsxRuntime.jsx(
        "style",
        utils.__assign(
            { type: "text/css" },
            {
                children:
                    "input.supertokens-input:-webkit-autofill,input.supertokens-input:-webkit-autofill:focus,input.supertokens-input:-webkit-autofill:hover,select:-webkit-autofill,select:-webkit-autofill:focus,select:-webkit-autofill:hover,textarea:-webkit-autofill,textarea:-webkit-autofill:focus,textarea:-webkit-autofill:hover{transition:background-color 5000s ease-in-out 0s}",
            }
        )
    );
    /* eslint-enable react/jsx-no-literals */
}

function ErrorRoundIcon() {
    return jsxRuntime.jsxs(
        "svg",
        utils.__assign(
            { width: "32", height: "32", viewBox: "0 0 32 32", fill: "none", xmlns: "http://www.w3.org/2000/svg" },
            {
                children: [
                    jsxRuntime.jsx("path", {
                        d: "M16.0012 1.91396e-06C12.3031 0.00305404 8.72039 1.28809 5.8634 3.63622C3.00641 5.98436 1.05183 9.25034 0.33262 12.8779C-0.386594 16.5054 0.174037 20.27 1.91901 23.5306C3.66399 26.7911 6.48538 29.3459 9.90259 30.7597C13.3198 32.1734 17.1215 32.3588 20.66 31.2842C24.1986 30.2096 27.2551 27.9414 29.309 24.8661C31.3629 21.7908 32.2872 18.0985 31.9243 14.4182C31.5614 10.738 29.9338 7.29732 27.3188 4.68238C25.8323 3.19688 24.0677 2.01879 22.1258 1.21537C20.1839 0.411961 18.1027 -0.00102596 16.0012 1.91396e-06ZM16.0012 28.2352C13.1772 28.2295 10.4424 27.2451 8.26261 25.4497C6.0828 23.6542 4.59268 21.1588 4.04598 18.3881C3.49929 15.6175 3.9298 12.7431 5.26424 10.2542C6.59867 7.76533 8.75452 5.81593 11.3647 4.73791C13.9749 3.65989 16.878 3.51991 19.5798 4.3418C22.2816 5.16369 24.615 6.89663 26.1827 9.24557C27.7504 11.5945 28.4555 14.4142 28.1779 17.2246C27.9003 20.0349 26.6572 22.6622 24.6602 24.659C23.5226 25.7947 22.1723 26.6951 20.6866 27.3087C19.2008 27.9224 17.6087 28.2372 16.0012 28.2352Z",
                        fill: "#ED344E",
                    }),
                    jsxRuntime.jsx("path", {
                        d: "M21.3645 11.1053C21.1948 10.9264 20.9904 10.784 20.7639 10.6866C20.5374 10.5893 20.2934 10.5391 20.0468 10.5391C19.8003 10.5391 19.5563 10.5893 19.3298 10.6866C19.1032 10.784 18.8989 10.9264 18.7292 11.1053L15.9997 13.8348L13.3645 11.1995C13.1927 11.0207 12.9871 10.8779 12.7595 10.7795C12.5319 10.6812 12.2869 10.6292 12.039 10.6267C11.791 10.6242 11.5451 10.6711 11.3156 10.7648C11.086 10.8586 10.8775 10.9971 10.7021 11.1725C10.5268 11.3478 10.3882 11.5563 10.2945 11.7859C10.2008 12.0154 10.1538 12.2614 10.1563 12.5093C10.1589 12.7572 10.2108 13.0022 10.3092 13.2298C10.4076 13.4574 10.5504 13.6631 10.7292 13.8348L13.3645 16.47L10.7292 19.1018C10.5504 19.2735 10.4076 19.4792 10.3092 19.7068C10.2108 19.9344 10.1589 20.1793 10.1563 20.4273C10.1538 20.6752 10.2008 20.9212 10.2945 21.1507C10.3882 21.3803 10.5268 21.5888 10.7021 21.7641C10.8775 21.9395 11.086 22.078 11.3156 22.1718C11.5451 22.2655 11.791 22.3124 12.039 22.3099C12.2869 22.3074 12.5319 22.2554 12.7595 22.1571C12.9871 22.0587 13.1927 21.9159 13.3645 21.7371L15.9997 19.1018L18.6349 21.7371C18.8074 21.9128 19.0129 22.0526 19.2397 22.1484C19.4665 22.2443 19.7101 22.2942 19.9563 22.2954C20.2025 22.2966 20.4465 22.2489 20.6741 22.1553C20.9018 22.0616 21.1087 21.9238 21.2829 21.7497C21.457 21.5757 21.5949 21.3688 21.6886 21.1412C21.7823 20.9135 21.83 20.6695 21.8289 20.4233C21.8278 20.1771 21.778 19.9336 21.6822 19.7067C21.5865 19.4799 21.4467 19.2743 21.271 19.1018L18.6358 16.4666L21.271 13.8313C21.6229 13.47 21.8275 12.9904 21.8448 12.4864C21.8621 11.9823 21.6908 11.4898 21.3645 11.1053Z",
                        fill: "#ED344E",
                    }),
                ],
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
            return jsxRuntime.jsx(OverrideComponent, utils.__assign({ DefaultComponent: DefaultComponent }, props));
        }
        return jsxRuntime.jsx(DefaultComponent, utils.__assign({}, props));
    };
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
function hasFontDefined(style) {
    if (style === undefined) {
        return false;
    }
    var lowerStyle = style.toLowerCase();
    return lowerStyle.includes("font-family:") || lowerStyle.includes("font:");
}

/*
 * Component.
 */
function BackButton(_a) {
    var onClick = _a.onClick;
    var t = useTranslation();
    return jsxRuntime.jsx(
        "button",
        utils.__assign({ onClick: onClick, "data-supertokens": "buttonBase backButton" }, { children: t("GO_BACK") })
    );
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
function ArrowLeftIcon(_a) {
    var color = _a.color;
    return jsxRuntime.jsx(
        "svg",
        utils.__assign(
            {
                xmlns: "http://www.w3.org/2000/svg",
                width: "11.272",
                height: "9.49",
                viewBox: "0 0 11.272 9.49",
                "data-supertokens": "arrowLeftIcon",
            },
            {
                children: jsxRuntime.jsx("path", {
                    fill: color,
                    stroke: "#fff",
                    strokeWidth: "0.75px",
                    d: "M9.931 5.2h.016-7.041L5.12 7.41a.581.581 0 0 1 0 .817l-.344.345a.576.576 0 0 1-.813 0L.168 4.778a.58.58 0 0 1 0-.816L3.962.168a.577.577 0 0 1 .813 0l.345.344a.57.57 0 0 1 .168.407.553.553 0 0 1-.168.4l-2.239 2.23h7.058a.6.6 0 0 1 .584.59v.487a.585.585 0 0 1-.592.574z",
                    transform: "translate(.375 .375)",
                }),
            }
        )
    );
}

/*
 * Component.
 */
function LogoutButton(_a) {
    var onClick = _a.onClick;
    var t = useTranslation();
    return jsxRuntime.jsxs(
        "button",
        utils.__assign(
            { onClick: onClick, "data-supertokens": "buttonBase logoutButton" },
            {
                children: [
                    jsxRuntime.jsx(ArrowLeftIcon, { color: "rgb(var(--palette-textGray))" }),
                    jsxRuntime.jsx("span", { children: t("LOGOUT") }),
                ],
            }
        )
    );
}

var styles =
    '/* Copyright (c) 2021, VRAI Labs and/or its affiliates. All rights reserved.\n *\n * This software is licensed under the Apache License, Version 2.0 (the\n * "License") as published by the Apache Software Foundation.\n *\n * You may not use this file except in compliance with the License. You may\n * obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0\n *\n * Unless required by applicable law or agreed to in writing, software\n * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT\n * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the\n * License for the specific language governing permissions and limitations\n * under the License.\n */\n\n[data-supertokens~="container"] {\n    --palette-background: 255, 255, 255;\n    --palette-inputBackground: 250, 250, 250;\n    --palette-inputBorder: 224, 224, 224;\n    --palette-primary: 255, 155, 51;\n    --palette-primaryBorder: 238, 141, 35;\n    --palette-success: 65, 167, 0;\n    --palette-successBackground: 217, 255, 191;\n    --palette-error: 255, 23, 23;\n    --palette-errorBackground: 255, 241, 235;\n    --palette-textTitle: 34, 34, 34;\n    --palette-textLabel: 34, 34, 34;\n    --palette-textInput: 34, 34, 34;\n    --palette-textPrimary: 101, 101, 101;\n    --palette-textLink: 0, 118, 255;\n    --palette-buttonText: 255, 255, 255;\n    --palette-textGray: 128, 128, 128;\n    --palette-superTokensBrandingBackground: 242, 245, 246;\n    --palette-superTokensBrandingText: 173, 189, 196;\n\n    --font-size-0: 12px;\n    --font-size-1: 14px;\n    --font-size-2: 16px;\n    --font-size-3: 19px;\n    --font-size-4: 24px;\n}\n\n/*\n * Default styles.\n */\n\n@-webkit-keyframes slideTop {\n    0% {\n        -webkit-transform: translateY(-5px);\n                transform: translateY(-5px);\n    }\n    100% {\n        -webkit-transform: translateY(0px);\n                transform: translateY(0px);\n    }\n}\n\n@keyframes slideTop {\n    0% {\n        -webkit-transform: translateY(-5px);\n                transform: translateY(-5px);\n    }\n    100% {\n        -webkit-transform: translateY(0px);\n                transform: translateY(0px);\n    }\n}\n\n@-webkit-keyframes swing-in-top-fwd {\n    0% {\n        -webkit-transform: rotateX(-100deg);\n        transform: rotateX(-100deg);\n        -webkit-transform-origin: top;\n        transform-origin: top;\n        opacity: 0;\n    }\n    100% {\n        -webkit-transform: rotateX(0deg);\n        transform: rotateX(0deg);\n        -webkit-transform-origin: top;\n        transform-origin: top;\n        opacity: 1;\n    }\n}\n\n@keyframes swing-in-top-fwd {\n    0% {\n        -webkit-transform: rotateX(-100deg);\n        transform: rotateX(-100deg);\n        -webkit-transform-origin: top;\n        transform-origin: top;\n        opacity: 0;\n    }\n    100% {\n        -webkit-transform: rotateX(0deg);\n        transform: rotateX(0deg);\n        -webkit-transform-origin: top;\n        transform-origin: top;\n        opacity: 1;\n    }\n}\n\n[data-supertokens~="container"] {\n    font-family: "Rubik", sans-serif;\n    margin: 12px auto;\n    margin-top: 26px;\n    margin-bottom: 26px;\n    width: 420px;\n    text-align: center;\n    border-radius: 8px;\n    box-shadow: 1px 1px 10px rgba(0, 0, 0, 0.16);\n    background-color: rgb(var(--palette-background));\n}\n\n@media (max-width: 440px) {\n    [data-supertokens~="container"] {\n        width: 95vw;\n    }\n}\n\n[data-supertokens~="row"] {\n    margin: 0 auto;\n    width: 76%;\n    padding-top: 30px;\n    padding-bottom: 10px;\n}\n\n[data-supertokens~="superTokensBranding"] {\n    display: block;\n    margin: 0 auto;\n    background: rgb(var(--palette-superTokensBrandingBackground));\n    color: rgb(var(--palette-superTokensBrandingText));\n    text-decoration: none;\n    width: -webkit-fit-content;\n    width: -moz-fit-content;\n    width: fit-content;\n    border-radius: 6px 6px 0 0;\n    padding: 4px 9px;\n    font-weight: 300;\n    font-size: var(--font-size-0);\n    letter-spacing: 0.4px;\n}\n\n[data-supertokens~="generalError"] {\n    background: rgb(var(--palette-errorBackground));\n    padding-top: 10px;\n    padding-bottom: 10px;\n    margin-bottom: 15px;\n    padding-left: 18px;\n    padding-right: 18px;\n    letter-spacing: 0.2px;\n    font-size: var(--font-size-1);\n    border-radius: 8px;\n    color: rgb(var(--palette-error));\n    -webkit-animation: swing-in-top-fwd 1s cubic-bezier(0.175, 0.885, 0.32, 1.275) both;\n            animation: swing-in-top-fwd 1s cubic-bezier(0.175, 0.885, 0.32, 1.275) both;\n    word-wrap: break-word;\n}\n\n[data-supertokens~="headerTitle"] {\n    font-size: var(--font-size-4);\n    line-height: 40px;\n    letter-spacing: 0.58px;\n    font-weight: 800;\n    margin-bottom: 2px;\n    color: rgb(var(--palette-textTitle));\n}\n\n[data-supertokens~="headerSubtitle"] {\n    margin-bottom: 21px;\n}\n\n[data-supertokens~="privacyPolicyAndTermsAndConditions"] {\n    max-width: 300px;\n    margin-top: 10px;\n}\n\n[data-supertokens~="privacyPolicyAndTermsAndConditions"] a {\n    line-height: 21px;\n}\n\n/* TODO: split the link style into separate things*/\n\n/* We add this before primary and secondary text, because if they are applied to the same element the other ones take priority */\n\n[data-supertokens~="link"] {\n    padding-left: 3px;\n    padding-right: 3px;\n    color: rgb(var(--palette-textLink));\n    font-size: var(--font-size-1);\n    cursor: pointer;\n    letter-spacing: 0.16px;\n    line-height: 26px;\n}\n\n[data-supertokens~="primaryText"] {\n    font-size: var(--font-size-1);\n    font-weight: 500;\n    letter-spacing: 0.4px;\n    line-height: 21px;\n    color: rgb(var(--palette-textLabel));\n}\n\n[data-supertokens~="secondaryText"] {\n    font-size: var(--font-size-1);\n    font-weight: 300;\n    letter-spacing: 0.4px;\n    color: rgb(var(--palette-textPrimary));\n}\n\n[data-supertokens~="divider"] {\n    margin-top: 1em;\n    margin-bottom: 1em;\n    border-bottom: 0.3px solid #dddddd;\n    align-items: center;\n    padding-bottom: 5px;\n}\n\n[data-supertokens~="headerTinyTitle"] {\n    margin-top: 13px;\n    font-size: var(--font-size-3);\n    letter-spacing: 1.1px;\n    font-weight: 500;\n    line-height: 28px;\n}\n\n[data-supertokens~="secondaryLinkWithArrow"] {\n    margin-top: 10px;\n    margin-bottom: 30px;\n    cursor: pointer;\n}\n\n[data-supertokens~="secondaryLinkWithArrow"]:hover {\n    position: relative;\n    left: 2px;\n    word-spacing: 4px;\n}\n\n[data-supertokens~="generalSuccess"] {\n    color: rgb(var(--palette-success));\n    font-size: var(--font-size-1);\n    background: rgb(var(--palette-successBackground));\n    -webkit-animation: swing-in-top-fwd 1s cubic-bezier(0.175, 0.885, 0.32, 1.275) both;\n            animation: swing-in-top-fwd 1s cubic-bezier(0.175, 0.885, 0.32, 1.275) both;\n    padding: 9px 15px 9px 15px;\n    border-radius: 6px;\n    display: inline-block;\n}\n\n[data-supertokens~="spinner"] {\n    width: 80px;\n    height: auto;\n    padding-top: 20px;\n    padding-bottom: 40px;\n    margin: 0 auto;\n}\n\n[data-supertokens~="error"] {\n    color: rgb(var(--palette-error));\n}\n\n[data-supertokens~="linkButton"] {\n    background-color: transparent;\n    border: 0;\n}\n\n[data-supertokens~="secondaryLinkWithLeftArrow"] {\n    margin-top: 10px;\n    margin-bottom: 40px;\n    cursor: pointer;\n}\n\n[data-supertokens~="secondaryLinkWithLeftArrow"] svg {\n    margin-right: 0.3em;\n}\n\n[data-supertokens~="secondaryLinkWithLeftArrow"]:hover svg {\n    position: relative;\n    left: -4px;\n}\n\n[data-supertokens~="button"] {\n    background-color: rgb(var(--palette-primary));\n    color: rgb(var(--palette-buttonText));\n    width: 100%;\n    height: 34px;\n    font-weight: 700;\n    border-width: 1px;\n    border-style: solid;\n    border-radius: 6px;\n    border-color: rgb(var(--palette-primaryBorder));\n    background-position: center;\n    transition: all 0.4s;\n    background-size: 12000%;\n    cursor: pointer;\n}\n\n[data-supertokens~="button"]:disabled {\n    border: none;\n    cursor: no-drop;\n}\n\n[data-supertokens~="button"]:active {\n    outline: none;\n    transition: all 0s;\n    background-size: 100%;\n    -webkit-filter: brightness(0.85);\n            filter: brightness(0.85);\n}\n\n[data-supertokens~="button"]:focus {\n    outline: none;\n}\n\n/* Override */\n\n[data-supertokens~="row"] {\n    padding-top: 32px;\n    padding-bottom: 32px;\n}\n\n[data-supertokens~="divider"] {\n    padding: 0;\n    margin: 24px 0;\n}\n\n[data-supertokens~="headerTitle"] {\n    padding-top: 24px;\n    font-style: normal;\n    font-weight: 700;\n    font-size: 20px;\n    line-height: 30px;\n}\n\n[data-supertokens~="container"] {\n    width: 400px;\n}\n\n/* Override end */\n\n[data-supertokens~="center"] {\n    height: 100%;\n    display: flex;\n    flex-direction: column;\n    align-items: center;\n    justify-content: center;\n    flex: 1 1 auto;\n}\n\n[data-supertokens~="buttonsGroup"] {\n    display: flex;\n    align-items: center;\n    justify-content: space-between;\n}\n\n[data-supertokens~="buttonBase"] {\n    font-size: var(--font-size-1);\n    line-height: 21px;\n    font-weight: 500;\n    background: transparent;\n    outline: none;\n    border: none;\n    cursor: pointer;\n}\n\n[data-supertokens~="backButton"] {\n    color: rgb(var(--palette-textLink));\n}\n\n[data-supertokens~="logoutButton"] {\n    display: flex;\n    align-items: center;\n    gap: 6px;\n    color: rgb(var(--palette-textGray));\n}\n';

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

var AccessDeniedScreen$1 = function (props) {
    var userContext = useUserContext();
    var t = useTranslation();
    var onLogout = function () {
        return utils.__awaiter(void 0, void 0, void 0, function () {
            return utils.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        return [4 /*yield*/, props.recipe.signOut({ userContext: userContext })];
                    case 1:
                        _a.sent();
                        return [
                            4 /*yield*/,
                            utils$1.SuperTokens.getInstanceOrThrow().redirectToAuth({
                                show: "signin",
                                redirectBack: false,
                            }),
                        ];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    var onBackButtonClicked = function () {
        // If we don't have history available this would mean we are not using react-router-dom, so we use window's history
        if (props.history === undefined) {
            return windowHandler.WindowHandlerReference.getReferenceOrThrow()
                .windowHandler.getWindowUnsafe()
                .history.back();
        }
        // If we do have history and goBack function on it this means we are using react-router-dom v5 or lower
        if (props.history.goBack !== undefined) {
            return props.history.goBack();
        }
        // If we reach this code this means we are using react-router-dom v6
        return props.history(-1);
    };
    return jsxRuntime.jsx(
        "div",
        utils.__assign(
            { "data-supertokens": "center" },
            {
                children: jsxRuntime.jsx(
                    "div",
                    utils.__assign(
                        { "data-supertokens": "container" },
                        {
                            children: jsxRuntime.jsxs(
                                "div",
                                utils.__assign(
                                    { "data-supertokens": "row" },
                                    {
                                        children: [
                                            jsxRuntime.jsx(ErrorRoundIcon, {}),
                                            jsxRuntime.jsx(
                                                "div",
                                                utils.__assign(
                                                    { "data-supertokens": "headerTitle" },
                                                    { children: t("ACCESS_DENIED") }
                                                )
                                            ),
                                            jsxRuntime.jsx("div", { "data-supertokens": "divider" }),
                                            jsxRuntime.jsxs(
                                                "div",
                                                utils.__assign(
                                                    { "data-supertokens": "buttonsGroup" },
                                                    {
                                                        children: [
                                                            jsxRuntime.jsx(LogoutButton, { onClick: onLogout }),
                                                            jsxRuntime.jsx(BackButton, {
                                                                onClick: onBackButtonClicked,
                                                            }),
                                                        ],
                                                    }
                                                )
                                            ),
                                        ],
                                    }
                                )
                            ),
                        }
                    )
                ),
            }
        )
    );
};
var AccessDeniedThemeWithOverride = withOverride("SessionAccessDenied", AccessDeniedScreen$1);
var AccessDeniedTheme = function (props) {
    var hasFont = hasFontDefined(props.config.rootStyle);
    return jsxRuntime.jsx(
        ThemeBase,
        utils.__assign(
            { loadDefaultFont: !hasFont, userStyles: [props.config.rootStyle, props.config.accessDeniedScreen.style] },
            { children: jsxRuntime.jsx(AccessDeniedThemeWithOverride, utils.__assign({}, props)) }
        )
    );
};

var defaultTranslationsCommon = {
    en: {
        BRANDING_POWERED_BY_START: "Powered by ",
        BRANDING_POWERED_BY_END: "",
        SOMETHING_WENT_WRONG_ERROR: "Something went wrong. Please try again.",
    },
};

var defaultTranslationsSession = {
    en: utils.__assign(utils.__assign({}, defaultTranslationsCommon.en), {
        ACCESS_DENIED: "Access denied",
        GO_BACK: "Go back",
        LOGOUT: "Log out",
    }),
};

var AccessDeniedScreen = function (props) {
    var _a;
    var recipeComponentOverrides = props.useComponentOverrides();
    var history =
        (_a = uiEntry.UI.getReactRouterDomWithCustomHistory()) === null || _a === void 0
            ? void 0
            : _a.useHistoryCustom();
    return jsxRuntime.jsx(
        ComponentOverrideContext.Provider,
        utils.__assign(
            { value: recipeComponentOverrides },
            {
                children: jsxRuntime.jsx(
                    FeatureWrapper,
                    utils.__assign(
                        { defaultStore: defaultTranslationsSession },
                        {
                            children: jsxRuntime.jsx(AccessDeniedTheme, {
                                config: props.recipe.config,
                                history: history,
                                recipe: props.recipe,
                            }),
                        }
                    )
                ),
            }
        )
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
function normaliseSessionConfig(config) {
    var _a, _b;
    if (config === undefined) {
        config = {};
    }
    var accessDeniedScreenStyle =
        (_b = (_a = config.accessDeniedScreen) === null || _a === void 0 ? void 0 : _a.style) !== null && _b !== void 0
            ? _b
            : "";
    var accessDeniedScreen = {
        style: accessDeniedScreenStyle,
    };
    var override = utils.__assign(
        {
            functions: function (originalImplementation) {
                return originalImplementation;
            },
        },
        config.override
    );
    return utils.__assign(utils.__assign({}, utils$1.normaliseRecipeModuleConfig(config)), {
        accessDeniedScreen: accessDeniedScreen,
        override: override,
    });
}
var getFailureRedirectionInfo = function (_a) {
    var invalidClaims = _a.invalidClaims,
        overrideGlobalClaimValidators = _a.overrideGlobalClaimValidators,
        userContext = _a.userContext;
    return utils.__awaiter(void 0, void 0, void 0, function () {
        var invalidClaimsMap,
            globalValidators,
            failedClaim,
            _i,
            globalValidators_1,
            validator,
            claim,
            failureCallback,
            redirectPath;
        return utils.__generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    invalidClaimsMap = invalidClaims.reduce(function (map, validator) {
                        map[validator.validatorId] = validator;
                        return map;
                    }, {});
                    globalValidators = utils$2.getGlobalClaimValidators({
                        overrideGlobalClaimValidators: overrideGlobalClaimValidators,
                        userContext: userContext,
                    });
                    failedClaim = undefined;
                    (_i = 0), (globalValidators_1 = globalValidators);
                    _b.label = 1;
                case 1:
                    if (!(_i < globalValidators_1.length)) return [3 /*break*/, 5];
                    validator = globalValidators_1[_i];
                    claim = invalidClaimsMap[validator.id];
                    if (!(claim !== undefined)) return [3 /*break*/, 3];
                    failureCallback = validator.onFailureRedirection;
                    if (!failureCallback) return [3 /*break*/, 3];
                    return [4 /*yield*/, failureCallback({ reason: claim.reason, userContext: userContext })];
                case 2:
                    redirectPath = _b.sent();
                    if (redirectPath !== undefined) {
                        return [
                            2 /*return*/,
                            {
                                redirectPath: redirectPath,
                                failedClaim: claim,
                            },
                        ];
                    }
                    _b.label = 3;
                case 3:
                    if (validator.showAccessDeniedOnFailure !== false && failedClaim === undefined) {
                        failedClaim = claim;
                    }
                    _b.label = 4;
                case 4:
                    _i++;
                    return [3 /*break*/, 1];
                case 5:
                    return [
                        2 /*return*/,
                        {
                            redirectPath: undefined,
                            failedClaim: failedClaim,
                        },
                    ];
            }
        });
    });
};

var Session = /** @class */ (function (_super) {
    utils.__extends(Session, _super);
    function Session(config, webJSRecipe) {
        if (webJSRecipe === void 0) {
            webJSRecipe = WebJSSessionRecipe__default.default;
        }
        var _this = _super.call(this, config) || this;
        _this.webJSRecipe = webJSRecipe;
        _this.eventListeners = new Set();
        _this.redirectionHandlersFromAuthRecipes = new Map();
        _this.getUserId = function (input) {
            return _this.webJSRecipe.getUserId(input);
        };
        _this.getAccessToken = function (input) {
            return _this.webJSRecipe.getAccessToken(input);
        };
        _this.getClaimValue = function (input) {
            return _this.webJSRecipe.getClaimValue(input);
        };
        _this.getAccessTokenPayloadSecurely = function (input) {
            return utils.__awaiter(_this, void 0, void 0, function () {
                return utils.__generator(this, function (_a) {
                    return [2 /*return*/, this.webJSRecipe.getAccessTokenPayloadSecurely(input)];
                });
            });
        };
        _this.doesSessionExist = function (input) {
            return _this.webJSRecipe.doesSessionExist(input);
        };
        _this.signOut = function (input) {
            return _this.webJSRecipe.signOut(input);
        };
        _this.attemptRefreshingSession = function () {
            return utils.__awaiter(_this, void 0, void 0, function () {
                return utils.__generator(this, function (_a) {
                    return [2 /*return*/, this.webJSRecipe.attemptRefreshingSession()];
                });
            });
        };
        _this.validateClaims = function (input) {
            return _this.webJSRecipe.validateClaims(input);
        };
        _this.getInvalidClaimsFromResponse = function (input) {
            return _this.webJSRecipe.getInvalidClaimsFromResponse(input);
        };
        /**
         * @returns Function to remove event listener
         */
        _this.addEventListener = function (listener) {
            _this.eventListeners.add(listener);
            return function () {
                return _this.eventListeners.delete(listener);
            };
        };
        _this.addAuthRecipeRedirectionHandler = function (rid, redirect) {
            _this.redirectionHandlersFromAuthRecipes.set(rid, redirect);
        };
        _this.validateGlobalClaimsAndHandleSuccessRedirection = function (redirectInfo, userContext, history) {
            return utils.__awaiter(_this, void 0, void 0, function () {
                var invalidClaims, jsonContext, failureRedirectInfo, successContextStr, authRecipeRedirectHandler;
                return utils.__generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            return [4 /*yield*/, this.doesSessionExist({ userContext: userContext })];
                        case 1:
                            // First we check if there is an active session
                            if (!_a.sent()) {
                                // If there is none, we have no way of checking claims, so we redirect to the auth page
                                // This can happen e.g.: if the user clicked on the email verification link in a browser without an active session
                                return [
                                    2 /*return*/,
                                    utils$1.SuperTokens.getInstanceOrThrow().redirectToAuth({
                                        history: history,
                                        redirectBack: false,
                                    }),
                                ];
                            }
                            return [4 /*yield*/, this.validateClaims({ userContext: userContext })];
                        case 2:
                            invalidClaims = _a.sent();
                            if (!(invalidClaims.length > 0)) return [3 /*break*/, 6];
                            if (!(redirectInfo !== undefined)) return [3 /*break*/, 4];
                            jsonContext = JSON.stringify(redirectInfo);
                            return [
                                4 /*yield*/,
                                utils.setLocalStorage("supertokens-success-redirection-context", jsonContext),
                            ];
                        case 3:
                            _a.sent();
                            _a.label = 4;
                        case 4:
                            return [
                                4 /*yield*/,
                                getFailureRedirectionInfo({
                                    invalidClaims: invalidClaims,
                                    userContext: userContext,
                                }),
                            ];
                        case 5:
                            failureRedirectInfo = _a.sent();
                            // if redirectPath is string that means failed claim had callback that returns path, we redirect there otherwise continue
                            if (failureRedirectInfo.redirectPath !== undefined) {
                                return [
                                    2 /*return*/,
                                    utils$1.SuperTokens.getInstanceOrThrow().redirectToUrl(
                                        failureRedirectInfo.redirectPath,
                                        history
                                    ),
                                ];
                            }
                            _a.label = 6;
                        case 6:
                            if (!(redirectInfo === undefined)) return [3 /*break*/, 13];
                            return [4 /*yield*/, utils.getLocalStorage("supertokens-success-redirection-context")];
                        case 7:
                            successContextStr = _a.sent();
                            if (!(successContextStr !== null)) return [3 /*break*/, 12];
                            _a.label = 8;
                        case 8:
                            _a.trys.push([8, , 9, 11]);
                            redirectInfo = JSON.parse(successContextStr);
                            return [3 /*break*/, 11];
                        case 9:
                            return [
                                4 /*yield*/,
                                utils.removeFromLocalStorage("supertokens-success-redirection-context"),
                            ];
                        case 10:
                            _a.sent();
                            return [7 /*endfinally*/];
                        case 11:
                            return [3 /*break*/, 13];
                        case 12:
                            // If there was nothing in localstorage we set a default
                            // this can happen if the user visited email verification screen without an auth recipe redirecting them there
                            // but already had the email verified and an active session
                            redirectInfo = {
                                rid: Session.RECIPE_ID,
                                successRedirectContext: {
                                    action: "SUCCESS",
                                    isNewUser: false,
                                },
                            };
                            _a.label = 13;
                        case 13:
                            authRecipeRedirectHandler = this.redirectionHandlersFromAuthRecipes.get(redirectInfo.rid);
                            if (authRecipeRedirectHandler !== undefined) {
                                // and call it with the saved info
                                return [
                                    2 /*return*/,
                                    authRecipeRedirectHandler(redirectInfo.successRedirectContext, history),
                                ];
                            }
                            // This should only happen if the configuration changed between saving the context and finishing the sign in process
                            // or if the user navigated to a page where they were expected to have a stored redirectInfo but didn't
                            // (e.g.: pressed back after email verification)
                            return [2 /*return*/, this.redirect(redirectInfo.successRedirectContext, history)];
                    }
                });
            });
        };
        /**
         * This should only get called if validateGlobalClaimsAndHandleSuccessRedirection couldn't get a redirectInfo
         * @returns "/"
         */
        _this.getDefaultRedirectionURL = function () {
            return utils.__awaiter(_this, void 0, void 0, function () {
                return utils.__generator(this, function (_a) {
                    return [2 /*return*/, "/"];
                });
            });
        };
        _this.notifyListeners = function (event) {
            return utils.__awaiter(_this, void 0, void 0, function () {
                var sessionContext;
                return utils.__generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            return [4 /*yield*/, this.getSessionContext(event)];
                        case 1:
                            sessionContext = _a.sent();
                            // We copy this.eventListeners into a new array to "freeze" it for the loop
                            // We do this to avoid an infinite loop in case one of the listeners causes a new listener to be added (e.g.: through re-rendering)
                            Array.from(this.eventListeners).forEach(function (listener) {
                                return listener(utils.__assign({ sessionContext: sessionContext }, event));
                            });
                            return [2 /*return*/];
                    }
                });
            });
        };
        _this.getFeatures = function () {
            return {};
        };
        _this.getFeatureComponent = function (componentName, props, useComponentOverrides) {
            if (useComponentOverrides === void 0) {
                useComponentOverrides = useContext;
            }
            var featureComponents = {
                accessDenied: jsxRuntime.jsx(
                    UserContextWrapper,
                    utils.__assign(
                        { userContext: props.userContext },
                        {
                            children: jsxRuntime.jsx(
                                AccessDeniedScreen,
                                utils.__assign({ recipe: _this }, props, {
                                    useComponentOverrides: useComponentOverrides,
                                })
                            ),
                        }
                    )
                ),
            };
            var featureComponent = featureComponents[componentName];
            if (featureComponent) {
                return featureComponent;
            } else {
                throw new Error("Should never come here.");
            }
        };
        return _this;
    }
    Session.prototype.getSessionContext = function (_a) {
        var action = _a.action,
            userContext = _a.userContext;
        return utils.__awaiter(this, void 0, void 0, function () {
            var _b, userId, accessTokenPayload;
            return utils.__generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        if (
                            !(
                                action === "SESSION_CREATED" ||
                                action === "REFRESH_SESSION" ||
                                action === "API_INVALID_CLAIM" ||
                                action === "ACCESS_TOKEN_PAYLOAD_UPDATED"
                            )
                        )
                            return [3 /*break*/, 2];
                        return [
                            4 /*yield*/,
                            Promise.all([
                                this.getUserId({
                                    userContext: userContext,
                                }),
                                this.getAccessTokenPayloadSecurely({
                                    userContext: userContext,
                                }),
                            ]),
                        ];
                    case 1:
                        (_b = _c.sent()), (userId = _b[0]), (accessTokenPayload = _b[1]);
                        return [
                            2 /*return*/,
                            {
                                doesSessionExist: true,
                                accessTokenPayload: accessTokenPayload,
                                userId: userId,
                            },
                        ];
                    case 2:
                        if (action === "SIGN_OUT" || action === "UNAUTHORISED") {
                            return [
                                2 /*return*/,
                                {
                                    doesSessionExist: false,
                                    accessTokenPayload: {},
                                    userId: "",
                                },
                            ];
                        }
                        throw new Error("Unhandled recipe event: ".concat(action));
                }
            });
        });
    };
    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    Session.addAxiosInterceptors = function (axiosInstance, userContext) {
        return WebJSSessionRecipe__default.default.addAxiosInterceptors(axiosInstance, userContext);
    };
    Session.init = function (config) {
        var _this = this;
        var normalisedConfig = normaliseSessionConfig(config);
        return {
            authReact: function (appInfo) {
                Session.instance = new Session(
                    utils.__assign(utils.__assign({}, normalisedConfig), {
                        appInfo: appInfo,
                        recipeId: Session.RECIPE_ID,
                    })
                );
                return Session.instance;
            },
            webJS: WebJSSessionRecipe__default.default.init(
                utils.__assign(utils.__assign({}, normalisedConfig), {
                    onHandleEvent: function (event) {
                        if (normalisedConfig.onHandleEvent !== undefined) {
                            normalisedConfig.onHandleEvent(event);
                        }
                        void Session.getInstanceOrThrow().notifyListeners(event);
                    },
                    preAPIHook: function (context) {
                        return utils.__awaiter(_this, void 0, void 0, function () {
                            var response;
                            return utils.__generator(this, function (_a) {
                                response = utils.__assign(utils.__assign({}, context), {
                                    requestInit: utils.__assign(utils.__assign({}, context.requestInit), {
                                        headers: utils.__assign(utils.__assign({}, context.requestInit.headers), {
                                            rid: Session.RECIPE_ID,
                                        }),
                                    }),
                                });
                                if (normalisedConfig.preAPIHook === undefined) {
                                    return [2 /*return*/, response];
                                } else {
                                    return [2 /*return*/, normalisedConfig.preAPIHook(context)];
                                }
                            });
                        });
                    },
                })
            ),
        };
    };
    Session.getInstanceOrThrow = function () {
        if (Session.instance === undefined) {
            throw Error(
                "No instance of Session found. Make sure to call the Session.init method. See https://supertokens.io/docs/emailpassword/quick-setup/frontend"
            );
        }
        return Session.instance;
    };
    Session.getInstance = function () {
        return Session.instance;
    };
    Session.reset = function () {
        if (!utils.isTest()) {
            return;
        }
        Session.instance = undefined;
        return;
    };
    Session.RECIPE_ID = "session";
    return Session;
})(utils$1.RecipeModule);

exports.AccessDeniedScreen = AccessDeniedScreen;
exports.AccessDeniedTheme = AccessDeniedTheme;
exports.ArrowLeftIcon = ArrowLeftIcon;
exports.ComponentOverrideContext = ComponentOverrideContext;
exports.FeatureWrapper = FeatureWrapper;
exports.Provider = Provider;
exports.Session = Session;
exports.UserContextContext = UserContextContext;
exports.UserContextWrapper = UserContextWrapper;
exports.defaultTranslationsCommon = defaultTranslationsCommon;
exports.getFailureRedirectionInfo = getFailureRedirectionInfo;
exports.hasFontDefined = hasFontDefined;
exports.useContext = useContext;
exports.useTranslation = useTranslation;
exports.useUserContext = useUserContext;
exports.withOverride = withOverride;
//# sourceMappingURL=session-shared2.js.map
