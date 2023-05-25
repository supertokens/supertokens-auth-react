"use strict";

var SuperTokensWebJS = require("supertokens-web-js");
var cookieHandler = require("supertokens-web-js/utils/cookieHandler");
var postSuperTokensInitCallbacks = require("supertokens-web-js/utils/postSuperTokensInitCallbacks");
var windowHandler = require("supertokens-web-js/utils/windowHandler");
var MultitenancyWebJS = require("supertokens-web-js/recipe/multitenancy");
var React = require("react");
var NormalisedURLDomain = require("supertokens-web-js/utils/normalisedURLDomain");
var NormalisedURLPath = require("supertokens-web-js/utils/normalisedURLPath");
var jsxRuntime = require("react/jsx-runtime");
var NormalisedURLPath$1 = require("supertokens-web-js/lib/build/normalisedURLPath");
var ThirdpartyWebJS = require("supertokens-web-js/recipe/thirdparty");
var WebJSSessionRecipe = require("supertokens-web-js/recipe/session");
var reactDom = require("react-dom");
var utils = require("supertokens-web-js/utils");

function _interopDefault(e) {
    return e && e.__esModule ? e : { default: e };
}

var SuperTokensWebJS__default = /*#__PURE__*/ _interopDefault(SuperTokensWebJS);
var MultitenancyWebJS__default = /*#__PURE__*/ _interopDefault(MultitenancyWebJS);
var React__default = /*#__PURE__*/ _interopDefault(React);
var NormalisedURLDomain__default = /*#__PURE__*/ _interopDefault(NormalisedURLDomain);
var NormalisedURLPath__default = /*#__PURE__*/ _interopDefault(NormalisedURLPath);
var NormalisedURLPath__default$1 = /*#__PURE__*/ _interopDefault(NormalisedURLPath$1);
var ThirdpartyWebJS__default = /*#__PURE__*/ _interopDefault(ThirdpartyWebJS);
var WebJSSessionRecipe__default = /*#__PURE__*/ _interopDefault(WebJSSessionRecipe);

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
            var normalisedURLPath = new NormalisedURLPath__default.default(param).getAsStringDangerous();
            var pathQueryParams = param.split("?")[1] !== undefined ? "?".concat(param.split("?")[1]) : "";
            return normalisedURLPath + pathQueryParams;
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
                            return [
                                2 /*return*/,
                                SuperTokens$1.getInstanceOrThrow().redirectToUrl(redirectUrl, history),
                            ];
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
    if (config === undefined) {
        config = {};
    }
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
    });
}
function getShouldUseShadowDomBasedOnBrowser(useShadowDom) {
    return useShadowDom !== undefined ? useShadowDom : true;
}

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
        return jsxRuntime.jsx(genericContext.Provider, exports.__assign({ value: components }, { children: children }));
    };
    return [useComponentsOverrideContext, Provider, genericContext.Consumer];
};

var _a$1 = createGenericComponentsOverrideContext(),
    useContext$1 = _a$1[0],
    Provider$2 = _a$1[1];

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
                return __awaiter(this, void 0, void 0, function () {
                    var cookieLang, cookieLangTemp;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                return [4 /*yield*/, getCurrentLanguageFromCookie()];
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
                return mergeObjects(os, detail);
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
        exports.__assign({ value: { translate: translateFunc } }, { children: children })
    );
};

function ProviderButton(_a) {
    var logo = _a.logo,
        providerName = _a.providerName,
        displayName = _a.displayName;
    var t = useTranslation();
    var providerStyleName = "provider".concat(providerName);
    return jsxRuntime.jsxs(
        "button",
        exports.__assign(
            { "data-supertokens": "button providerButton ".concat(providerStyleName) },
            {
                children: [
                    logo !== undefined &&
                        jsxRuntime.jsx(
                            "div",
                            exports.__assign(
                                { "data-supertokens": "providerButtonLeft" },
                                {
                                    children: jsxRuntime.jsx(
                                        "div",
                                        exports.__assign(
                                            { "data-supertokens": "providerButtonLogo" },
                                            {
                                                children: jsxRuntime.jsx(
                                                    "div",
                                                    exports.__assign(
                                                        { "data-supertokens": "providerButtonLogoCenter" },
                                                        { children: logo }
                                                    )
                                                ),
                                            }
                                        )
                                    ),
                                }
                            )
                        ),
                    jsxRuntime.jsxs(
                        "div",
                        exports.__assign(
                            { "data-supertokens": "providerButtonText" },
                            {
                                children: [
                                    t("THIRD_PARTY_PROVIDER_DEFAULT_BTN_START"),
                                    displayName,
                                    t("THIRD_PARTY_PROVIDER_DEFAULT_BTN_END"),
                                ],
                            }
                        )
                    ),
                ],
            }
        )
    );
}

/*
 * Imports.
 */
/*
 * Class.
 */
var Provider$1 = /** @class */ (function () {
    /*
     * Constructor.
     */
    function Provider(config) {
        var _this = this;
        this.getButton = function (name) {
            if (_this.buttonComponent !== undefined) {
                if (typeof _this.buttonComponent === "function") {
                    return jsxRuntime.jsx(_this.buttonComponent, {
                        name: name !== null && name !== void 0 ? name : _this.name,
                    });
                }
                return _this.buttonComponent;
            }
            return _this.getDefaultButton(name);
        };
        /*
         * State management.
         */
        this.generateState = function () {
            // Generate state using algorithm described in https://github.com/supertokens/supertokens-auth-react/issues/154#issue-796867579
            return "".concat(1e20).replace(/[018]/g, function (c) {
                return (
                    parseInt(c) ^
                    (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (parseInt(c) / 4)))
                ).toString(16);
            });
        };
        this.id = config.id;
        this.name = config.name;
        this.clientId = config.clientId;
        this.getFrontendRedirectURI =
            config.getFrontendRedirectURI !== undefined
                ? config.getFrontendRedirectURI
                : function () {
                      return _this.defaultGetFrontendRedirectURI();
                  };
    }
    /*
     * Components.
     */
    Provider.prototype.getDefaultButton = function (name) {
        var providerName = name !== undefined ? name : this.name;
        return jsxRuntime.jsx(ProviderButton, {
            logo: this.getLogo(),
            providerName: providerName,
            displayName: providerName,
        });
    };
    Provider.prototype.defaultGetFrontendRedirectURI = function () {
        var domain = SuperTokens$1.getInstanceOrThrow().appInfo.websiteDomain.getAsStringDangerous();
        var callbackPath = new NormalisedURLPath__default.default("/callback/".concat(this.id));
        var path = SuperTokens$1.getInstanceOrThrow()
            .appInfo.websiteBasePath.appendPath(callbackPath)
            .getAsStringDangerous();
        return "".concat(domain).concat(path);
    };
    Provider.prototype.getRedirectURIOnProviderDashboard = function () {
        return undefined;
    };
    return Provider;
})();

/*
 * Class.
 */
var ActiveDirectory = /** @class */ (function (_super) {
    __extends(ActiveDirectory, _super);
    /*
     * Constructor.
     */
    function ActiveDirectory(config) {
        var _this =
            _super.call(this, exports.__assign({ id: "activeDirectory", name: "Active Directory" }, config)) || this;
        _this.getLogo = function () {
            return jsxRuntime.jsxs(
                "svg",
                exports.__assign(
                    {
                        width: "18",
                        height: "16",
                        viewBox: "0 0 416 415",
                        fill: "none",
                        xmlns: "http://www.w3.org/2000/svg",
                    },
                    {
                        children: [
                            jsxRuntime.jsxs(
                                "g",
                                exports.__assign(
                                    { clipPath: "url(#clip0_402_84)" },
                                    {
                                        children: [
                                            jsxRuntime.jsx("path", {
                                                d: "M415.575 316.343V403.598C415.575 413.817 412.431 415.914 402.736 414.341C337.753 404.646 271.984 395.737 206.477 386.566C194.686 384.994 190.494 380.802 190.494 367.963C191.542 321.584 191.018 274.943 190.494 228.04C190.494 217.821 193.638 214.677 203.857 214.677C270.936 215.201 336.967 215.201 402.736 215.201C413.479 215.201 416.099 219.393 416.099 229.088C415.051 258.435 415.575 287.258 415.575 316.343Z",
                                                fill: "#00AAF2",
                                            }),
                                            jsxRuntime.jsx("path", {
                                                d: "M304.214 198.431C271.198 198.431 238.183 197.907 205.167 198.431C194.948 198.431 190.756 196.335 190.756 184.544C191.28 137.117 191.28 90.4763 190.756 43.5734C190.756 34.4025 193.9 31.2582 202.547 29.686C270.15 19.991 337.753 10.558 405.356 0.338969C417.147 -1.23319 415.051 6.62762 415.051 13.1783C415.051 55.1026 415.575 97.813 415.051 139.737C415.051 155.197 414.527 170.657 415.051 186.116C415.575 195.811 411.907 198.431 402.736 198.431C370.244 197.907 337.229 198.431 304.214 198.431Z",
                                                fill: "#00AAF2",
                                            }),
                                            jsxRuntime.jsx("path", {
                                                d: "M85.6828 215.987H159.574C167.435 215.987 170.842 218.608 170.842 226.73V372.417C170.842 380.802 167.173 381.588 159.574 380.802C110.575 373.466 61.5764 366.391 12.8393 359.578C3.14432 358.006 0 354.862 0 344.643C0.524054 305.863 0.524054 267.083 0 227.516C0 217.821 2.62027 215.201 12.3153 215.201C37.2078 215.987 61.0523 215.987 85.6828 215.987Z",
                                                fill: "#00AAF2",
                                            }),
                                            jsxRuntime.jsx("path", {
                                                d: "M85.6827 198.431H12.8392C3.66825 198.431 0.523926 195.287 0.523926 185.592C1.04798 147.336 1.04798 109.08 0.523926 70.5621C0.523926 61.3912 3.1442 58.2469 12.8392 56.6747C61.8383 50.3861 110.837 43.3113 159.574 35.4505C170.842 33.8784 171.89 37.5467 171.89 46.7177V186.116C171.89 196.335 167.697 197.907 158.526 197.907C134.158 197.907 109.527 198.431 85.6827 198.431Z",
                                                fill: "#00AAF2",
                                            }),
                                        ],
                                    }
                                )
                            ),
                            jsxRuntime.jsx("defs", {
                                children: jsxRuntime.jsx(
                                    "clipPath",
                                    exports.__assign(
                                        { id: "clip0_402_84" },
                                        {
                                            children: jsxRuntime.jsx("rect", {
                                                width: "416",
                                                height: "415",
                                                fill: "white",
                                            }),
                                        }
                                    )
                                ),
                            }),
                        ],
                    }
                )
            );
        };
        return _this;
    }
    /*
     * Static Methods
     */
    ActiveDirectory.init = function (config) {
        if (ActiveDirectory.instance !== undefined) {
            console.warn("ActiveDirectory Provider was already initialized");
            return ActiveDirectory.instance;
        }
        ActiveDirectory.instance = new ActiveDirectory(config);
        return ActiveDirectory.instance;
    };
    /*
     * Tests methods.
     */
    ActiveDirectory.reset = function () {
        if (!isTest()) {
            return;
        }
        ActiveDirectory.instance = undefined;
        return;
    };
    return ActiveDirectory;
})(Provider$1);

/*
 * Class.
 */
