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
var constants_1 = require("../constants");
var cookieHandler_1 = __importDefault(require("../utils/cookieHandler"));
var normalisedURLDomain_1 = __importDefault(require("../normalisedURLDomain"));
var normalisedURLPath_1 = __importDefault(require("../normalisedURLPath"));
var windowHandler_1 = __importDefault(require("../utils/windowHandler"));
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
function clearErrorQueryParam() {
    var newURL = new URL(windowHandler_1.default.getReferenceOrThrow().windowHandler.location.getHref());
    newURL.searchParams.delete("error");
    newURL.searchParams.delete("message");
    windowHandler_1.default
        .getReferenceOrThrow()
        .windowHandler.history.replaceState(
            windowHandler_1.default.getReferenceOrThrow().windowHandler.history.getState(),
            "",
            windowHandler_1.default.getReferenceOrThrow().windowHandler.location.getHref()
        );
}
exports.clearErrorQueryParam = clearErrorQueryParam;
function getQueryParams(param) {
    var urlParams = new URLSearchParams(
        windowHandler_1.default.getReferenceOrThrow().windowHandler.location.getSearch()
    );
    return urlParams.get(param);
}
exports.getQueryParams = getQueryParams;
function getURLHash() {
    // By default it is returined with the "#" at the beginning, we cut that off here.
    return windowHandler_1.default.getReferenceOrThrow().windowHandler.location.getHash().substr(1);
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
                        return __generator(this, function (_a) {
                            switch (_a.label) {
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
                                    error = _a.sent();
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
        windowHandler_1.default.getReferenceOrThrow().windowHandler.location.getPathName()
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
        var url_2 = new URL("" + fakeDomain + stringUrl);
        Object.entries(queryParams).forEach(function (_a) {
            var key = _a[0],
                value = _a[1];
            url_2.searchParams.set(key, value);
        });
        return "" + url_2.pathname + url_2.search;
    }
}
exports.appendQueryParamsToURL = appendQueryParamsToURL;
/*
 * Default method for matching recipe route based on query params.
 */
function matchRecipeIdUsingQueryParams(recipeId) {
    return function () {
        var recipeIdFromSearch = getRecipeIdFromSearch(
            windowHandler_1.default.getReferenceOrThrow().windowHandler.location.getSearch()
        );
        return recipeIdFromSearch === recipeId;
    };
}
exports.matchRecipeIdUsingQueryParams = matchRecipeIdUsingQueryParams;
function redirectWithFullPageReload(to) {
    if (to.trim() === "") {
        to = "/";
    }
    windowHandler_1.default.getReferenceOrThrow().windowHandler.location.setHref(to);
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
    return windowHandler_1.default.getReferenceOrThrow().windowHandler.getDocument().documentMode !== undefined;
}
exports.isIE = isIE;
function setSessionStorage(key, value) {
    windowHandler_1.default.getReferenceOrThrow().windowHandler.getSessionStorage().setItem(key, value);
}
exports.setSessionStorage = setSessionStorage;
function getSessionStorage(key) {
    return windowHandler_1.default.getReferenceOrThrow().windowHandler.getSessionStorage().getItem(key);
}
exports.getSessionStorage = getSessionStorage;
function getOriginOfPage() {
    return new normalisedURLDomain_1.default(
        windowHandler_1.default.getReferenceOrThrow().windowHandler.location.getOrigin()
    );
}
exports.getOriginOfPage = getOriginOfPage;
function getLocalStorage(key) {
    var res = windowHandler_1.default.getReferenceOrThrow().windowHandler.getLocalStorage().getItem(key);
    if (res === null || res === undefined) {
        return null;
    }
    return res;
}
exports.getLocalStorage = getLocalStorage;
function setLocalStorage(key, value) {
    windowHandler_1.default.getReferenceOrThrow().windowHandler.getLocalStorage().setItem(key, value);
}
exports.setLocalStorage = setLocalStorage;
function removeFromLocalStorage(key) {
    windowHandler_1.default.getReferenceOrThrow().windowHandler.getLocalStorage().removeItem(key);
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
            windowHandler_1.default.getReferenceOrThrow().windowHandler.location.getHostName()
        );
    } catch (_a) {
        return undefined;
    }
}
exports.getDefaultCookieScope = getDefaultCookieScope;
function getCookieValue(name) {
    var value = "; " + cookieHandler_1.default.getReferenceOrThrow().cookieHandler.getCookieSync();
    var parts = value.split("; " + name + "=");
    if (parts.length >= 2) {
        var last = parts.pop();
        if (last !== undefined) {
            var temp = last.split(";").shift();
            if (temp === undefined) {
                return null;
            }
            return temp;
        }
    }
    return null;
}
exports.getCookieValue = getCookieValue;
// undefined value will remove the cookie
function setFrontendCookie(name, value, scope) {
    var expires = "Thu, 01 Jan 1970 00:00:01 GMT";
    var cookieVal = "";
    if (value !== undefined) {
        cookieVal = value;
        expires = undefined; // set cookie without expiry
    }
    if (
        scope === "localhost" ||
        scope === windowHandler_1.default.getReferenceOrThrow().windowHandler.location.getHostName() ||
        scope === undefined
    ) {
        // since some browsers ignore cookies with domain set to localhost
        // see https://github.com/supertokens/supertokens-website/issues/25
        if (expires !== undefined) {
            cookieHandler_1.default
                .getReferenceOrThrow()
                .cookieHandler.setCookieSync(name + "=" + cookieVal + ";expires=" + expires + ";path=/;samesite=lax");
        } else {
            cookieHandler_1.default
                .getReferenceOrThrow()
                .cookieHandler.setCookieSync(
                    name + "=" + cookieVal + ";expires=Fri, 31 Dec 9999 23:59:59 GMT;path=/;samesite=lax"
                );
        }
    } else {
        if (expires !== undefined) {
            cookieHandler_1.default
                .getReferenceOrThrow()
                .cookieHandler.setCookieSync(
                    name + "=" + cookieVal + ";expires=" + expires + ";domain=" + scope + ";path=/;samesite=lax"
                );
        } else {
            cookieHandler_1.default
                .getReferenceOrThrow()
                .cookieHandler.setCookieSync(
                    name +
                        "=" +
                        cookieVal +
                        ";domain=" +
                        scope +
                        ";expires=Fri, 31 Dec 9999 23:59:59 GMT;path=/;samesite=lax"
                );
        }
    }
}
exports.setFrontendCookie = setFrontendCookie;