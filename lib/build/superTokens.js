'use strict';

var logger = require('./logger.js');
var SuperTokensWebJS = require('supertokens-web-js');
var cookieHandler = require('supertokens-web-js/utils/cookieHandler');
var postSuperTokensInitCallbacks = require('supertokens-web-js/utils/postSuperTokensInitCallbacks');
var windowHandler = require('supertokens-web-js/utils/windowHandler');
var MultitenancyWebJS = require('supertokens-web-js/recipe/multitenancy');
var utils = require('supertokens-web-js/utils');
var React = require('react');
var NormalisedURLDomain = require('supertokens-web-js/utils/normalisedURLDomain');
var NormalisedURLPath = require('supertokens-web-js/utils/normalisedURLPath');

function _interopDefault (e) { return e && e.__esModule ? e : { default: e }; }

var SuperTokensWebJS__default = /*#__PURE__*/_interopDefault(SuperTokensWebJS);
var MultitenancyWebJS__default = /*#__PURE__*/_interopDefault(MultitenancyWebJS);
var NormalisedURLDomain__default = /*#__PURE__*/_interopDefault(NormalisedURLDomain);
var NormalisedURLPath__default = /*#__PURE__*/_interopDefault(NormalisedURLPath);

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
    return logger.__awaiter(this, void 0, void 0, function () {
        var validationErrors, _loop_1, i;
        return logger.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    validationErrors = [];
                    if (configFormFields.length !== inputs.length) {
                        throw Error("Are you sending too many / too few formFields?");
                    }
                    _loop_1 = function (i) {
                        var field, input, value, error;
                        return logger.__generator(this, function (_b) {
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
    return logger.__awaiter(this, void 0, void 0, function () {
        var res;
        return logger.__generator(this, function (_a) {
            res = windowHandler.WindowHandlerReference.getReferenceOrThrow().windowHandler.localStorage.getItem(key);
            if (res === null || res === undefined) {
                return [2 /*return*/, null];
            }
            return [2 /*return*/, res];
        });
    });
}
function setLocalStorage(key, value) {
    return logger.__awaiter(this, void 0, void 0, function () {
        return logger.__generator(this, function (_a) {
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
    return logger.__awaiter(this, void 0, void 0, function () {
        return logger.__generator(this, function (_a) {
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
    var res = logger.__assign({}, obj1);
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
    return logger.__awaiter(this, void 0, void 0, function () {
        var value, _a, parts, last, temp;
        return logger.__generator(this, function (_b) {
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
    return logger.__awaiter(this, void 0, void 0, function () {
        var expires, cookieVal;
        return logger.__generator(this, function (_a) {
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
        var effect = function (signal) { return logger.__awaiter(void 0, void 0, void 0, function () {
            var resp, err_1, err_2;
            return logger.__generator(this, function (_a) {
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

var BaseRecipeModule = /** @class */ (function () {
    /*
     * Constructor.
     */
    function BaseRecipeModule(config) {
        this.config = config;
    }
    return BaseRecipeModule;
}());

function normaliseRecipeModuleConfig(config) {
    var _this = this;
    if (config === undefined) {
        config = {};
    }
    var onHandleEvent = config.onHandleEvent, getRedirectionURL = config.getRedirectionURL, preAPIHook = config.preAPIHook, postAPIHook = config.postAPIHook;
    if (onHandleEvent === undefined) {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-empty-function
        onHandleEvent = function (_) { };
    }
    if (getRedirectionURL === undefined) {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        getRedirectionURL = function (_) { return logger.__awaiter(_this, void 0, void 0, function () { return logger.__generator(this, function (_a) {
            return [2 /*return*/, undefined];
        }); }); };
    }
    if (preAPIHook === undefined) {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        preAPIHook = function (context) { return logger.__awaiter(_this, void 0, void 0, function () { return logger.__generator(this, function (_a) {
            return [2 /*return*/, context];
        }); }); };
    }
    if (postAPIHook === undefined) {
        // eslint-disable-next-line @typescript-eslint/no-empty-function
        postAPIHook = function () { return logger.__awaiter(_this, void 0, void 0, function () { return logger.__generator(this, function (_a) {
            return [2 /*return*/];
        }); }); };
    }
    var rootStyle = config.style === undefined ? "" : config.style;
    return logger.__assign(logger.__assign({}, config), { getRedirectionURL: getRedirectionURL, onHandleEvent: onHandleEvent, preAPIHook: preAPIHook, postAPIHook: postAPIHook, recipeRootStyle: rootStyle });
}

function normaliseMultitenancyConfig(config) {
    return logger.__assign(logger.__assign({}, normaliseRecipeModuleConfig(config)), { override: logger.__assign({ functions: function (originalImplementation) { return originalImplementation; } }, config === null || config === void 0 ? void 0 : config.override) });
}
function hasIntersectingRecipes(tenantMethods, recipeList) {
    return tenantMethods.firstFactors.some(function (factorId) { return recipeList.some(function (r) { return r.firstFactorIds.includes(factorId); }); });
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
    logger.__extends(Multitenancy, _super);
    function Multitenancy(config, webJSRecipe) {
        if (webJSRecipe === void 0) { webJSRecipe = MultitenancyWebJS__default.default; }
        var _this = _super.call(this, config) || this;
        _this.webJSRecipe = webJSRecipe;
        _this.recipeID = Multitenancy.RECIPE_ID;
        _this.dynamicLoginMethodsCache = {};
        return _this;
    }
    Multitenancy.prototype.getCurrentDynamicLoginMethods = function (input) {
        var _a;
        return logger.__awaiter(this, void 0, void 0, function () {
            var userContext, tenantId, tenantMethods;
            return logger.__generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (SuperTokens.usesDynamicLoginMethods === false) {
                            return [2 /*return*/, undefined];
                        }
                        userContext = utils.getNormalisedUserContext(input.userContext);
                        return [4 /*yield*/, Multitenancy.getInstanceOrThrow().webJSRecipe.getTenantId()];
                    case 1:
                        tenantId = (_a = (_b.sent())) !== null && _a !== void 0 ? _a : "public";
                        if (this.dynamicLoginMethodsCache[tenantId] === undefined) {
                            this.dynamicLoginMethodsCache[tenantId] = Multitenancy.getDynamicLoginMethods({
                                tenantId: tenantId,
                                userContext: userContext,
                            });
                        }
                        return [4 /*yield*/, this.dynamicLoginMethodsCache[tenantId]];
                    case 2:
                        tenantMethods = _b.sent();
                        if (!hasIntersectingRecipes(tenantMethods, SuperTokens.getInstanceOrThrow().recipeList.filter(function (recipe) { return "firstFactorIds" in recipe; }))) {
                            throw new Error("Initialized recipes have no overlap with core recipes or could not load login methods");
                        }
                        return [2 /*return*/, tenantMethods];
                }
            });
        });
    };
    Multitenancy.getDynamicLoginMethods = function (input) {
        return logger.__awaiter(this, void 0, void 0, function () {
            var _a, thirdParty, firstFactors;
            return logger.__generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, MultitenancyWebJS__default.default.getLoginMethods(input)];
                    case 1:
                        _a = _b.sent(), thirdParty = _a.thirdParty, firstFactors = _a.firstFactors;
                        return [2 /*return*/, {
                                thirdparty: thirdParty,
                                firstFactors: firstFactors,
                            }];
                }
            });
        });
    };
    Multitenancy.init = function (config) {
        var normalisedConfig = normaliseMultitenancyConfig(config);
        return {
            recipeID: Multitenancy.RECIPE_ID,
            authReact: function (appInfo) {
                Multitenancy.instance = new Multitenancy(logger.__assign(logger.__assign({}, normalisedConfig), { appInfo: appInfo, recipeId: Multitenancy.RECIPE_ID }));
                return Multitenancy.instance;
            },
            webJS: MultitenancyWebJS__default.default.init(logger.__assign({}, normalisedConfig)),
        };
    };
    Multitenancy.getInstanceOrThrow = function () {
        if (Multitenancy.instance === undefined) {
            var error = "No instance of Multitenancy found. Make sure to call the Multitenancy.init method." +
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
}(BaseRecipeModule));

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
        this.handlers.set(event, handlerList.filter(function (h) { return h !== handler; }));
    };
    return TranslationController;
}());
var CURRENT_LANGUAGE_COOKIE_NAME = "sCurrLanguage";
function saveCurrentLanguage(language, cookieDomain) {
    return logger.__awaiter(this, void 0, void 0, function () {
        return logger.__generator(this, function (_b) {
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
                case 3: return [2 /*return*/];
            }
        });
    });
}
function getCurrentLanguageFromCookie() {
    return logger.__awaiter(this, void 0, void 0, function () {
        return logger.__generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, getCookieValue(CURRENT_LANGUAGE_COOKIE_NAME)];
                case 1: return [2 /*return*/, _b.sent()];
                case 2:
                    _b.sent();
                    // This can throw if we are not in a browser
                    // Since this is just loading a preference we can safely ignore the exception
                    return [2 /*return*/, null];
                case 3: return [2 /*return*/];
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
var SuperTokens = /** @class */ (function () {
    /*
     * Constructor.
     */
    function SuperTokens(config) {
        var _this = this;
        var _a, _b, _c, _d;
        this.recipeList = [];
        this.changeLanguage = function (lang) { return logger.__awaiter(_this, void 0, void 0, function () {
            return logger.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, saveCurrentLanguage(lang, this.languageTranslations.currentLanguageCookieScope)];
                    case 1:
                        _a.sent();
                        this.languageTranslations.translationEventSource.emit("LanguageChange", lang);
                        return [2 /*return*/];
                }
            });
        }); };
        this.redirectToAuth = function (options) { return logger.__awaiter(_this, void 0, void 0, function () {
            var queryParams, redirectUrl;
            return logger.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        queryParams = options.queryParams === undefined ? {} : options.queryParams;
                        if (options.show !== undefined) {
                            queryParams.show = options.show;
                        }
                        if (options.redirectBack === true) {
                            queryParams.redirectToPath = getCurrentNormalisedUrlPathWithQueryParamsAndFragments();
                        }
                        return [4 /*yield*/, this.getRedirectUrl({
                                action: "TO_AUTH",
                                showSignIn: options.show === "signin",
                                tenantIdFromQueryParams: getTenantIdFromQueryParams(),
                            }, options.userContext)];
                    case 1:
                        redirectUrl = _a.sent();
                        if (redirectUrl === null) {
                            logger.logDebugMessage("Skipping redirection because the user override returned null");
                            return [2 /*return*/];
                        }
                        redirectUrl = appendQueryParamsToURL(redirectUrl, queryParams);
                        return [2 /*return*/, this.redirectToUrl(redirectUrl, options.navigate)];
                }
            });
        }); };
        this.redirectToUrl = function (redirectUrl, navigate) { return logger.__awaiter(_this, void 0, void 0, function () {
            return logger.__generator(this, function (_a) {
                doRedirection(this.appInfo, redirectUrl, navigate);
                return [2 /*return*/];
            });
        }); };
        this.redirect = function (context, navigate, queryParams, userContext) { return logger.__awaiter(_this, void 0, void 0, function () {
            var redirectUrl;
            return logger.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getRedirectUrl(context, getNormalisedUserContext(userContext))];
                    case 1:
                        redirectUrl = _a.sent();
                        if (redirectUrl === null) {
                            logger.logDebugMessage("Skipping redirection because the user override returned null for context ".concat(JSON.stringify(context, null, 2)));
                            return [2 /*return*/];
                        }
                        redirectUrl = appendQueryParamsToURL(redirectUrl, queryParams);
                        return [2 /*return*/, SuperTokens.getInstanceOrThrow().redirectToUrl(redirectUrl, navigate)];
                }
            });
        }); };
        this.appInfo = normaliseInputAppInfoOrThrowError(config.appInfo);
        if (config.recipeList === undefined || config.recipeList.length === 0) {
            throw new Error("Please provide at least one recipe to the supertokens.init function call. See https://supertokens.io/docs/emailpassword/quick-setup/frontend");
        }
        var translationConfig = config.languageTranslations === undefined ? {} : config.languageTranslations;
        this.languageTranslations = {
            defaultLanguage: translationConfig.defaultLanguage === undefined ? "en" : translationConfig.defaultLanguage,
            currentLanguageCookieScope: translationConfig.currentLanguageCookieScope !== undefined
                ? normaliseCookieScopeOrThrowError(translationConfig.currentLanguageCookieScope)
                : getDefaultCookieScope(),
            userTranslationStore: translationConfig.translations !== undefined ? translationConfig.translations : {},
            translationEventSource: new TranslationController(),
            userTranslationFunc: translationConfig.translationFunc,
        };
        var enableDebugLogs = Boolean(config === null || config === void 0 ? void 0 : config.enableDebugLogs);
        if (enableDebugLogs) {
            logger.enableLogging();
        }
        this.userGetRedirectionURL = config.getRedirectionURL;
        this.recipeList = config.recipeList.map(function (_a) {
            var authReact = _a.authReact;
            return authReact(_this.appInfo, enableDebugLogs);
        });
        this.rootStyle = (_a = config.style) !== null && _a !== void 0 ? _a : "";
        this.privacyPolicyLink = config.privacyPolicyLink;
        this.termsOfServiceLink = config.termsOfServiceLink;
        this.useShadowDom = (_b = config.useShadowDom) !== null && _b !== void 0 ? _b : true;
        this.defaultToSignUp = (_c = config.defaultToSignUp) !== null && _c !== void 0 ? _c : false;
        this.disableAuthRoute = (_d = config.disableAuthRoute) !== null && _d !== void 0 ? _d : false;
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
        SuperTokens.usesDynamicLoginMethods = (_a = config.usesDynamicLoginMethods) !== null && _a !== void 0 ? _a : false;
        var recipes = config.recipeList.find(function (recipe) { return recipe.recipeID === Multitenancy.RECIPE_ID; }) !== undefined
            ? config.recipeList
            : config.recipeList.concat(Multitenancy.init({}));
        SuperTokensWebJS__default.default.init(logger.__assign(logger.__assign({}, config), { recipeList: recipes.map(function (_a) {
                var webJS = _a.webJS;
                return webJS;
            }) }));
        SuperTokens.instance = new SuperTokens(logger.__assign(logger.__assign({}, config), { recipeList: recipes }));
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
    SuperTokens.prototype.getRedirectUrl = function (context, userContext) {
        var _a;
        return logger.__awaiter(this, void 0, void 0, function () {
            var userRes, redirectUrl, basePath;
            var _b;
            return logger.__generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        if (!this.userGetRedirectionURL) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.userGetRedirectionURL(context, userContext)];
                    case 1:
                        userRes = _c.sent();
                        if (userRes !== undefined) {
                            return [2 /*return*/, userRes];
                        }
                        _c.label = 2;
                    case 2:
                        if (context.action === "TO_AUTH") {
                            redirectUrl = this.appInfo.websiteBasePath.getAsStringDangerous();
                            basePath = appendTrailingSlashToURL(redirectUrl);
                            if (context.tenantIdFromQueryParams) {
                                return [2 /*return*/, appendQueryParamsToURL(basePath, (_b = {}, _b[TENANT_ID_QUERY_PARAM] = context.tenantIdFromQueryParams, _b))];
                            }
                            return [2 /*return*/, basePath];
                        }
                        else if (context.action === "SUCCESS") {
                            return [2 /*return*/, (_a = context.redirectToPath) !== null && _a !== void 0 ? _a : "/"];
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
    return SuperTokens;
}());
function doRedirection(appInfo, redirectUrl, navigate) {
    try {
        new URL(redirectUrl); // If full URL, no error thrown, skip in app redirection.
    }
    catch (e) {
        // For multi tenancy, If mismatch between websiteDomain and current location, prepend URL relative path with websiteDomain.
        var origin_1 = getOriginOfPage().getAsStringDangerous();
        if (origin_1 !== appInfo.websiteDomain.getAsStringDangerous()) {
            redirectUrl = "".concat(appInfo.websiteDomain.getAsStringDangerous()).concat(redirectUrl);
            redirectWithFullPageReload(redirectUrl);
            return;
        }
        // If navigate was provided, use to redirect without reloading.
        if (navigate !== undefined) {
            redirectWithNavigate(redirectUrl, navigate);
            return;
        }
    }
    // Otherwise, redirect in app.
    redirectWithFullPageReload(redirectUrl);
}

exports.BaseRecipeModule = BaseRecipeModule;
exports.Multitenancy = Multitenancy;
exports.SSR_ERROR = SSR_ERROR;
exports.ST_ROOT_ID = ST_ROOT_ID;
exports.SuperTokens = SuperTokens;
exports.appendQueryParamsToURL = appendQueryParamsToURL;
exports.clearErrorQueryParam = clearErrorQueryParam;
exports.clearQueryParams = clearQueryParams;
exports.getCurrentLanguageFromCookie = getCurrentLanguageFromCookie;
exports.getCurrentNormalisedUrlPath = getCurrentNormalisedUrlPath;
exports.getCurrentNormalisedUrlPathWithQueryParamsAndFragments = getCurrentNormalisedUrlPathWithQueryParamsAndFragments;
exports.getDefaultRedirectionURLForPath = getDefaultRedirectionURLForPath;
exports.getLocalStorage = getLocalStorage;
exports.getNormalisedUserContext = getNormalisedUserContext;
exports.getQueryParams = getQueryParams;
exports.getRedirectToPathFromURL = getRedirectToPathFromURL;
exports.getTenantIdFromQueryParams = getTenantIdFromQueryParams;
exports.getURLHash = getURLHash;
exports.isTest = isTest;
exports.matchRecipeIdUsingQueryParams = matchRecipeIdUsingQueryParams;
exports.mergeObjects = mergeObjects;
exports.normaliseRecipeModuleConfig = normaliseRecipeModuleConfig;
exports.redirectWithFullPageReload = redirectWithFullPageReload;
exports.removeFromLocalStorage = removeFromLocalStorage;
exports.setLocalStorage = setLocalStorage;
exports.updateQueryParam = updateQueryParam;
exports.useOnMountAPICall = useOnMountAPICall;
exports.useRethrowInRender = useRethrowInRender;
exports.validateForm = validateForm;
