"use strict";

var jsxRuntime = require("react/jsx-runtime");
var React = require("react");
var recipe$1 = require("./recipe.js");

function _interopNamespaceDefault(e) {
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

var React__namespace = /*#__PURE__*/ _interopNamespaceDefault(React);

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
const RECIPE_ID_QUERY_PARAM = "rid";
const DEFAULT_API_BASE_PATH = "/auth";
const DEFAULT_WEBSITE_BASE_PATH = "/auth";
const ST_ROOT_ID = "supertokens-root";
const SSR_ERROR =
    "\nIf you are trying to use this method doing server-side-rendering, please make sure you move this method inside a componentDidMount method or useEffect hook.";

var cookieHandler = {};

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
    __export(recipe$1.cookieHandler);
})(cookieHandler);

var normalisedURLDomain = {};

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

    let d = recipe$1.normalisedURLDomain;

    if (d.default !== undefined) {
        __export(d);
    } else {
        __export({
            default: d,
            ...d,
        });
    }
})(normalisedURLDomain);

var NormalisedURLDomain = /*@__PURE__*/ recipe$1.getDefaultExportFromCjs(normalisedURLDomain);

var normalisedURLPath = {};

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

    let d = recipe$1.normalisedURLPath;

    if (d.default !== undefined) {
        __export(d);
    } else {
        __export({
            default: d,
            ...d,
        });
    }
})(normalisedURLPath);

