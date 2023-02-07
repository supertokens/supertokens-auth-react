"use strict";

var jsxRuntime = require("react/jsx-runtime");
var React = require("react");
var cookieHandler = require("supertokens-web-js/utils/cookieHandler");
var postSuperTokensInitCallbacks = require("supertokens-web-js/utils/postSuperTokensInitCallbacks");
var windowHandler = require("supertokens-web-js/utils/windowHandler");
var NormalisedURLPath = require("supertokens-web-js/utils/normalisedURLPath");
var NormalisedURLDomain = require("supertokens-web-js/utils/normalisedURLDomain");
var recipe = require("supertokens-web-js/recipe/session/recipe");

function _interopDefault(e) {
    return e && e.__esModule ? e : { default: e };
}

function _interopNamespace(e) {
    if (e && e.__esModule) return e;
    var n = Object.create(null);
    if (e) {
        Object.keys(e).forEach(function (k) {
            if (k !== "default") {
                var d = Object.getOwnPropertyDescriptor(e, k);
                Object.defineProperty(
                    n,
                    k,
                    d.get
                        ? d
                        : {
                              enumerable: true,
                              get: function () {
                                  return e[k];
                              },
                          }
                );
            }
        });
    }
    n.default = e;
    return Object.freeze(n);
}

var React__namespace = /*#__PURE__*/ _interopNamespace(React);
var NormalisedURLPath__default = /*#__PURE__*/ _interopDefault(NormalisedURLPath);
var NormalisedURLDomain__default = /*#__PURE__*/ _interopDefault(NormalisedURLDomain);

/******************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
/* global Reflect, Promise */

var extendStatics = function (d, b) {
    extendStatics =
        Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array &&
            function (d, b) {
                d.__proto__ = b;
            }) ||
        function (d, b) {
            for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p];
        };
    return extendStatics(d, b);
};

function __extends(d, b) {
    if (typeof b !== "function" && b !== null)
        throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
    extendStatics(d, b);
    function __() {
        this.constructor = d;
    }
    d.prototype = b === null ? Object.create(b) : ((__.prototype = b.prototype), new __());
}

exports.__assign = function () {
    exports.__assign =
        Object.assign ||
        function __assign(t) {
            for (var s, i = 1, n = arguments.length; i < n; i++) {
                s = arguments[i];
                for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
            }
            return t;
        };
    return exports.__assign.apply(this, arguments);
};

function __rest(s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) t[p[i]] = s[p[i]];
        }
    return t;
}

function __awaiter(thisArg, _arguments, P, generator) {
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
}

