"use strict";
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
var __assign =
    (this && this.__assign) ||
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
var __awaiter =
    (this && this.__awaiter) ||
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
    (this && this.__generator) ||
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
var __importDefault =
    (this && this.__importDefault) ||
    function (mod) {
        return mod && mod.__esModule ? mod : { default: mod };
    };
Object.defineProperty(exports, "__esModule", { value: true });
exports.popInvalidClaimRedirectPathFromContext =
    exports.saveInvalidClaimRedirectPathInContext =
    exports.useOnMountAPICall =
    exports.getNormalisedUserContext =
    exports.setFrontendCookie =
    exports.getCookieValue =
    exports.getDefaultCookieScope =
    exports.normaliseCookieScopeOrThrowError =
    exports.mergeObjects =
    exports.removeFromLocalStorage =
    exports.setLocalStorage =
    exports.getLocalStorage =
    exports.getOriginOfPage =
    exports.isIE =
    exports.redirectWithHistory =
    exports.redirectWithFullPageReload =
    exports.matchRecipeIdUsingQueryParams =
    exports.appendQueryParamsToURL =
    exports.getCurrentNormalisedUrlPath =
    exports.validateForm =
    exports.normaliseInputAppInfoOrThrowError =
    exports.isTest =
    exports.getRedirectToPathFromURL =
    exports.getURLHash =
    exports.getQueryParams =
    exports.clearErrorQueryParam =
    exports.clearQueryParams =
    exports.getRecipeIdFromSearch =
        void 0;
var react_1 = require("react");
var constants_1 = require("./constants");
var cookieHandler_1 = require("supertokens-website/utils/cookieHandler");
var normalisedURLDomain_1 = __importDefault(require("supertokens-web-js/utils/normalisedURLDomain"));
var normalisedURLPath_1 = __importDefault(require("supertokens-web-js/utils/normalisedURLPath"));
var windowHandler_1 = require("supertokens-website/utils/windowHandler");
/*
 * getRecipeIdFromPath
 * Input:
 * Output: The "rid" query param if present, null otherwise.
 */