var NormalisedURLPath = /*@__PURE__*/ recipe$1.getDefaultExportFromCjs(normalisedURLPath);

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
    const urlParams = new URLSearchParams(search);
    return urlParams.get(RECIPE_ID_QUERY_PARAM);
}
function clearQueryParams(paramNames) {
    const newURL = new URL(
        recipe$1.windowHandler.WindowHandlerReference.getReferenceOrThrow().windowHandler.location.getHref()
    );
    for (const param of paramNames) {
        newURL.searchParams.delete(param);
    }
    recipe$1.windowHandler.WindowHandlerReference.getReferenceOrThrow().windowHandler.history.replaceState(
        recipe$1.windowHandler.WindowHandlerReference.getReferenceOrThrow().windowHandler.history.getState(),
        "",
        recipe$1.windowHandler.WindowHandlerReference.getReferenceOrThrow().windowHandler.location.getHref()
    );
}
function clearErrorQueryParam() {
    clearQueryParams(["error", "message"]);
}
function getQueryParams(param) {
    const urlParams = new URLSearchParams(
        recipe$1.windowHandler.WindowHandlerReference.getReferenceOrThrow().windowHandler.location.getSearch()
    );
    return urlParams.get(param);
}
function getURLHash() {
    // By default it is returined with the "#" at the beginning, we cut that off here.
    return recipe$1.windowHandler.WindowHandlerReference.getReferenceOrThrow()
        .windowHandler.location.getHash()
        .substr(1);
}
function getRedirectToPathFromURL() {
    const param = getQueryParams("redirectToPath");
    if (param === null) {
        return undefined;
    } else {
        // Prevent Open redirects by normalising path.
        try {
            return new NormalisedURLPath(param).getAsStringDangerous();
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
    let apiGatewayPath = new NormalisedURLPath("");
    if (appInfo.apiGatewayPath !== undefined) {
        apiGatewayPath = new NormalisedURLPath(appInfo.apiGatewayPath);
    }
    return {
        appName: appInfo.appName,
        apiDomain: new NormalisedURLDomain(appInfo.apiDomain),
        websiteDomain: new NormalisedURLDomain(appInfo.websiteDomain),
        apiBasePath: apiGatewayPath.appendPath(
            getNormalisedURLPathOrDefault(DEFAULT_API_BASE_PATH, appInfo.apiBasePath)
        ),
        websiteBasePath: getNormalisedURLPathOrDefault(DEFAULT_WEBSITE_BASE_PATH, appInfo.websiteBasePath),
    };
}
function getNormalisedURLPathOrDefault(defaultPath, path) {
    if (path !== undefined) {
        return new NormalisedURLPath(path);
    } else {
        return new NormalisedURLPath(defaultPath);
    }
}
/*
 * validateForm
 */
// We check that the number of fields in input and config form field is the same.
// We check that each item in the config form field is also present in the input form field
function validateForm(inputs, configFormFields) {
    return __awaiter(this, void 0, void 0, function* () {
        const validationErrors = [];
        if (configFormFields.length !== inputs.length) {
            throw Error("Are you sending too many / too few formFields?");
        }
        // Loop through all form fields.
        for (let i = 0; i < configFormFields.length; i++) {
            const field = configFormFields[i];
            // Find corresponding input value.
            const input = inputs.find((i) => i.id === field.id);
            // Otherwise, use validate function.
            // Trim value for email only.
            let value = input.value;
            if (input.id === "email") {
                value = value.trim();
            }
            const error = yield field.validate(value);
            // If error, add it.
            if (error !== undefined) {
                validationErrors.push({
                    error,
                    id: field.id,
                });
            }
        }
        return validationErrors;
    });
}
/*
 * getCurrentNormalisedUrlPath
 */
function getCurrentNormalisedUrlPath() {
    return new NormalisedURLPath(
        recipe$1.windowHandler.WindowHandlerReference.getReferenceOrThrow().windowHandler.location.getPathName()
    );
}
function appendQueryParamsToURL(stringUrl, queryParams) {
    if (queryParams === undefined) {
        return stringUrl;
    }
    try {
        const url = new URL(stringUrl);
        Object.entries(queryParams).forEach(([key, value]) => {
            url.searchParams.set(key, value);
        });
        return url.href;
    } catch (e) {
        const fakeDomain = stringUrl.startsWith("/") ? "http:localhost" : "http://localhost/";
        const url = new URL(`${fakeDomain}${stringUrl}`);
        Object.entries(queryParams).forEach(([key, value]) => {
            url.searchParams.set(key, value);
        });
        return `${url.pathname}${url.search}`;
    }
}
function appendTrailingSlashToURL(stringUrl) {
    return stringUrl.endsWith("/") ? stringUrl : stringUrl + "/";
}
/*
 * Default method for matching recipe route based on query params.
 */
function matchRecipeIdUsingQueryParams(recipeId) {
    return () => {
        const recipeIdFromSearch = getRecipeIdFromSearch(
            recipe$1.windowHandler.WindowHandlerReference.getReferenceOrThrow().windowHandler.location.getSearch()
        );
        return recipeIdFromSearch === recipeId;
    };
}
function redirectWithFullPageReload(to) {
    if (to.trim() === "") {
        to = "/";
    }
    recipe$1.windowHandler.WindowHandlerReference.getReferenceOrThrow().windowHandler.location.setHref(to);
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
        recipe$1.windowHandler.WindowHandlerReference.getReferenceOrThrow().windowHandler.getDocument().documentMode !==
        undefined
    );
}
function getOriginOfPage() {
    return new NormalisedURLDomain(
        recipe$1.windowHandler.WindowHandlerReference.getReferenceOrThrow().windowHandler.location.getOrigin()
    );
}
function getLocalStorage(key) {
    return __awaiter(this, void 0, void 0, function* () {
        const res =
            recipe$1.windowHandler.WindowHandlerReference.getReferenceOrThrow().windowHandler.localStorage.getItem(key);
        if (res === null || res === undefined) {
            return null;
        }
        return res;
    });
}
function setLocalStorage(key, value) {
    return __awaiter(this, void 0, void 0, function* () {
        yield recipe$1.windowHandler.WindowHandlerReference.getReferenceOrThrow().windowHandler.localStorage.setItem(
            key,
            value
        );
    });
}
function removeFromLocalStorage(key) {
    return __awaiter(this, void 0, void 0, function* () {
        yield recipe$1.windowHandler.WindowHandlerReference.getReferenceOrThrow().windowHandler.localStorage.removeItem(
            key
        );
    });
}
function mergeObjects(obj1, obj2) {
    const res = Object.assign({}, obj1);
    for (const key in obj2) {
        if (typeof res[key] === "object" && typeof obj2[key] === "object") {
            res[key] = mergeObjects(res[key], obj2[key]);
        } else {
            res[key] = obj2[key];
        }
    }
    return res;
}
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
            const urlObj = new URL(sessionScope);
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
    const noDotNormalised = helper(cookieScope);
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
            recipe$1.windowHandler.WindowHandlerReference.getReferenceOrThrow().windowHandler.location.getHostName()
        );
    } catch (_a) {
        return undefined;
    }
}
function getCookieValue(name) {
    return __awaiter(this, void 0, void 0, function* () {
        const value =
            "; " + (yield cookieHandler.CookieHandlerReference.getReferenceOrThrow().cookieHandler.getCookie());
        const parts = value.split("; " + name + "=");
        if (parts.length >= 2) {
            const last = parts.pop();
            if (last !== undefined) {
                const temp = last.split(";").shift();
                if (temp === undefined) {
                    return null;
                }
                return temp;
            }
        }
        return null;
    });
}
// undefined value will remove the cookie
function setFrontendCookie(name, value, scope) {
    return __awaiter(this, void 0, void 0, function* () {
        let expires = "Thu, 01 Jan 1970 00:00:01 GMT";
        let cookieVal = "";
        if (value !== undefined) {
            cookieVal = value;
            expires = undefined; // set cookie without expiry
        }
        if (
            scope === "localhost" ||
            scope ===
                recipe$1.windowHandler.WindowHandlerReference.getReferenceOrThrow().windowHandler.location.getHostName() ||
            scope === undefined
        ) {
            // since some browsers ignore cookies with domain set to localhost
            // see https://github.com/supertokens/supertokens-website/issues/25
            if (expires !== undefined) {
                yield cookieHandler.CookieHandlerReference.getReferenceOrThrow().cookieHandler.setCookie(
                    `${name}=${cookieVal};expires=${expires};path=/;samesite=lax`
                );
            } else {
                yield cookieHandler.CookieHandlerReference.getReferenceOrThrow().cookieHandler.setCookie(
                    `${name}=${cookieVal};expires=Fri, 31 Dec 9999 23:59:59 GMT;path=/;samesite=lax`
                );
            }
        } else {
            if (expires !== undefined) {
                yield cookieHandler.CookieHandlerReference.getReferenceOrThrow().cookieHandler.setCookie(
                    `${name}=${cookieVal};expires=${expires};domain=${scope};path=/;samesite=lax`
                );
            } else {
                yield cookieHandler.CookieHandlerReference.getReferenceOrThrow().cookieHandler.setCookie(
                    `${name}=${cookieVal};domain=${scope};expires=Fri, 31 Dec 9999 23:59:59 GMT;path=/;samesite=lax`
                );
            }
        }
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
const useOnMountAPICall = (fetch, handleResponse, handleError, startLoading = true) => {
    const consumeReq = React.useRef();
    const [error, setError] = React.useState(undefined);
    React.useEffect(() => {
        const effect = (signal) =>
            __awaiter(void 0, void 0, void 0, function* () {
                let resp;
                try {
                    if (consumeReq.current === undefined) {
                        consumeReq.current = fetch();
                    }
                    resp = yield consumeReq.current;
                    if (!signal.aborted) {
                        void handleResponse(resp);
                    }
                } catch (err) {
                    if (!signal.aborted) {
                        if (handleError !== undefined) {
                            handleError(err, resp);
                        } else {
                            setError(err);
                        }
                    }
                }
            });
        if (startLoading) {
            const ctrl = new AbortController();
            void effect(ctrl.signal);
            return () => {
                ctrl.abort();
            };
        }
        return;
    }, [setError, consumeReq, fetch, handleResponse, handleError, startLoading]);
    if (error) {
        throw error;
    }
};
function saveInvalidClaimRedirectPathInContext(userContext, invalidClaimRedirectPath) {
    if (userContext["_default"] === undefined) {
        userContext["_default"] = {};
    }
    if (userContext["_default"].redirectPath === undefined) {
        userContext["_default"] = Object.assign(Object.assign({}, userContext["_default"]), {
            invalidClaimRedirectPath,
        });
    }
}
function popInvalidClaimRedirectPathFromContext(userContext) {
    var _a;
    const res = (_a = userContext["_default"]) === null || _a === void 0 ? void 0 : _a.invalidClaimRedirectPath;
    if (res !== undefined) {
        delete userContext["_default"].invalidClaimRedirectPath;
    }
    return res;
}

class TranslationController {
    constructor() {
        this.handlers = new Map();
    }
    emit(event, detail) {
        const handlerList = this.handlers.get(event) || [];
        for (const h of handlerList) {
            h(event, detail);
        }
    }
    on(event, handler) {
        const handlerList = this.handlers.get(event) || [];
        this.handlers.set(event, handlerList.concat(handler));
    }
    off(event, handler) {
        const handlerList = this.handlers.get(event) || [];
        this.handlers.set(
            event,
            handlerList.filter((h) => h !== handler)
        );
    }
}
const CURRENT_LANGUAGE_COOKIE_NAME = "sCurrLanguage";
function saveCurrentLanguage(language, cookieDomain) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield setFrontendCookie(CURRENT_LANGUAGE_COOKIE_NAME, language, cookieDomain);
        } catch (_a) {
            // This can throw if we are not in a browser
            // Since this is just saving a preference we can safely ignore the exception
        }
    });
}
function getCurrentLanguageFromCookie() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            return yield getCookieValue(CURRENT_LANGUAGE_COOKIE_NAME);
        } catch (_a) {
            // This can throw if we are not in a browser
            // Since this is just loading a preference we can safely ignore the exception
            return null;
        }
    });
}