function __generator(thisArg, body) {
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
        while ((g && ((g = 0), op[0] && (_ = 0)), _))
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
                        if (!((t = _.trys), (t = t.length > 0 && t[t.length - 1])) && (op[0] === 6 || op[0] === 2)) {
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
}

function __spreadArray(to, from, pack) {
    if (pack || arguments.length === 2)
        for (var i = 0, l = from.length, ar; i < l; i++) {
            if (ar || !(i in from)) {
                if (!ar) ar = Array.prototype.slice.call(from, 0, i);
                ar[i] = from[i];
            }
        }
    return to.concat(ar || Array.prototype.slice.call(from));
}

function RoutingComponent(props) {
    var _a;
    var stInstance = props.supertokensInstance;
    var path = props.path;
    var componentToRender = React__namespace.default.useMemo(
        function () {
            // During development, this runs twice so as to warn devs of if there
            // are any side effects that happen here. So in tests, it will result in
            // the console log twice
            return stInstance.getMatchingComponentForRouteAndRecipeId(new NormalisedURLPath__default.default(path));
        },
        [stInstance, path]
    );
    var history =
        (_a = props.supertokensInstance.getReactRouterDomWithCustomHistory()) === null || _a === void 0
            ? void 0
            : _a.useHistoryCustom();
    if (componentToRender === undefined) {
        return null;
    }
    return jsxRuntime.jsx(componentToRender.component, { history: history });
}

/*
 * Component.
 */
function getSuperTokensRoutesForReactRouterDom(supertokensInstance) {
    var routerInfo = supertokensInstance.getReactRouterDomWithCustomHistory();
    if (routerInfo === undefined) {
        return [];
    }
    var Route = routerInfo.router.Route;
    var pathsToFeatureComponentWithRecipeIdMap = supertokensInstance.getPathsToFeatureComponentWithRecipeIdMap();
    return Object.keys(pathsToFeatureComponentWithRecipeIdMap).map(function (path) {
        path = path === "" ? "/" : path;
        return jsxRuntime.jsx(
            Route,
            exports.__assign(
                { exact: true, path: path },
                { children: jsxRuntime.jsx(RoutingComponent, { supertokensInstance: supertokensInstance, path: path }) }
            ),
            "st-".concat(path)
        );
    });
}

/*
 * Component.
 */
function getSuperTokensRoutesForReactRouterDomV6(supertokensInstance) {
    var routerInfo = supertokensInstance.getReactRouterDomWithCustomHistory();
    if (routerInfo === undefined) {
        return [];
    }
    var Route = routerInfo.router.Route;
    var pathsToFeatureComponentWithRecipeIdMap = supertokensInstance.getPathsToFeatureComponentWithRecipeIdMap();
    return Object.keys(pathsToFeatureComponentWithRecipeIdMap).map(function (path) {
        path = path === "" ? "/" : path;
        return jsxRuntime.jsx(
            Route,
            {
                path: path,
                element: jsxRuntime.jsx(RoutingComponent, { supertokensInstance: supertokensInstance, path: path }),
            },
            "st-".concat(path)
        );
    });
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
 * Consts.
 */
var RECIPE_ID_QUERY_PARAM = "rid";
var DEFAULT_API_BASE_PATH = "/auth";
var DEFAULT_WEBSITE_BASE_PATH = "/auth";
var ST_ROOT_ID = "supertokens-root";
var SSR_ERROR =
    "\nIf you are trying to use this method doing server-side-rendering, please make sure you move this method inside a componentDidMount method or useEffect hook.";

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
 * getRecipeIdFromPath
 * Input:
 * Output: The "rid" query param if present, null otherwise.
 */
function getRecipeIdFromSearch(search) {
    var urlParams = new URLSearchParams(search);
    return urlParams.get(RECIPE_ID_QUERY_PARAM);
}
function clearQueryParams(paramNames) {
    var newURL = new URL(windowHandler.WindowHandlerReference.getReferenceOrThrow().windowHandler.location.getHref());
    for (var _i = 0, paramNames_1 = paramNames; _i < paramNames_1.length; _i++) {
        var param = paramNames_1[_i];
        newURL.searchParams.delete(param);
    }
    windowHandler.WindowHandlerReference.getReferenceOrThrow().windowHandler.history.replaceState(
        windowHandler.WindowHandlerReference.getReferenceOrThrow().windowHandler.history.getState(),
        "",
        windowHandler.WindowHandlerReference.getReferenceOrThrow().windowHandler.location.getHref()
    );
}
function clearErrorQueryParam() {
    clearQueryParams(["error", "message"]);
}
function getQueryParams(param) {
    var urlParams = new URLSearchParams(
        windowHandler.WindowHandlerReference.getReferenceOrThrow().windowHandler.location.getSearch()
    );
    return urlParams.get(param);
}
function getURLHash() {
    // By default it is returined with the "#" at the beginning, we cut that off here.
    return windowHandler.WindowHandlerReference.getReferenceOrThrow().windowHandler.location.getHash().substr(1);
}
function getRedirectToPathFromURL() {
    var param = getQueryParams("redirectToPath");
    if (param === null) {
        return undefined;
    } else {
        // Prevent Open redirects by normalising path.
        try {
            return new NormalisedURLPath__default.default(param).getAsStringDangerous();
        } catch (_a) {
            return undefined;
        }
    }
}
/*
 * isTest
 */
function isTest() {
    try {
        return process.env.TEST_MODE === "testing";
    } catch (err) {
        // can get Uncaught ReferenceError: process is not defined error
        return false;
    }
}
function normaliseInputAppInfoOrThrowError(appInfo) {
    if (appInfo === undefined) {
        throw new Error("Please provide the appInfo object when calling supertokens.init");
    }
    if (appInfo.apiDomain === undefined) {
        throw new Error("Please provide your apiDomain inside the appInfo object when calling supertokens.init");
    }
    if (appInfo.appName === undefined) {
        throw new Error("Please provide your appName inside the appInfo object when calling supertokens.init");
    }
    if (appInfo.websiteDomain === undefined) {
        throw new Error("Please provide your websiteDomain inside the appInfo object when calling supertokens.init");
    }
    var apiGatewayPath = new NormalisedURLPath__default.default("");
    if (appInfo.apiGatewayPath !== undefined) {
        apiGatewayPath = new NormalisedURLPath__default.default(appInfo.apiGatewayPath);
    }
    return {
        appName: appInfo.appName,
        apiDomain: new NormalisedURLDomain__default.default(appInfo.apiDomain),
        websiteDomain: new NormalisedURLDomain__default.default(appInfo.websiteDomain),
        apiBasePath: apiGatewayPath.appendPath(
            getNormalisedURLPathOrDefault(DEFAULT_API_BASE_PATH, appInfo.apiBasePath)
        ),
        websiteBasePath: getNormalisedURLPathOrDefault(DEFAULT_WEBSITE_BASE_PATH, appInfo.websiteBasePath),
    };
}
function getNormalisedURLPathOrDefault(defaultPath, path) {
    if (path !== undefined) {
        return new NormalisedURLPath__default.default(path);
    } else {
        return new NormalisedURLPath__default.default(defaultPath);
    }
}
/*
 * validateForm
 */
// We check that the number of fields in input and config form field is the same.
// We check that each item in the config form field is also present in the input form field
function validateForm(inputs, configFormFields) {
    return __awaiter(this, void 0, void 0, function () {
        var validationErrors, _loop_1, i;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    validationErrors = [];
                    if (configFormFields.length !== inputs.length) {
                        throw Error("Are you sending too many / too few formFields?");
                    }
                    _loop_1 = function (i) {
                        var field, input, value, error;
                        return __generator(this, function (_b) {
                            switch (_b.label) {
                                case 0:
                                    field = configFormFields[i];
                                    input = inputs.find(function (i) {
                                        return i.id === field.id;
                                    });
                                    value = input.value;
                                    if (input.id === "email") {
                                        value = value.trim();
                                    }
                                    return [4 /*yield*/, field.validate(value)];
                                case 1:
                                    error = _b.sent();
                                    // If error, add it.
                                    if (error !== undefined) {
                                        validationErrors.push({
                                            error: error,
                                            id: field.id,
                                        });
                                    }
                                    return [2 /*return*/];
                            }
                        });
                    };
                    i = 0;
                    _a.label = 1;
                case 1:
                    if (!(i < configFormFields.length)) return [3 /*break*/, 4];
                    return [5 /*yield**/, _loop_1(i)];
                case 2:
                    _a.sent();
                    _a.label = 3;
                case 3:
                    i++;
                    return [3 /*break*/, 1];
                case 4:
                    return [2 /*return*/, validationErrors];
            }
        });
    });
}
/*
 * getCurrentNormalisedUrlPath
 */
function getCurrentNormalisedUrlPath() {
    return new NormalisedURLPath__default.default(
        windowHandler.WindowHandlerReference.getReferenceOrThrow().windowHandler.location.getPathName()
    );
}
function appendQueryParamsToURL(stringUrl, queryParams) {
    if (queryParams === undefined) {
        return stringUrl;
    }
    try {
        var url_1 = new URL(stringUrl);
        Object.entries(queryParams).forEach(function (_a) {
            var key = _a[0],
                value = _a[1];
            url_1.searchParams.set(key, value);
        });
        return url_1.href;
    } catch (e) {
        var fakeDomain = stringUrl.startsWith("/") ? "http:localhost" : "http://localhost/";
        var url_2 = new URL("".concat(fakeDomain).concat(stringUrl));
        Object.entries(queryParams).forEach(function (_a) {
            var key = _a[0],
                value = _a[1];
            url_2.searchParams.set(key, value);
        });
        return "".concat(url_2.pathname).concat(url_2.search);
    }
}
function appendTrailingSlashToURL(stringUrl) {
    return stringUrl.endsWith("/") ? stringUrl : stringUrl + "/";
}
/*
 * Default method for matching recipe route based on query params.
 */