function getRecipeIdFromSearch(search) {
    var urlParams = new URLSearchParams(search);
    return urlParams.get(constants_1.RECIPE_ID_QUERY_PARAM);
}
exports.getRecipeIdFromSearch = getRecipeIdFromSearch;
function clearQueryParams(paramNames) {
    var newURL = new URL(windowHandler_1.WindowHandlerReference.getReferenceOrThrow().windowHandler.location.getHref());
    for (var _i = 0, paramNames_1 = paramNames; _i < paramNames_1.length; _i++) {
        var param = paramNames_1[_i];
        newURL.searchParams.delete(param);
    }
    windowHandler_1.WindowHandlerReference.getReferenceOrThrow().windowHandler.history.replaceState(
        windowHandler_1.WindowHandlerReference.getReferenceOrThrow().windowHandler.history.getState(),
        "",
        windowHandler_1.WindowHandlerReference.getReferenceOrThrow().windowHandler.location.getHref()
    );
}
exports.clearQueryParams = clearQueryParams;
function clearErrorQueryParam() {
    clearQueryParams(["error", "message"]);
}
exports.clearErrorQueryParam = clearErrorQueryParam;
function getQueryParams(param) {
    var urlParams = new URLSearchParams(
        windowHandler_1.WindowHandlerReference.getReferenceOrThrow().windowHandler.location.getSearch()
    );
    return urlParams.get(param);
}
exports.getQueryParams = getQueryParams;
function getURLHash() {
    // By default it is returined with the "#" at the beginning, we cut that off here.
    return windowHandler_1.WindowHandlerReference.getReferenceOrThrow().windowHandler.location.getHash().substr(1);
}
exports.getURLHash = getURLHash;
function getRedirectToPathFromURL() {
    var param = getQueryParams("redirectToPath");
    if (param === null) {
        return undefined;
    } else {
        // Prevent Open redirects by normalising path.
        try {
            return new normalisedURLPath_1.default(param).getAsStringDangerous();
        } catch (_a) {
            return undefined;
        }
    }
}
exports.getRedirectToPathFromURL = getRedirectToPathFromURL;
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
exports.isTest = isTest;
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
    var apiGatewayPath = new normalisedURLPath_1.default("");
    if (appInfo.apiGatewayPath !== undefined) {
        apiGatewayPath = new normalisedURLPath_1.default(appInfo.apiGatewayPath);
    }
    return {
        appName: appInfo.appName,
        apiDomain: new normalisedURLDomain_1.default(appInfo.apiDomain),
        websiteDomain: new normalisedURLDomain_1.default(appInfo.websiteDomain),
        apiBasePath: apiGatewayPath.appendPath(
            getNormalisedURLPathOrDefault(constants_1.DEFAULT_API_BASE_PATH, appInfo.apiBasePath)
        ),
        websiteBasePath: getNormalisedURLPathOrDefault(constants_1.DEFAULT_WEBSITE_BASE_PATH, appInfo.websiteBasePath),
    };
}
exports.normaliseInputAppInfoOrThrowError = normaliseInputAppInfoOrThrowError;
function getNormalisedURLPathOrDefault(defaultPath, path) {
    if (path !== undefined) {
        return new normalisedURLPath_1.default(path);
    } else {
        return new normalisedURLPath_1.default(defaultPath);
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
exports.validateForm = validateForm;
/*
 * getCurrentNormalisedUrlPath
 */
function getCurrentNormalisedUrlPath() {
    return new normalisedURLPath_1.default(
        windowHandler_1.WindowHandlerReference.getReferenceOrThrow().windowHandler.location.getPathName()
    );
}
exports.getCurrentNormalisedUrlPath = getCurrentNormalisedUrlPath;
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
exports.appendQueryParamsToURL = appendQueryParamsToURL;
/*
 * Default method for matching recipe route based on query params.
 */
function matchRecipeIdUsingQueryParams(recipeId) {
    return function () {
        var recipeIdFromSearch = getRecipeIdFromSearch(
            windowHandler_1.WindowHandlerReference.getReferenceOrThrow().windowHandler.location.getSearch()
        );
        return recipeIdFromSearch === recipeId;
    };
}
exports.matchRecipeIdUsingQueryParams = matchRecipeIdUsingQueryParams;
function redirectWithFullPageReload(to) {
    if (to.trim() === "") {
        to = "/";
    }
    windowHandler_1.WindowHandlerReference.getReferenceOrThrow().windowHandler.location.setHref(to);
}
exports.redirectWithFullPageReload = redirectWithFullPageReload;
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
exports.redirectWithHistory = redirectWithHistory;
function isIE() {
    return (
        windowHandler_1.WindowHandlerReference.getReferenceOrThrow().windowHandler.getDocument().documentMode !==
        undefined
    );
}
exports.isIE = isIE;
function getOriginOfPage() {
    return new normalisedURLDomain_1.default(
        windowHandler_1.WindowHandlerReference.getReferenceOrThrow().windowHandler.location.getOrigin()
    );
}
exports.getOriginOfPage = getOriginOfPage;
function getLocalStorage(key) {
    return __awaiter(this, void 0, void 0, function () {
        var res;
        return __generator(this, function (_a) {
            res = windowHandler_1.WindowHandlerReference.getReferenceOrThrow().windowHandler.localStorage.getItem(key);
            if (res === null || res === undefined) {
                return [2 /*return*/, null];
            }
            return [2 /*return*/, res];
        });
    });
}
exports.getLocalStorage = getLocalStorage;
function setLocalStorage(key, value) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    return [
                        4 /*yield*/,
                        windowHandler_1.WindowHandlerReference.getReferenceOrThrow().windowHandler.localStorage.setItem(
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
exports.setLocalStorage = setLocalStorage;
function removeFromLocalStorage(key) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    return [
                        4 /*yield*/,
                        windowHandler_1.WindowHandlerReference.getReferenceOrThrow().windowHandler.localStorage.removeItem(
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
exports.removeFromLocalStorage = removeFromLocalStorage;
function mergeObjects(obj1, obj2) {
    var res = __assign({}, obj1);
    for (var key in obj2) {
        if (typeof res[key] === "object" && typeof obj2[key] === "object") {
            res[key] = mergeObjects(res[key], obj2[key]);
        } else {
            res[key] = obj2[key];
        }
    }
    return res;
}
exports.mergeObjects = mergeObjects;
function normaliseCookieScopeOrThrowError(cookieScope) {
    function helper(sessionScope) {
        sessionScope = sessionScope.trim().toLowerCase();
        // first we convert it to a URL so that we can use the URL class
        if (sessionScope.startsWith(".")) {
            sessionScope = sessionScope.substr(1);
        }
        if (!sessionScope.startsWith("http://") && !sessionScope.startsWith("https://")) {
            sessionScope = "http://" + sessionScope;
        }
        try {
            var urlObj = new URL(sessionScope);
            sessionScope = urlObj.hostname;
            // remove leading dot
            if (sessionScope.startsWith(".")) {
                sessionScope = sessionScope.substr(1);
            }
            return sessionScope;
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
exports.normaliseCookieScopeOrThrowError = normaliseCookieScopeOrThrowError;
function getDefaultCookieScope() {
    try {
        return normaliseCookieScopeOrThrowError(
            windowHandler_1.WindowHandlerReference.getReferenceOrThrow().windowHandler.location.getHostName()
        );
    } catch (_a) {
        return undefined;
    }
}
exports.getDefaultCookieScope = getDefaultCookieScope;
function getCookieValue(name) {
    return __awaiter(this, void 0, void 0, function () {
        var value, _a, parts, last, temp;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _a = "; ";
                    return [
                        4 /*yield*/,
                        cookieHandler_1.CookieHandlerReference.getReferenceOrThrow().cookieHandler.getCookie(),
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
exports.getCookieValue = getCookieValue;
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
                                windowHandler_1.WindowHandlerReference.getReferenceOrThrow().windowHandler.location.getHostName() ||
                            scope === undefined
                        )
                    )
                        return [3 /*break*/, 5];
                    if (!(expires !== undefined)) return [3 /*break*/, 2];
                    return [
                        4 /*yield*/,
                        cookieHandler_1.CookieHandlerReference.getReferenceOrThrow().cookieHandler.setCookie(
                            "".concat(name, "=").concat(cookieVal, ";expires=").concat(expires, ";path=/;samesite=lax")
                        ),
                    ];
                case 1:
                    _a.sent();
                    return [3 /*break*/, 4];
                case 2:
                    return [
                        4 /*yield*/,
                        cookieHandler_1.CookieHandlerReference.getReferenceOrThrow().cookieHandler.setCookie(
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
                        cookieHandler_1.CookieHandlerReference.getReferenceOrThrow().cookieHandler.setCookie(
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
                        cookieHandler_1.CookieHandlerReference.getReferenceOrThrow().cookieHandler.setCookie(
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
exports.setFrontendCookie = setFrontendCookie;
function getNormalisedUserContext(userContext) {
    return userContext === undefined ? {} : userContext;
}
exports.getNormalisedUserContext = getNormalisedUserContext;
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
    var consumeReq = (0, react_1.useRef)();
    var _a = (0, react_1.useState)(undefined),
        error = _a[0],
        setError = _a[1];
    (0, react_1.useEffect)(
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
exports.useOnMountAPICall = useOnMountAPICall;
function saveInvalidClaimRedirectPathInContext(userContext, invalidClaimRedirectPath) {
    if (userContext["_default"] === undefined) {
        userContext["_default"] = {};
    }
    if (userContext["_default"].redirectPath === undefined) {
        userContext["_default"] = __assign(__assign({}, userContext["_default"]), {
            invalidClaimRedirectPath: invalidClaimRedirectPath,
        });
    }
}
exports.saveInvalidClaimRedirectPathInContext = saveInvalidClaimRedirectPathInContext;
function popInvalidClaimRedirectPathFromContext(userContext) {
    var _a;
    var res = (_a = userContext["_default"]) === null || _a === void 0 ? void 0 : _a.invalidClaimRedirectPath;
    if (res !== undefined) {
        delete userContext["_default"].invalidClaimRedirectPath;
    }
    return res;
}
exports.popInvalidClaimRedirectPathFromContext = popInvalidClaimRedirectPathFromContext;
