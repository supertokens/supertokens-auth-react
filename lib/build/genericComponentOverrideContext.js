"use strict";

var sessionAuth = require("./session-shared.js");
var jsxRuntime = require("react/jsx-runtime");
var React = require("react");
var translationContext = require("./translationContext.js");
var reactDom = require("react-dom");

function _interopDefault(e) {
    return e && e.__esModule ? e : { default: e };
}

var React__default = /*#__PURE__*/ _interopDefault(React);

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

var ComponentOverrideContext = React__default.default.createContext("IS_DEFAULT");

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
                sessionAuth.__assign({ DefaultComponent: DefaultComponent }, props)
            );
        }
        return jsxRuntime.jsx(DefaultComponent, sessionAuth.__assign({}, props));
    };
};

function GeneralError(_a) {
    var error = _a.error;
    var t = translationContext.useTranslation();
    return jsxRuntime.jsx("div", sessionAuth.__assign({ "data-supertokens": "generalError" }, { children: t(error) }));
}

/*
 * Component.
 */
var ErrorBoundary = /** @class */ (function (_super) {
    sessionAuth.__extends(ErrorBoundary, _super);
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
    var st = sessionAuth.SuperTokens.getInstanceOrThrow();
    return jsxRuntime.jsx(ErrorBoundary, {
        children: jsxRuntime.jsx(
            translationContext.TranslationContextProvider,
            sessionAuth.__assign(
                {
                    defaultLanguage: st.languageTranslations.defaultLanguage,
                    defaultStore: sessionAuth.mergeObjects(defaultStore, st.languageTranslations.userTranslationStore),
                    translationControlEventSource: st.languageTranslations.translationEventSource,
                    userTranslationFunc: st.languageTranslations.userTranslationFunc,
                },
                {
                    children: jsxRuntime.jsx(
                        WithOrWithoutShadowDom,
                        sessionAuth.__assign({ useShadowDom: useShadowDom }, { children: children })
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
        sessionAuth.__assign(
            { id: sessionAuth.ST_ROOT_ID, ref: rootDiv },
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
            sessionAuth.__assign(
                { id: sessionAuth.ST_ROOT_ID },
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
        sessionAuth.__assign(
            { type: "text/css" },
            {
                children:
                    "input.supertokens-input:-webkit-autofill,input.supertokens-input:-webkit-autofill:focus,input.supertokens-input:-webkit-autofill:hover,select:-webkit-autofill,select:-webkit-autofill:focus,select:-webkit-autofill:hover,textarea:-webkit-autofill,textarea:-webkit-autofill:focus,textarea:-webkit-autofill:hover{transition:background-color 5000s ease-in-out 0s}",
            }
        )
    );
    /* eslint-enable react/jsx-no-literals */
}

var defaultTranslationsCommon = {
    en: {
        BRANDING_POWERED_BY_START: "Powered by ",
        BRANDING_POWERED_BY_END: "",
        SOMETHING_WENT_WRONG_ERROR: "Something went wrong. Please try again.",
    },
};

var createGenericComponentsOverrideContext = function (v) {
    if (v === void 0) {
        v = {};
    }
    var genericContext = React__default.default.createContext(v);
    var useComponentsOverrideContext = function () {
        return React__default.default.useContext(genericContext);
    };
    var Provider = function (_a) {
        var children = _a.children,
            components = _a.components;
        return jsxRuntime.jsx(
            genericContext.Provider,
            sessionAuth.__assign({ value: components }, { children: children })
        );
    };
    return [useComponentsOverrideContext, Provider, genericContext.Consumer];
};

exports.ComponentOverrideContext = ComponentOverrideContext;
exports.FeatureWrapper = FeatureWrapper;
exports.GeneralError = GeneralError;
exports.createGenericComponentsOverrideContext = createGenericComponentsOverrideContext;
exports.defaultTranslationsCommon = defaultTranslationsCommon;
exports.hasFontDefined = hasFontDefined;
exports.withOverride = withOverride;
//# sourceMappingURL=genericComponentOverrideContext.js.map