function matchRecipeIdUsingQueryParams(recipeId) {
    return function () {
        var recipeIdFromSearch = getRecipeIdFromSearch(
            windowHandler.WindowHandlerReference.getReferenceOrThrow().windowHandler.location.getSearch()
        );
        return recipeIdFromSearch === recipeId;
    };
}
function redirectWithFullPageReload(to) {
    if (to.trim() === "") {
        to = "/";
    }
    windowHandler.WindowHandlerReference.getReferenceOrThrow().windowHandler.location.setHref(to);
}
function redirectWithHistory(to, history) {
    if (to.trim() === "") {
        to = "/";
    }
    if (history.push !== undefined) {
        // we are using react-router-dom that is before v6
        history.push(to);
    } else {
        // in react-router-dom v6, it is just navigate(to), and we are renaming
        // naviagte to history, so it becomes history(to).
        history(to);
    }
}
function isIE() {
    return (
        windowHandler.WindowHandlerReference.getReferenceOrThrow().windowHandler.getDocument().documentMode !==
        undefined
    );
}
function getOriginOfPage() {
    return new NormalisedURLDomain__default.default(
        windowHandler.WindowHandlerReference.getReferenceOrThrow().windowHandler.location.getOrigin()
    );
}
function getLocalStorage(key) {
    return __awaiter(this, void 0, void 0, function () {
        var res;
        return __generator(this, function (_a) {
            res = windowHandler.WindowHandlerReference.getReferenceOrThrow().windowHandler.localStorage.getItem(key);
            if (res === null || res === undefined) {
                return [2 /*return*/, null];
            }
            return [2 /*return*/, res];
        });
    });
}
function setLocalStorage(key, value) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    return [
                        4 /*yield*/,
                        windowHandler.WindowHandlerReference.getReferenceOrThrow().windowHandler.localStorage.setItem(
                            key,
                            value
                        ),
                    ];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
function removeFromLocalStorage(key) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    return [
                        4 /*yield*/,
                        windowHandler.WindowHandlerReference.getReferenceOrThrow().windowHandler.localStorage.removeItem(
                            key
                        ),
                    ];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
function mergeObjects(obj1, obj2) {
    var res = exports.__assign({}, obj1);
    for (var key in obj2) {
        if (typeof res[key] === "object" && typeof obj2[key] === "object") {
            res[key] = mergeObjects(res[key], obj2[key]);
        } else {
            res[key] = obj2[key];
        }
    }
    return res;
}
function normaliseCookieScopeOrThrowError(cookieScope) {
    function helper(cookieScope) {
        cookieScope = cookieScope.trim().toLowerCase();
        // first we convert it to a URL so that we can use the URL class
        if (cookieScope.startsWith(".")) {
            cookieScope = cookieScope.substr(1);
        }
        if (!cookieScope.startsWith("http://") && !cookieScope.startsWith("https://")) {
            cookieScope = "http://" + cookieScope;
        }
        try {
            var urlObj = new URL(cookieScope);
            cookieScope = urlObj.hostname;
            // remove leading dot
            if (cookieScope.startsWith(".")) {
                cookieScope = cookieScope.substr(1);
            }
            return cookieScope;
        } catch (err) {
            throw new Error("Please provide a valid cookie scope");
        }
    }
    function isAnIpAddress(ipaddress) {
        return /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/.test(
            ipaddress
        );
    }
    var noDotNormalised = helper(cookieScope);
    if (noDotNormalised === "localhost" || isAnIpAddress(noDotNormalised)) {
        return noDotNormalised;
    }
    if (cookieScope.startsWith(".")) {
        return "." + noDotNormalised;
    }
    return noDotNormalised;
}
function getDefaultCookieScope() {
    try {
        return normaliseCookieScopeOrThrowError(
            windowHandler.WindowHandlerReference.getReferenceOrThrow().windowHandler.location.getHostName()
        );
    } catch (_a) {
        return undefined;
    }
}
function getCookieValue(name) {
    return __awaiter(this, void 0, void 0, function () {
        var value, _a, parts, last, temp;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _a = "; ";
                    return [
                        4 /*yield*/,
                        cookieHandler.CookieHandlerReference.getReferenceOrThrow().cookieHandler.getCookie(),
                    ];
                case 1:
                    value = _a + _b.sent();
                    parts = value.split("; " + name + "=");
                    if (parts.length >= 2) {
                        last = parts.pop();
                        if (last !== undefined) {
                            temp = last.split(";").shift();
                            if (temp === undefined) {
                                return [2 /*return*/, null];
                            }
                            return [2 /*return*/, temp];
                        }
                    }
                    return [2 /*return*/, null];
            }
        });
    });
}
// undefined value will remove the cookie
function setFrontendCookie(name, value, scope) {
    return __awaiter(this, void 0, void 0, function () {
        var expires, cookieVal;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    expires = "Thu, 01 Jan 1970 00:00:01 GMT";
                    cookieVal = "";
                    if (value !== undefined) {
                        cookieVal = value;
                        expires = undefined; // set cookie without expiry
                    }
                    if (
                        !(
                            scope === "localhost" ||
                            scope ===
                                windowHandler.WindowHandlerReference.getReferenceOrThrow().windowHandler.location.getHostName() ||
                            scope === undefined
                        )
                    )
                        return [3 /*break*/, 5];
                    if (!(expires !== undefined)) return [3 /*break*/, 2];
                    return [
                        4 /*yield*/,
                        cookieHandler.CookieHandlerReference.getReferenceOrThrow().cookieHandler.setCookie(
                            "".concat(name, "=").concat(cookieVal, ";expires=").concat(expires, ";path=/;samesite=lax")
                        ),
                    ];
                case 1:
                    _a.sent();
                    return [3 /*break*/, 4];
                case 2:
                    return [
                        4 /*yield*/,
                        cookieHandler.CookieHandlerReference.getReferenceOrThrow().cookieHandler.setCookie(
                            ""
                                .concat(name, "=")
                                .concat(cookieVal, ";expires=Fri, 31 Dec 9999 23:59:59 GMT;path=/;samesite=lax")
                        ),
                    ];
                case 3:
                    _a.sent();
                    _a.label = 4;
                case 4:
                    return [3 /*break*/, 9];
                case 5:
                    if (!(expires !== undefined)) return [3 /*break*/, 7];
                    return [
                        4 /*yield*/,
                        cookieHandler.CookieHandlerReference.getReferenceOrThrow().cookieHandler.setCookie(
                            ""
                                .concat(name, "=")
                                .concat(cookieVal, ";expires=")
                                .concat(expires, ";domain=")
                                .concat(scope, ";path=/;samesite=lax")
                        ),
                    ];
                case 6:
                    _a.sent();
                    return [3 /*break*/, 9];
                case 7:
                    return [
                        4 /*yield*/,
                        cookieHandler.CookieHandlerReference.getReferenceOrThrow().cookieHandler.setCookie(
                            ""
                                .concat(name, "=")
                                .concat(cookieVal, ";domain=")
                                .concat(scope, ";expires=Fri, 31 Dec 9999 23:59:59 GMT;path=/;samesite=lax")
                        ),
                    ];
                case 8:
                    _a.sent();
                    _a.label = 9;
                case 9:
                    return [2 /*return*/];
            }
        });
    });
}
function getNormalisedUserContext(userContext) {
    return userContext === undefined ? {} : userContext;
}
/**
 * This function handles calling APIs that should only be called once during mount (mostly on mount of a route/feature component).
 * It's split into multiple callbacks (fetch + handleResponse/handleError) because we expect fetch to take longer and
 * and the component may be unmounted during the first fetch, in which case we want to avoid updating state/redirecting.
 * This is especially relevant for development in strict mode with React 18 (and in the future for concurrent rendering).
 *
 * @param fetch This is a callback that is only called once on mount. Mostly it's for consuming tokens/doing one time only API calls
 * @param handleResponse This is called with the result of the first (fetch) call if it succeeds.
 * @param handleError This is called with the error of the first (fetch) call if it rejects.
 * @param startLoading Will start the whole process if this is set to true (or omitted). Mostly used to wait for session loading.
 */