var Apple = /** @class */ (function (_super) {
    __extends(Apple, _super);
    /*
     * Constructor.
     */
    function Apple(config) {
        var _this = _super.call(this, exports.__assign({ id: "apple", name: "Apple" }, config)) || this;
        _this.getLogo = function () {
            return jsxRuntime.jsx(
                "svg",
                exports.__assign(
                    {
                        xmlns: "http://www.w3.org/2000/svg",
                        width: "15.614",
                        height: "18",
                        viewBox: "0 0 15.614 18.737",
                    },
                    {
                        children: jsxRuntime.jsxs(
                            "g",
                            exports.__assign(
                                {
                                    id: "iconfinder_logo_brand_brands_logos_apple_ios_2993701",
                                    transform: "translate(-2)",
                                },
                                {
                                    children: [
                                        jsxRuntime.jsx("path", {
                                            id: "Path_91415",
                                            d: "M14.494 11.075a4.29 4.29 0 0 1 2.372-3.836A4.888 4.888 0 0 0 13.713 6a4.783 4.783 0 0 0-1.83.406 4.357 4.357 0 0 1-1.684.375 4.357 4.357 0 0 1-1.684-.375A4.783 4.783 0 0 0 6.685 6C6.206 6 2 6.153 2 11.465c0 4.344 2.964 8.587 4.685 8.587a5.18 5.18 0 0 0 2.194-.464 3.2 3.2 0 0 1 1.32-.316 3.2 3.2 0 0 1 1.32.317 5.187 5.187 0 0 0 2.194.463c1.206 0 2.922-2.085 3.9-4.826a4.209 4.209 0 0 1-3.119-4.151z",
                                            style: { fill: "#000" },
                                            transform: "translate(0 -1.316)",
                                        }),
                                        jsxRuntime.jsx("path", {
                                            id: "XMLID_1339_",
                                            d: "M12 4.684A4.734 4.734 0 0 0 15.906 0 4.734 4.734 0 0 0 12 4.684z",
                                            style: { fill: "#000" },
                                            transform: "translate(-2.193)",
                                        }),
                                        jsxRuntime.jsx("path", {
                                            id: "Path_91416",
                                            d: "M6.685 6.2a4.783 4.783 0 0 1 1.83.406 4.357 4.357 0 0 0 1.684.375 4.357 4.357 0 0 0 1.684-.381 4.783 4.783 0 0 1 1.83-.406 4.953 4.953 0 0 1 3.014 1.126c.047-.026.091-.058.14-.082A4.888 4.888 0 0 0 13.713 6a4.783 4.783 0 0 0-1.83.406 4.357 4.357 0 0 1-1.684.375 4.357 4.357 0 0 1-1.684-.375A4.783 4.783 0 0 0 6.685 6C6.206 6 2 6.153 2 11.465v.107C2.053 6.352 6.208 6.2 6.685 6.2z",
                                            style: { fill: "#000", opacity: 0.1 },
                                            transform: "translate(0 -1.316)",
                                        }),
                                        jsxRuntime.jsx("path", {
                                            id: "Path_91417",
                                            d: "M13.713 21.368a5.187 5.187 0 0 1-2.194-.463 3.2 3.2 0 0 0-1.32-.317 3.2 3.2 0 0 0-1.32.316 5.18 5.18 0 0 1-2.194.464c-1.707 0-4.633-4.174-4.681-8.48v.088c0 4.344 2.964 8.587 4.685 8.587a5.18 5.18 0 0 0 2.19-.463 3.2 3.2 0 0 1 1.32-.316 3.2 3.2 0 0 1 1.32.317 5.187 5.187 0 0 0 2.194.463c1.206 0 2.922-2.085 3.9-4.826-.023-.006-.043-.017-.066-.023-.991 2.654-2.655 4.653-3.834 4.653z",
                                            style: { fill: "#000", opacity: 0.2 },
                                            transform: "translate(0 -2.826)",
                                        }),
                                        jsxRuntime.jsx("path", {
                                            id: "Path_91418",
                                            d: "M15.888.4A4.621 4.621 0 0 1 12 4.544v.2A4.745 4.745 0 0 0 15.9.261c0 .039 0 .098-.012.139z",
                                            style: { fill: "#000", opacity: 0.2 },
                                            transform: "translate(-2.193 -.057)",
                                        }),
                                        jsxRuntime.jsx("path", {
                                            id: "Path_91419",
                                            d: "M12.005 4.477c.009-.051.02-.192.032-.278q.012-.161.035-.317A4.491 4.491 0 0 1 15.9.2V0a4.738 4.738 0 0 0-3.895 4.477z",
                                            style: { fill: "#000", opacity: 0.1 },
                                            transform: "translate(-2.194)",
                                        }),
                                        jsxRuntime.jsx("path", {
                                            id: "Path_91420",
                                            d: "M14.494 9.759a4.29 4.29 0 0 1 2.372-3.836 4.888 4.888 0 0 0-3.153-1.239 4.783 4.783 0 0 0-1.83.406 4.357 4.357 0 0 1-1.684.375 4.357 4.357 0 0 1-1.684-.375 4.783 4.783 0 0 0-1.83-.406C6.206 4.684 2 4.838 2 10.15c0 4.344 2.964 8.587 4.685 8.587a5.18 5.18 0 0 0 2.194-.464 3.2 3.2 0 0 1 1.32-.316 3.2 3.2 0 0 1 1.32.317 5.187 5.187 0 0 0 2.194.463c1.206 0 2.922-2.085 3.9-4.826a4.209 4.209 0 0 1-3.119-4.152zM13.713 0a4.734 4.734 0 0 0-3.9 4.684A4.734 4.734 0 0 0 13.713 0z",
                                            style: { fill: "#000" },
                                        }),
                                    ],
                                }
                            )
                        ),
                    }
                )
            );
        };
        return _this;
    }
    Apple.prototype.getRedirectURIOnProviderDashboard = function () {
        var domain = SuperTokens$1.getInstanceOrThrow().appInfo.apiDomain.getAsStringDangerous();
        var callbackPath = new NormalisedURLPath__default$1.default("/callback/".concat(this.id));
        var path = SuperTokens$1.getInstanceOrThrow()
            .appInfo.apiBasePath.appendPath(callbackPath)
            .getAsStringDangerous();
        return "".concat(domain).concat(path);
    };
    /*
     * Static Methods
     */
    Apple.init = function (config) {
        if (Apple.instance !== undefined) {
            console.warn("Apple Provider was already initialized");
            return Apple.instance;
        }
        Apple.instance = new Apple(config);
        return Apple.instance;
    };
    /*
     * Tests methods.
     */
    Apple.reset = function () {
        if (!isTest()) {
            return;
        }
        Apple.instance = undefined;
        return;
    };
    return Apple;
})(Provider$1);

/*
 * Class.
 */
var Bitbucket = /** @class */ (function (_super) {
    __extends(Bitbucket, _super);
    /*
     * Constructor.
     */
    function Bitbucket(config) {
        var _this = _super.call(this, exports.__assign({ id: "bitbucket", name: "Bitbucket" }, config)) || this;
        _this.getLogo = function () {
            return jsxRuntime.jsxs(
                "svg",
                exports.__assign(
                    {
                        width: "19",
                        height: "17",
                        viewBox: "0 0 19 17",
                        fill: "none",
                        xmlns: "http://www.w3.org/2000/svg",
                    },
                    {
                        children: [
                            jsxRuntime.jsx("path", {
                                d: "M0.59534 0.0522702C0.229457 0.0522702 -0.0841565 0.365883 0.0203815 0.73174L2.58156 16.2556C2.63383 16.6738 2.99971 16.9351 3.3656 16.9351H15.6488C15.9624 16.9351 16.1715 16.726 16.2238 16.4124L18.7849 0.679471C18.8372 0.313614 18.5759 0 18.21 0L0.59534 0.0522702ZM11.3628 11.2901H7.44258L6.3972 5.74956H12.3036L11.3628 11.2901Z",
                                fill: "#2684FF",
                            }),
                            jsxRuntime.jsx("path", {
                                d: "M17.9502 5.76172H12.3052L11.3643 11.3022H7.44415L2.84448 16.7905C2.84448 16.7905 3.05356 16.9996 3.36717 16.9996H15.6504C15.964 16.9996 16.1731 16.7905 16.2253 16.4769L17.9502 5.76172Z",
                                fill: "url(#paint0_linear_4108_67124)",
                            }),
                            jsxRuntime.jsx("defs", {
                                children: jsxRuntime.jsxs(
                                    "linearGradient",
                                    exports.__assign(
                                        {
                                            id: "paint0_linear_4108_67124",
                                            x1: "19.2748",
                                            y1: "7.29202",
                                            x2: "9.92001",
                                            y2: "14.5943",
                                            gradientUnits: "userSpaceOnUse",
                                        },
                                        {
                                            children: [
                                                jsxRuntime.jsx("stop", { offset: "0.176", stopColor: "#0052CC" }),
                                                jsxRuntime.jsx("stop", { offset: "1", stopColor: "#2684FF" }),
                                            ],
                                        }
                                    )
                                ),
                            }),
                        ],
                    }
                )
            );
        };
        return _this;
    }
    /*
     * Static Methods
     */
    Bitbucket.init = function (config) {
        if (Bitbucket.instance !== undefined) {
            console.warn("Bitbucket Provider was already initialized");
            return Bitbucket.instance;
        }
        Bitbucket.instance = new Bitbucket(config);
        return Bitbucket.instance;
    };
    /*
     * Tests methods.
     */
    Bitbucket.reset = function () {
        if (!isTest()) {
            return;
        }
        Bitbucket.instance = undefined;
        return;
    };
    return Bitbucket;
})(Provider$1);

/*
 * Class.
 */
var BoxySAML = /** @class */ (function (_super) {
    __extends(BoxySAML, _super);
    /*
     * Constructor.
     */
    function BoxySAML(config) {
        var _this = _super.call(this, exports.__assign({ id: "boxy-saml", name: "BoxySAML" }, config)) || this;
        _this.getLogo = function () {
            return jsxRuntime.jsx(
                "svg",
                exports.__assign(
                    {
                        width: "18",
                        height: "18",
                        viewBox: "0 0 315 315",
                        fill: "none",
                        xmlns: "http://www.w3.org/2000/svg",
                    },
                    {
                        children: jsxRuntime.jsx("path", {
                            fillRule: "evenodd",
                            clipRule: "evenodd",
                            d: "M77.105 1.63917C73.508 2.90917 68.328 7.66517 48.6 27.8102C9.78001 67.4512 4.335 73.2352 2.366 76.9282C0.576997 80.2832 0.5 84.9492 0.5 189.428V298.428L2.653 302.428C5.419 307.568 8.402 310.306 14 312.844C18.441 314.857 19.926 314.884 127 314.884C234.09 314.884 235.558 314.858 240 312.843C245.891 310.171 310.072 246.476 313.03 240.366C314.954 236.392 314.999 233.722 314.978 126.862C314.957 22.7132 314.867 17.2322 313.114 13.3722C310.846 8.37917 304.317 2.63917 299.142 1.08917C296.299 0.237168 266.809 -0.0508316 188.384 0.00716838C94.448 0.0761684 80.968 0.274168 77.105 1.63917ZM299.587 16.2342L302 19.0402V126.895V234.75L298.923 237.339L295.847 239.928H188.569H81.292L78.712 237.537C77.293 236.221 75.859 233.634 75.527 231.787C75.195 229.939 75.053 181.338 75.211 123.783C75.496 20.7532 75.531 19.1032 77.5 16.9152C78.6 15.6922 80.4 14.3202 81.5 13.8662C82.6 13.4122 131.577 13.1282 190.337 13.2342L297.173 13.4282L299.587 16.2342ZM189.775 79.4872C188.276 80.3002 186.578 81.8482 186.001 82.9262C184.177 86.3332 173.018 165.844 174 168.429C177.035 176.411 188.093 177.229 192.086 169.767C192.692 168.635 195.809 149.655 199.012 127.59C205.461 83.1672 205.462 82.7702 199.128 79.4942C195.412 77.5722 193.306 77.5712 189.775 79.4872ZM147.151 92.3012C145.86 93.0182 138.78 100.089 131.419 108.016C117.072 123.464 115.535 126.23 118.33 131.557C119.159 133.136 126.097 140.616 133.749 148.178C146.43 160.712 147.978 161.928 151.253 161.928C153.66 161.928 155.863 161.073 157.923 159.339C160.53 157.146 161 156.054 161 152.194C161 147.768 160.716 147.349 151.011 137.487L141.022 127.337L151.011 116.416C160.041 106.543 161 105.125 161 101.646C161 96.5122 159.53 94.0472 155.452 92.3432C151.342 90.6262 150.183 90.6202 147.151 92.3012ZM219.923 94.8512C217.643 97.1312 217 98.6762 217 101.873C217 106.272 218.273 108.028 231.174 121.43L236.951 127.433L227.491 137.575C217.182 148.627 215.888 150.869 217.139 155.509C218.403 160.197 221.481 162.428 226.684 162.428C231.123 162.428 231.269 162.315 245.459 147.864C260.272 132.777 262.086 129.914 260.113 124.725C259.055 121.943 233.866 94.4622 230.937 92.8942C227.407 91.0052 222.983 91.7912 219.923 94.8512Z",
                            fill: "black",
                        }),
                    }
                )
            );
        };
        return _this;
    }
    /*
     * Static Methods
     */
    BoxySAML.init = function (config) {
        if (BoxySAML.instance !== undefined) {
            console.warn("BoxySAML Provider was already initialized");
            return BoxySAML.instance;
        }
        BoxySAML.instance = new BoxySAML(config);
        return BoxySAML.instance;
    };
    /*
     * Tests methods.
     */
    BoxySAML.reset = function () {
        if (!isTest()) {
            return;
        }
        BoxySAML.instance = undefined;
        return;
    };
    return BoxySAML;
})(Provider$1);

/*
 * Class.
 */
var Discord = /** @class */ (function (_super) {
    __extends(Discord, _super);
    /*
     * Constructor.
     */
    function Discord(config) {
        var _this = _super.call(this, exports.__assign({ id: "discord", name: "Discord" }, config)) || this;
        _this.getLogo = function () {
            return jsxRuntime.jsxs(
                "svg",
                exports.__assign(
                    {
                        width: "18",
                        height: "14",
                        viewBox: "0 0 18 14",
                        fill: "none",
                        xmlns: "http://www.w3.org/2000/svg",
                    },
                    {
                        children: [
                            jsxRuntime.jsx(
                                "g",
                                exports.__assign(
                                    { clipPath: "url(#clip0_4108_67056)" },
                                    {
                                        children: jsxRuntime.jsx("path", {
                                            d: "M15.2477 1.17248C14.0651 0.616848 12.8166 0.222666 11.5342 0C11.3587 0.321942 11.1999 0.653178 11.0585 0.99232C9.69245 0.781074 8.30327 0.781074 6.93722 0.99232C6.79573 0.653213 6.63694 0.321981 6.46152 0C5.17826 0.224546 3.92896 0.619664 2.74515 1.17538C0.394984 4.74367 -0.242109 8.22333 0.0764376 11.6536C1.45275 12.6971 2.99324 13.4908 4.63094 14C4.99971 13.491 5.32601 12.9511 5.6064 12.3858C5.07384 12.1817 4.55982 11.9299 4.0703 11.6332C4.19914 11.5374 4.32514 11.4386 4.4469 11.3427C5.87129 12.0301 7.42594 12.3865 8.99999 12.3865C10.574 12.3865 12.1287 12.0301 13.5531 11.3427C13.6762 11.4458 13.8023 11.5446 13.9297 11.6332C13.4392 11.9304 12.9242 12.1827 12.3907 12.3873C12.6708 12.9523 12.9971 13.4918 13.3662 14C15.0053 13.4928 16.547 12.6996 17.9235 11.655C18.2973 7.67704 17.285 4.22935 15.2477 1.17248ZM6.0099 9.544C5.12221 9.544 4.38885 8.71731 4.38885 7.70029C4.38885 6.68327 5.09673 5.84931 6.00707 5.84931C6.9174 5.84931 7.6451 6.68327 7.62953 7.70029C7.61396 8.71731 6.91457 9.544 6.0099 9.544ZM11.9901 9.544C11.101 9.544 10.3704 8.71731 10.3704 7.70029C10.3704 6.68327 11.0783 5.84931 11.9901 5.84931C12.9018 5.84931 13.6239 6.68327 13.6083 7.70029C13.5927 8.71731 12.8947 9.544 11.9901 9.544Z",
                                            fill: "#5865F2",
                                        }),
                                    }
                                )
                            ),
                            jsxRuntime.jsx("defs", {
                                children: jsxRuntime.jsx(
                                    "clipPath",
                                    exports.__assign(
                                        { id: "clip0_4108_67056" },
                                        {
                                            children: jsxRuntime.jsx("rect", {
                                                width: "18",
                                                height: "14",
                                                fill: "white",
                                            }),
                                        }
                                    )
                                ),
                            }),
                        ],
                    }
                )
            );
        };
        return _this;
    }
    /*
     * Static Methods
     */
    Discord.init = function (config) {
        if (Discord.instance !== undefined) {
            console.warn("Discord Provider was already initialized");
            return Discord.instance;
        }
        Discord.instance = new Discord(config);
        return Discord.instance;
    };
    /*
     * Tests methods.
     */
    Discord.reset = function () {
        if (!isTest()) {
            return;
        }
        Discord.instance = undefined;
        return;
    };
    return Discord;
})(Provider$1);