function RoutingComponent(props) {
    var _a;
    const stInstance = props.supertokensInstance;
    const path = props.path;
    const componentToRender = React.useMemo(() => {
        // During development, this runs twice so as to warn devs of if there
        // are any side effects that happen here. So in tests, it will result in
        // the console log twice
        return stInstance.getMatchingComponentForRouteAndRecipeId(new NormalisedURLPath(path));
    }, [stInstance, path]);
    const history =
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
    const routerInfo = supertokensInstance.getReactRouterDomWithCustomHistory();
    if (routerInfo === undefined) {
        return [];
    }
    const Route = routerInfo.router.Route;
    const pathsToFeatureComponentWithRecipeIdMap = supertokensInstance.getPathsToFeatureComponentWithRecipeIdMap();
    return Object.keys(pathsToFeatureComponentWithRecipeIdMap).map((path) => {
        path = path === "" ? "/" : path;
        return jsxRuntime.jsx(
            Route,
            Object.assign(
                { exact: true, path: path },
                { children: jsxRuntime.jsx(RoutingComponent, { supertokensInstance: supertokensInstance, path: path }) }
            ),
            `st-${path}`
        );
    });
}

/*
 * Component.
 */
function getSuperTokensRoutesForReactRouterDomV6(supertokensInstance) {
    const routerInfo = supertokensInstance.getReactRouterDomWithCustomHistory();
    if (routerInfo === undefined) {
        return [];
    }
    const Route = routerInfo.router.Route;
    const pathsToFeatureComponentWithRecipeIdMap = supertokensInstance.getPathsToFeatureComponentWithRecipeIdMap();
    return Object.keys(pathsToFeatureComponentWithRecipeIdMap).map((path) => {
        path = path === "" ? "/" : path;
        return jsxRuntime.jsx(
            Route,
            {
                path: path,
                element: jsxRuntime.jsx(RoutingComponent, { supertokensInstance: supertokensInstance, path: path }),
            },
            `st-${path}`
        );
    });
}

var postSuperTokensInitCallbacks$1 = {};