var useOnMountAPICall = function (fetch, handleResponse, handleError, startLoading) {
    if (startLoading === void 0) {
        startLoading = true;
    }
    var consumeReq = React.useRef();
    var _a = React.useState(undefined),
        error = _a[0],
        setError = _a[1];
    React.useEffect(
        function () {
            var effect = function (signal) {
                return __awaiter(void 0, void 0, void 0, function () {
                    var resp, err_1;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                _a.trys.push([0, 2, , 3]);
                                if (consumeReq.current === undefined) {
                                    consumeReq.current = fetch();
                                }
                                return [4 /*yield*/, consumeReq.current];
                            case 1:
                                resp = _a.sent();
                                if (!signal.aborted) {
                                    void handleResponse(resp);
                                }
                                return [3 /*break*/, 3];
                            case 2:
                                err_1 = _a.sent();
                                if (!signal.aborted) {
                                    if (handleError !== undefined) {
                                        handleError(err_1, resp);
                                    } else {
                                        setError(err_1);
                                    }
                                }
                                return [3 /*break*/, 3];
                            case 3:
                                return [2 /*return*/];
                        }
                    });
                });
            };
            if (startLoading) {
                var ctrl_1 = new AbortController();
                void effect(ctrl_1.signal);
                return function () {
                    ctrl_1.abort();
                };
            }
            return;
        },
        [setError, consumeReq, fetch, handleResponse, handleError, startLoading]
    );
    if (error) {
        throw error;
    }
};
function saveInvalidClaimRedirectPathInContext(userContext, invalidClaimRedirectPath) {
    if (userContext["_default"] === undefined) {
        userContext["_default"] = {};
    }
    if (userContext["_default"].redirectPath === undefined) {
        userContext["_default"] = exports.__assign(exports.__assign({}, userContext["_default"]), {
            invalidClaimRedirectPath: invalidClaimRedirectPath,
        });
    }
}
function popInvalidClaimRedirectPathFromContext(userContext) {
    var _a;
    var res = (_a = userContext["_default"]) === null || _a === void 0 ? void 0 : _a.invalidClaimRedirectPath;
    if (res !== undefined) {
        delete userContext["_default"].invalidClaimRedirectPath;
    }
    return res;
}

var TranslationController = /** @class */ (function () {
    function TranslationController() {
        this.handlers = new Map();
    }
    TranslationController.prototype.emit = function (event, detail) {
        var handlerList = this.handlers.get(event) || [];
        for (var _i = 0, handlerList_1 = handlerList; _i < handlerList_1.length; _i++) {
            var h = handlerList_1[_i];
            h(event, detail);
        }
    };
    TranslationController.prototype.on = function (event, handler) {
        var handlerList = this.handlers.get(event) || [];
        this.handlers.set(event, handlerList.concat(handler));
    };
    TranslationController.prototype.off = function (event, handler) {
        var handlerList = this.handlers.get(event) || [];
        this.handlers.set(
            event,
            handlerList.filter(function (h) {
                return h !== handler;
            })
        );
    };
    return TranslationController;
})();
var CURRENT_LANGUAGE_COOKIE_NAME = "sCurrLanguage";
function saveCurrentLanguage(language, cookieDomain) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, setFrontendCookie(CURRENT_LANGUAGE_COOKIE_NAME, language, cookieDomain)];
                case 1:
                    _b.sent();
                    return [3 /*break*/, 3];
                case 2:
                    _b.sent();
                    return [3 /*break*/, 3];
                case 3:
                    return [2 /*return*/];
            }
        });
    });
}
function getCurrentLanguageFromCookie() {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, getCookieValue(CURRENT_LANGUAGE_COOKIE_NAME)];
                case 1:
                    return [2 /*return*/, _b.sent()];
                case 2:
                    _b.sent();
                    // This can throw if we are not in a browser
                    // Since this is just loading a preference we can safely ignore the exception
                    return [2 /*return*/, null];
                case 3:
                    return [2 /*return*/];
            }
        });
    });
}

/*
 * Class.
 */