/*
 * Class.
 */
var Facebook = /** @class */ (function (_super) {
    __extends(Facebook, _super);
    /*
     * Constructor.
     */
    function Facebook(config) {
        var _this = _super.call(this, exports.__assign({ id: "facebook", name: "Facebook" }, config)) || this;
        _this.getLogo = function () {
            return jsxRuntime.jsx(
                "svg",
                exports.__assign(
                    {
                        fill: "#1777F2",
                        xmlns: "http://www.w3.org/2000/svg",
                        viewBox: "0 0 30 30",
                        width: "24px",
                        height: "24px",
                    },
                    {
                        children: jsxRuntime.jsx("path", {
                            d: "M15,3C8.373,3,3,8.373,3,15c0,6.016,4.432,10.984,10.206,11.852V18.18h-2.969v-3.154h2.969v-2.099c0-3.475,1.693-5,4.581-5 c1.383,0,2.115,0.103,2.461,0.149v2.753h-1.97c-1.226,0-1.654,1.163-1.654,2.473v1.724h3.593L19.73,18.18h-3.106v8.697 C22.481,26.083,27,21.075,27,15C27,8.373,21.627,3,15,3z",
                        }),
                    }
                )
            );
        };
        return _this;
    }
    /*
     * Static Methods
     */
    Facebook.init = function (config) {
        if (Facebook.instance !== undefined) {
            console.warn("Facebook Provider was already initialized");
            return Facebook.instance;
        }
        Facebook.instance = new Facebook(config);
        return Facebook.instance;
    };
    /*
     * Tests methods.
     */
    Facebook.reset = function () {
        if (!isTest()) {
            return;
        }
        Facebook.instance = undefined;
        return;
    };
    return Facebook;
})(Provider$1);

/*
 * Class.
 */
var Github = /** @class */ (function (_super) {
    __extends(Github, _super);
    /*
     * Constructor.
     */
    function Github(config) {
        var _this = _super.call(this, exports.__assign({ id: "github", name: "GitHub" }, config)) || this;
        _this.getLogo = function () {
            return jsxRuntime.jsx(
                "svg",
                exports.__assign(
                    { xmlns: "http://www.w3.org/2000/svg", width: "18", height: "17.556", viewBox: "0 0 18 17.556" },
                    {
                        children: jsxRuntime.jsx("path", {
                            fill: "#000",
                            fillRule: "evenodd",
                            d: "M145.319 107.44a9 9 0 0 0-2.844 17.54c.45.082.614-.2.614-.434 0-.214-.008-.78-.012-1.531-2.5.544-3.032-1.206-3.032-1.206a2.384 2.384 0 0 0-1-1.317c-.817-.559.062-.547.062-.547a1.89 1.89 0 0 1 1.378.927 1.916 1.916 0 0 0 2.619.748 1.924 1.924 0 0 1 .571-1.2c-2-.227-4.1-1-4.1-4.448a3.479 3.479 0 0 1 .927-2.415 3.233 3.233 0 0 1 .088-2.382s.755-.242 2.475.923a8.535 8.535 0 0 1 4.506 0c1.718-1.165 2.472-.923 2.472-.923a3.234 3.234 0 0 1 .09 2.382 3.473 3.473 0 0 1 .925 2.415c0 3.458-2.1 4.218-4.11 4.441a2.149 2.149 0 0 1 .611 1.667c0 1.2-.011 2.174-.011 2.469 0 .24.162.52.619.433a9 9 0 0 0-2.851-17.539z",
                            transform: "translate(-136.32 -107.44)",
                        }),
                    }
                )
            );
        };
        return _this;
    }
    /*
     * Static Methods
     */
    Github.init = function (config) {
        if (Github.instance !== undefined) {
            console.warn("Github Provider was already initialized");
            return Github.instance;
        }
        Github.instance = new Github(config);
        return Github.instance;
    };
    /*
     * Tests methods.
     */
    Github.reset = function () {
        if (!isTest()) {
            return;
        }
        Github.instance = undefined;
        return;
    };
    return Github;
})(Provider$1);

/*
 * Class.
 */
var Gitlab = /** @class */ (function (_super) {
    __extends(Gitlab, _super);
    /*
     * Constructor.
     */
    function Gitlab(config) {
        var _this = _super.call(this, exports.__assign({ id: "gitlab", name: "Gitlab" }, config)) || this;
        _this.getLogo = function () {
            return jsxRuntime.jsxs(
                "svg",
                exports.__assign(
                    {
                        width: "18",
                        height: "18",
                        viewBox: "0 0 18 18",
                        fill: "none",
                        xmlns: "http://www.w3.org/2000/svg",
                    },
                    {
                        children: [
                            jsxRuntime.jsx("path", {
                                d: "M17.7004 6.86178L17.6751 6.79711L15.2251 0.403269C15.1753 0.277953 15.087 0.171648 14.973 0.0996044C14.8589 0.0287852 14.7259 -0.00532357 14.5918 0.00188338C14.4577 0.00909034 14.3291 0.057266 14.2232 0.139906C14.1186 0.224918 14.0426 0.340113 14.0058 0.469813L12.3516 5.5309H5.65312L3.99889 0.469813C3.96302 0.339406 3.88693 0.223634 3.78145 0.138968C3.67562 0.0563286 3.54698 0.0081529 3.41289 0.000945942C3.27881 -0.00626101 3.14574 0.0278478 3.03166 0.0986669C2.91791 0.171001 2.82972 0.277214 2.77954 0.402332L0.324918 6.79336L0.30055 6.85803C-0.0521303 7.77953 -0.0956629 8.79071 0.176516 9.73911C0.448694 10.6875 1.02183 11.5217 1.8095 12.1159L1.81794 12.1225L1.84043 12.1384L5.57251 14.9333L7.41888 16.3307L8.54356 17.1798C8.67512 17.2797 8.83575 17.3338 9.00093 17.3338C9.16611 17.3338 9.32675 17.2797 9.45831 17.1798L10.583 16.3307L12.4293 14.9333L16.1839 12.1216L16.1933 12.1141C16.9792 11.5197 17.551 10.6864 17.8228 9.73926C18.0945 8.79214 18.0516 7.7824 17.7004 6.86178Z",
                                fill: "#E24329",
                            }),
                            jsxRuntime.jsx("path", {
                                d: "M17.7004 6.86154L17.6751 6.79688C16.4813 7.04191 15.3564 7.54756 14.3807 8.27771L9 12.3463C10.8323 13.7324 12.4275 14.9368 12.4275 14.9368L16.1821 12.1251L16.1914 12.1176C16.9785 11.5233 17.5511 10.6894 17.8233 9.74145C18.0954 8.79352 18.0523 7.78284 17.7004 6.86154Z",
                                fill: "#FC6D26",
                            }),
                            jsxRuntime.jsx("path", {
                                d: "M5.57251 14.9362L7.41887 16.3337L8.54356 17.1828C8.67511 17.2827 8.83575 17.3367 9.00093 17.3367C9.16611 17.3367 9.32674 17.2827 9.4583 17.1828L10.583 16.3337L12.4293 14.9362C12.4293 14.9362 10.8323 13.7281 8.99999 12.3457C7.16769 13.7281 5.57251 14.9362 5.57251 14.9362Z",
                                fill: "#FCA326",
                            }),
                            jsxRuntime.jsx("path", {
                                d: "M3.61837 8.27755C2.64345 7.5459 1.51877 7.03893 0.324918 6.79297L0.30055 6.85764C-0.0521303 7.77914 -0.0956629 8.79031 0.176516 9.73871C0.448694 10.6871 1.02183 11.5213 1.8095 12.1155L1.81794 12.1221L1.84043 12.138L5.57251 14.9329C5.57251 14.9329 7.16582 13.7285 9 12.3424L3.61837 8.27755Z",
                                fill: "#FC6D26",
                            }),
                        ],
                    }
                )
            );
        };
        return _this;
    }
    /*
     * Static Methods
     */
    Gitlab.init = function (config) {
        if (Gitlab.instance !== undefined) {
            console.warn("Gitlab Provider was already initialized");
            return Gitlab.instance;
        }
        Gitlab.instance = new Gitlab(config);
        return Gitlab.instance;
    };
    /*
     * Tests methods.
     */
    Gitlab.reset = function () {
        if (!isTest()) {
            return;
        }
        Gitlab.instance = undefined;
        return;
    };
    return Gitlab;
})(Provider$1);

/*
 * Class.
 */