var postSuperTokensInitCallbacks = {};

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
Object.defineProperty(postSuperTokensInitCallbacks, "__esModule", { value: true });
postSuperTokensInitCallbacks.PostSuperTokensInitCallbacks = void 0;
var PostSuperTokensInitCallbacks = /** @class */ (function () {
    function PostSuperTokensInitCallbacks() {}
    PostSuperTokensInitCallbacks.addPostInitCallback = function (cb) {
        PostSuperTokensInitCallbacks.postInitCallbacks.push(cb);
    };
    PostSuperTokensInitCallbacks.runPostInitCallbacks = function () {
        for (var _i = 0, _a = PostSuperTokensInitCallbacks.postInitCallbacks; _i < _a.length; _i++) {
            var cb = _a[_i];
            cb();
        }
    };
    PostSuperTokensInitCallbacks.postInitCallbacks = [];
    return PostSuperTokensInitCallbacks;
})();
postSuperTokensInitCallbacks.PostSuperTokensInitCallbacks = PostSuperTokensInitCallbacks;

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
    __export(postSuperTokensInitCallbacks);
})(postSuperTokensInitCallbacks$1);

/*
 * Class.
 */
class SuperTokens {
    /*
     * Constructor.
     */
    constructor(config) {
        this.recipeList = [];
        /*
         * Instance Methods.
         */
        this.canHandleRoute = () => {
            return this.getMatchingComponentForRouteAndRecipeId(getCurrentNormalisedUrlPath()) !== undefined;
        };
        this.getRoutingComponent = () => {
            return jsxRuntime.jsx(RoutingComponent, {
                path: getCurrentNormalisedUrlPath().getAsStringDangerous(),
                supertokensInstance: this,
            });
        };
        this.getPathsToFeatureComponentWithRecipeIdMap = () => {
            // Memoized version of the map.
            if (this.pathsToFeatureComponentWithRecipeIdMap !== undefined) {
                return this.pathsToFeatureComponentWithRecipeIdMap;
            }
            const pathsToFeatureComponentWithRecipeIdMap = {};
            for (let i = 0; i < this.recipeList.length; i++) {
                const recipe = this.recipeList[i];
                const features = recipe.getFeatures();
                const featurePaths = Object.keys(features);
                for (let j = 0; j < featurePaths.length; j++) {
                    // If no components yet for this route, initialize empty array.
                    const featurePath = featurePaths[j];
                    if (pathsToFeatureComponentWithRecipeIdMap[featurePath] === undefined) {
                        pathsToFeatureComponentWithRecipeIdMap[featurePath] = [];
                    }
                    pathsToFeatureComponentWithRecipeIdMap[featurePath].push(features[featurePath]);
                }
            }
            this.pathsToFeatureComponentWithRecipeIdMap = pathsToFeatureComponentWithRecipeIdMap;
            return this.pathsToFeatureComponentWithRecipeIdMap;
        };
        this.getMatchingComponentForRouteAndRecipeId = (normalisedUrl) => {
            const path = normalisedUrl.getAsStringDangerous();
            const routeComponents = this.getPathsToFeatureComponentWithRecipeIdMap()[path];
            if (routeComponents === undefined) {
                return undefined;
            }
            const component = routeComponents.find((c) => c.matches());
            if (component !== undefined) {
                return component;
            }
            // Otherwise, If no recipe Id provided, or if no recipe id matches, return the first matching component.
            return routeComponents[0];
        };
        this.getReactRouterDomWithCustomHistory = () => {
            return SuperTokens.reactRouterDom;
        };
        this.changeLanguage = (lang) =>
            __awaiter(this, void 0, void 0, function* () {
                yield saveCurrentLanguage(lang, this.languageTranslations.currentLanguageCookieScope);
                this.languageTranslations.translationEventSource.emit("LanguageChange", lang);
            });
        this.redirectToAuth = (options) =>
            __awaiter(this, void 0, void 0, function* () {
                const queryParams = options.queryParams === undefined ? {} : options.queryParams;
                if (options.show !== undefined) {
                    queryParams.show = options.show;
                }
                if (options.redirectBack === true) {
                    queryParams.redirectToPath = getCurrentNormalisedUrlPath().getAsStringDangerous();
                }
                let redirectUrl = yield this.getRedirectUrl({
                    action: "TO_AUTH",
                    showSignIn: options.show === "signin",
                });
                redirectUrl = appendQueryParamsToURL(redirectUrl, queryParams);
                return this.redirectToUrl(redirectUrl, options.history);
            });
        this.redirectToUrl = (redirectUrl, history) =>
            __awaiter(this, void 0, void 0, function* () {
                try {
                    new URL(redirectUrl); // If full URL, no error thrown, skip in app redirection.
                } catch (e) {
                    // For multi tenancy, If mismatch between websiteDomain and current location, prepend URL relative path with websiteDomain.
                    const origin = getOriginOfPage().getAsStringDangerous();
                    if (origin !== this.appInfo.websiteDomain.getAsStringDangerous()) {
                        redirectUrl = `${this.appInfo.websiteDomain.getAsStringDangerous()}${redirectUrl}`;
                        redirectWithFullPageReload(redirectUrl);
                        return;
                    }
                    // If history was provided, use to redirect without reloading.
                    if (history !== undefined) {
                        redirectWithHistory(redirectUrl, history);
                        return;
                    }
                }
                // Otherwise, redirect in app.
                redirectWithFullPageReload(redirectUrl);
            });
        this.appInfo = normaliseInputAppInfoOrThrowError(config.appInfo);
        if (config.recipeList === undefined || config.recipeList.length === 0) {
            throw new Error(
                "Please provide at least one recipe to the supertokens.init function call. See https://supertokens.io/docs/emailpassword/quick-setup/frontend"
            );
        }
        const translationConfig = config.languageTranslations === undefined ? {} : config.languageTranslations;
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
        let enableDebugLogs = false;
        if (config.enableDebugLogs !== undefined) {
            enableDebugLogs = config.enableDebugLogs;
        }
        this.userGetRedirectionURL = config.getRedirectionURL;
        this.recipeList = config.recipeList.map((recipe) => {
            return recipe(this.appInfo, enableDebugLogs);
        });
    }
    /*
     * Static Methods.
     */
    static init(config) {
        cookieHandler.CookieHandlerReference.init(config.cookieHandler);
        recipe$1.windowHandler.WindowHandlerReference.init(config.windowHandler);
        if (SuperTokens.instance !== undefined) {
            console.warn("SuperTokens was already initialized");
            return;
        }
        SuperTokens.instance = new SuperTokens(config);
        postSuperTokensInitCallbacks$1.PostSuperTokensInitCallbacks.runPostInitCallbacks();
    }
    static getInstanceOrThrow() {
        if (SuperTokens.instance === undefined) {
            let error = "SuperTokens must be initialized before calling this method.";
            // eslint-disable-next-line supertokens-auth-react/no-direct-window-object
            if (typeof window === "undefined") {
                error = error + SSR_ERROR;
            }
            throw new Error(error);
        }
        return SuperTokens.instance;
    }
    static canHandleRoute() {
        return SuperTokens.getInstanceOrThrow().canHandleRoute();
    }
    static getRoutingComponent() {
        return SuperTokens.getInstanceOrThrow().getRoutingComponent();
    }
    static getSuperTokensRoutesForReactRouterDom(reactRouterDom) {
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
            const useNavigateHookForRRDV6 = function () {
                const navigateHook = reactRouterDom.useNavigate();
                const [to, setTo] = React__namespace.useState(undefined);
                React__namespace.useEffect(() => {
                    if (to !== undefined) {
                        setTo(undefined);
                        navigateHook(to);
                    }
                }, [to, navigateHook, setTo]);
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
    }
    static getReactRouterDomWithCustomHistory() {
        return this.instance !== undefined ? this.instance.getReactRouterDomWithCustomHistory() : undefined;
    }
    getRecipeOrThrow(recipeId) {
        const recipe = this.recipeList.find((recipe) => {
            return recipe.config.recipeId === recipeId;
        });
        if (recipe === undefined) {
            throw new Error(`Missing recipe: ${recipeId}`);
        }
        return recipe;
    }
    loadTranslation(store) {
        this.languageTranslations.translationEventSource.emit("TranslationLoaded", store);
    }
    getRedirectUrl(context) {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.userGetRedirectionURL) {
                const userRes = yield this.userGetRedirectionURL(context);
                if (userRes !== undefined) {
                    return userRes;
                }
            }
            if (context.action === "TO_AUTH") {
                const redirectUrl = this.appInfo.websiteBasePath.getAsStringDangerous();
                return appendTrailingSlashToURL(redirectUrl);
            }
            throw new Error("Should never come here: unexpected redirection context");
        });
    }
    /*
     * Tests methods.
     */
    static reset() {
        if (!isTest()) {
            return;
        }
        SuperTokens.instance = undefined;
        return;
    }
}
SuperTokens.reactRouterDomIsV6 = undefined;