var SuperTokens = /** @class */ (function () {
    /*
     * Constructor.
     */
    function SuperTokens(config) {
        var _this = this;
        this.recipeList = [];
        /*
         * Instance Methods.
         */
        this.canHandleRoute = function () {
            return _this.getMatchingComponentForRouteAndRecipeId(getCurrentNormalisedUrlPath()) !== undefined;
        };
        this.getRoutingComponent = function () {
            return jsxRuntime.jsx(RoutingComponent, {
                path: getCurrentNormalisedUrlPath().getAsStringDangerous(),
                supertokensInstance: _this,
            });
        };
        this.getPathsToFeatureComponentWithRecipeIdMap = function () {
            // Memoized version of the map.
            if (_this.pathsToFeatureComponentWithRecipeIdMap !== undefined) {
                return _this.pathsToFeatureComponentWithRecipeIdMap;
            }
            var pathsToFeatureComponentWithRecipeIdMap = {};
            for (var i = 0; i < _this.recipeList.length; i++) {
                var recipe = _this.recipeList[i];
                var features = recipe.getFeatures();
                var featurePaths = Object.keys(features);
                for (var j = 0; j < featurePaths.length; j++) {
                    // If no components yet for this route, initialize empty array.
                    var featurePath = featurePaths[j];
                    if (pathsToFeatureComponentWithRecipeIdMap[featurePath] === undefined) {
                        pathsToFeatureComponentWithRecipeIdMap[featurePath] = [];
                    }
                    pathsToFeatureComponentWithRecipeIdMap[featurePath].push(features[featurePath]);
                }
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
        this.getReactRouterDomWithCustomHistory = function () {
            return SuperTokens.reactRouterDom;
        };
        this.changeLanguage = function (lang) {
            return __awaiter(_this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            return [
                                4 /*yield*/,
                                saveCurrentLanguage(lang, this.languageTranslations.currentLanguageCookieScope),
                            ];
                        case 1:
                            _a.sent();
                            this.languageTranslations.translationEventSource.emit("LanguageChange", lang);
                            return [2 /*return*/];
                    }
                });
            });
        };
        this.redirectToAuth = function (options) {
            return __awaiter(_this, void 0, void 0, function () {
                var queryParams, redirectUrl;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            queryParams = options.queryParams === undefined ? {} : options.queryParams;
                            if (options.show !== undefined) {
                                queryParams.show = options.show;
                            }
                            if (options.redirectBack === true) {
                                queryParams.redirectToPath = getCurrentNormalisedUrlPath().getAsStringDangerous();
                            }
                            return [
                                4 /*yield*/,
                                this.getRedirectUrl({
                                    action: "TO_AUTH",
                                    showSignIn: options.show === "signin",
                                }),
                            ];
                        case 1:
                            redirectUrl = _a.sent();
                            redirectUrl = appendQueryParamsToURL(redirectUrl, queryParams);
                            return [2 /*return*/, this.redirectToUrl(redirectUrl, options.history)];
                    }
                });
            });
        };
        this.redirectToUrl = function (redirectUrl, history) {
            return __awaiter(_this, void 0, void 0, function () {
                var origin_1;
                return __generator(this, function (_a) {
                    try {
                        new URL(redirectUrl); // If full URL, no error thrown, skip in app redirection.
                    } catch (e) {
                        origin_1 = getOriginOfPage().getAsStringDangerous();
                        if (origin_1 !== this.appInfo.websiteDomain.getAsStringDangerous()) {
                            redirectUrl = ""
                                .concat(this.appInfo.websiteDomain.getAsStringDangerous())
                                .concat(redirectUrl);
                            redirectWithFullPageReload(redirectUrl);
                            return [2 /*return*/];
                        }
                        // If history was provided, use to redirect without reloading.
                        if (history !== undefined) {
                            redirectWithHistory(redirectUrl, history);
                            return [2 /*return*/];
                        }
                    }
                    // Otherwise, redirect in app.
                    redirectWithFullPageReload(redirectUrl);
                    return [2 /*return*/];
                });
            });
        };
        this.appInfo = normaliseInputAppInfoOrThrowError(config.appInfo);
        if (config.recipeList === undefined || config.recipeList.length === 0) {
            throw new Error(
                "Please provide at least one recipe to the supertokens.init function call. See https://supertokens.io/docs/emailpassword/quick-setup/frontend"
            );
        }
        var translationConfig = config.languageTranslations === undefined ? {} : config.languageTranslations;
        this.languageTranslations = {
            defaultLanguage: translationConfig.defaultLanguage === undefined ? "en" : translationConfig.defaultLanguage,
            currentLanguageCookieScope:
                translationConfig.currentLanguageCookieScope !== undefined
                    ? normaliseCookieScopeOrThrowError(translationConfig.currentLanguageCookieScope)
                    : getDefaultCookieScope(),
            userTranslationStore: translationConfig.translations !== undefined ? translationConfig.translations : {},
            translationEventSource: new TranslationController(),
            userTranslationFunc: translationConfig.translationFunc,
        };
        var enableDebugLogs = false;
        if (config.enableDebugLogs !== undefined) {
            enableDebugLogs = config.enableDebugLogs;
        }
        this.userGetRedirectionURL = config.getRedirectionURL;
        this.recipeList = config.recipeList.map(function (recipe) {
            return recipe(_this.appInfo, enableDebugLogs);
        });
    }
    /*
     * Static Methods.
     */
    SuperTokens.init = function (config) {
        cookieHandler.CookieHandlerReference.init(config.cookieHandler);
        windowHandler.WindowHandlerReference.init(config.windowHandler);
        if (SuperTokens.instance !== undefined) {
            console.warn("SuperTokens was already initialized");
            return;
        }
        SuperTokens.instance = new SuperTokens(config);
        postSuperTokensInitCallbacks.PostSuperTokensInitCallbacks.runPostInitCallbacks();
    };
    SuperTokens.getInstanceOrThrow = function () {
        if (SuperTokens.instance === undefined) {
            var error = "SuperTokens must be initialized before calling this method.";
            // eslint-disable-next-line supertokens-auth-react/no-direct-window-object
            if (typeof window === "undefined") {
                error = error + SSR_ERROR;
            }
            throw new Error(error);
        }
        return SuperTokens.instance;
    };
    SuperTokens.canHandleRoute = function () {
        return SuperTokens.getInstanceOrThrow().canHandleRoute();
    };
    SuperTokens.getRoutingComponent = function () {
        return SuperTokens.getInstanceOrThrow().getRoutingComponent();
    };
    SuperTokens.getSuperTokensRoutesForReactRouterDom = function (reactRouterDom) {
        if (reactRouterDom === undefined) {
            throw new Error(
                // eslint-disable-next-line @typescript-eslint/quotes
                'Please use getSuperTokensRoutesForReactRouterDom like getSuperTokensRoutesForReactRouterDom(require("react-router-dom")) in your render function'
            );
        }
        SuperTokens.reactRouterDom = reactRouterDom;
        if (SuperTokens.reactRouterDomIsV6 === undefined) {
            SuperTokens.reactRouterDomIsV6 = reactRouterDom.withRouter === undefined;
        }
        if (SuperTokens.reactRouterDomIsV6) {
            // this function wraps the react-router-dom v6 useNavigate function in a way
            // that enforces that it runs within a useEffect. The reason we do this is
            // cause of https://github.com/remix-run/react-router/issues/7460
            // which gets shown when visiting a social auth callback url like
            // /auth/callback/github, without a valid code or state. This then
            // doesn't navigate the user to the auth page.
            var useNavigateHookForRRDV6 = function () {
                var navigateHook = reactRouterDom.useNavigate();
                var _a = React__namespace.useState(undefined),
                    to = _a[0],
                    setTo = _a[1];
                React__namespace.useEffect(
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
            SuperTokens.reactRouterDom = {
                router: reactRouterDom,
                useHistoryCustom: useNavigateHookForRRDV6,
            };
            return getSuperTokensRoutesForReactRouterDomV6(SuperTokens.getInstanceOrThrow());
        }
        SuperTokens.reactRouterDom = {
            router: reactRouterDom,
            useHistoryCustom: reactRouterDom.useHistory,
        };
        return getSuperTokensRoutesForReactRouterDom(SuperTokens.getInstanceOrThrow());
    };
    SuperTokens.getReactRouterDomWithCustomHistory = function () {
        return this.instance !== undefined ? this.instance.getReactRouterDomWithCustomHistory() : undefined;
    };
    SuperTokens.prototype.getRecipeOrThrow = function (recipeId) {
        var recipe = this.recipeList.find(function (recipe) {
            return recipe.config.recipeId === recipeId;
        });
        if (recipe === undefined) {
            throw new Error("Missing recipe: ".concat(recipeId));
        }
        return recipe;
    };
    SuperTokens.prototype.loadTranslation = function (store) {
        this.languageTranslations.translationEventSource.emit("TranslationLoaded", store);
    };
    SuperTokens.prototype.getRedirectUrl = function (context) {
        return __awaiter(this, void 0, void 0, function () {
            var userRes, redirectUrl;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this.userGetRedirectionURL) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.userGetRedirectionURL(context)];
                    case 1:
                        userRes = _a.sent();
                        if (userRes !== undefined) {
                            return [2 /*return*/, userRes];
                        }
                        _a.label = 2;
                    case 2:
                        if (context.action === "TO_AUTH") {
                            redirectUrl = this.appInfo.websiteBasePath.getAsStringDangerous();
                            return [2 /*return*/, appendTrailingSlashToURL(redirectUrl)];
                        }
                        throw new Error("Should never come here: unexpected redirection context");
                }
            });
        });
    };
    /*
     * Tests methods.
     */
    SuperTokens.reset = function () {
        if (!isTest()) {
            return;
        }
        SuperTokens.instance = undefined;
        return;
    };
    SuperTokens.reactRouterDomIsV6 = undefined;
    return SuperTokens;
})();

