'use strict';

var React = require('react');
var STGeneralError = require('supertokens-web-js/lib/build/error');
var cookieHandler = require('supertokens-web-js/utils/cookieHandler');
var NormalisedURLDomain = require('supertokens-web-js/utils/normalisedURLDomain');
var NormalisedURLPath = require('supertokens-web-js/utils/normalisedURLPath');
var windowHandler = require('supertokens-web-js/utils/windowHandler');
var crypto = require('crypto');

function _interopDefault (e) { return e && e.__esModule ? e : { default: e }; }

var STGeneralError__default = /*#__PURE__*/_interopDefault(STGeneralError);
var NormalisedURLDomain__default = /*#__PURE__*/_interopDefault(NormalisedURLDomain);
var NormalisedURLPath__default = /*#__PURE__*/_interopDefault(NormalisedURLPath);

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
/* global Reflect, Promise, SuppressedError, Symbol, Iterator */

var extendStatics = function(d, b) {
    extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
    return extendStatics(d, b);
};

function __extends(d, b) {
    if (typeof b !== "function" && b !== null)
        throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
    extendStatics(d, b);
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}

exports.__assign = function() {
    exports.__assign = Object.assign || function __assign(t) {
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
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
}

function __awaiter(thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
}

function __generator(thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
}

function __spreadArray(to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
}

typeof SuppressedError === "function" ? SuppressedError : function (error, suppressed, message) {
    var e = new Error(message);
    return e.name = "SuppressedError", e.error = error, e.suppressed = suppressed, e;
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
 * Consts.
 */
var RECIPE_ID_QUERY_PARAM = "rid";
var TENANT_ID_QUERY_PARAM = "tenantId";
var DEFAULT_API_BASE_PATH = "/auth";
var DEFAULT_WEBSITE_BASE_PATH = "/auth";
var ST_ROOT_ID = "supertokens-root";
var SSR_ERROR = "\nIf you are trying to use this method doing server-side-rendering, please make sure you move this method inside a componentDidMount method or useEffect hook.";

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
var package_version = "0.50.0";

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
var SUPERTOKENS_DEBUG_NAMESPACE = "com.supertokens.auth-react";
var __debugLogsEnabled = false;
function enableLogging() {
    __debugLogsEnabled = true;
}
function logDebugMessage(message) {
    if (__debugLogsEnabled) {
        // eslint-disable-next-line no-console
        console.log("".concat(SUPERTOKENS_DEBUG_NAMESPACE, " {t: \"").concat(new Date().toISOString(), "\", message: \"").concat(message, "\", supertokens-auth-react-ver: \"").concat(package_version, "\"}"));
    }
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
var nonPublicConfigProperties = ["experimental"];

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
    windowHandler.WindowHandlerReference.getReferenceOrThrow().windowHandler.history.replaceState(windowHandler.WindowHandlerReference.getReferenceOrThrow().windowHandler.history.getState(), "", newURL.toString());
}
function updateQueryParam(name, value) {
    var newURL = new URL(windowHandler.WindowHandlerReference.getReferenceOrThrow().windowHandler.location.getHref());
    newURL.searchParams.set(name, value);
    windowHandler.WindowHandlerReference.getReferenceOrThrow().windowHandler.history.replaceState(windowHandler.WindowHandlerReference.getReferenceOrThrow().windowHandler.history.getState(), "", newURL.toString());
}
function clearErrorQueryParam() {
    clearQueryParams(["error", "message"]);
}
function getQueryParams(param) {
    var urlParams = new URLSearchParams(windowHandler.WindowHandlerReference.getReferenceOrThrow().windowHandler.location.getSearch());
    return urlParams.get(param);
}
function getURLHash() {
    // By default it is returined with the "#" at the beginning, we cut that off here.
    return windowHandler.WindowHandlerReference.getReferenceOrThrow().windowHandler.location.getHash().substr(1);
}
function getRedirectToPathFromURL() {
    var redirectToPath = getQueryParams("redirectToPath");
    if (redirectToPath === null) {
        return undefined;
    }
    else {
        try {
            var url = void 0;
            try {
                url = new URL(redirectToPath);
            }
            catch (error) {
                var fakeDomain = redirectToPath.startsWith("/") ? "http://localhost" : "http://localhost/";
                url = new URL("".concat(fakeDomain).concat(redirectToPath));
            }
            // Prevent Open redirects by normalising path.
            var normalisedURLPath = new NormalisedURLPath__default.default(redirectToPath).getAsStringDangerous();
            var pathQueryParams = url.search || ""; // url.search contains the leading ?
            var pathHash = url.hash || ""; // url.hash contains the leading #
            var pathWithQueryParamsAndHash = normalisedURLPath + pathQueryParams + pathHash;
            // Ensure a leading "/" if `normalisedUrlPath` is empty but `pathWithQueryParamsAndHash` is not to ensure proper redirection.
            // Example: "?test=1" will not redirect the user to `/?test=1` if we don't add a leading "/".
            if (normalisedURLPath.length === 0 &&
                pathWithQueryParamsAndHash.length > 0 &&
                !pathWithQueryParamsAndHash.startsWith("/")) {
                return "/" + pathWithQueryParamsAndHash;
            }
            return pathWithQueryParamsAndHash;
        }
        catch (_a) {
            return undefined;
        }
    }
}
function getTenantIdFromQueryParams() {
    var _a;
    return (_a = getQueryParams(TENANT_ID_QUERY_PARAM)) !== null && _a !== void 0 ? _a : undefined;
}
function getDefaultRedirectionURLForPath(config, defaultPath, context, extraQueryParams) {
    var redirectPath = config.appInfo.websiteBasePath
        .appendPath(new NormalisedURLPath__default.default(defaultPath))
        .getAsStringDangerous();
    var queryParams = new URLSearchParams();
    if (context.tenantIdFromQueryParams !== undefined) {
        queryParams.set(TENANT_ID_QUERY_PARAM, context.tenantIdFromQueryParams);
    }
    if (extraQueryParams !== undefined) {
        Object.entries(extraQueryParams).forEach(function (_a) {
            var key = _a[0], value = _a[1];
            if (value !== undefined) {
                queryParams.set(key, value);
            }
        });
    }
    if (queryParams.toString() !== "") {
        return "".concat(redirectPath, "?").concat(queryParams.toString());
    }
    return redirectPath;
}
/*
 * isTest
 */
function isTest() {
    try {
        return process.env.TEST_MODE === "testing" || process.env.REACT_APP_TEST_MODE === "testing";
    }
    catch (err) {
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
        apiBasePath: apiGatewayPath.appendPath(getNormalisedURLPathOrDefault(DEFAULT_API_BASE_PATH, appInfo.apiBasePath)),
        websiteBasePath: getNormalisedURLPathOrDefault(DEFAULT_WEBSITE_BASE_PATH, appInfo.websiteBasePath),
    };
}
function getNormalisedURLPathOrDefault(defaultPath, path) {
    if (path !== undefined) {
        return new NormalisedURLPath__default.default(path);
    }
    else {
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
                                    input = inputs.find(function (i) { return i.id === field.id; });
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
                case 4: return [2 /*return*/, validationErrors];
            }
        });
    });
}
/*
 * getCurrentNormalisedUrlPath
 */