const UserContextContext = React.createContext(undefined);
const useUserContext = () => {
    return React.useContext(UserContextContext);
};
const UserContextProvider = ({ children, userContext }) => {
    const [currentUserContext] = React.useState(getNormalisedUserContext(userContext));
    return jsxRuntime.jsx(
        UserContextContext.Provider,
        Object.assign({ value: currentUserContext }, { children: children })
    );
};

const SessionContext = React.createContext({
    loading: true,
    isDefault: true,
});

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
class RecipeModule {
    /*
     * Constructor.
     */
    constructor(config) {
        this.redirect = (context, history, queryParams) =>
            __awaiter(this, void 0, void 0, function* () {
                let redirectUrl = yield this.getRedirectUrl(context);
                redirectUrl = appendQueryParamsToURL(redirectUrl, queryParams);
                return SuperTokens.getInstanceOrThrow().redirectToUrl(redirectUrl, history);
            });
        // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
        this.getRedirectUrl = (context) =>
            __awaiter(this, void 0, void 0, function* () {
                // If getRedirectionURL provided by user.
                const redirectUrl = yield this.config.getRedirectionURL(context);
                if (redirectUrl !== undefined) {
                    return redirectUrl;
                }
                // Otherwise, use default.
                return yield this.getDefaultRedirectionURL(context);
            });
        this.config = config;
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    getDefaultRedirectionURL(_) {
        return __awaiter(this, void 0, void 0, function* () {
            throw new Error("getDefaultRedirectionURL is not implemented.");
        });
    }
}

var recipe = {};

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
    __export(recipe$1.recipe);
})(recipe);