var UserContextContext = React__namespace.default.createContext(undefined);
var useUserContext = function () {
    return React__namespace.default.useContext(UserContextContext);
};
var UserContextProvider = function (_a) {
    var children = _a.children,
        userContext = _a.userContext;
    var currentUserContext = React.useState(getNormalisedUserContext(userContext))[0];
    return jsxRuntime.jsx(
        UserContextContext.Provider,
        exports.__assign({ value: currentUserContext }, { children: children })
    );
};

function UserContextWrapper(props) {
    /**
     * If we recieve a userContext as a props we should assume that the user
     * is either trying to use a theme component as standalone or that they
     * want to override an existing value for userContext.
     *
     * In this case we should always return a Provider with the value of userContext
     */
    if (props.userContext !== undefined) {
        return jsxRuntime.jsx(
            UserContextProvider,
            exports.__assign({ userContext: props.userContext }, { children: props.children })
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
 * Class.
 */
var RecipeModule = /** @class */ (function () {
    /*
     * Constructor.
     */
    function RecipeModule(config) {
        var _this = this;
        this.redirect = function (context, history, queryParams) {
            return __awaiter(_this, void 0, void 0, function () {
                var redirectUrl;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            return [4 /*yield*/, this.getRedirectUrl(context)];
                        case 1:
                            redirectUrl = _a.sent();
                            redirectUrl = appendQueryParamsToURL(redirectUrl, queryParams);
                            return [2 /*return*/, SuperTokens.getInstanceOrThrow().redirectToUrl(redirectUrl, history)];
                    }
                });
            });
        };
        // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
        this.getRedirectUrl = function (context) {
            return __awaiter(_this, void 0, void 0, function () {
                var redirectUrl;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            return [4 /*yield*/, this.config.getRedirectionURL(context)];
                        case 1:
                            redirectUrl = _a.sent();
                            if (redirectUrl !== undefined) {
                                return [2 /*return*/, redirectUrl];
                            }
                            return [4 /*yield*/, this.getDefaultRedirectionURL(context)];
                        case 2:
                            // Otherwise, use default.
                            return [2 /*return*/, _a.sent()];
                    }
                });
            });
        };
        this.config = config;
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    RecipeModule.prototype.getDefaultRedirectionURL = function (_) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                throw new Error("getDefaultRedirectionURL is not implemented.");
            });
        });
    };
    return RecipeModule;
})();

