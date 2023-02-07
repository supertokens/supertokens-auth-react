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

var commonjsGlobal =
    typeof globalThis !== "undefined"
        ? globalThis
        : typeof window !== "undefined"
        ? window
        : typeof global !== "undefined"
        ? global
        : typeof self !== "undefined"
        ? self
        : {};

function getDefaultExportFromCjs(x) {
    return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, "default") ? x["default"] : x;
}

var build = {};

var getProxyObject$1 = {};

var __assign =
    (commonjsGlobal && commonjsGlobal.__assign) ||
    function () {
        __assign =
            Object.assign ||
            function (t) {
                for (var s, i = 1, n = arguments.length; i < n; i++) {
                    s = arguments[i];
                    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
                }
                return t;
            };
        return __assign.apply(this, arguments);
    };
Object.defineProperty(getProxyObject$1, "__esModule", { value: true });
getProxyObject$1.getProxyObject = void 0;
function getProxyObject(orig) {
    var ret = __assign(__assign({}, orig), {
        _call: function (_, __) {
            throw new Error("This function should only be called through the recipe object");
        },
    });
    var keys = Object.keys(ret);
    var _loop_1 = function (k) {
        if (k !== "_call") {
            ret[k] = function () {
                var args = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    args[_i] = arguments[_i];
                }
                return this._call(k, args);
            };
        }
    };
    for (var _i = 0, keys_1 = keys; _i < keys_1.length; _i++) {
        var k = keys_1[_i];
        _loop_1(k);
    }
    return ret;
}
getProxyObject$1.getProxyObject = getProxyObject;

Object.defineProperty(build, "__esModule", { value: true });
exports.OverrideableBuilder_1 = build.OverrideableBuilder = void 0;
var getProxyObject_1 = getProxyObject$1;
var OverrideableBuilder = /** @class */ (function () {
    function OverrideableBuilder(originalImplementation) {
        this.layers = [originalImplementation];
        this.proxies = [];
    }
    OverrideableBuilder.prototype.override = function (overrideFunc) {
        var proxy = (0, getProxyObject_1.getProxyObject)(this.layers[0]);
        var layer = overrideFunc(proxy, this);
        for (var _i = 0, _a = Object.keys(this.layers[0]); _i < _a.length; _i++) {
            var key = _a[_i];
            if (layer[key] === proxy[key] || key === "_call") {
                delete layer[key];
            } else if (layer[key] === undefined) {
                layer[key] = null;
            }
        }
        this.layers.push(layer);
        this.proxies.push(proxy);
        return this;
    };
    OverrideableBuilder.prototype.build = function () {
        var _this = this;
        if (this.result) {
            return this.result;
        }
        this.result = {};
        for (var _i = 0, _a = this.layers; _i < _a.length; _i++) {
            var layer = _a[_i];
            for (var _b = 0, _c = Object.keys(layer); _b < _c.length; _b++) {
                var key = _c[_b];
                var override = layer[key];
                if (override !== undefined) {
                    if (override === null) {
                        this.result[key] = undefined;
                    } else if (typeof override === "function") {
                        this.result[key] = override.bind(this.result);
                    } else {
                        this.result[key] = override;
                    }
                }
            }
        }
        var _loop_1 = function (proxyInd) {
            var proxy = this_1.proxies[proxyInd];
            proxy._call = function (fname, args) {
                for (var i = proxyInd; i >= 0; --i) {
                    var func = _this.layers[i][fname];
                    if (func !== undefined && func !== null) {
                        return func.bind(_this.result).apply(void 0, args);
                    }
                }
            };
        };
        var this_1 = this;
        for (var proxyInd = 0; proxyInd < this.proxies.length; ++proxyInd) {
            _loop_1(proxyInd);
        }
        return this.result;
    };
    return OverrideableBuilder;
})();
exports.OverrideableBuilder_1 = build.OverrideableBuilder = OverrideableBuilder;
build.default = OverrideableBuilder;

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

exports.ComponentOverrideContext = ComponentOverrideContext;
exports.FeatureWrapper = FeatureWrapper;
exports.GeneralError = GeneralError;
exports.createGenericComponentsOverrideContext = createGenericComponentsOverrideContext;
exports.defaultTranslationsCommon = defaultTranslationsCommon;
exports.getDefaultExportFromCjs = getDefaultExportFromCjs;
exports.hasFontDefined = hasFontDefined;
exports.withOverride = withOverride;
//# sourceMappingURL=translations.js.map
