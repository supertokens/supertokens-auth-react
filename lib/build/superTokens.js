"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const jsx_runtime_1 = require("@emotion/react/jsx-runtime");
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
const React = tslib_1.__importStar(require("react"));
const utils_1 = require("./utils");
const superTokensRoute_1 = require("./components/superTokensRoute");
const superTokensRouteV6_1 = require("./components/superTokensRouteV6");
const constants_1 = require("./constants");
const routingComponent_1 = require("./components/routingComponent");
const translationHelpers_1 = require("./translation/translationHelpers");
const cookieHandler_1 = require("supertokens-website/utils/cookieHandler");
const windowHandler_1 = require("supertokens-website/utils/windowHandler");
const postSuperTokensInitCallbacks_1 = require("supertokens-web-js/utils/postSuperTokensInitCallbacks");
const supertokens_web_js_1 = tslib_1.__importDefault(require("supertokens-web-js"));
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
            return (
                this.getMatchingComponentForRouteAndRecipeId((0, utils_1.getCurrentNormalisedUrlPath)()) !== undefined
            );
        };
        this.getRoutingComponent = () => {
            return (0, jsx_runtime_1.jsx)(routingComponent_1.RoutingComponent, {
                path: (0, utils_1.getCurrentNormalisedUrlPath)().getAsStringDangerous(),
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
            tslib_1.__awaiter(this, void 0, void 0, function* () {
                yield (0,
                translationHelpers_1.saveCurrentLanguage)(lang, this.languageTranslations.currentLanguageCookieScope);
                this.languageTranslations.translationEventSource.emit("LanguageChange", lang);
            });
        this.redirectToAuth = (options) =>
            tslib_1.__awaiter(this, void 0, void 0, function* () {
                const queryParams = options.queryParams === undefined ? {} : options.queryParams;
                if (options.show !== undefined) {
                    queryParams.show = options.show;
                }
                if (options.redirectBack === true) {
                    queryParams.redirectToPath = (0, utils_1.getCurrentNormalisedUrlPath)().getAsStringDangerous();
                }
                let redirectUrl = yield this.getRedirectUrl({
                    action: "TO_AUTH",
                    showSignIn: options.show === "signin",
                });
                redirectUrl = (0, utils_1.appendQueryParamsToURL)(redirectUrl, queryParams);
                return this.redirectToUrl(redirectUrl, options.history);
            });
        this.redirectToUrl = (redirectUrl, history) =>
            tslib_1.__awaiter(this, void 0, void 0, function* () {
                try {
                    new URL(redirectUrl); // If full URL, no error thrown, skip in app redirection.
                } catch (e) {
                    // For multi tenancy, If mismatch between websiteDomain and current location, prepend URL relative path with websiteDomain.
                    const origin = (0, utils_1.getOriginOfPage)().getAsStringDangerous();
                    if (origin !== this.appInfo.websiteDomain.getAsStringDangerous()) {
                        redirectUrl = `${this.appInfo.websiteDomain.getAsStringDangerous()}${redirectUrl}`;
                        (0, utils_1.redirectWithFullPageReload)(redirectUrl);
                        return;
                    }
                    // If history was provided, use to redirect without reloading.
                    if (history !== undefined) {
                        (0, utils_1.redirectWithHistory)(redirectUrl, history);
                        return;
                    }
                }
                // Otherwise, redirect in app.
                (0, utils_1.redirectWithFullPageReload)(redirectUrl);
            });
        this.appInfo = (0, utils_1.normaliseInputAppInfoOrThrowError)(config.appInfo);
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
                    ? (0, utils_1.normaliseCookieScopeOrThrowError)(translationConfig.currentLanguageCookieScope)
                    : (0, utils_1.getDefaultCookieScope)(),
            userTranslationStore: translationConfig.translations !== undefined ? translationConfig.translations : {},
            translationEventSource: new translationHelpers_1.TranslationController(),
            userTranslationFunc: translationConfig.translationFunc,
        };
        let enableDebugLogs = false;
        if (config.enableDebugLogs !== undefined) {
            enableDebugLogs = config.enableDebugLogs;
        }
        this.userGetRedirectionURL = config.getRedirectionURL;
        this.recipeList = config.recipeList.map(({ authReact }) => {
            return authReact(this.appInfo, enableDebugLogs);
        });
    }
    /*
     * Static Methods.
     */
    static init(config) {
        cookieHandler_1.CookieHandlerReference.init(config.cookieHandler);
        windowHandler_1.WindowHandlerReference.init(config.windowHandler);
        if (SuperTokens.instance !== undefined) {
            console.warn("SuperTokens was already initialized");
            return;
        }
        supertokens_web_js_1.default.init(
            Object.assign(Object.assign({}, config), { recipeList: config.recipeList.map(({ webJS }) => webJS) })
        );
        SuperTokens.instance = new SuperTokens(config);
        postSuperTokensInitCallbacks_1.PostSuperTokensInitCallbacks.runPostInitCallbacks();
    }
    static getInstanceOrThrow() {
        if (SuperTokens.instance === undefined) {
            let error = "SuperTokens must be initialized before calling this method.";
            // eslint-disable-next-line supertokens-auth-react/no-direct-window-object
            if (typeof window === "undefined") {
                error = error + constants_1.SSR_ERROR;
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
                const [to, setTo] = React.useState(undefined);
                React.useEffect(() => {
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
            return (0, superTokensRouteV6_1.getSuperTokensRoutesForReactRouterDomV6)(SuperTokens.getInstanceOrThrow());
        }
        SuperTokens.reactRouterDom = {
            router: reactRouterDom,
            useHistoryCustom: reactRouterDom.useHistory,
        };
        return (0, superTokensRoute_1.getSuperTokensRoutesForReactRouterDom)(SuperTokens.getInstanceOrThrow());
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
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            if (this.userGetRedirectionURL) {
                const userRes = yield this.userGetRedirectionURL(context);
                if (userRes !== undefined) {
                    return userRes;
                }
            }
            if (context.action === "TO_AUTH") {
                const redirectUrl = this.appInfo.websiteBasePath.getAsStringDangerous();
                return (0, utils_1.appendTrailingSlashToURL)(redirectUrl);
            }
            throw new Error("Should never come here: unexpected redirection context");
        });
    }
    /*
     * Tests methods.
     */
    static reset() {
        if (!(0, utils_1.isTest)()) {
            return;
        }
        SuperTokens.instance = undefined;
        return;
    }
}
exports.default = SuperTokens;
SuperTokens.reactRouterDomIsV6 = undefined;