function normaliseRecipeModuleConfig(config) {
    var _this = this;
    var onHandleEvent = config.onHandleEvent,
        getRedirectionURL = config.getRedirectionURL,
        preAPIHook = config.preAPIHook,
        postAPIHook = config.postAPIHook;
    if (onHandleEvent === undefined) {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-empty-function
        onHandleEvent = function (_) {};
    }
    if (getRedirectionURL === undefined) {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        getRedirectionURL = function (_) {
            return __awaiter(_this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, undefined];
                });
            });
        };
    }
    if (preAPIHook === undefined) {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        preAPIHook = function (context) {
            return __awaiter(_this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, context];
                });
            });
        };
    }
    if (postAPIHook === undefined) {
        // eslint-disable-next-line @typescript-eslint/no-empty-function
        postAPIHook = function () {
            return __awaiter(_this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/];
                });
            });
        };
    }
    var useShadowDom = config.useShadowDom === undefined ? true : config.useShadowDom;
    useShadowDom = getShouldUseShadowDomBasedOnBrowser(useShadowDom);
    var rootStyle = config.style === undefined ? "" : config.style;
    return exports.__assign(exports.__assign({}, config), {
        getRedirectionURL: getRedirectionURL,
        onHandleEvent: onHandleEvent,
        preAPIHook: preAPIHook,
        postAPIHook: postAPIHook,
        useShadowDom: useShadowDom,
        rootStyle: rootStyle,
        recipeId: config.recipeId,
        appInfo: config.appInfo,
    });
}
function getShouldUseShadowDomBasedOnBrowser(useShadowDom) {
    /*
     * Detect if browser is IE
     * In order to disable unsupported shadowDom
     * https://github.com/supertokens/supertokens-auth-react/issues/99
     */
    // If browser is Internet Explorer, always disable shadow dom.
    if (isIE() === true) {
        return false;
    }
    // Otherwise, use provided config or default to true.
    return useShadowDom !== undefined ? useShadowDom : true;
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
var Session = /** @class */ (function (_super) {
    __extends(Session, _super);
    function Session(config) {
        var _this = this;
        var normalizedConfig = exports.__assign(exports.__assign({}, config), normaliseRecipeModuleConfig(config));
        _this = _super.call(this, normalizedConfig) || this;
        _this.eventListeners = new Set();
        _this.redirectionHandlersFromAuthRecipes = new Map();
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        _this.getFeatureComponent = function (_) {
            throw new Error("should never come here");
        };
        _this.getFeatures = function () {
            return {};
        };
        _this.getUserId = function (input) {
            return _this.webJsRecipe.getUserId(input);
        };
        _this.getAccessToken = function (input) {
            return _this.webJsRecipe.getAccessToken(input);
        };
        _this.getClaimValue = function (input) {
            return _this.webJsRecipe.getClaimValue(input);
        };
        _this.getAccessTokenPayloadSecurely = function (input) {
            return __awaiter(_this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.webJsRecipe.getAccessTokenPayloadSecurely(input)];
                });
            });
        };
        _this.doesSessionExist = function (input) {
            return _this.webJsRecipe.doesSessionExist(input);
        };
        _this.signOut = function (input) {
            return _this.webJsRecipe.signOut(input);
        };
        _this.attemptRefreshingSession = function () {
            return __awaiter(_this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.webJsRecipe.attemptRefreshingSession()];
                });
            });
        };
        _this.validateClaims = function (input) {
            return _this.webJsRecipe.validateClaims(input);
        };
        _this.getInvalidClaimsFromResponse = function (input) {
            return _this.webJsRecipe.getInvalidClaimsFromResponse(input);
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
            return __awaiter(_this, void 0, void 0, function () {
                var invalidClaims, invalidClaimRedirectPath, jsonContext, successContextStr, authRecipeRedirectHandler;
                return __generator(this, function (_a) {
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
                                    SuperTokens.getInstanceOrThrow().redirectToAuth({
                                        history: history,
                                        redirectBack: false,
                                    }),
                                ];
                            }
                            return [4 /*yield*/, this.validateClaims({ userContext: userContext })];
                        case 2:
                            invalidClaims = _a.sent();
                            invalidClaimRedirectPath = popInvalidClaimRedirectPathFromContext(userContext);
                            if (!(invalidClaims.length > 0 && invalidClaimRedirectPath !== undefined))
                                return [3 /*break*/, 5];
                            if (!(redirectInfo !== undefined)) return [3 /*break*/, 4];
                            jsonContext = JSON.stringify(redirectInfo);
                            return [
                                4 /*yield*/,
                                setLocalStorage("supertokens-success-redirection-context", jsonContext),
                            ];
                        case 3:
                            _a.sent();
                            _a.label = 4;
                        case 4:
                            // then we do the redirection.
                            return [
                                2 /*return*/,
                                SuperTokens.getInstanceOrThrow().redirectToUrl(invalidClaimRedirectPath, history),
                            ];
                        case 5:
                            if (!(redirectInfo === undefined)) return [3 /*break*/, 12];
                            return [4 /*yield*/, getLocalStorage("supertokens-success-redirection-context")];
                        case 6:
                            successContextStr = _a.sent();
                            if (!(successContextStr !== null)) return [3 /*break*/, 11];
                            _a.label = 7;
                        case 7:
                            _a.trys.push([7, , 8, 10]);
                            redirectInfo = JSON.parse(successContextStr);
                            return [3 /*break*/, 10];
                        case 8:
                            return [4 /*yield*/, removeFromLocalStorage("supertokens-success-redirection-context")];
                        case 9:
                            _a.sent();
                            return [7 /*endfinally*/];
                        case 10:
                            return [3 /*break*/, 12];
                        case 11:
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
                            _a.label = 12;
                        case 12:
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
            return __awaiter(_this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, "/"];
                });
            });
        };
        _this.notifyListeners = function (event) {
            return __awaiter(_this, void 0, void 0, function () {
                var sessionContext;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            return [4 /*yield*/, this.getSessionContext(event)];
                        case 1:
                            sessionContext = _a.sent();
                            // We copy this.eventListeners into a new array to "freeze" it for the loop
                            // We do this to avoid an infinite loop in case one of the listeners causes a new listener to be added (e.g.: through re-rendering)
                            Array.from(this.eventListeners).forEach(function (listener) {
                                return listener(exports.__assign({ sessionContext: sessionContext }, event));
                            });
                            return [2 /*return*/];
                    }
                });
            });
        };
        _this.webJsRecipe = new recipe.Recipe(
            exports.__assign(exports.__assign({}, normalizedConfig), {
                onHandleEvent: function (event) {
                    if (config.onHandleEvent !== undefined) {
                        config.onHandleEvent(event);
                    }
                    void _this.notifyListeners(event);
                },
                preAPIHook: function (context) {
                    return __awaiter(_this, void 0, void 0, function () {
                        var headers, response;
                        return __generator(this, function (_a) {
                            headers = new Headers(context.requestInit.headers);
                            headers.set("rid", config.recipeId);
                            response = exports.__assign(exports.__assign({}, context), {
                                requestInit: exports.__assign(exports.__assign({}, context.requestInit), {
                                    headers: headers,
                                }),
                            });
                            if (config.preAPIHook === undefined) {
                                return [2 /*return*/, response];
                            } else {
                                return [2 /*return*/, config.preAPIHook(context)];
                            }
                        });
                    });
                },
            })
        );
        return _this;
    }
    Session.prototype.getSessionContext = function (_a) {
        var action = _a.action,
            userContext = _a.userContext;
        return __awaiter(this, void 0, void 0, function () {
            var _b, userId, accessTokenPayload;
            return __generator(this, function (_c) {
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
        return recipe.Recipe.addAxiosInterceptors(axiosInstance, userContext);
    };
    Session.init = function (config) {
        return function (appInfo, enableDebugLogs) {
            Session.instance = new Session(
                exports.__assign(exports.__assign({}, config), {
                    appInfo: appInfo,
                    recipeId: Session.RECIPE_ID,
                    enableDebugLogs: enableDebugLogs,
                })
            );
            return Session.instance;
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
        if (!isTest()) {
            return;
        }
        Session.instance = undefined;
        return;
    };
    Session.RECIPE_ID = "session";
    return Session;
})(RecipeModule);

var SessionContext = React__namespace.default.createContext({
    loading: true,
    isDefault: true,
});

var SessionAuth = function (_a) {
    var _b;
    var children = _a.children,
        props = __rest(_a, ["children"]);
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
        (_b = SuperTokens.getReactRouterDomWithCustomHistory()) === null || _b === void 0 ? void 0 : _b.useHistoryCustom
    );
    var history;
    try {
        if (historyHookRef.current) {
            history = historyHookRef.current();
        }
    } catch (_d) {
        // We catch and ignore errors here, because if this is may throw if
        // the app is using react-router-dom but added a session auth outside of the router.
    }
    var userContext = useUserContext();
    var redirectToLogin = React.useCallback(function () {
        void SuperTokens.getInstanceOrThrow().redirectToAuth({ history: history, redirectBack: true });
    }, []);
    var buildContext = React.useCallback(function () {
        return __awaiter(void 0, void 0, void 0, function () {
            var sessionExists, invalidClaims, err_1, invalidClaimRedirectToPath, err_2;
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (session.current === undefined) {
                            session.current = Session.getInstanceOrThrow();
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
                        invalidClaimRedirectToPath = popInvalidClaimRedirectPathFromContext(userContext);
                        _b.label = 7;
                    case 7:
                        _b.trys.push([7, 10, , 12]);
                        _a = {
                            loading: false,
                            doesSessionExist: true,
                            invalidClaims: invalidClaims,
                            invalidClaimRedirectToPath: invalidClaimRedirectToPath,
                        };
                        return [
                            4 /*yield*/,
                            session.current.getAccessTokenPayloadSecurely({
                                userContext: userContext,
                            }),
                        ];
                    case 8:
                        _a.accessTokenPayload = _b.sent();
                        return [
                            4 /*yield*/,
                            session.current.getUserId({
                                userContext: userContext,
                            }),
                        ];
                    case 9:
                        return [2 /*return*/, ((_a.userId = _b.sent()), _a)];
                    case 10:
                        err_2 = _b.sent();
                        return [
                            4 /*yield*/,
                            session.current.doesSessionExist({
                                userContext: userContext,
                            }),
                        ];
                    case 11:
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
                    case 12:
                        return [2 /*return*/];
                }
            });
        });
    }, []);
    var setInitialContextAndMaybeRedirect = React.useCallback(
        function (toSetContext) {
            return __awaiter(void 0, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (context.loading === false) {
                                return [2 /*return*/];
                            }
                            if (!(props.doRedirection !== false)) return [3 /*break*/, 3];
                            if (!(!toSetContext.doesSessionExist && props.requireAuth !== false))
                                return [3 /*break*/, 1];
                            redirectToLogin();
                            return [2 /*return*/];
                        case 1:
                            if (!(toSetContext.invalidClaimRedirectToPath !== undefined)) return [3 /*break*/, 3];
                            return [
                                4 /*yield*/,
                                SuperTokens.getInstanceOrThrow().redirectToUrl(
                                    toSetContext.invalidClaimRedirectToPath,
                                    history
                                ),
                            ];
                        case 2:
                            _a.sent();
                            return [2 /*return*/];
                        case 3:
                            delete toSetContext.invalidClaimRedirectToPath;
                            setContext(toSetContext);
                            return [2 /*return*/];
                    }
                });
            });
        },
        [props.doRedirection, props.requireAuth, redirectToLogin, context]
    );
    useOnMountAPICall(buildContext, setInitialContextAndMaybeRedirect);
    // subscribe to events on mount
    React.useEffect(
        function () {
            function onHandleEvent(event) {
                return __awaiter(this, void 0, void 0, function () {
                    var _a, invalidClaims, redirectPath;
                    return __generator(this, function (_b) {
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
                                        return [3 /*break*/, 5];
                                    case "UNAUTHORISED":
                                        return [3 /*break*/, 6];
                                }
                                return [3 /*break*/, 7];
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
                                setContext(
                                    exports.__assign(exports.__assign({}, event.sessionContext), {
                                        loading: false,
                                        invalidClaims: invalidClaims,
                                    })
                                );
                                redirectPath = popInvalidClaimRedirectPathFromContext(userContext);
                                if (!(props.doRedirection !== false && redirectPath)) return [3 /*break*/, 4];
                                return [
                                    4 /*yield*/,
                                    SuperTokens.getInstanceOrThrow().redirectToUrl(redirectPath, history),
                                ];
                            case 3:
                                _b.sent();
                                _b.label = 4;
                            case 4:
                                return [2 /*return*/];
                            case 5:
                                setContext(
                                    exports.__assign(exports.__assign({}, event.sessionContext), {
                                        loading: false,
                                        invalidClaims: [],
                                    })
                                );
                                return [2 /*return*/];
                            case 6:
                                setContext(
                                    exports.__assign(exports.__assign({}, event.sessionContext), {
                                        loading: false,
                                        invalidClaims: [],
                                    })
                                );
                                if (props.onSessionExpired !== undefined) {
                                    props.onSessionExpired();
                                } else if (props.requireAuth !== false && props.doRedirection !== false) {
                                    redirectToLogin();
                                }
                                return [2 /*return*/];
                            case 7:
                                return [2 /*return*/];
                        }
                    });
                });
            }
            if (session.current === undefined) {
                session.current = Session.getInstanceOrThrow();
            }
            if (context.loading === false) {
                // we return here cause addEventListener returns a function that removes
                // the listener, and this function will be called by useEffect when
                // onHandleEvent changes or if the component is unmounting.
                return session.current.addEventListener(onHandleEvent);
            }
            return undefined;
        },
        [props, setContext, context.loading]
    );
    if (props.requireAuth !== false && (context.loading || !context.doesSessionExist)) {
        return null;
    }
    return jsxRuntime.jsx(SessionContext.Provider, exports.__assign({ value: context }, { children: children }));
};
var SessionAuthWrapper = function (props) {
    return jsxRuntime.jsx(
        UserContextWrapper,
        exports.__assign(
            { userContext: props.userContext },
            { children: jsxRuntime.jsx(SessionAuth, exports.__assign({}, props)) }
        )
    );
};