var Google = /** @class */ (function (_super) {
    __extends(Google, _super);
    /*
     * Constructor.
     */
    function Google(config) {
        var _this = _super.call(this, exports.__assign({ id: "google", name: "Google" }, config)) || this;
        _this.getLogo = function () {
            return jsxRuntime.jsxs(
                "svg",
                exports.__assign(
                    { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 48 48", width: "18px", height: "18px" },
                    {
                        children: [
                            jsxRuntime.jsx("path", {
                                fill: "#FFC107",
                                d: "M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z",
                            }),
                            jsxRuntime.jsx("path", {
                                fill: "#FF3D00",
                                d: "M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z",
                            }),
                            jsxRuntime.jsx("path", {
                                fill: "#4CAF50",
                                d: "M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z",
                            }),
                            jsxRuntime.jsx("path", {
                                fill: "#1976D2",
                                d: "M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z",
                            }),
                        ],
                    }
                )
            );
        };
        return _this;
    }
    /*
     * Static Methods
     */
    Google.init = function (config) {
        if (Google.instance !== undefined) {
            console.warn("Google Provider was already initialized");
            return Google.instance;
        }
        Google.instance = new Google(config);
        return Google.instance;
    };
    /*
     * Tests methods.
     */
    Google.reset = function () {
        if (!isTest()) {
            return;
        }
        Google.instance = undefined;
        return;
    };
    return Google;
})(Provider$1);

/*
 * Class.
 */
var LinkedIn = /** @class */ (function (_super) {
    __extends(LinkedIn, _super);
    /*
     * Constructor.
     */
    function LinkedIn(config) {
        var _this = _super.call(this, exports.__assign({ id: "linkedin", name: "LinkedIn" }, config)) || this;
        _this.getLogo = function () {
            return jsxRuntime.jsxs(
                "svg",
                exports.__assign(
                    { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 48 48", width: "20", height: "20" },
                    {
                        children: [
                            jsxRuntime.jsx("path", {
                                fill: "#0288D1",
                                d: "M42,37c0,2.762-2.238,5-5,5H11c-2.761,0-5-2.238-5-5V11c0-2.762,2.239-5,5-5h26c2.762,0,5,2.238,5,5V37z",
                            }),
                            jsxRuntime.jsx("path", {
                                fill: "#FFF",
                                d: "M12 19H17V36H12zM14.485 17h-.028C12.965 17 12 15.888 12 14.499 12 13.08 12.995 12 14.514 12c1.521 0 2.458 1.08 2.486 2.499C17 15.887 16.035 17 14.485 17zM36 36h-5v-9.099c0-2.198-1.225-3.698-3.192-3.698-1.501 0-2.313 1.012-2.707 1.99C24.957 25.543 25 26.511 25 27v9h-5V19h5v2.616C25.721 20.5 26.85 19 29.738 19c3.578 0 6.261 2.25 6.261 7.274L36 36 36 36z",
                            }),
                        ],
                    }
                )
            );
        };
        return _this;
    }
    /*
     * Static Methods
     */
    LinkedIn.init = function (config) {
        if (LinkedIn.instance !== undefined) {
            console.warn("LinkedIn Provider was already initialized");
            return LinkedIn.instance;
        }
        LinkedIn.instance = new LinkedIn(config);
        return LinkedIn.instance;
    };
    /*
     * Tests methods.
     */
    LinkedIn.reset = function () {
        if (!isTest()) {
            return;
        }
        LinkedIn.instance = undefined;
        return;
    };
    return LinkedIn;
})(Provider$1);

/*
 * Class.
 */
var Okta = /** @class */ (function (_super) {
    __extends(Okta, _super);
    /*
     * Constructor.
     */
    function Okta(config) {
        var _this = _super.call(this, exports.__assign({ id: "okta", name: "Okta" }, config)) || this;
        _this.getLogo = function () {
            return jsxRuntime.jsx(
                "svg",
                exports.__assign(
                    {
                        width: "18",
                        height: "18",
                        viewBox: "0 0 1593 1594",
                        fill: "none",
                        xmlns: "http://www.w3.org/2000/svg",
                    },
                    {
                        children: jsxRuntime.jsx("path", {
                            fillRule: "evenodd",
                            clipRule: "evenodd",
                            d: "M755.371 0.822553C753.587 1.24555 751.498 2.11455 750.729 2.75355C746.718 6.08155 746.699 5.58056 754.545 104.932C758.689 157.411 762.328 202.485 762.632 205.098L763.184 209.848H744.726C726.381 209.848 726.25 209.864 723.226 212.408C721.414 213.933 719.977 216.259 719.674 218.158C719.394 219.913 723.341 265.223 728.444 318.848L737.723 416.348L740.669 416.149C742.289 416.04 749.69 415.253 757.115 414.4C772.989 412.578 813.813 412.311 830.965 413.918C837.208 414.503 842.472 414.824 842.664 414.632C842.856 414.44 850.523 322.801 859.702 210.989L876.391 7.69355L874.409 5.02055C870.729 0.055553 869.505 -0.0424466 812.115 0.00655337C782.69 0.0315534 757.155 0.398553 755.371 0.822553ZM565.615 32.4186C552.965 37.0716 530.015 45.4686 514.615 51.0796C484.148 62.1796 480.115 64.4656 480.115 70.6336C480.115 72.2766 483.995 82.1086 488.736 92.4836C493.478 102.859 512.153 143.662 530.236 183.156C548.32 222.651 563.115 255.305 563.115 255.722C563.115 256.138 560.077 257.532 556.365 258.82C539.094 264.812 529.035 269.124 527.622 271.142C524.052 276.239 524.624 277.664 560.735 353.573C579.777 393.599 598.737 433.548 602.87 442.348C607.003 451.148 610.549 458.536 610.75 458.765C610.951 458.994 618.653 455.547 627.865 451.104C653.08 438.944 674.875 430.862 698.988 424.731C704.143 423.42 708.548 421.865 708.777 421.275C709.006 420.684 698.347 380.634 685.091 332.275C671.834 283.915 655.808 225.448 649.478 202.348C615.597 78.7125 602.973 33.0726 601.964 30.5636C600.329 26.4996 596.44 23.8386 592.23 23.9026C590.242 23.9336 578.265 27.7656 565.615 32.4186ZM1022.17 36.5976C1019.4 39.1596 1017.38 45.9386 992.619 135.803C978 188.853 965.914 232.383 965.761 232.535C965.609 232.688 959.213 230.53 951.549 227.74C931.496 220.44 931.001 220.334 926.683 222.383C924.683 223.332 922.644 224.86 922.152 225.778C921.661 226.696 911.079 266.35 898.637 313.898C886.195 361.445 874.932 404.38 873.608 409.307C872.283 414.235 871.384 418.45 871.608 418.674C871.832 418.899 880.476 421.241 890.815 423.879C916.054 430.32 936.711 437.651 959.49 448.252C964.921 450.78 969.702 452.848 970.113 452.848C970.525 452.848 976.728 440.136 983.898 424.598C991.068 409.06 1019.75 346.848 1047.64 286.348C1075.52 225.848 1107.79 155.873 1119.35 130.848C1130.9 105.823 1140.57 83.7506 1140.84 81.7986C1141.22 78.9866 1140.77 77.5966 1138.68 75.1026C1137.22 73.3706 1135.03 71.6546 1133.82 71.2896C1132.61 70.9236 1120.81 66.6616 1107.61 61.8176C1046.92 39.5476 1030.7 33.8476 1028.02 33.8476C1026.27 33.8476 1023.98 34.9246 1022.17 36.5976ZM329.005 148.532C245.629 218.213 248.776 215.262 250.73 221.938C251.335 224.006 273.753 247.432 321.615 296.014C360.115 335.093 391.75 367.421 391.914 367.854C392.078 368.287 386.17 373.621 378.785 379.708C371.4 385.794 365.078 391.502 364.736 392.393C364.395 393.283 364.115 395.861 364.115 398.121C364.115 402.223 364.199 402.313 416.365 453.74C445.103 482.071 477.192 513.722 487.675 524.077L506.736 542.903L524.175 525.558C542.748 507.086 555.863 495.894 573.615 483.366C579.665 479.097 585.011 475.24 585.494 474.797C585.978 474.353 580.844 466.196 574.085 456.669C544.09 414.391 470.535 310.468 415.313 232.348C382.267 185.598 353.7 145.661 351.831 143.598C348.861 140.319 347.867 139.848 343.915 139.848C339.701 139.848 338.695 140.434 329.005 148.532ZM1266.86 160.603C1265.34 161.563 1248.24 184.66 1228.86 211.931C1209.47 239.202 1183.49 275.757 1171.11 293.165C1158.74 310.572 1148.32 324.71 1147.96 324.581C1147.6 324.453 1142.05 319.848 1135.63 314.348C1120.81 301.641 1118.24 300.194 1113.19 301.708C1109.71 302.75 1107.81 305.149 1089.56 331.595C1041.95 400.595 1030.76 416.804 1013.94 441.099C1004.14 455.261 996.14 467.186 996.17 467.599C996.2 468.011 1000.75 471.244 1006.29 474.783C1026.66 487.806 1045.12 502.629 1064.51 521.544L1077.4 534.123L1112.55 498.735C1131.88 479.272 1170.41 440.398 1198.17 412.348C1225.93 384.298 1274.45 335.297 1305.99 303.457C1338.08 271.062 1363.91 244.196 1364.63 242.456C1366.98 236.843 1365.62 234.388 1355.24 225.499C1332.08 205.669 1278.42 161.08 1276.43 160.016C1273.35 158.37 1270.07 158.572 1266.86 160.603ZM145.518 334.381C142.968 335.672 137.54 344.388 114.831 383.649C99.6567 409.883 86.7447 432.664 86.1367 434.272C84.7277 438.001 85.6147 442.035 88.4167 444.642C90.4437 446.528 119.381 460.718 157.115 478.328C180.061 489.037 240.525 517.654 256.793 525.506L270.97 532.348L262.058 547.348C252.182 563.97 251.204 567.61 255.365 572.24C257.418 574.524 269.859 580.474 324.615 605.355C333.415 609.354 349.165 616.553 359.615 621.353C370.065 626.153 386.49 633.665 396.115 638.048C405.74 642.43 418.937 648.508 425.441 651.556C432.107 654.679 437.635 656.715 438.111 656.222C438.575 655.741 440.65 651.073 442.721 645.848C450.527 626.156 468.233 594.437 482.59 574.427C485.67 570.134 488.286 566.26 488.403 565.819C488.52 565.378 483.89 561.754 478.115 557.765C472.34 553.776 451.64 539.493 432.115 526.025C412.59 512.557 392.34 498.519 387.115 494.829C381.89 491.138 366.59 480.543 353.115 471.283C328.265 454.206 301.206 435.556 277.615 419.246C270.465 414.303 244.815 396.601 220.615 379.909C196.415 363.217 171.6 346.023 165.471 341.7C153.324 333.133 150.227 331.997 145.518 334.381ZM1454.14 360.033C1451.91 360.861 1447.53 363.841 1373.61 414.842C1287.56 474.22 1288.27 473.746 1287.31 472.517C1286.81 471.874 1282.69 464.927 1278.17 457.079C1269.79 442.539 1267.24 439.848 1261.89 439.848C1259.16 439.848 1261.37 438.394 1229.11 461.347C1215.09 471.325 1186.29 491.803 1165.11 506.853C1106.29 548.661 1096.11 555.969 1096.11 556.41C1096.11 556.633 1098.97 560.536 1102.46 565.082C1116.69 583.637 1130.43 606.122 1142.17 630.093L1150.28 646.663L1155.45 644.372C1158.29 643.112 1174.79 635.344 1192.11 627.109C1209.44 618.873 1231.04 608.635 1240.11 604.357C1257.3 596.254 1323.82 564.737 1354.11 550.34C1363.74 545.767 1397.94 529.553 1430.11 514.31C1518.36 472.5 1518.64 472.365 1520.45 469.777C1524.17 464.466 1523.53 463.03 1496.26 415.971C1482.04 391.428 1469.71 369.989 1468.85 368.327C1465.31 361.432 1459.39 358.093 1454.14 360.033ZM31.3707 581.891C26.9977 582.837 25.6537 584.122 23.8157 589.112C21.5067 595.379 3.7927 697.43 4.5147 700.305C4.8527 701.651 6.1477 703.938 7.3937 705.386C9.9457 708.353 9.4697 708.277 47.1147 711.767C58.9397 712.863 95.1647 716.26 127.615 719.314C160.065 722.369 192.015 725.359 198.615 725.96C205.215 726.56 210.808 727.236 211.044 727.462C211.28 727.688 210.257 734.954 208.772 743.61C205.433 763.065 205.403 765.788 208.494 769.122C211.134 771.972 212.318 772.202 232.615 773.807C254.085 775.505 355.259 783.745 375.115 785.413C411.55 788.474 410.718 788.467 411.449 785.736C411.8 784.423 412.098 780.198 412.111 776.348C412.169 758.857 417.544 724.291 424.135 699.017C426.238 690.954 427.793 684.193 427.592 683.992C427.231 683.63 369.058 668.328 324.615 656.903C311.965 653.652 282.49 645.97 259.115 639.834C235.74 633.697 207.39 626.273 196.115 623.335C184.84 620.397 170.44 616.634 164.115 614.973C157.79 613.311 126.515 605.163 94.6147 596.866C62.7147 588.569 36.1647 581.647 35.6147 581.484C35.0647 581.322 33.1547 581.504 31.3707 581.891ZM1546.11 615.815C1538.14 617.903 1517.44 623.289 1500.11 627.783C1482.79 632.277 1446.19 641.82 1418.78 648.988C1391.38 656.157 1368.74 661.812 1368.49 661.555C1368.23 661.298 1366.71 653.613 1365.11 644.477C1363.51 635.34 1361.72 626.985 1361.15 625.908C1359.64 623.097 1356.07 620.848 1353.12 620.848C1350.89 620.848 1319.22 629.338 1256.11 646.849C1218.37 657.324 1164.54 672.094 1162.31 672.591C1160.67 672.954 1160.18 673.576 1160.63 674.726C1160.98 675.618 1163.04 682.415 1165.21 689.831C1171.93 712.75 1176.96 739.931 1179.09 764.738C1179.62 771.002 1180.21 776.278 1180.4 776.463C1180.58 776.647 1184.75 776.373 1189.67 775.854C1194.59 775.334 1206.49 774.203 1216.11 773.34C1225.74 772.477 1237.66 771.337 1242.61 770.807C1247.56 770.277 1259.26 769.175 1268.61 768.359C1277.96 767.542 1297.76 765.739 1312.61 764.352C1327.46 762.965 1351.76 760.703 1366.61 759.324C1381.46 757.946 1398.56 756.353 1404.61 755.783C1410.66 755.214 1424.84 753.889 1436.11 752.838C1480.11 748.74 1523.98 744.648 1554.1 741.832C1587.92 738.671 1589.03 738.398 1591.9 732.558C1593.01 730.282 1592.01 723.182 1584.11 677.148C1579.12 648.108 1574.33 622.397 1573.46 620.013C1571.73 615.25 1567.31 611.801 1563.11 611.936C1561.74 611.981 1554.09 613.726 1546.11 615.815ZM1180.11 811.098C1180.1 829.653 1174.94 865.216 1168.58 890.527C1166.13 900.282 1164.46 908.593 1164.87 908.996C1165.28 909.4 1183.16 914.3 1204.61 919.885C1265.74 935.803 1343.25 956.012 1382.61 966.298C1434.97 979.976 1520.96 1002.4 1540.48 1007.47C1549.76 1009.88 1558.22 1011.85 1559.28 1011.85C1562.6 1011.85 1566.79 1009.06 1567.87 1006.14C1569.38 1002.05 1587.17 899.031 1587.14 894.521C1587.11 889.775 1583.01 885.25 1578.01 884.451C1576.14 884.152 1561.79 882.755 1546.11 881.347C1530.44 879.939 1498.49 876.975 1475.11 874.761C1451.74 872.547 1420.97 869.651 1406.73 868.326C1392.5 867 1380.69 865.761 1380.5 865.572C1380.32 865.382 1381.57 857.364 1383.29 847.752C1386.1 832.106 1386.28 829.975 1385.02 827.402C1381.71 820.637 1382.47 820.776 1324.61 816.341C1313.61 815.498 1288.41 813.469 1268.61 811.832C1248.81 810.194 1226.76 808.379 1219.61 807.797C1212.46 807.215 1201.66 806.315 1195.61 805.797C1178.62 804.342 1180.12 803.83 1180.11 811.098ZM397.115 818.912C392.44 819.344 376.015 820.879 360.615 822.323C345.215 823.767 328.115 825.357 322.615 825.855C276.577 830.032 196.789 837.342 170.544 839.788C140.378 842.599 95.6827 846.715 33.6837 852.39C4.40771 855.07 3.0157 855.448 0.533704 861.387C-0.782296 864.537 -0.220296 868.502 8.7057 919.052C13.9777 948.908 18.9107 974.817 19.6667 976.628C20.5917 978.841 22.2407 980.421 24.6967 981.447C28.2817 982.945 29.1557 982.763 70.9827 971.828C161.789 948.087 220.975 932.848 222.371 932.848C223.461 932.848 224.394 936.188 226.072 946.098C230.012 969.362 230.596 970.862 236.474 972.801C239.529 973.81 242.351 973.262 262.259 967.796C291.917 959.653 347.281 944.37 372.615 937.334C385.633 933.718 407.383 927.797 422.865 923.654C432.227 921.149 432.179 921.238 429.072 912.255C421.718 890.993 414.578 854.193 412.55 827.098L411.857 817.848L408.736 817.987C407.019 818.064 401.79 818.48 397.115 818.912ZM1153.04 939.543C1143.25 965.286 1122.61 1002.6 1106.45 1023.77C1103.72 1027.35 1103.3 1028.45 1104.33 1029.42C1105.04 1030.09 1111.46 1034.64 1118.61 1039.54C1125.76 1044.44 1143.99 1057.02 1159.11 1067.49C1174.24 1077.97 1196.06 1093.04 1207.61 1100.99C1219.16 1108.94 1244.81 1126.63 1264.61 1140.32C1284.41 1154 1316.59 1176.22 1336.11 1189.69C1355.64 1203.16 1376.56 1217.63 1382.61 1221.85C1420.7 1248.42 1436.69 1259.15 1439.29 1259.9C1441.18 1260.44 1443.59 1260.31 1445.92 1259.55C1449.29 1258.44 1450.47 1256.81 1461.18 1238.35C1467.56 1227.35 1480.36 1205.3 1489.63 1189.35C1511.51 1151.7 1511.5 1151.79 1493.61 1143.36C1488.66 1141.03 1472.01 1133.16 1456.61 1125.88C1441.21 1118.6 1420.96 1109.03 1411.61 1104.61C1402.26 1100.2 1381.34 1090.29 1365.11 1082.59C1348.89 1074.9 1332.31 1067.06 1328.28 1065.18C1321.16 1061.87 1320.98 1061.7 1322.37 1059.56C1323.16 1058.34 1327.25 1051.46 1331.46 1044.27C1341.99 1026.29 1341.77 1023.1 1329.61 1017.07C1324.33 1014.45 1310 1007.86 1235.11 973.62C1225.49 969.218 1203.52 959.144 1186.3 951.233C1169.07 943.321 1154.77 936.848 1154.52 936.848C1154.27 936.848 1153.6 938.061 1153.04 939.543ZM391.115 971.447C363.89 984.392 331.715 999.628 319.615 1005.3C307.515 1010.98 287.04 1020.67 274.115 1026.84C261.19 1033.01 233.965 1045.94 213.615 1055.57C193.265 1065.2 164.015 1079.06 148.615 1086.35C133.215 1093.65 110.49 1104.4 98.1147 1110.24C75.6867 1120.82 71.7627 1123.42 70.4827 1128.52C69.6017 1132.03 70.2547 1133.27 100.471 1185.75C127.515 1232.72 129.014 1234.84 135.115 1234.84C136.695 1234.84 145.163 1229.63 158.115 1220.7C169.39 1212.93 186.49 1201.13 196.115 1194.5C205.74 1187.86 220.163 1177.91 228.167 1172.39C236.171 1166.86 252.509 1155.6 264.473 1147.35C276.438 1139.1 290.133 1129.57 294.908 1126.18C299.682 1122.8 303.898 1120.21 304.276 1120.45C304.654 1120.68 308.659 1127.41 313.176 1135.39C317.692 1143.38 322.512 1150.8 323.886 1151.88C325.358 1153.04 327.921 1153.85 330.125 1153.85C333.294 1153.85 336.362 1152.07 350.24 1142.19C359.246 1135.78 379.665 1121.24 395.615 1109.87C411.565 1098.51 440.365 1078.04 459.615 1064.37C478.865 1050.71 494.989 1039.21 495.447 1038.81C495.904 1038.41 492.342 1032.79 487.531 1026.32C473.616 1007.61 462.768 989.878 451.909 968.098C446.356 956.96 441.543 947.863 441.214 947.88C440.884 947.898 418.34 958.503 391.115 971.447ZM1069.61 1066.17C1052.95 1083.09 1034.57 1098.84 1016.98 1111.27L1005.35 1119.49L1015.54 1133.92C1021.14 1141.85 1034.51 1160.72 1045.24 1175.85C1055.97 1190.97 1076.82 1220.45 1091.59 1241.35C1106.35 1262.25 1121.66 1283.85 1125.62 1289.35C1129.57 1294.85 1156.32 1332.65 1185.06 1373.35C1213.8 1414.05 1238.84 1448.81 1240.7 1450.6C1243.35 1453.14 1244.94 1453.85 1248.02 1453.85C1251.64 1453.85 1253.47 1452.58 1270.78 1438.07C1281.14 1429.39 1300.53 1413.14 1313.88 1401.96C1327.23 1390.79 1338.81 1380.69 1339.63 1379.52C1340.45 1378.36 1341.11 1375.66 1341.11 1373.52C1341.11 1369.76 1339.86 1368.37 1297.98 1325.72C1274.26 1301.56 1254.53 1281.6 1254.14 1281.36C1253.75 1281.12 1241.22 1268.37 1226.3 1253.04L1199.17 1225.15L1211.74 1214.78C1218.65 1209.08 1225.17 1203.33 1226.21 1202C1228.36 1199.26 1228.64 1194.38 1226.83 1191.25C1225.67 1189.25 1086.54 1051.57 1085.24 1051.14C1084.9 1051.02 1077.86 1057.79 1069.61 1066.17ZM485.54 1089.1C443.499 1131.55 280.64 1296.23 253.142 1324.09C240.232 1337.17 229.11 1348.88 228.427 1350.11C227.745 1351.34 227.17 1353.67 227.15 1355.29C227.102 1359.31 230.005 1361.98 277.478 1401.6C319.385 1436.57 319.323 1436.53 325.491 1433.72C326.947 1433.06 334.858 1422.9 344.761 1408.97C354.001 1395.98 370.38 1372.97 381.159 1357.85C391.939 1342.72 410.34 1316.85 422.051 1300.35C433.762 1283.85 443.681 1269.98 444.093 1269.53C444.506 1269.09 451.017 1273.92 458.563 1280.29C466.109 1286.65 473.371 1292.12 474.699 1292.46C478.081 1293.31 481.896 1292.16 484.35 1289.56C486.257 1287.54 597.115 1127.06 597.115 1126.32C597.115 1126.14 592.542 1123 586.953 1119.34C566.513 1105.95 545.465 1089.04 527.51 1071.6C520.853 1065.14 515.204 1059.85 514.957 1059.85C514.71 1059.85 501.473 1073.01 485.54 1089.1ZM970.615 1139.54C946.744 1151.7 918.648 1162.43 894.115 1168.75C884.345 1171.26 882.668 1171.98 882.965 1173.53C883.157 1174.53 890.275 1200.77 898.784 1231.85C907.292 1262.92 927.242 1335.82 943.117 1393.85C958.992 1451.87 975.842 1513.45 980.561 1530.69C985.28 1547.92 989.582 1562.85 990.122 1563.86C991.74 1566.88 996.205 1569.85 999.144 1569.85C1000.66 1569.85 1016.24 1564.64 1033.76 1558.28C1051.28 1551.92 1074.84 1543.35 1086.11 1539.25C1108.22 1531.21 1112.11 1528.77 1112.11 1522.97C1112.11 1521.39 1103.37 1500.99 1092.5 1477.23C1081.71 1453.65 1064.23 1415.45 1053.65 1392.35C1029.01 1338.56 1028.73 1337.9 1029.34 1337.28C1029.63 1337 1036.62 1334.35 1044.89 1331.4C1062.38 1325.14 1064.62 1323.87 1066.14 1319.26C1067.47 1315.23 1070.88 1322.91 1026.16 1228.89C1009.28 1193.39 992.347 1157.72 988.539 1149.62C984.731 1141.52 981.165 1134.9 980.615 1134.92C980.065 1134.94 975.565 1137.01 970.615 1139.54ZM616.923 1150.11C614.343 1155.74 605.506 1174.97 597.285 1192.85C589.064 1210.72 574.691 1242 565.345 1262.35C547.547 1301.1 512.746 1376.85 475.088 1458.82C461.702 1487.95 452.637 1508.91 452.361 1511.36C451.982 1514.72 452.374 1516 454.597 1518.64C456.08 1520.41 457.82 1521.85 458.464 1521.85C459.108 1521.85 478.755 1528.86 502.125 1537.42C556.721 1557.44 560.841 1558.85 564.747 1558.85C572.203 1558.85 570.669 1563.28 599.711 1457.85C614.332 1404.77 626.591 1361.06 626.954 1360.71C627.318 1360.36 634.59 1362.7 643.115 1365.91C668.473 1375.44 668.955 1375.2 675.503 1349.85C677.989 1340.22 689.269 1297.05 700.569 1253.91C711.869 1210.77 721.115 1175.12 721.115 1174.68C721.115 1174.24 719.878 1173.62 718.365 1173.3C687.342 1166.68 653.864 1155.31 629.924 1143.25C626.207 1141.38 622.816 1139.85 622.39 1139.86C621.964 1139.86 619.504 1144.47 616.923 1150.11ZM843.115 1178.9C821.669 1182.04 774.426 1182.56 756.715 1179.87C752.921 1179.29 749.712 1178.93 749.584 1179.08C749.457 1179.23 745.664 1224.35 741.156 1279.35C736.648 1334.35 729.22 1424.92 724.65 1480.63C718.962 1549.95 716.603 1583.08 717.175 1585.63C717.634 1587.67 719.184 1590.36 720.618 1591.6L723.227 1593.85H781.248H839.269L842.192 1590.92C844.994 1588.12 845.474 1586.76 845.223 1582.35C845.16 1581.25 841.735 1537.82 837.612 1485.85C833.488 1433.87 830.114 1389.91 830.115 1388.16V1384.97L848.699 1384.66L867.283 1384.35L870.199 1381.08C872.214 1378.82 873.115 1376.76 873.115 1374.4C873.115 1372.52 869.065 1328.15 864.115 1275.79C859.165 1223.44 855.115 1179.98 855.115 1179.23C855.115 1177.69 851.995 1177.6 843.115 1178.9Z",
                            fill: "black",
                        }),
                    }
                )
            );
        };
        return _this;
    }
    /*
     * Static Methods
     */
    Okta.init = function (config) {
        if (Okta.instance !== undefined) {
            console.warn("Okta Provider was already initialized");
            return Okta.instance;
        }
        Okta.instance = new Okta(config);
        return Okta.instance;
    };
    /*
     * Tests methods.
     */
    Okta.reset = function () {
        if (!isTest()) {
            return;
        }
        Okta.instance = undefined;
        return;
    };
    return Okta;
})(Provider$1);

/*
 * Class.
 */
var Twitter = /** @class */ (function (_super) {
    __extends(Twitter, _super);
    /*
     * Constructor.
     */
    function Twitter(config) {
        var _this = _super.call(this, exports.__assign({ id: "twitter", name: "Twitter" }, config)) || this;
        _this.getLogo = function () {
            return jsxRuntime.jsx(
                "svg",
                exports.__assign(
                    {
                        xmlns: "http://www.w3.org/2000/svg",
                        width: "20.129",
                        height: "16.356",
                        viewBox: "0 0 20.129 16.356",
                    },
                    {
                        children: jsxRuntime.jsx("g", {
                            children: jsxRuntime.jsx("g", {
                                children: jsxRuntime.jsx("path", {
                                    fill: "#04ABEE",
                                    d: "M45.232 35.964a8.242 8.242 0 0 1-2.372.649 4.141 4.141 0 0 0 1.816-2.284 8.268 8.268 0 0 1-2.623 1 4.133 4.133 0 0 0-7.037 3.771 11.724 11.724 0 0 1-8.516-4.317 4.133 4.133 0 0 0 1.282 5.517 4.1 4.1 0 0 1-1.87-.517v.052a4.132 4.132 0 0 0 3.313 4.049 4.147 4.147 0 0 1-1.865.071 4.134 4.134 0 0 0 3.858 2.868 8.338 8.338 0 0 1-6.114 1.71 11.745 11.745 0 0 0 18.08-9.894q0-.268-.012-.534a8.374 8.374 0 0 0 2.061-2.137z",
                                    transform:
                                        "translate(34.799 -7.41) translate(2.201 4.266) translate(-62.103 -30.883)",
                                }),
                            }),
                        }),
                    }
                )
            );
        };
        return _this;
    }
    /*
     * Static Methods
     */
    Twitter.init = function (config) {
        if (Twitter.instance !== undefined) {
            console.warn("Twitter Provider was already initialized");
            return Twitter.instance;
        }
        Twitter.instance = new Twitter(config);
        return Twitter.instance;
    };
    /*
     * Tests methods.
     */
    Twitter.reset = function () {
        if (!isTest()) {
            return;
        }
        Twitter.instance = undefined;
        return;
    };
    return Twitter;
})(Provider$1);

var UserContextContext = React__default.default.createContext(undefined);
var useUserContext = function () {
    return React__default.default.useContext(UserContextContext);
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
     * If we receive a userContext as a props we should assume that the user
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

var _a = createGenericComponentsOverrideContext(),
    useContext = _a[0],
    Provider = _a[1];

var ComponentOverrideContext = React__default.default.createContext("IS_DEFAULT");

/*
 * Component.
 */
var ErrorBoundary = /** @class */ (function (_super) {
    __extends(ErrorBoundary, _super);
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
    var _b = React.useState(
            SuperTokens$1.usesDynamicLoginMethods === false ||
                Multitenancy.getInstanceOrThrow().getLoadedDynamicLoginMethods() !== undefined
        ),
        loadedDynamicLoginMethods = _b[0],
        setLoadedDynamicLoginMethods = _b[1];
    var st = SuperTokens$1.getInstanceOrThrow();
    React.useEffect(function () {
        var handler = function () {
            return setLoadedDynamicLoginMethods(true);
        };
        SuperTokens$1.uiController.on("LoginMethodsLoaded", handler);
    }, []);
    if (loadedDynamicLoginMethods === false) {
        return null;
    }
    return jsxRuntime.jsx(ErrorBoundary, {
        children: jsxRuntime.jsx(
            TranslationContextProvider,
            exports.__assign(
                {
                    defaultLanguage: st.languageTranslations.defaultLanguage,
                    defaultStore: mergeObjects(defaultStore, st.languageTranslations.userTranslationStore),
                    translationControlEventSource: st.languageTranslations.translationEventSource,
                    userTranslationFunc: st.languageTranslations.userTranslationFunc,
                },
                {
                    children: jsxRuntime.jsx(
                        WithOrWithoutShadowDom,
                        exports.__assign({ useShadowDom: useShadowDom }, { children: children })
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
        exports.__assign(
            { id: ST_ROOT_ID, ref: rootDiv },
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
            exports.__assign({ id: ST_ROOT_ID }, { children: [children, jsxRuntime.jsx(DisableAutoFillInput, {})] })
        );
    }
    return jsxRuntime.jsxs(WithShadowDom, { children: [children, jsxRuntime.jsx(DisableAutoFillInput, {})] });
}
function DisableAutoFillInput() {
    /* eslint-disable react/jsx-no-literals */
    return jsxRuntime.jsx(
        "style",
        exports.__assign(
            { type: "text/css" },
            {
                children:
                    "input.supertokens-input:-webkit-autofill,input.supertokens-input:-webkit-autofill:focus,input.supertokens-input:-webkit-autofill:hover,select:-webkit-autofill,select:-webkit-autofill:focus,select:-webkit-autofill:hover,textarea:-webkit-autofill,textarea:-webkit-autofill:focus,textarea:-webkit-autofill:hover{transition:background-color 5000s ease-in-out 0s}",
            }
        )
    );
    /* eslint-enable react/jsx-no-literals */
}

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
    RecipeRouter.getMatchingComponentForRouteAndRecipeIdFromPreBuiltUIList = function (normalisedUrl, preBuiltUIList) {
        var _a, _b;
        var path = normalisedUrl.getAsStringDangerous();
        var routeComponents = preBuiltUIList.reduce(function (components, c) {
            var _a;
            var routes =
                (_a = c.getPathsToFeatureComponentWithRecipeIdMap) === null || _a === void 0
                    ? void 0
                    : _a.call(c)[path];
            return routes !== undefined ? components.concat(routes) : components;
        }, []);
        if (routeComponents.length === 0) {
            return undefined;
        }
        var dynamicLoginMethods = Multitenancy.getInstanceOrThrow().getLoadedDynamicLoginMethods();
        var possiblyEnabledRecipes = exports.__assign(
            {
                thirdpartyemailpassword: {
                    enabled:
                        (dynamicLoginMethods === null || dynamicLoginMethods === void 0
                            ? void 0
                            : dynamicLoginMethods["thirdparty"].enabled) &&
                        dynamicLoginMethods["emailpassword"].enabled,
                },
                thirdpartypasswordless: {
                    enabled:
                        (dynamicLoginMethods === null || dynamicLoginMethods === void 0
                            ? void 0
                            : dynamicLoginMethods["thirdparty"].enabled) && dynamicLoginMethods["passwordless"].enabled,
                },
            },
            dynamicLoginMethods
        );
        var components = routeComponents.filter(function (c) {
            return c.matches();
        });
        if (
            components.length === 1 &&
            ((_a = possiblyEnabledRecipes[components[0].recipeID]) === null || _a === void 0 ? void 0 : _a.enabled) ===
                true
        ) {
            return components[0];
        }
        var _loop_1 = function (id) {
            var matching = routeComponents.find(function (c) {
                return c.recipeID === id;
            });
            if (
                matching !== undefined &&
                dynamicLoginMethods !== undefined &&
                ((_b = possiblyEnabledRecipes[id]) === null || _b === void 0 ? void 0 : _b.enabled) === true
            ) {
                return { value: matching };
            }
        };
        for (var id in possiblyEnabledRecipes) {
            var state_1 = _loop_1(id);
            if (typeof state_1 === "object") return state_1.value;
        }
        // Otherwise, If no recipe Id provided, or if no recipe id matches, return the first matching component.
        return routeComponents[0];
    };
    return RecipeRouter;
})();

function RoutingComponent(props) {
    var _a, _b;
    var _c = React.useState(
            SuperTokens$1.usesDynamicLoginMethods === false ||
                Multitenancy.getInstanceOrThrow().getLoadedDynamicLoginMethods() !== undefined
        ),
        loadedDynamicLoginMethods = _c[0],
        setLoadedDynamicLoginMethods = _c[1];
    var path = props.path;
    var location =
        (_a = props.getReactRouterDomWithCustomHistory()) === null || _a === void 0 ? void 0 : _a.useLocation();
    var componentToRender = React__default.default.useMemo(
        function () {
            var normalizedPath = new NormalisedURLPath__default.default(path);
            // During development, this runs twice so as to warn devs of if there
            // are any side effects that happen here. So in tests, it will result in
            // the console log twice
            return RecipeRouter.getMatchingComponentForRouteAndRecipeIdFromPreBuiltUIList(
                normalizedPath,
                props.preBuiltUIList
            );
        },
        [path, location, loadedDynamicLoginMethods]
    ); // location dependency needs to be kept in order to get new component on url change
    React.useEffect(function () {
        var handler = function () {
            setLoadedDynamicLoginMethods(true);
        };
        SuperTokens$1.uiController.on("LoginMethodsLoaded", handler);
    }, []);
    var history =
        (_b = props.getReactRouterDomWithCustomHistory()) === null || _b === void 0 ? void 0 : _b.useHistoryCustom();
    if (componentToRender === undefined || loadedDynamicLoginMethods === false) {
        return null;
    }
    return jsxRuntime.jsx(componentToRender.component, { history: history });
}

/*
 * Component.
 */
function getSuperTokensRoutesForReactRouterDom$1(_a) {
    var getReactRouterDomWithCustomHistory = _a.getReactRouterDomWithCustomHistory,
        recipeList = _a.recipeList;
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
                if (!(path in routes)) {
                    routes[path] = jsxRuntime.jsx(
                        Route,
                        exports.__assign(
                            { exact: true, path: path },
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
        recipeList = _a.recipeList;
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
                if (!(path in routes)) {
                    routes[path] = jsxRuntime.jsx(
                        Route,
                        {
                            path: path,
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
    UI.getSuperTokensRoutesForReactRouterDom = function (reactRouterDom, preBuiltUiClassList) {
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
        });
    };
    UI.canHandleRoute = function (preBuiltUiClassList) {
        var recipeList = preBuiltUiClassList.map(function (r) {
            return r.getInstanceOrInitAndGetInstance();
        });
        return (
            RecipeRouter.getMatchingComponentForRouteAndRecipeIdFromPreBuiltUIList(
                getCurrentNormalisedUrlPath(),
                recipeList
            ) !== undefined
        );
    };
    UI.getRoutingComponent = function (preBuiltUiClassList) {
        var recipeList = preBuiltUiClassList.map(function (r) {
            return r.getInstanceOrInitAndGetInstance();
        });
        return jsxRuntime.jsx(RoutingComponent, {
            getReactRouterDomWithCustomHistory: UI.getReactRouterDomWithCustomHistory,
            path: getCurrentNormalisedUrlPath().getAsStringDangerous(),
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

function ErrorRoundIcon() {
    return jsxRuntime.jsxs(
        "svg",
        exports.__assign(
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
            return jsxRuntime.jsx(OverrideComponent, exports.__assign({ DefaultComponent: DefaultComponent }, props));
        }
        return jsxRuntime.jsx(DefaultComponent, exports.__assign({}, props));
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
        exports.__assign({ onClick: onClick, "data-supertokens": "buttonBase backButton" }, { children: t("GO_BACK") })
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
        exports.__assign(
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
        exports.__assign(
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
        return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        return [4 /*yield*/, props.recipe.signOut({ userContext: userContext })];
                    case 1:
                        _a.sent();
                        return [
                            4 /*yield*/,
                            SuperTokens$1.getInstanceOrThrow().redirectToAuth({
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
        exports.__assign(
            { "data-supertokens": "center" },
            {
                children: jsxRuntime.jsx(
                    "div",
                    exports.__assign(
                        { "data-supertokens": "container" },
                        {
                            children: jsxRuntime.jsxs(
                                "div",
                                exports.__assign(
                                    { "data-supertokens": "row" },
                                    {
                                        children: [
                                            jsxRuntime.jsx(ErrorRoundIcon, {}),
                                            jsxRuntime.jsx(
                                                "div",
                                                exports.__assign(
                                                    { "data-supertokens": "headerTitle" },
                                                    { children: t("ACCESS_DENIED") }
                                                )
                                            ),
                                            jsxRuntime.jsx("div", { "data-supertokens": "divider" }),
                                            jsxRuntime.jsxs(
                                                "div",
                                                exports.__assign(
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
        exports.__assign(
            { loadDefaultFont: !hasFont, userStyles: [props.config.rootStyle, props.config.accessDeniedScreen.style] },
            { children: jsxRuntime.jsx(AccessDeniedThemeWithOverride, exports.__assign({}, props)) }
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
    en: exports.__assign(exports.__assign({}, defaultTranslationsCommon.en), {
        ACCESS_DENIED: "Access denied",
        GO_BACK: "Go back",
        LOGOUT: "Log out",
    }),
};

var AccessDeniedScreen = function (props) {
    var _a;
    var recipeComponentOverrides = props.useComponentOverrides();
    var history =
        (_a = UI.getReactRouterDomWithCustomHistory()) === null || _a === void 0 ? void 0 : _a.useHistoryCustom();
    return jsxRuntime.jsx(
        ComponentOverrideContext.Provider,
        exports.__assign(
            { value: recipeComponentOverrides },
            {
                children: jsxRuntime.jsx(
                    FeatureWrapper,
                    exports.__assign(
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
    var override = exports.__assign(
        {
            functions: function (originalImplementation) {
                return originalImplementation;
            },
        },
        config.override
    );
    return exports.__assign(exports.__assign({}, normaliseRecipeModuleConfig(config)), {
        accessDeniedScreen: accessDeniedScreen,
        override: override,
    });
}
var getFailureRedirectionInfo = function (_a) {
    var invalidClaims = _a.invalidClaims,
        overrideGlobalClaimValidators = _a.overrideGlobalClaimValidators,
        userContext = _a.userContext;
    return __awaiter(void 0, void 0, void 0, function () {
        var invalidClaimsMap,
            globalValidators,
            failedClaim,
            _i,
            globalValidators_1,
            validator,
            claim,
            failureCallback,
            redirectPath;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    invalidClaimsMap = invalidClaims.reduce(function (map, validator) {
                        map[validator.validatorId] = validator;
                        return map;
                    }, {});
                    globalValidators = utils.getGlobalClaimValidators({
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
    __extends(Session, _super);
    function Session(config, webJSRecipe) {
        if (webJSRecipe === void 0) {
            webJSRecipe = WebJSSessionRecipe__default.default;
        }
        var _this = _super.call(this, config) || this;
        _this.webJSRecipe = webJSRecipe;
        _this.recipeID = Session.RECIPE_ID;
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
            return __awaiter(_this, void 0, void 0, function () {
                return __generator(this, function (_a) {
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
            return __awaiter(_this, void 0, void 0, function () {
                return __generator(this, function (_a) {
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
            return __awaiter(_this, void 0, void 0, function () {
                var invalidClaims, jsonContext, failureRedirectInfo, successContextStr, authRecipeRedirectHandler;
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
                                    SuperTokens$1.getInstanceOrThrow().redirectToAuth({
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
                                setLocalStorage("supertokens-success-redirection-context", jsonContext),
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
                                    SuperTokens$1.getInstanceOrThrow().redirectToUrl(
                                        failureRedirectInfo.redirectPath,
                                        history
                                    ),
                                ];
                            }
                            _a.label = 6;
                        case 6:
                            if (!(redirectInfo === undefined)) return [3 /*break*/, 13];
                            return [4 /*yield*/, getLocalStorage("supertokens-success-redirection-context")];
                        case 7:
                            successContextStr = _a.sent();
                            if (!(successContextStr !== null)) return [3 /*break*/, 12];
                            _a.label = 8;
                        case 8:
                            _a.trys.push([8, , 9, 11]);
                            redirectInfo = JSON.parse(successContextStr);
                            return [3 /*break*/, 11];
                        case 9:
                            return [4 /*yield*/, removeFromLocalStorage("supertokens-success-redirection-context")];
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
                    exports.__assign(
                        { userContext: props.userContext },
                        {
                            children: jsxRuntime.jsx(
                                AccessDeniedScreen,
                                exports.__assign({ recipe: _this }, props, {
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
        return WebJSSessionRecipe__default.default.addAxiosInterceptors(axiosInstance, userContext);
    };
    Session.init = function (config) {
        var _this = this;
        var normalisedConfig = normaliseSessionConfig(config);
        return {
            recipeID: Session.RECIPE_ID,
            authReact: function (appInfo) {
                Session.instance = new Session(
                    exports.__assign(exports.__assign({}, normalisedConfig), {
                        appInfo: appInfo,
                        recipeId: Session.RECIPE_ID,
                    })
                );
                return Session.instance;
            },
            webJS: WebJSSessionRecipe__default.default.init(
                exports.__assign(exports.__assign({}, normalisedConfig), {
                    onHandleEvent: function (event) {
                        if (normalisedConfig.onHandleEvent !== undefined) {
                            normalisedConfig.onHandleEvent(event);
                        }
                        void Session.getInstanceOrThrow().notifyListeners(event);
                    },
                    preAPIHook: function (context) {
                        return __awaiter(_this, void 0, void 0, function () {
                            var response;
                            return __generator(this, function (_a) {
                                response = exports.__assign(exports.__assign({}, context), {
                                    requestInit: exports.__assign(exports.__assign({}, context.requestInit), {
                                        headers: exports.__assign(exports.__assign({}, context.requestInit.headers), {
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
        if (!isTest()) {
            return;
        }
        Session.instance = undefined;
        return;
    };
    Session.RECIPE_ID = "session";
    return Session;
})(RecipeModule);

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
var AuthRecipe = /** @class */ (function (_super) {
    __extends(AuthRecipe, _super);
    function AuthRecipe(config) {
        var _this = _super.call(this, config) || this;
        _this.getAuthRecipeDefaultRedirectionURL = function (context) {
            return __awaiter(_this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    if (context.action === "SUCCESS") {
                        return [2 /*return*/, context.redirectToPath === undefined ? "/" : context.redirectToPath];
                    } else {
                        throw new Error("Should never come here");
                    }
                });
            });
        };
        _this.signOut = function (input) {
            return __awaiter(_this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            return [
                                4 /*yield*/,
                                Session.getInstanceOrThrow().signOut({
                                    userContext: getNormalisedUserContext(
                                        input === null || input === void 0 ? void 0 : input.userContext
                                    ),
                                }),
                            ];
                        case 1:
                            return [2 /*return*/, _a.sent()];
                    }
                });
            });
        };
        _this.doesSessionExist = function (input) {
            return __awaiter(_this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            return [
                                4 /*yield*/,
                                Session.getInstanceOrThrow().doesSessionExist({
                                    userContext: getNormalisedUserContext(
                                        input === null || input === void 0 ? void 0 : input.userContext
                                    ),
                                }),
                            ];
                        case 1:
                            return [2 /*return*/, _a.sent()];
                    }
                });
            });
        };
        postSuperTokensInitCallbacks.PostSuperTokensInitCallbacks.addPostInitCallback(function () {
            var session = Session.getInstance();
            if (session !== undefined) {
                session.addAuthRecipeRedirectionHandler(_this.config.recipeId, _this.redirect.bind(_this));
            }
        });
        return _this;
    }
    return AuthRecipe;
})(RecipeModule);

var getFunctionOverrides = function (recipeId, onHandleEvent) {
    return function (originalImp) {
        return exports.__assign(exports.__assign({}, originalImp), {
            signInAndUp: function (input) {
                return __awaiter(this, void 0, void 0, function () {
                    var response;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                return [4 /*yield*/, originalImp.signInAndUp(input)];
                            case 1:
                                response = _a.sent();
                                if (response.status === "OK") {
                                    onHandleEvent({
                                        action: "SUCCESS",
                                        isNewUser: response.createdNewUser,
                                        user: response.user,
                                        userContext: input.userContext,
                                    });
                                }
                                return [2 /*return*/, response];
                        }
                    });
                });
            },
            setStateAndOtherInfoToStorage: function (input) {
                return originalImp.setStateAndOtherInfoToStorage({
                    state: exports.__assign(exports.__assign({}, input.state), {
                        rid: recipeId,
                        redirectToPath: getRedirectToPathFromURL(),
                    }),
                    userContext: input.userContext,
                });
            },
        });
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
function normaliseAuthRecipe(config) {
    return normaliseRecipeModuleConfig(config);
}

/*
 * Class.
 */
var Custom = /** @class */ (function (_super) {
    __extends(Custom, _super);
    /*
     * Constructor.
     */
    function Custom(config) {
        var _this = _super.call(this, config) || this;
        _this.getLogo = function () {
            return undefined;
        };
        return _this;
    }
    /*
     * Static Methods
     */
    Custom.init = function (config) {
        if (config === undefined || config.id === undefined || config.name === undefined) {
            throw new Error("Custom provider config should contain id and name attributes");
        }
        return new Custom(config);
    };
    return Custom;
})(Provider$1);

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
 * Methods.
 */
function normaliseThirdPartyConfig(config) {
    if (config === undefined) {
        throw new Error("ThirdParty config should not be empty");
    }
    var signInAndUpFeature = normaliseSignInAndUpFeature(config.signInAndUpFeature);
    var oAuthCallbackScreen =
        config.oAuthCallbackScreen === undefined ? {} : { style: config.oAuthCallbackScreen.style };
    var override = exports.__assign(
        {
            functions: function (originalImplementation) {
                return originalImplementation;
            },
        },
        config.override
    );
    return exports.__assign(exports.__assign({}, normaliseAuthRecipe(config)), {
        signInAndUpFeature: signInAndUpFeature,
        oAuthCallbackScreen: oAuthCallbackScreen,
        override: override,
    });
}
function normaliseSignInAndUpFeature(config) {
    if (config === undefined) {
        config = {};
    }
    if (config.providers === undefined) {
        config.providers = [];
    }
    var disableDefaultUI = config.disableDefaultUI === true;
    var style = config.style !== undefined ? config.style : "";
    var privacyPolicyLink = config.privacyPolicyLink;
    var termsOfServiceLink = config.termsOfServiceLink;
    /*
     * Convert custom configs to custom providers.
     */
    var providersWithCustom = config.providers.map(function (provider) {
        if (provider instanceof Provider$1) {
            return provider;
        }
        return Custom.init(provider);
    });
    /*
     * Make sure providers array is unique, filter duplicate values.
     * First, create a new set with unique ids from the configs.
     * Then map over those ids to find the first provider that matches from the configs.
     */
    var providers = Array.from(
        new Set(
            providersWithCustom.map(function (provider) {
                return provider.id;
            })
        )
    ).map(function (id) {
        return providersWithCustom.find(function (provider) {
            return provider.id === id;
        });
    });
    return {
        disableDefaultUI: disableDefaultUI,
        privacyPolicyLink: privacyPolicyLink,
        termsOfServiceLink: termsOfServiceLink,
        style: style,
        providers: providers,
    };
}
function matchRecipeIdUsingState(recipe, userContext) {
    var stateResponse = recipe.webJSRecipe.getStateAndOtherInfoFromStorage({
        userContext: userContext,
    });
    if (stateResponse === undefined) {
        return false;
    }
    if (stateResponse.rid === recipe.config.recipeId) {
        return true;
    }
    return false;
}
function redirectToThirdPartyLogin$1(input) {
    return __awaiter(this, void 0, void 0, function () {
        var provider, response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    provider = input.config.signInAndUpFeature.providers.find(function (p) {
                        return p.id === input.thirdPartyId;
                    });
                    if (provider === undefined) {
                        return [2 /*return*/, { status: "ERROR" }];
                    }
                    return [
                        4 /*yield*/,
                        input.recipeImplementation.getAuthorisationURLWithQueryParamsAndSetState({
                            thirdPartyId: input.thirdPartyId,
                            frontendRedirectURI: provider.getFrontendRedirectURI(),
                            redirectURIOnProviderDashboard: provider.getRedirectURIOnProviderDashboard(),
                            userContext: input.userContext,
                        }),
                    ];
                case 1:
                    response = _a.sent();
                    redirectWithFullPageReload(response);
                    return [2 /*return*/, { status: "OK" }];
            }
        });
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
var ThirdParty = /** @class */ (function (_super) {
    __extends(ThirdParty, _super);
    function ThirdParty(config, webJSRecipe) {
        if (webJSRecipe === void 0) {
            webJSRecipe = ThirdpartyWebJS__default.default;
        }
        var _this = this;
        if (SuperTokens$1.usesDynamicLoginMethods === false && config.signInAndUpFeature.providers.length === 0) {
            throw new Error("ThirdParty signInAndUpFeature providers array cannot be empty.");
        }
        _this = _super.call(this, config) || this;
        _this.webJSRecipe = webJSRecipe;
        _this.recipeID = ThirdParty.RECIPE_ID;
        /*
         * Instance methods.
         */
        _this.getDefaultRedirectionURL = function (context) {
            return __awaiter(_this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.getAuthRecipeDefaultRedirectionURL(context)];
                });
            });
        };
        return _this;
    }
    ThirdParty.init = function (config) {
        var normalisedConfig = normaliseThirdPartyConfig(config);
        return {
            recipeID: ThirdParty.RECIPE_ID,
            authReact: function (appInfo) {
                ThirdParty.instance = new ThirdParty(
                    exports.__assign(exports.__assign({}, normalisedConfig), {
                        appInfo: appInfo,
                        recipeId: ThirdParty.RECIPE_ID,
                    })
                );
                return ThirdParty.instance;
            },
            webJS: ThirdpartyWebJS__default.default.init(
                exports.__assign(exports.__assign({}, normalisedConfig), {
                    override: {
                        functions: function (originalImpl, builder) {
                            var functions = getFunctionOverrides(ThirdParty.RECIPE_ID, normalisedConfig.onHandleEvent);
                            builder.override(functions);
                            builder.override(normalisedConfig.override.functions);
                            return originalImpl;
                        },
                    },
                })
            ),
        };
    };
    ThirdParty.getInstanceOrThrow = function () {
        if (ThirdParty.instance === undefined) {
            // TODO Use correct doc link.
            var error =
                "No instance of ThirdParty found. Make sure to call the ThirdParty.init method." +
                "See https://supertokens.io/docs/thirdparty/quick-setup/frontend";
            // eslint-disable-next-line supertokens-auth-react/no-direct-window-object
            if (typeof window === "undefined") {
                error = error + SSR_ERROR;
            }
            throw Error(error);
        }
        return ThirdParty.instance;
    };
    /*
     * Tests methods.
     */
    ThirdParty.reset = function () {
        if (!isTest()) {
            return;
        }
        ThirdParty.instance = undefined;
        return;
    };
    ThirdParty.RECIPE_ID = "thirdparty";
    return ThirdParty;
})(AuthRecipe);

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
var Wrapper = /** @class */ (function () {
    function Wrapper() {}
    /*
     * Static attributes.
     */
    Wrapper.init = function (config) {
        return ThirdParty.init(config);
    };
    Wrapper.signOut = function (input) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [
                    2 /*return*/,
                    ThirdParty.getInstanceOrThrow().signOut({
                        userContext: getNormalisedUserContext(
                            input === null || input === void 0 ? void 0 : input.userContext
                        ),
                    }),
                ];
            });
        });
    };
    Wrapper.redirectToThirdPartyLogin = function (input) {
        return __awaiter(this, void 0, void 0, function () {
            var recipeInstance;
            return __generator(this, function (_a) {
                recipeInstance = ThirdParty.getInstanceOrThrow();
                return [
                    2 /*return*/,
                    redirectToThirdPartyLogin$1({
                        thirdPartyId: input.thirdPartyId,
                        config: recipeInstance.config,
                        userContext: getNormalisedUserContext(input.userContext),
                        recipeImplementation: recipeInstance.webJSRecipe,
                    }),
                ];
            });
        });
    };
    Wrapper.getStateAndOtherInfoFromStorage = function (input) {
        return ThirdParty.getInstanceOrThrow().webJSRecipe.getStateAndOtherInfoFromStorage(
            exports.__assign(exports.__assign({}, input), {
                userContext: getNormalisedUserContext(input === null || input === void 0 ? void 0 : input.userContext),
            })
        );
    };
    Wrapper.getAuthorisationURLWithQueryParamsAndSetState = function (input) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [
                    2 /*return*/,
                    ThirdParty.getInstanceOrThrow().webJSRecipe.getAuthorisationURLWithQueryParamsAndSetState(
                        exports.__assign(exports.__assign({}, input), {
                            userContext: getNormalisedUserContext(input.userContext),
                        })
                    ),
                ];
            });
        });
    };
    Wrapper.signInAndUp = function (input) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [
                    2 /*return*/,
                    ThirdParty.getInstanceOrThrow().webJSRecipe.signInAndUp(
                        exports.__assign(exports.__assign({}, input), {
                            userContext: getNormalisedUserContext(
                                input === null || input === void 0 ? void 0 : input.userContext
                            ),
                        })
                    ),
                ];
            });
        });
    };
    /*
     * Providers
     */
    Wrapper.Apple = Apple;
    Wrapper.Bitbucket = Bitbucket;
    Wrapper.Discord = Discord;
    Wrapper.Github = Github;
    Wrapper.Gitlab = Gitlab;
    Wrapper.Google = Google;
    Wrapper.Facebook = Facebook;
    Wrapper.LinkedIn = LinkedIn;
    Wrapper.ActiveDirectory = ActiveDirectory;
    Wrapper.BoxySAML = BoxySAML;
    Wrapper.Okta = Okta;
    Wrapper.ComponentsOverrideProvider = Provider$2;
    return Wrapper;
})();
var init = Wrapper.init;
var signOut = Wrapper.signOut;
var redirectToThirdPartyLogin = Wrapper.redirectToThirdPartyLogin;
var getStateAndOtherInfoFromStorage = Wrapper.getStateAndOtherInfoFromStorage;
var getAuthorisationURLWithQueryParamsAndSetState = Wrapper.getAuthorisationURLWithQueryParamsAndSetState;
var signInAndUp = Wrapper.signInAndUp;
var ThirdpartyComponentsOverrideProvider = Wrapper.ComponentsOverrideProvider;

function normaliseMultitenancyConfig(config) {
    var getTenantID =
        config.getTenantID !== undefined
            ? config.getTenantID
            : function () {
                  return undefined;
              };
    return exports.__assign(exports.__assign({}, normaliseRecipeModuleConfig(config)), {
        getTenantID: getTenantID,
        override: exports.__assign(
            {
                functions: function (originalImplementation) {
                    return originalImplementation;
                },
            },
            config.override
        ),
    });
}
function hasIntersectingRecipes(tenantMethods, recipeList) {
    var _loop_1 = function (key) {
        var hasIntersection = recipeList.some(function (recipe) {
            if (tenantMethods[key].enabled) {
                return recipe.recipeID === key || recipe.recipeID.includes(key);
            }
            return false;
        });
        if (hasIntersection === true) {
            return { value: true };
        }
    };
    for (var key in tenantMethods) {
        var state_1 = _loop_1(key);
        if (typeof state_1 === "object") return state_1.value;
    }
    return false;
}
var mergeProviders = function (_a) {
    var _b = _a.tenantProviders,
        tenantProviders = _b === void 0 ? [] : _b,
        _c = _a.clientProviders,
        clientProviders = _c === void 0 ? [] : _c;
    var builtInProvidersMap = {
        apple: Apple,
        google: Google,
        github: Github,
        activeDirectory: ActiveDirectory,
        bitbucket: Bitbucket,
        "boxy-saml": BoxySAML,
        discord: Discord,
        gitlab: Gitlab,
        linkedin: LinkedIn,
        okta: Okta,
        twitter: Twitter,
        facebook: Facebook,
    };
    var usesDynamicLoginMethods = SuperTokens$1.usesDynamicLoginMethods === true;
    if (
        usesDynamicLoginMethods === false &&
        (clientProviders === null || clientProviders === void 0 ? void 0 : clientProviders.length) === 0
    ) {
        throw new Error("ThirdParty signInAndUpFeature providers array cannot be empty.");
    }
    // If we are not using dynamic login methods or if there is no providers
    // from the core we use frontend initialized providers
    if (usesDynamicLoginMethods === false || tenantProviders.length === 0) {
        return clientProviders.map(function (provider) {
            return {
                id: provider.id,
                buttonComponent: provider.getButton(),
                getButton: provider.getButton,
            };
        });
    }
    var providers = [];
    var _loop_2 = function (tenantProvider) {
        // try finding exact match or client provider that includes tenant id
        var provider = clientProviders.find(function (provider) {
            var id = tenantProvider.id;
            return provider.id === id || provider.id.includes(id);
        });
        // if none found try finding by tenantProvider id prefix match only
        if (provider === undefined) {
            provider = clientProviders.find(function (provider) {
                var id = tenantProvider.id;
                return id.startsWith(provider.id);
            });
        }
        // means provider is initialized on the frontend and found
        if (provider !== undefined) {
            providers.push({
                id: tenantProvider.id,
                buttonComponent: provider.getButton(tenantProvider.name),
                getButton: provider.getButton,
            });
        } else {
            // try to find and initialize provider from all prebuilt providers list
            var providerID = Object.keys(builtInProvidersMap).find(function (id) {
                return tenantProvider.id === id || tenantProvider.id.startsWith(id);
            });
            if (builtInProvidersMap[providerID]) {
                var provider_1 = new builtInProvidersMap[providerID]();
                providers.push({
                    id: tenantProvider.id,
                    buttonComponent: provider_1.getButton(tenantProvider.name),
                    getButton: provider_1.getButton,
                });
            }
        }
    };
    for (var _i = 0, tenantProviders_1 = tenantProviders; _i < tenantProviders_1.length; _i++) {
        var tenantProvider = tenantProviders_1[_i];
        _loop_2(tenantProvider);
    }
    return providers;
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
 * Class.
 */
var Multitenancy = /** @class */ (function (_super) {
    __extends(Multitenancy, _super);
    function Multitenancy(config, webJSRecipe) {
        if (webJSRecipe === void 0) {
            webJSRecipe = MultitenancyWebJS__default.default;
        }
        var _this = _super.call(this, config) || this;
        _this.webJSRecipe = webJSRecipe;
        _this.recipeID = Multitenancy.RECIPE_ID;
        postSuperTokensInitCallbacks.PostSuperTokensInitCallbacks.addPostInitCallback(function () {
            if (SuperTokens$1.usesDynamicLoginMethods === true) {
                void Multitenancy.getInstanceOrThrow().initMultitenancyWithDynamicLoginMethods().catch();
            }
        });
        return _this;
    }
    Multitenancy.prototype.initMultitenancyWithDynamicLoginMethods = function () {
        return __awaiter(this, void 0, void 0, function () {
            var tenantID, tenantMethods;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        tenantID = Multitenancy.getInstanceOrThrow().config.getTenantID();
                        return [4 /*yield*/, Multitenancy.getDynamicLoginMethods({ tenantId: tenantID })];
                    case 1:
                        tenantMethods = _a.sent();
                        this.hasIntersection = hasIntersectingRecipes(
                            tenantMethods,
                            SuperTokens$1.getInstanceOrThrow().recipeList
                        );
                        SuperTokens$1.uiController.emit("LoginMethodsLoaded");
                        return [2 /*return*/];
                }
            });
        });
    };
    Multitenancy.prototype.getLoadedDynamicLoginMethods = function () {
        if (this.hasIntersection === false) {
            throw new Error("Initialized recipes have no overlap with core recipes");
        }
        return this.dynamicLoginMethods;
    };
    Multitenancy.getDynamicLoginMethods = function () {
        var options = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            options[_i] = arguments[_i];
        }
        return __awaiter(this, void 0, void 0, function () {
            var instance, _a, emailPassword, passwordless, thirdParty;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        instance = Multitenancy.getInstanceOrThrow();
                        if (instance.dynamicLoginMethods !== undefined) {
                            return [2 /*return*/, instance.dynamicLoginMethods];
                        }
                        return [
                            4 /*yield*/,
                            MultitenancyWebJS__default.default.getLoginMethods.apply(
                                MultitenancyWebJS__default.default,
                                options
                            ),
                        ];
                    case 1:
                        (_a = _b.sent()),
                            (emailPassword = _a.emailPassword),
                            (passwordless = _a.passwordless),
                            (thirdParty = _a.thirdParty);
                        instance.dynamicLoginMethods = {
                            passwordless: exports.__assign(exports.__assign({}, passwordless), { enabled: false }),
                            emailpassword: exports.__assign(exports.__assign({}, emailPassword), { enabled: true }),
                            thirdparty: exports.__assign(exports.__assign({}, thirdParty), { enabled: true }),
                        };
                        return [2 /*return*/, instance.dynamicLoginMethods];
                }
            });
        });
    };
    Multitenancy.init = function (config) {
        var normalisedConfig = normaliseMultitenancyConfig(config);
        return {
            recipeID: Multitenancy.RECIPE_ID,
            authReact: function (appInfo) {
                Multitenancy.instance = new Multitenancy(
                    exports.__assign(exports.__assign({}, normalisedConfig), {
                        appInfo: appInfo,
                        recipeId: Multitenancy.RECIPE_ID,
                    })
                );
                return Multitenancy.instance;
            },
            webJS: MultitenancyWebJS__default.default.init(exports.__assign({}, normalisedConfig)),
        };
    };
    Multitenancy.getInstanceOrThrow = function () {
        if (Multitenancy.instance === undefined) {
            var error =
                "No instance of Multitenancy found. Make sure to call the Multitenancy.init method." +
                "See https://supertokens.io/docs/multitenancy/quick-setup/frontend";
            // eslint-disable-next-line supertokens-auth-react/no-direct-window-object
            if (typeof window === "undefined") {
                error = error + SSR_ERROR;
            }
            throw Error(error);
        }
        return Multitenancy.instance;
    };
    /*
     * Tests methods.
     */
    Multitenancy.reset = function () {
        if (!isTest()) {
            return;
        }
        Multitenancy.instance = undefined;
        return;
    };
    Multitenancy.RECIPE_ID = "multitenancy";
    return Multitenancy;
})(RecipeModule);

var UIController = /** @class */ (function () {
    function UIController() {
        this.handlers = new Map();
    }
    UIController.prototype.emit = function (event, detail) {
        var handlerList = this.handlers.get(event) || [];
        for (var _i = 0, handlerList_1 = handlerList; _i < handlerList_1.length; _i++) {
            var h = handlerList_1[_i];
            h(event, detail);
        }
    };
    UIController.prototype.on = function (event, handler) {
        var handlerList = this.handlers.get(event) || [];
        this.handlers.set(event, handlerList.concat(handler));
    };
    UIController.prototype.off = function (event, handler) {
        var handlerList = this.handlers.get(event) || [];
        this.handlers.set(
            event,
            handlerList.filter(function (h) {
                return h !== handler;
            })
        );
    };
    return UIController;
})();

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
var SuperTokens = /** @class */ (function () {
    /*
     * Constructor.
     */
    function SuperTokens(config) {
        var _this = this;
        this.recipeList = [];
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
        this.recipeList = config.recipeList.map(function (_a) {
            var authReact = _a.authReact;
            return authReact(_this.appInfo, enableDebugLogs);
        });
    }
    /*
     * Static Methods.
     */
    SuperTokens.init = function (config) {
        var _a;
        cookieHandler.CookieHandlerReference.init(config.cookieHandler);
        windowHandler.WindowHandlerReference.init(config.windowHandler);
        if (SuperTokens.instance !== undefined) {
            console.warn("SuperTokens was already initialized");
            return;
        }
        SuperTokens.usesDynamicLoginMethods =
            (_a = config.usesDynamicLoginMethods) !== null && _a !== void 0 ? _a : false;
        var recipes =
            config.recipeList.find(function (recipe) {
                return recipe.recipeID === Multitenancy.RECIPE_ID;
            }) !== undefined
                ? config.recipeList
                : config.recipeList.concat(Multitenancy.init({}));
        SuperTokensWebJS__default.default.init(
            exports.__assign(exports.__assign({}, config), {
                recipeList: recipes.map(function (_a) {
                    var webJS = _a.webJS;
                    return webJS;
                }),
            })
        );
        SuperTokens.instance = new SuperTokens(exports.__assign(exports.__assign({}, config), { recipeList: recipes }));
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
    SuperTokens.usesDynamicLoginMethods = false;
    SuperTokens.uiController = new UIController();
    return SuperTokens;
})();
var SuperTokens$1 = SuperTokens;

exports.AccessDeniedScreen = AccessDeniedScreen;
exports.AccessDeniedTheme = AccessDeniedTheme;
exports.ActiveDirectory = ActiveDirectory;
exports.Apple = Apple;
exports.ArrowLeftIcon = ArrowLeftIcon;
exports.AuthRecipe = AuthRecipe;
exports.Bitbucket = Bitbucket;
exports.BoxySAML = BoxySAML;
exports.ComponentOverrideContext = ComponentOverrideContext;
exports.Discord = Discord;
exports.Facebook = Facebook;
exports.FeatureWrapper = FeatureWrapper;
exports.Github = Github;
exports.Gitlab = Gitlab;
exports.Google = Google;
exports.LinkedIn = LinkedIn;
exports.Multitenancy = Multitenancy;
exports.Okta = Okta;
exports.Provider = Provider;
exports.RecipeModule = RecipeModule;
exports.RecipeRouter = RecipeRouter;
exports.SSR_ERROR = SSR_ERROR;
exports.ST_ROOT_ID = ST_ROOT_ID;
exports.Session = Session;
exports.SuperTokens = SuperTokens$1;
exports.ThirdParty = ThirdParty;
exports.ThirdpartyComponentsOverrideProvider = ThirdpartyComponentsOverrideProvider;
exports.Twitter = Twitter;
exports.UI = UI;
exports.UserContextContext = UserContextContext;
exports.UserContextWrapper = UserContextWrapper;
exports.Wrapper = Wrapper;
exports.__awaiter = __awaiter;
exports.__extends = __extends;
exports.__generator = __generator;
exports.__rest = __rest;
exports.__spreadArray = __spreadArray;
exports.canHandleRoute = canHandleRoute;
exports.clearErrorQueryParam = clearErrorQueryParam;
exports.clearQueryParams = clearQueryParams;
exports.createGenericComponentsOverrideContext = createGenericComponentsOverrideContext;
exports.defaultTranslationsCommon = defaultTranslationsCommon;
exports.getAuthorisationURLWithQueryParamsAndSetState = getAuthorisationURLWithQueryParamsAndSetState;
exports.getFailureRedirectionInfo = getFailureRedirectionInfo;
exports.getNormalisedUserContext = getNormalisedUserContext;
exports.getQueryParams = getQueryParams;
exports.getRedirectToPathFromURL = getRedirectToPathFromURL;
exports.getRoutingComponent = getRoutingComponent;
exports.getStateAndOtherInfoFromStorage = getStateAndOtherInfoFromStorage;
exports.getSuperTokensRoutesForReactRouterDom = getSuperTokensRoutesForReactRouterDom;
exports.getURLHash = getURLHash;
exports.hasFontDefined = hasFontDefined;
exports.init = init;
exports.isTest = isTest;
exports.matchRecipeIdUsingQueryParams = matchRecipeIdUsingQueryParams;
exports.matchRecipeIdUsingState = matchRecipeIdUsingState;
exports.mergeProviders = mergeProviders;
exports.normaliseAuthRecipe = normaliseAuthRecipe;
exports.normaliseRecipeModuleConfig = normaliseRecipeModuleConfig;
exports.normaliseThirdPartyConfig = normaliseThirdPartyConfig;
exports.redirectToThirdPartyLogin = redirectToThirdPartyLogin$1;
exports.redirectToThirdPartyLogin$1 = redirectToThirdPartyLogin;
exports.signInAndUp = signInAndUp;
exports.signOut = signOut;
exports.useContext = useContext;
exports.useContext$1 = useContext$1;
exports.useOnMountAPICall = useOnMountAPICall;
exports.useTranslation = useTranslation;
exports.useUserContext = useUserContext;
exports.validateForm = validateForm;
exports.withOverride = withOverride;
//# sourceMappingURL=superTokens.js.map
