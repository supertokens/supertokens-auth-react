"use strict";

var sessionAuth = require("./session-shared.js");
var jsxRuntime = require("react/jsx-runtime");
var React = require("react");
var translationContext = require("./translationContext.js");
var recipe = require("./recipe.js");
var reactDom = require("react-dom");

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
// eslint-disable-next-line @typescript-eslint/no-unused-vars
function hasFontDefined(_style) {
    // TODO: proper implementation or explicit setting
    return false;
    // return (style && style.container && (style.container.fontFamily || style.container.font)) !== undefined;
}

var ComponentOverrideContext = React.createContext("IS_DEFAULT");

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

var error$2 = {};

var error$1 = {};

var error = {};

/* Copyright (c) 2020, VRAI Labs and/or its affiliates. All rights reserved.
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

(function (exports) {
    function __export(m) {
        for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
    }
    exports.__esModule = true;

    let d = recipe.requireError();

    if (d.default !== undefined) {
        __export(d);
    } else {
        __export({
            default: d,
            ...d,
        });
    }
})(error);

/* Copyright (c) 2022, VRAI Labs and/or its affiliates. All rights reserved.
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
Object.defineProperty(error$1, "__esModule", { value: true });
/**
 * This error usually indicates that the API exposed by the backend SDKs responded
 * with `{status: "GENERAL_ERROR"}`. This should be used to show errors to the user
 * in your frontend application.
 */
var error_1$1 = error;
error$1.default = error_1$1.STGeneralError;

/* Copyright (c) 2022, VRAI Labs and/or its affiliates. All rights reserved.
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

(function (exports) {
    function __export(m) {
        for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
    }
    exports.__esModule = true;

    let d = error$1;

    if (d.default !== undefined) {
        __export(d);
    } else {
        __export({
            default: d,
            ...d,
        });
    }
})(error$2);

var STGeneralError = /*@__PURE__*/ recipe.getDefaultExportFromCjs(error$2);

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
})(React.Component);

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

var querier = {};

var version = {};