function normaliseRecipeModuleConfig(config) {
    let { onHandleEvent, getRedirectionURL, preAPIHook, postAPIHook } = config;
    if (onHandleEvent === undefined) {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-empty-function
        onHandleEvent = (_) => {};
    }
    if (getRedirectionURL === undefined) {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        getRedirectionURL = (_) =>
            __awaiter(this, void 0, void 0, function* () {
                return undefined;
            });
    }
    if (preAPIHook === undefined) {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        preAPIHook = (context) =>
            __awaiter(this, void 0, void 0, function* () {
                return context;
            });
    }
    if (postAPIHook === undefined) {
        // eslint-disable-next-line @typescript-eslint/no-empty-function
        postAPIHook = () => __awaiter(this, void 0, void 0, function* () {});
    }
    let useShadowDom = config.useShadowDom === undefined ? true : config.useShadowDom;
    useShadowDom = getShouldUseShadowDomBasedOnBrowser(useShadowDom);
    const rootStyle = config.style === undefined ? "" : config.style;
    return Object.assign(Object.assign({}, config), {
        getRedirectionURL,
        onHandleEvent,
        preAPIHook,
        postAPIHook,
        useShadowDom,
        rootStyle,
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
class Session extends RecipeModule {
    constructor(config) {
        const normalizedConfig = Object.assign(Object.assign({}, config), normaliseRecipeModuleConfig(config));
        super(normalizedConfig);
        this.eventListeners = new Set();
        this.redirectionHandlersFromAuthRecipes = new Map();
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        this.getFeatureComponent = (_) => {
            throw new Error("should never come here");
        };
        this.getFeatures = () => {
            return {};
        };
        this.getUserId = (input) => {
            return this.webJsRecipe.getUserId(input);
        };
        this.getClaimValue = (input) => {
            return this.webJsRecipe.getClaimValue(input);
        };
        this.getAccessTokenPayloadSecurely = (input) =>
            __awaiter(this, void 0, void 0, function* () {
                return this.webJsRecipe.getAccessTokenPayloadSecurely(input);
            });
        this.doesSessionExist = (input) => {
            return this.webJsRecipe.doesSessionExist(input);
        };
        this.signOut = (input) => {
            return this.webJsRecipe.signOut(input);
        };
        this.attemptRefreshingSession = () =>
            __awaiter(this, void 0, void 0, function* () {
                return this.webJsRecipe.attemptRefreshingSession();
            });
        this.validateClaims = (input) => {
            return this.webJsRecipe.validateClaims(input);
        };
        this.getInvalidClaimsFromResponse = (input) => {
            return this.webJsRecipe.getInvalidClaimsFromResponse(input);
        };
        /**
         * @returns Function to remove event listener
         */
        this.addEventListener = (listener) => {
            this.eventListeners.add(listener);
            return () => this.eventListeners.delete(listener);
        };
        this.addAuthRecipeRedirectionHandler = (rid, redirect) => {
            this.redirectionHandlersFromAuthRecipes.set(rid, redirect);
        };
        this.validateGlobalClaimsAndHandleSuccessRedirection = (redirectInfo, userContext, history) =>
            __awaiter(this, void 0, void 0, function* () {
                // First we check if there is an active session
                if (!(yield this.doesSessionExist({ userContext }))) {
                    // If there is none, we have no way of checking claims, so we redirect to the auth page
                    // This can happen e.g.: if the user clicked on the email verification link in a browser without an active session
                    return SuperTokens.getInstanceOrThrow().redirectToAuth({
                        history,
                        redirectBack: false,
                    });
                }
                // We validate all the global claims
                const invalidClaims = yield this.validateClaims({ userContext });
                // Check if any of those claim errors requests a redirection
                const invalidClaimRedirectPath = popInvalidClaimRedirectPathFromContext(userContext);
                if (invalidClaims.length > 0 && invalidClaimRedirectPath !== undefined) {
                    if (redirectInfo !== undefined) {
                        // if we have to redirect and we have success context we wanted to use we save it in localstorage
                        // this way after the other page did solved the validation error it can contine
                        // the sign in process by calling this function without passing the redirect info
                        const jsonContext = JSON.stringify(redirectInfo);
                        yield setLocalStorage("supertokens-success-redirection-context", jsonContext);
                    }
                    // then we do the redirection.
                    return SuperTokens.getInstanceOrThrow().redirectToUrl(invalidClaimRedirectPath, history);
                }
                // If we don't need to redirect because of a claim, we try and execute the original redirection
                if (redirectInfo === undefined) {
                    // if this wasn't set directly we try and grab it from local storage
                    const successContextStr = yield getLocalStorage("supertokens-success-redirection-context");
                    if (successContextStr !== null) {
                        try {
                            redirectInfo = JSON.parse(successContextStr);
                        } finally {
                            yield removeFromLocalStorage("supertokens-success-redirection-context");
                        }
                    } else {
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
                    }
                }
                // We get the redirection handler registered by the relevant auth recipe
                const authRecipeRedirectHandler = this.redirectionHandlersFromAuthRecipes.get(redirectInfo.rid);
                if (authRecipeRedirectHandler !== undefined) {
                    // and call it with the saved info
                    return authRecipeRedirectHandler(redirectInfo.successRedirectContext, history);
                }
                // This should only happen if the configuration changed between saving the context and finishing the sign in process
                // or if the user navigated to a page where they were expected to have a stored redirectInfo but didn't
                // (e.g.: pressed back after email verification)
                return this.redirect(redirectInfo.successRedirectContext, history);
            });
        /**
         * This should only get called if validateGlobalClaimsAndHandleSuccessRedirection couldn't get a redirectInfo
         * @returns "/"
         */
        this.getDefaultRedirectionURL = () =>
            __awaiter(this, void 0, void 0, function* () {
                return "/";
            });
        this.notifyListeners = (event) =>
            __awaiter(this, void 0, void 0, function* () {
                const sessionContext = yield this.getSessionContext(event);
                // We copy this.eventListeners into a new array to "freeze" it for the loop
                // We do this to avoid an infinite loop in case one of the listeners causes a new listener to be added (e.g.: through re-rendering)
                Array.from(this.eventListeners).forEach((listener) =>
                    listener(Object.assign({ sessionContext }, event))
                );
            });
        this.webJsRecipe = new recipe.Recipe(
            Object.assign(Object.assign({}, normalizedConfig), {
                onHandleEvent: (event) => {
                    if (config.onHandleEvent !== undefined) {
                        config.onHandleEvent(event);
                    }
                    void this.notifyListeners(event);
                },
                preAPIHook: (context) =>
                    __awaiter(this, void 0, void 0, function* () {
                        const response = Object.assign(Object.assign({}, context), {
                            requestInit: Object.assign(Object.assign({}, context.requestInit), {
                                headers: Object.assign(Object.assign({}, context.requestInit.headers), {
                                    rid: config.recipeId,
                                }),
                            }),
                        });
                        if (config.preAPIHook === undefined) {
                            return response;
                        } else {
                            return config.preAPIHook(context);
                        }
                    }),
            })
        );
    }
    getSessionContext({ action, userContext }) {
        return __awaiter(this, void 0, void 0, function* () {
            if (
                action === "SESSION_CREATED" ||
                action === "REFRESH_SESSION" ||
                action === "API_INVALID_CLAIM" ||
                action === "ACCESS_TOKEN_PAYLOAD_UPDATED"
            ) {
                const [userId, accessTokenPayload] = yield Promise.all([
                    this.getUserId({
                        userContext,
                    }),
                    this.getAccessTokenPayloadSecurely({
                        userContext,
                    }),
                ]);
                return {
                    doesSessionExist: true,
                    accessTokenPayload,
                    userId,
                };
            }
            if (action === "SIGN_OUT" || action === "UNAUTHORISED") {
                return {
                    doesSessionExist: false,
                    accessTokenPayload: {},
                    userId: "",
                };
            }
            throw new Error(`Unhandled recipe event: ${action}`);
        });
    }
    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    static addAxiosInterceptors(axiosInstance, userContext) {
        return recipe.Recipe.addAxiosInterceptors(axiosInstance, userContext);
    }
    static init(config) {
        return (appInfo, enableDebugLogs) => {
            Session.instance = new Session(
                Object.assign(Object.assign({}, config), { appInfo, recipeId: Session.RECIPE_ID, enableDebugLogs })
            );
            return Session.instance;
        };
    }
    static getInstanceOrThrow() {
        if (Session.instance === undefined) {
            throw Error(
                "No instance of Session found. Make sure to call the Session.init method. See https://supertokens.io/docs/emailpassword/quick-setup/frontend"
            );
        }
        return Session.instance;
    }
    static getInstance() {
        return Session.instance;
    }
    static reset() {
        if (!isTest()) {
            return;
        }
        Session.instance = undefined;
        return;
    }
}
Session.RECIPE_ID = "session";

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
            Object.assign({ userContext: props.userContext }, { children: props.children })
        );
    }
    return jsxRuntime.jsx(UserContextContext.Consumer, {
        children: (value) => {
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

const SessionAuth = (_a) => {
    var _b;
    var { children } = _a,
        props = __rest(_a, ["children"]);
    const requireAuth = React.useRef(props.requireAuth);
    if (props.requireAuth !== requireAuth.current) {
        throw new Error(
            // eslint-disable-next-line @typescript-eslint/quotes
            'requireAuth prop should not change. If you are seeing this, it probably means that you are using SessionAuth in multiple routes with different values for requireAuth. To solve this, try adding the "key" prop to all uses of SessionAuth like <SessionAuth key="someUniqueKeyPerRoute" requireAuth={...}>'
        );
    }
    // Reusing the parent context was removed because it caused a redirect loop in an edge case
    // because it'd also reuse the invalid claims part until it loaded.
    const [context, setContext] = React.useState({ loading: true });
    const session = React.useRef();
    // We store this here, to prevent the list of called hooks changing even if a history hook is added later to SuperTokens.
    const historyHookRef = React.useRef(
        (_b = SuperTokens.getReactRouterDomWithCustomHistory()) === null || _b === void 0 ? void 0 : _b.useHistoryCustom
    );
    let history;
    try {
        if (historyHookRef.current) {
            history = historyHookRef.current();
        }
    } catch (_c) {
        // We catch and ignore errors here, because if this is may throw if
        // the app is using react-router-dom but added a session auth outside of the router.
    }
    const userContext = useUserContext();
    const redirectToLogin = React.useCallback(() => {
        void SuperTokens.getInstanceOrThrow().redirectToAuth({ history, redirectBack: true });
    }, []);
    const buildContext = React.useCallback(
        () =>
            __awaiter(void 0, void 0, void 0, function* () {
                if (session.current === undefined) {
                    session.current = Session.getInstanceOrThrow();
                }
                const sessionExists = yield session.current.doesSessionExist({
                    userContext,
                });
                if (sessionExists === false) {
                    return {
                        loading: false,
                        doesSessionExist: false,
                        accessTokenPayload: {},
                        invalidClaims: [],
                        userId: "",
                    };
                }
                let invalidClaims;
                try {
                    invalidClaims = yield session.current.validateClaims({
                        overrideGlobalClaimValidators: props.overrideGlobalClaimValidators,
                        userContext,
                    });
                } catch (err) {
                    // These errors should only come from getAccessTokenPayloadSecurely inside validateClaims if refreshing a claim cleared the session
                    // Which means that the session was most likely cleared, meaning returning false is right.
                    // This might also happen if the user provides an override or a custom claim validator that throws (or if we have a bug)
                    // In which case the session will not be cleared so we rethrow the error
                    if (
                        yield session.current.doesSessionExist({
                            userContext,
                        })
                    ) {
                        throw err;
                    }
                    return {
                        loading: false,
                        doesSessionExist: false,
                        accessTokenPayload: {},
                        invalidClaims: [],
                        userId: "",
                    };
                }
                // TODO: basing redirection on userContext could break in certain edge-cases involving async validators
                const invalidClaimRedirectToPath = popInvalidClaimRedirectPathFromContext(userContext);
                try {
                    return {
                        loading: false,
                        doesSessionExist: true,
                        invalidClaims,
                        invalidClaimRedirectToPath,
                        accessTokenPayload: yield session.current.getAccessTokenPayloadSecurely({
                            userContext,
                        }),
                        userId: yield session.current.getUserId({
                            userContext,
                        }),
                    };
                } catch (err) {
                    if (
                        yield session.current.doesSessionExist({
                            userContext,
                        })
                    ) {
                        throw err;
                    }
                    // This means that loading the access token or the userId failed
                    // This may happen if the server cleared the error since the validation was done which should be extremely rare
                    return {
                        loading: false,
                        doesSessionExist: false,
                        accessTokenPayload: {},
                        invalidClaims: [],
                        userId: "",
                    };
                }
            }),
        []
    );
    const setInitialContextAndMaybeRedirect = React.useCallback(
        (toSetContext) =>
            __awaiter(void 0, void 0, void 0, function* () {
                if (context.loading === false) {
                    return;
                }
                if (props.doRedirection !== false) {
                    if (!toSetContext.doesSessionExist && props.requireAuth !== false) {
                        redirectToLogin();
                        return;
                    } else if (toSetContext.invalidClaimRedirectToPath !== undefined) {
                        yield SuperTokens.getInstanceOrThrow().redirectToUrl(
                            toSetContext.invalidClaimRedirectToPath,
                            history
                        );
                        return;
                    }
                }
                delete toSetContext.invalidClaimRedirectToPath;
                setContext(toSetContext);
            }),
        [props.doRedirection, props.requireAuth, redirectToLogin, context]
    );
    useOnMountAPICall(buildContext, setInitialContextAndMaybeRedirect);
    // subscribe to events on mount
    React.useEffect(() => {
        function onHandleEvent(event) {
            return __awaiter(this, void 0, void 0, function* () {
                switch (event.action) {
                    // We intentionally fall through as they are all handled the same way.
                    case "SESSION_CREATED":
                    case "REFRESH_SESSION":
                    case "ACCESS_TOKEN_PAYLOAD_UPDATED":
                    case "API_INVALID_CLAIM": {
                        // In general the user should not be calling APIs that fail w/ invalid claim
                        // This may suggest that a claim was invalidated in the meantime
                        // so we re-validate even if the session context wasn't updated.
                        const invalidClaims = yield session.current.validateClaims({
                            overrideGlobalClaimValidators: props.overrideGlobalClaimValidators,
                            userContext,
                        });
                        setContext(
                            Object.assign(Object.assign({}, event.sessionContext), { loading: false, invalidClaims })
                        );
                        const redirectPath = popInvalidClaimRedirectPathFromContext(userContext);
                        if (props.doRedirection !== false && redirectPath) {
                            yield SuperTokens.getInstanceOrThrow().redirectToUrl(redirectPath, history);
                        }
                        return;
                    }
                    case "SIGN_OUT":
                        setContext(
                            Object.assign(Object.assign({}, event.sessionContext), {
                                loading: false,
                                invalidClaims: [],
                            })
                        );
                        return;
                    case "UNAUTHORISED":
                        setContext(
                            Object.assign(Object.assign({}, event.sessionContext), {
                                loading: false,
                                invalidClaims: [],
                            })
                        );
                        if (props.onSessionExpired !== undefined) {
                            props.onSessionExpired();
                        } else if (props.requireAuth !== false && props.doRedirection !== false) {
                            redirectToLogin();
                        }
                        return;
                }
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
    }, [props, setContext, context.loading]);
    if (props.requireAuth !== false && (context.loading || !context.doesSessionExist)) {
        return null;
    }
    return jsxRuntime.jsx(SessionContext.Provider, Object.assign({ value: context }, { children: children }));
};
const SessionAuthWrapper = (props) => {
    return jsxRuntime.jsx(
        UserContextWrapper,
        Object.assign(
            { userContext: props.userContext },
            { children: jsxRuntime.jsx(SessionAuth, Object.assign({}, props)) }
        )
    );
};

exports.NormalisedURLPath = NormalisedURLPath;
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
exports.__rest = __rest;
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
exports.postSuperTokensInitCallbacks = postSuperTokensInitCallbacks;
exports.postSuperTokensInitCallbacks$1 = postSuperTokensInitCallbacks$1;
exports.redirectWithFullPageReload = redirectWithFullPageReload;
exports.saveInvalidClaimRedirectPathInContext = saveInvalidClaimRedirectPathInContext;
exports.useOnMountAPICall = useOnMountAPICall;
exports.useUserContext = useUserContext;
exports.validateForm = validateForm;
//# sourceMappingURL=session-shared.js.map