function getCurrentNormalisedUrlPath() {
    return new NormalisedURLPath__default.default(windowHandler.WindowHandlerReference.getReferenceOrThrow().windowHandler.location.getPathName());
}
function getCurrentNormalisedUrlPathWithQueryParamsAndFragments() {
    var normalisedUrlPath = getCurrentNormalisedUrlPath().getAsStringDangerous();
    return (normalisedUrlPath +
        windowHandler.WindowHandlerReference.getReferenceOrThrow().windowHandler.location.getSearch() +
        windowHandler.WindowHandlerReference.getReferenceOrThrow().windowHandler.location.getHash());
}
function appendQueryParamsToURL(stringUrl, queryParams) {
    if (queryParams === undefined) {
        return stringUrl;
    }
    try {
        var url_1 = new URL(stringUrl);
        Object.entries(queryParams).forEach(function (_a) {
            var key = _a[0], value = _a[1];
            url_1.searchParams.set(key, value);
        });
        return url_1.href;
    }
    catch (e) {
        var fakeDomain = stringUrl.startsWith("/") ? "http://localhost" : "http://localhost/";
        var url_2 = new URL("".concat(fakeDomain).concat(stringUrl));
        Object.entries(queryParams).forEach(function (_a) {
            var key = _a[0], value = _a[1];
            url_2.searchParams.set(key, value);
        });
        return "".concat(url_2.pathname).concat(url_2.search).concat(url_2.hash);
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
        var recipeIdFromSearch = getRecipeIdFromSearch(windowHandler.WindowHandlerReference.getReferenceOrThrow().windowHandler.location.getSearch());
        return recipeIdFromSearch === recipeId;
    };
}
function redirectWithFullPageReload(to) {
    if (to.trim() === "") {
        to = "/";
    }
    windowHandler.WindowHandlerReference.getReferenceOrThrow().windowHandler.location.setHref(to);
}
function redirectWithNavigate(to, navigate) {
    if (to.trim() === "") {
        to = "/";
    }
    if ("push" in navigate) {
        // we are using react-router-dom that is before v6
        navigate.push(to);
    }
    else {
        // in react-router-dom v6, it is just navigate(to)
        navigate(to);
    }
}
function getOriginOfPage() {
    return new NormalisedURLDomain__default.default(windowHandler.WindowHandlerReference.getReferenceOrThrow().windowHandler.location.getOrigin());
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
                case 0: return [4 /*yield*/, windowHandler.WindowHandlerReference.getReferenceOrThrow().windowHandler.localStorage.setItem(key, value)];
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
                case 0: return [4 /*yield*/, windowHandler.WindowHandlerReference.getReferenceOrThrow().windowHandler.localStorage.removeItem(key)];
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
        }
        else {
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
        }
        catch (err) {
            throw new Error("Please provide a valid cookie scope");
        }
    }
    function isAnIpAddress(ipaddress) {
        return /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/.test(ipaddress);
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
        return normaliseCookieScopeOrThrowError(windowHandler.WindowHandlerReference.getReferenceOrThrow().windowHandler.location.getHostName());
    }
    catch (_a) {
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
                    return [4 /*yield*/, cookieHandler.CookieHandlerReference.getReferenceOrThrow().cookieHandler.getCookie()];
                case 1:
                    value = _a + (_b.sent());
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
                    if (!(scope === "localhost" ||
                        scope === windowHandler.WindowHandlerReference.getReferenceOrThrow().windowHandler.location.getHostName() ||
                        scope === undefined)) return [3 /*break*/, 5];
                    if (!(expires !== undefined)) return [3 /*break*/, 2];
                    return [4 /*yield*/, cookieHandler.CookieHandlerReference.getReferenceOrThrow().cookieHandler.setCookie("".concat(name, "=").concat(cookieVal, ";expires=").concat(expires, ";path=/;samesite=lax"))];
                case 1:
                    _a.sent();
                    return [3 /*break*/, 4];
                case 2: return [4 /*yield*/, cookieHandler.CookieHandlerReference.getReferenceOrThrow().cookieHandler.setCookie("".concat(name, "=").concat(cookieVal, ";expires=Fri, 31 Dec 9999 23:59:59 GMT;path=/;samesite=lax"))];
                case 3:
                    _a.sent();
                    _a.label = 4;
                case 4: return [3 /*break*/, 9];
                case 5:
                    if (!(expires !== undefined)) return [3 /*break*/, 7];
                    return [4 /*yield*/, cookieHandler.CookieHandlerReference.getReferenceOrThrow().cookieHandler.setCookie("".concat(name, "=").concat(cookieVal, ";expires=").concat(expires, ";domain=").concat(scope, ";path=/;samesite=lax"))];
                case 6:
                    _a.sent();
                    return [3 /*break*/, 9];
                case 7: return [4 /*yield*/, cookieHandler.CookieHandlerReference.getReferenceOrThrow().cookieHandler.setCookie("".concat(name, "=").concat(cookieVal, ";domain=").concat(scope, ";expires=Fri, 31 Dec 9999 23:59:59 GMT;path=/;samesite=lax"))];
                case 8:
                    _a.sent();
                    _a.label = 9;
                case 9: return [2 /*return*/];
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
    if (startLoading === void 0) { startLoading = true; }
    var consumeReq = React.useRef();
    var _a = React.useState(undefined), error = _a[0], setError = _a[1];
    React.useEffect(function () {
        var effect = function (signal) { return __awaiter(void 0, void 0, void 0, function () {
            var resp, err_1, err_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 9]);
                        if (consumeReq.current === undefined) {
                            consumeReq.current = fetch();
                        }
                        return [4 /*yield*/, consumeReq.current];
                    case 1:
                        resp = _a.sent();
                        if (!signal.aborted) {
                            void handleResponse(resp);
                        }
                        return [3 /*break*/, 9];
                    case 2:
                        err_1 = _a.sent();
                        if (!!signal.aborted) return [3 /*break*/, 8];
                        if (!(handleError !== undefined)) return [3 /*break*/, 7];
                        _a.label = 3;
                    case 3:
                        _a.trys.push([3, 5, , 6]);
                        return [4 /*yield*/, handleError(err_1, resp)];
                    case 4:
                        _a.sent();
                        return [3 /*break*/, 6];
                    case 5:
                        err_2 = _a.sent();
                        setError(err_2);
                        return [3 /*break*/, 6];
                    case 6: return [3 /*break*/, 8];
                    case 7:
                        setError(err_1);
                        _a.label = 8;
                    case 8: return [3 /*break*/, 9];
                    case 9: return [2 /*return*/];
                }
            });
        }); };
        if (startLoading) {
            var ctrl_1 = new AbortController();
            void effect(ctrl_1.signal);
            return function () {
                ctrl_1.abort();
            };
        }
        return;
    }, [setError, consumeReq, fetch, handleResponse, handleError, startLoading]);
    if (error) {
        throw error;
    }
};
function useRethrowInRender() {
    var _a = React.useState(undefined), error = _a[0], setError = _a[1];
    if (error) {
        throw error;
    }
    return setError;
}
function jwtVerify(token, jwksUrl) {
    return __awaiter(this, void 0, void 0, function () {
        var parts, headerB64, payloadB64, signatureB64, headerStr, header, kid, alg, jwksResponse, jwks, matchingKey, publicKey, signatureInput, signature, algorithmsRecord, cryptoAlg, isValid, payloadStr, payload, now;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    parts = token.split(".");
                    if (parts.length !== 3) {
                        throw new Error("Invalid JWT token format");
                    }
                    headerB64 = parts[0], payloadB64 = parts[1], signatureB64 = parts[2];
                    headerStr = Buffer.from(headerB64 + "=".repeat((4 - (headerB64.length % 4)) % 4), "base64").toString();
                    header = JSON.parse(headerStr);
                    kid = header.kid;
                    if (!kid) {
                        throw new Error("JWT header missing kid (Key ID)");
                    }
                    alg = header.alg;
                    if (!alg) {
                        throw new Error("JWT header missing alg (Algorithm)");
                    }
                    return [4 /*yield*/, fetch(jwksUrl)];
                case 1:
                    jwksResponse = _a.sent();
                    if (!jwksResponse.ok) {
                        throw new Error("Failed to fetch JWKS: ".concat(jwksResponse.statusText));
                    }
                    return [4 /*yield*/, jwksResponse.json()];
                case 2:
                    jwks = _a.sent();
                    matchingKey = jwks.keys.find(function (key) { return key.kid === kid; });
                    if (!matchingKey) {
                        throw new Error("No matching key found for kid: ".concat(kid));
                    }
                    publicKey = generatePublicKey(matchingKey);
                    signatureInput = "".concat(headerB64, ".").concat(payloadB64);
                    signature = Buffer.from(signatureB64 + "=".repeat((4 - (signatureB64.length % 4)) % 4), "base64");
                    algorithmsRecord = {
                        RS256: "RSA-SHA256",
                        RS384: "RSA-SHA384",
                        RS512: "RSA-SHA512",
                        ES256: "SHA256",
                        ES384: "SHA384",
                        ES512: "SHA512",
                    };
                    cryptoAlg = algorithmsRecord[alg];
                    if (!cryptoAlg) {
                        throw new Error("Unsupported algorithm: ".concat(alg));
                    }
                    isValid = crypto.verify(cryptoAlg, Buffer.from(signatureInput), publicKey, signature);
                    if (!isValid) {
                        throw new Error("JWT signature verification failed");
                    }
                    payloadStr = Buffer.from(payloadB64 + "=".repeat((4 - (payloadB64.length % 4)) % 4), "base64").toString();
                    payload = JSON.parse(payloadStr);
                    now = Math.floor(Date.now() / 1000);
                    if (payload.exp !== undefined && typeof payload.exp === "number") {
                        if (now >= payload.exp) {
                            throw new Error("JWT expired");
                        }
                    }
                    if (payload.nbf !== undefined && typeof payload.nbf === "number") {
                        if (now < payload.nbf) {
                            throw new Error("JWT not valid yet (nbf)");
                        }
                    }
                    if (payload.iat !== undefined && typeof payload.iat === "number") {
                        if (now < payload.iat) {
                            throw new Error("JWT issued in the future");
                        }
                    }
                    return [2 /*return*/, payload];
            }
        });
    });
}
function generatePublicKey(jwk, _alg) {
    if (jwk.kty !== "RSA") {
        throw new Error("Unsupported key type");
    }
    if (!jwk.n || !jwk.e) {
        throw new Error("Missing RSA key parameters");
    }
    var modulus = base64urlToBase64(jwk.n);
    var exponent = base64urlToBase64(jwk.e);
    return crypto.createPublicKey({
        key: {
            // @ts-expect-error
            kty: "RSA",
            kid: jwk.kid,
            n: modulus,
            e: exponent,
        },
        // @ts-expect-error
        format: "jwk",
    });
}
function base64urlToBase64(base64url) {
    var base64 = base64url.replace(/-/g, "+").replace(/_/g, "/");
    while (base64.length % 4 !== 0) {
        base64 += "=";
    }
    return base64;
}
var handleCallAPI = function (_a) {
    var apiFields = _a.apiFields, fieldUpdates = _a.fieldUpdates, callAPI = _a.callAPI;
    return __awaiter(void 0, void 0, void 0, function () {
        var result, generalError, fetchError, e_1;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, callAPI(apiFields || [], function (id, value) { return fieldUpdates.push({ id: id, value: value }); })];
                case 1:
                    result = _b.sent();
                    return [3 /*break*/, 3];
                case 2:
                    e_1 = _b.sent();
                    if (STGeneralError__default.default.isThisError(e_1)) {
                        generalError = e_1;
                    }
                    else if (e_1 instanceof Response) {
                        fetchError = e_1;
                    }
                    else {
                        throw e_1;
                    }
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/, {
                        result: result,
                        generalError: generalError,
                        fetchError: fetchError,
                    }];
            }
        });
    });
};
function getPublicPlugin(plugin) {
    return {
        id: plugin.id,
        initialized: plugin.init ? false : true,
        version: plugin.version,
        exports: plugin.exports,
        compatibleAuthReactSDKVersions: plugin.compatibleAuthReactSDKVersions,
        compatibleWebJSSDKVersions: plugin.compatibleWebJSSDKVersions,
    };
}
function getPublicConfig(config) {
    var configKeys = Object.keys(config);
    var publicConfig = configKeys.reduce(function (acc, key) {
        var _a;
        if (nonPublicConfigProperties.includes(key)) {
            return acc;
        }
        else {
            return exports.__assign(exports.__assign({}, acc), (_a = {}, _a[key] = config[key], _a));
        }
    }, {});
    return publicConfig;
}