Object.defineProperty(version, "__esModule", { value: true });
version.supported_fdi = version.package_version = void 0;
/* Copyright (c) 2022, VRAI Labs and/or its affiliates. All rights reserved.
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
version.package_version = "0.3.0";
version.supported_fdi = ["1.15"];

var __assign$1 =
    (recipe.commonjsGlobal && recipe.commonjsGlobal.__assign) ||
    function () {
        __assign$1 =
            Object.assign ||
            function (t) {
                for (var s, i = 1, n = arguments.length; i < n; i++) {
                    s = arguments[i];
                    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
                }
                return t;
            };
        return __assign$1.apply(this, arguments);
    };
var __awaiter =
    (recipe.commonjsGlobal && recipe.commonjsGlobal.__awaiter) ||
    function (thisArg, _arguments, P, generator) {
        function adopt(value) {
            return value instanceof P
                ? value
                : new P(function (resolve) {
                      resolve(value);
                  });
        }
        return new (P || (P = Promise))(function (resolve, reject) {
            function fulfilled(value) {
                try {
                    step(generator.next(value));
                } catch (e) {
                    reject(e);
                }
            }
            function rejected(value) {
                try {
                    step(generator["throw"](value));
                } catch (e) {
                    reject(e);
                }
            }
            function step(result) {
                result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
            }
            step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
    };
var __generator =
    (recipe.commonjsGlobal && recipe.commonjsGlobal.__generator) ||
    function (thisArg, body) {
        var _ = {
                label: 0,
                sent: function () {
                    if (t[0] & 1) throw t[1];
                    return t[1];
                },
                trys: [],
                ops: [],
            },
            f,
            y,
            t,
            g;
        return (
            (g = { next: verb(0), throw: verb(1), return: verb(2) }),
            typeof Symbol === "function" &&
                (g[Symbol.iterator] = function () {
                    return this;
                }),
            g
        );
        function verb(n) {
            return function (v) {
                return step([n, v]);
            };
        }
        function step(op) {
            if (f) throw new TypeError("Generator is already executing.");
            while (_)
                try {
                    if (
                        ((f = 1),
                        y &&
                            (t =
                                op[0] & 2
                                    ? y["return"]
                                    : op[0]
                                    ? y["throw"] || ((t = y["return"]) && t.call(y), 0)
                                    : y.next) &&
                            !(t = t.call(y, op[1])).done)
                    )
                        return t;
                    if (((y = 0), t)) op = [op[0] & 2, t.value];
                    switch (op[0]) {
                        case 0:
                        case 1:
                            t = op;
                            break;
                        case 4:
                            _.label++;
                            return { value: op[1], done: false };
                        case 5:
                            _.label++;
                            y = op[1];
                            op = [0];
                            continue;
                        case 7:
                            op = _.ops.pop();
                            _.trys.pop();
                            continue;
                        default:
                            if (
                                !((t = _.trys), (t = t.length > 0 && t[t.length - 1])) &&
                                (op[0] === 6 || op[0] === 2)
                            ) {
                                _ = 0;
                                continue;
                            }
                            if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) {
                                _.label = op[1];
                                break;
                            }
                            if (op[0] === 6 && _.label < t[1]) {
                                _.label = t[1];
                                t = op;
                                break;
                            }
                            if (t && _.label < t[2]) {
                                _.label = t[2];
                                _.ops.push(op);
                                break;
                            }
                            if (t[2]) _.ops.pop();
                            _.trys.pop();
                            continue;
                    }
                    op = body.call(thisArg, _);
                } catch (e) {
                    op = [6, e];
                    y = 0;
                } finally {
                    f = t = 0;
                }
            if (op[0] & 5) throw op[1];
            return { value: op[0] ? op[1] : void 0, done: true };
        }
    };
Object.defineProperty(querier, "__esModule", { value: true });
/* Copyright (c) 2022, VRAI Labs and/or its affiliates. All rights reserved.
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
var normalisedURLPath_1 = recipe.normalisedURLPath;
var version_1 = version;
var error_1 = error$1;
/**
 * When network calls are made the Querier calls .clone() on the response before:
 * 1. Calling the post API hook
 * 2. Calling .json() when trying to read the body
 *
 * This is because the SDK needs to read the json body but we also want to allow users to read
 * the json body themselves (either in the post api hook or from the result of recipe functions)
 * for custom response handling. Since the body can only be read once we use .clone() to allow
 * for multiple reads.
 */
