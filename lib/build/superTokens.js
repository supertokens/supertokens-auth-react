"use strict";

var SuperTokensWebJS = require("supertokens-web-js");
var cookieHandler = require("supertokens-web-js/utils/cookieHandler");
var postSuperTokensInitCallbacks = require("supertokens-web-js/utils/postSuperTokensInitCallbacks");
var windowHandler = require("supertokens-web-js/utils/windowHandler");
var MultitenancyWebJS = require("supertokens-web-js/recipe/multitenancy");
var React = require("react");
var NormalisedURLDomain = require("supertokens-web-js/utils/normalisedURLDomain");
var NormalisedURLPath = require("supertokens-web-js/utils/normalisedURLPath");
var ThirdpartyWebJS = require("supertokens-web-js/recipe/thirdparty");
var WebJSSessionRecipe = require("supertokens-web-js/recipe/session");
var jsxRuntime = require("react/jsx-runtime");

function _interopDefault(e) {
    return e && e.__esModule ? e : { default: e };
}

var SuperTokensWebJS__default = /*#__PURE__*/ _interopDefault(SuperTokensWebJS);
var MultitenancyWebJS__default = /*#__PURE__*/ _interopDefault(MultitenancyWebJS);
var React__default = /*#__PURE__*/ _interopDefault(React);
var NormalisedURLDomain__default = /*#__PURE__*/ _interopDefault(NormalisedURLDomain);
var NormalisedURLPath__default = /*#__PURE__*/ _interopDefault(NormalisedURLPath);
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
function popInvalidClaimRedirectPathFromContext(userContext) {
    var _a;
    var res = (_a = userContext["_default"]) === null || _a === void 0 ? void 0 : _a.invalidClaimRedirectPath;
    if (res !== undefined) {
        delete userContext["_default"].invalidClaimRedirectPath;
    }
    return res;
}
function getHasRecipesIntersection(tenantMethods, recipeList) {
    var hasIntersection = false;
    var key;
    for (key in tenantMethods) {
        hasIntersection = recipeList.some(function (recipe) {
            if (tenantMethods[key].enabled) {
                return recipe.recipeID === key || recipe.recipeID.includes(key);
            }
            return false;
        });
    }
    return hasIntersection;
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

function normaliseMultitenancyConfig(config) {
    return exports.__assign(exports.__assign({}, normaliseAuthRecipe(config)), {
        getTenantID: config.getTenantID,
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
        return _this;
    }
    Multitenancy.getDynamicLoginMethods = function () {
        var options = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            options[_i] = arguments[_i];
        }
        return __awaiter(this, void 0, void 0, function () {
            var _a, emailPassword, passwordless, thirdParty;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (Multitenancy.dynamicLoginMethods !== undefined) {
                            return [2 /*return*/, Multitenancy.dynamicLoginMethods];
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
                        Multitenancy.dynamicLoginMethods = {
                            passwordless: passwordless,
                            emailpassword: emailPassword,
                            thirdparty: exports.__assign(exports.__assign({}, thirdParty), {
                                enabled: true,
                                providers: [
                                    {
                                        id: "google",
                                        name: "Im Google",
                                    },
                                    {
                                        id: "google-1",
                                        name: "Im another Google",
                                    },
                                ],
                            }),
                        };
                        return [2 /*return*/, Multitenancy.dynamicLoginMethods];
                }
            });
        });
    };
    Multitenancy.init = function (config) {
        var normalisedConfig = normaliseMultitenancyConfig(config);
        return {
            recipeID: Multitenancy.RECIPE_ID,
            authReact: function (
                appInfo,
                // eslint-disable-next-line @typescript-eslint/no-unused-vars
                _
            ) {
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
                "See https://supertokens.io/docs/multitenancy/quick-setup/frontend"; // TODO check if page exists in docs
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
    function Session(config, webJSRecipe) {
        if (webJSRecipe === void 0) {
            webJSRecipe = WebJSSessionRecipe__default.default;
        }
        var _this = _super.call(this, config) || this;
        _this.webJSRecipe = webJSRecipe;
        _this.recipeID = Session.RECIPE_ID;
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
        var normalisedConfig = normaliseRecipeModuleConfig(config);
        return {
            recipeID: Session.RECIPE_ID,
            authReact: function (appInfo, enableDebugLogs) {
                Session.instance = new Session(
                    exports.__assign(exports.__assign({}, normalisedConfig), {
                        appInfo: appInfo,
                        recipeId: Session.RECIPE_ID,
                        enableDebugLogs: enableDebugLogs,
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
var Provider = /** @class */ (function () {
    /*
     * Constructor.
     */
    function Provider(config) {
        var _this = this;
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
            displayName: this.name,
        });
    };
    Provider.prototype.defaultGetFrontendRedirectURI = function () {
        var domain = SuperTokens.getInstanceOrThrow().appInfo.websiteDomain.getAsStringDangerous();
        var callbackPath = new NormalisedURLPath__default.default("/callback/".concat(this.id));
        var path = SuperTokens.getInstanceOrThrow()
            .appInfo.websiteBasePath.appendPath(callbackPath)
            .getAsStringDangerous();
        return "".concat(domain).concat(path);
    };
    Provider.prototype.getRedirectURIOnProviderDashboard = function () {
        return undefined;
    };
    Provider.prototype.setId = function (id) {
        this.id = id;
    };
    Provider.prototype.setName = function (name) {
        this.name = name;
    };
    return Provider;
})();

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
        _this.getButton = function () {
            if (_this.buttonComponent !== undefined) {
                if (typeof _this.buttonComponent === "function") {
                    return jsxRuntime.jsx(_this.buttonComponent, { name: _this.name });
                }
                return _this.buttonComponent;
            }
            return _this.getDefaultButton("Custom");
        };
        _this.getLogo = function () {
            return undefined;
        };
        _this.buttonComponent = config.buttonComponent;
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
})(Provider);

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
    if (config.providers.length === 0) {
        throw new Error("ThirdParty signInAndUpFeature providers array cannot be empty.");
    }
    var disableDefaultUI = config.disableDefaultUI === true;
    var style = config.style !== undefined ? config.style : "";
    var privacyPolicyLink = config.privacyPolicyLink;
    var termsOfServiceLink = config.termsOfServiceLink;
    /*
     * Convert custom configs to custom providers.
     */
    var providersWithCustom = config.providers.map(function (provider) {
        if (provider instanceof Provider) {
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
function redirectToThirdPartyLogin(input) {
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
        var _this = _super.call(this, config) || this;
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
            authReact: function (
                appInfo,
                // eslint-disable-next-line @typescript-eslint/no-unused-vars
                _
            ) {
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
        this.usesDynamicLoginMethods = false;
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
        this.usesDynamicLoginMethods =
            config.usesDynamicLoginMethods === undefined ? false : config.usesDynamicLoginMethods;
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
        return __awaiter(this, void 0, void 0, function () {
            var multitenancyRecipe,
                appInfo,
                enableDebugLogs,
                multitenancyInstance,
                tenantID,
                tenantMethods,
                hasIntersection;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        cookieHandler.CookieHandlerReference.init(config.cookieHandler);
                        windowHandler.WindowHandlerReference.init(config.windowHandler);
                        if (SuperTokens.instance !== undefined) {
                            console.warn("SuperTokens was already initialized");
                            return [2 /*return*/];
                        }
                        multitenancyRecipe =
                            (_a = config.recipeList.find(function (_a) {
                                var recipeID = _a.recipeID;
                                return recipeID === Multitenancy.RECIPE_ID;
                            })) !== null && _a !== void 0
                                ? _a
                                : Multitenancy.init({});
                        SuperTokens.usesDynamicLoginMethods = config.usesDynamicLoginMethods === true;
                        SuperTokensWebJS__default.default.init(
                            exports.__assign(exports.__assign({}, config), {
                                recipeList: config.recipeList.map(function (_a) {
                                    var webJS = _a.webJS;
                                    return webJS;
                                }),
                            })
                        );
                        SuperTokens.instance = new SuperTokens(config);
                        if (!SuperTokens.usesDynamicLoginMethods) return [3 /*break*/, 2];
                        appInfo = normaliseInputAppInfoOrThrowError(config.appInfo);
                        enableDebugLogs = config.enableDebugLogs === true;
                        multitenancyInstance = multitenancyRecipe.authReact(appInfo, enableDebugLogs);
                        multitenancyRecipe.webJS(appInfo, config.clientType, enableDebugLogs);
                        tenantID = multitenancyInstance.config.getTenantID();
                        return [4 /*yield*/, Multitenancy.getDynamicLoginMethods({ tenantId: tenantID })];
                    case 1:
                        tenantMethods = _b.sent();
                        hasIntersection = getHasRecipesIntersection(
                            tenantMethods,
                            SuperTokens.getInstanceOrThrow().recipeList
                        );
                        if (hasIntersection === false) {
                            throw new Error("Initialized recipes have no overlap with core recipes");
                        }
                        if (tenantMethods.thirdparty.enabled === true) {
                            ThirdParty.tenantProviders = tenantMethods.thirdparty.providers;
                        }
                        SuperTokens.uiController.emit("LoginMethodsLoaded");
                        _b.label = 2;
                    case 2:
                        postSuperTokensInitCallbacks.PostSuperTokensInitCallbacks.runPostInitCallbacks();
                        return [2 /*return*/];
                }
            });
        });
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

exports.AuthRecipe = AuthRecipe;
exports.Multitenancy = Multitenancy;
exports.Provider = Provider;
exports.RecipeModule = RecipeModule;
exports.SSR_ERROR = SSR_ERROR;
exports.ST_ROOT_ID = ST_ROOT_ID;
exports.Session = Session;
exports.SuperTokens = SuperTokens;
exports.ThirdParty = ThirdParty;
exports.TranslationContextProvider = TranslationContextProvider;
exports.__awaiter = __awaiter;
exports.__extends = __extends;
exports.__generator = __generator;
exports.__rest = __rest;
exports.__spreadArray = __spreadArray;
exports.clearErrorQueryParam = clearErrorQueryParam;
exports.clearQueryParams = clearQueryParams;
exports.getCurrentNormalisedUrlPath = getCurrentNormalisedUrlPath;
exports.getNormalisedUserContext = getNormalisedUserContext;
exports.getQueryParams = getQueryParams;
exports.getRedirectToPathFromURL = getRedirectToPathFromURL;
exports.getURLHash = getURLHash;
exports.isTest = isTest;
exports.matchRecipeIdUsingQueryParams = matchRecipeIdUsingQueryParams;
exports.matchRecipeIdUsingState = matchRecipeIdUsingState;
exports.mergeObjects = mergeObjects;
exports.normaliseAuthRecipe = normaliseAuthRecipe;
exports.normaliseRecipeModuleConfig = normaliseRecipeModuleConfig;
exports.normaliseThirdPartyConfig = normaliseThirdPartyConfig;
exports.popInvalidClaimRedirectPathFromContext = popInvalidClaimRedirectPathFromContext;
exports.redirectToThirdPartyLogin = redirectToThirdPartyLogin;
exports.useOnMountAPICall = useOnMountAPICall;
exports.useTranslation = useTranslation;
exports.validateForm = validateForm;
//# sourceMappingURL=superTokens.js.map