exports.SSR_ERROR = SSR_ERROR;
exports.ST_ROOT_ID = ST_ROOT_ID;
exports.TENANT_ID_QUERY_PARAM = TENANT_ID_QUERY_PARAM;
exports.__awaiter = __awaiter;
exports.__extends = __extends;
exports.__generator = __generator;
exports.__rest = __rest;
exports.__spreadArray = __spreadArray;
exports.appendQueryParamsToURL = appendQueryParamsToURL;
exports.appendTrailingSlashToURL = appendTrailingSlashToURL;
exports.clearErrorQueryParam = clearErrorQueryParam;
exports.clearQueryParams = clearQueryParams;
exports.enableLogging = enableLogging;
exports.getCookieValue = getCookieValue;
exports.getCurrentNormalisedUrlPath = getCurrentNormalisedUrlPath;
exports.getCurrentNormalisedUrlPathWithQueryParamsAndFragments = getCurrentNormalisedUrlPathWithQueryParamsAndFragments;
exports.getDefaultCookieScope = getDefaultCookieScope;
exports.getDefaultRedirectionURLForPath = getDefaultRedirectionURLForPath;
exports.getLocalStorage = getLocalStorage;
exports.getNormalisedUserContext = getNormalisedUserContext;
exports.getOriginOfPage = getOriginOfPage;
exports.getPublicConfig = getPublicConfig;
exports.getPublicPlugin = getPublicPlugin;
exports.getQueryParams = getQueryParams;
exports.getRedirectToPathFromURL = getRedirectToPathFromURL;
exports.getTenantIdFromQueryParams = getTenantIdFromQueryParams;
exports.getURLHash = getURLHash;
exports.handleCallAPI = handleCallAPI;
exports.isTest = isTest;
exports.jwtVerify = jwtVerify;
exports.logDebugMessage = logDebugMessage;
exports.matchRecipeIdUsingQueryParams = matchRecipeIdUsingQueryParams;
exports.mergeObjects = mergeObjects;
exports.normaliseCookieScopeOrThrowError = normaliseCookieScopeOrThrowError;
exports.normaliseInputAppInfoOrThrowError = normaliseInputAppInfoOrThrowError;
exports.package_version = package_version;
exports.redirectWithFullPageReload = redirectWithFullPageReload;
exports.redirectWithNavigate = redirectWithNavigate;
exports.removeFromLocalStorage = removeFromLocalStorage;
exports.setFrontendCookie = setFrontendCookie;
exports.setLocalStorage = setLocalStorage;
exports.updateQueryParam = updateQueryParam;
exports.useOnMountAPICall = useOnMountAPICall;
exports.useRethrowInRender = useRethrowInRender;
exports.validateForm = validateForm;