var Querier = /** @class */ (function () {
    function Querier(recipeId, appInfo) {
        var _this = this;
        this.get = function (path, config, queryParams, preAPIHook, postAPIHook) {
            return __awaiter(_this, void 0, void 0, function () {
                var result, jsonBody;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            return [
                                4 /*yield*/,
                                this.fetch(
                                    this.getFullUrl(path, queryParams),
                                    __assign$1({ method: "GET" }, config),
                                    preAPIHook,
                                    postAPIHook
                                ),
                            ];
                        case 1:
                            result = _b.sent();
                            return [4 /*yield*/, this.getResponseJsonOrThrowGeneralError(result)];
                        case 2:
                            jsonBody = _b.sent();
                            return [
                                2 /*return*/,
                                {
                                    jsonBody: jsonBody,
                                    fetchResponse: result,
                                },
                            ];
                    }
                });
            });
        };
        this.post = function (path, config, preAPIHook, postAPIHook) {
            return __awaiter(_this, void 0, void 0, function () {
                var result, jsonBody;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            if (config.body === undefined) {
                                throw new Error("Post request must have a body");
                            }
                            return [
                                4 /*yield*/,
                                this.fetch(
                                    this.getFullUrl(path),
                                    __assign$1({ method: "POST" }, config),
                                    preAPIHook,
                                    postAPIHook
                                ),
                            ];
                        case 1:
                            result = _b.sent();
                            return [4 /*yield*/, this.getResponseJsonOrThrowGeneralError(result)];
                        case 2:
                            jsonBody = _b.sent();
                            return [
                                2 /*return*/,
                                {
                                    jsonBody: jsonBody,
                                    fetchResponse: result,
                                },
                            ];
                    }
                });
            });
        };
        this.delete = function (path, config, preAPIHook, postAPIHook) {
            return __awaiter(_this, void 0, void 0, function () {
                var result, jsonBody;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            return [
                                4 /*yield*/,
                                this.fetch(
                                    this.getFullUrl(path),
                                    __assign$1({ method: "DELETE" }, config),
                                    preAPIHook,
                                    postAPIHook
                                ),
                            ];
                        case 1:
                            result = _b.sent();
                            return [4 /*yield*/, this.getResponseJsonOrThrowGeneralError(result)];
                        case 2:
                            jsonBody = _b.sent();
                            return [
                                2 /*return*/,
                                {
                                    jsonBody: jsonBody,
                                    fetchResponse: result,
                                },
                            ];
                    }
                });
            });
        };
        this.put = function (path, config, preAPIHook, postAPIHook) {
            return __awaiter(_this, void 0, void 0, function () {
                var result, jsonBody;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            return [
                                4 /*yield*/,
                                this.fetch(
                                    this.getFullUrl(path),
                                    __assign$1({ method: "PUT" }, config),
                                    preAPIHook,
                                    postAPIHook
                                ),
                            ];
                        case 1:
                            result = _b.sent();
                            return [4 /*yield*/, this.getResponseJsonOrThrowGeneralError(result)];
                        case 2:
                            jsonBody = _b.sent();
                            return [
                                2 /*return*/,
                                {
                                    jsonBody: jsonBody,
                                    fetchResponse: result,
                                },
                            ];
                    }
                });
            });
        };
        this.fetch = function (url, config, preAPIHook, postAPIHook) {
            return __awaiter(_this, void 0, void 0, function () {
                var headers, _b, requestInit, modifiedUrl, result, reponseForPostAPI;
                return __generator(this, function (_c) {
                    switch (_c.label) {
                        case 0:
                            if (config === undefined) {
                                headers = {};
                            } else {
                                headers = config.headers;
                            }
                            return [
                                4 /*yield*/,
                                this.callPreAPIHook({
                                    preAPIHook: preAPIHook,
                                    url: url,
                                    requestInit: __assign$1(__assign$1({}, config), {
                                        headers: __assign$1(__assign$1({}, headers), {
                                            "fdi-version": version_1.supported_fdi.join(","),
                                            "Content-Type": "application/json",
                                            rid: this.recipeId,
                                        }),
                                    }),
                                }),
                            ];
                        case 1:
                            (_b = _c.sent()), (requestInit = _b.requestInit), (modifiedUrl = _b.url);
                            return [4 /*yield*/, fetch(modifiedUrl, requestInit)];
                        case 2:
                            result = _c.sent();
                            if (result.status >= 300) {
                                throw result;
                            }
                            if (!(postAPIHook !== undefined)) return [3 /*break*/, 4];
                            reponseForPostAPI = result.clone();
                            return [
                                4 /*yield*/,
                                postAPIHook({
                                    requestInit: requestInit,
                                    url: url,
                                    fetchResponse: reponseForPostAPI,
                                }),
                            ];
                        case 3:
                            _c.sent();
                            _c.label = 4;
                        case 4:
                            return [2 /*return*/, result];
                    }
                });
            });
        };
        /*
         * For backward compatibility
         */
        this.callPreAPIHook = function (context) {
            return __awaiter(_this, void 0, void 0, function () {
                var result;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            if (context.preAPIHook === undefined) {
                                return [
                                    2 /*return*/,
                                    {
                                        url: context.url,
                                        requestInit: context.requestInit,
                                    },
                                ];
                            }
                            return [
                                4 /*yield*/,
                                context.preAPIHook({
                                    url: context.url,
                                    requestInit: context.requestInit,
                                }),
                            ];
                        case 1:
                            result = _b.sent();
                            return [2 /*return*/, result];
                    }
                });
            });
        };
        this.getFullUrl = function (pathStr, queryParams) {
            var path = new normalisedURLPath_1.default(pathStr);
            var fullUrl = ""
                .concat(_this.appInfo.apiDomain.getAsStringDangerous())
                .concat(_this.appInfo.apiBasePath.getAsStringDangerous())
                .concat(path.getAsStringDangerous());
            if (queryParams === undefined) {
                return fullUrl;
            }
            // If query params, add.
            return fullUrl + "?" + new URLSearchParams(queryParams);
        };
        this.getResponseJsonOrThrowGeneralError = function (response) {
            return __awaiter(_this, void 0, void 0, function () {
                var json, message;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            return [4 /*yield*/, response.clone().json()];
                        case 1:
                            json = _b.sent();
                            if (json.status === "GENERAL_ERROR") {
                                message = json.message === undefined ? "No Error Message Provided" : json.message;
                                throw new error_1.default(message);
                            }
                            return [2 /*return*/, json];
                    }
                });
            });
        };
        this.recipeId = recipeId;
        this.appInfo = appInfo;
    }
    var _a;
    _a = Querier;
    Querier.preparePreAPIHook = function (_b) {
        var recipePreAPIHook = _b.recipePreAPIHook,
            action = _b.action,
            options = _b.options,
            userContext = _b.userContext;
        return function (context) {
            return __awaiter(void 0, void 0, void 0, function () {
                var postRecipeHookContext;
                return __generator(_a, function (_b) {
                    switch (_b.label) {
                        case 0:
                            return [
                                4 /*yield*/,
                                recipePreAPIHook(
                                    __assign$1(__assign$1({}, context), { action: action, userContext: userContext })
                                ),
                            ];
                        case 1:
                            postRecipeHookContext = _b.sent();
                            if (options === undefined || options.preAPIHook === undefined) {
                                return [2 /*return*/, postRecipeHookContext];
                            }
                            return [
                                2 /*return*/,
                                options.preAPIHook({
                                    url: postRecipeHookContext.url,
                                    requestInit: postRecipeHookContext.requestInit,
                                    userContext: userContext,
                                }),
                            ];
                    }
                });
            });
        };
    };
    Querier.preparePostAPIHook = function (_b) {
        var recipePostAPIHook = _b.recipePostAPIHook,
            action = _b.action,
            userContext = _b.userContext;
        return function (context) {
            return __awaiter(void 0, void 0, void 0, function () {
                return __generator(_a, function (_b) {
                    switch (_b.label) {
                        case 0:
                            return [
                                4 /*yield*/,
                                recipePostAPIHook(
                                    __assign$1(__assign$1({}, context), { userContext: userContext, action: action })
                                ),
                            ];
                        case 1:
                            _b.sent();
                            return [2 /*return*/];
                    }
                });
            });
        };
    };
    return Querier;
})();
querier.default = Querier;

var build = {};

var getProxyObject$1 = {};

var __assign =
    (recipe.commonjsGlobal && recipe.commonjsGlobal.__assign) ||
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

exports.ComponentOverrideContext = ComponentOverrideContext;
exports.FeatureWrapper = FeatureWrapper;
exports.GeneralError = GeneralError;
exports.STGeneralError = STGeneralError;
exports.defaultTranslationsCommon = defaultTranslationsCommon;
exports.error = error$1;
exports.hasFontDefined = hasFontDefined;
exports.querier = querier;
exports.withOverride = withOverride;
//# sourceMappingURL=index3.js.map