exports.RecipeModule = RecipeModule;
exports.SSR_ERROR = SSR_ERROR;
exports.ST_ROOT_ID = ST_ROOT_ID;
exports.Session = Session;
exports.SessionAuthWrapper = SessionAuthWrapper;
exports.SessionContext = SessionContext;
exports.SuperTokens = SuperTokens;
exports.UserContextContext = UserContextContext;
exports.UserContextWrapper = UserContextWrapper;
exports.__awaiter = __awaiter;
exports.__extends = __extends;
exports.__generator = __generator;
exports.__rest = __rest;
exports.__spreadArray = __spreadArray;
exports.clearErrorQueryParam = clearErrorQueryParam;
exports.clearQueryParams = clearQueryParams;
exports.getCurrentLanguageFromCookie = getCurrentLanguageFromCookie;
exports.getNormalisedUserContext = getNormalisedUserContext;
exports.getQueryParams = getQueryParams;
exports.getRedirectToPathFromURL = getRedirectToPathFromURL;
exports.getURLHash = getURLHash;
exports.isTest = isTest;
exports.matchRecipeIdUsingQueryParams = matchRecipeIdUsingQueryParams;
exports.mergeObjects = mergeObjects;
exports.normaliseRecipeModuleConfig = normaliseRecipeModuleConfig;
exports.redirectWithFullPageReload = redirectWithFullPageReload;
exports.saveInvalidClaimRedirectPathInContext = saveInvalidClaimRedirectPathInContext;
exports.useOnMountAPICall = useOnMountAPICall;
exports.useUserContext = useUserContext;
exports.validateForm = validateForm;
//# sourceMappingURL=session-shared.js.map
