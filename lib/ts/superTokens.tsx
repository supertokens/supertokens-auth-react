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
import * as React from "react";
import { CookieHandlerReference } from "supertokens-web-js/utils/cookieHandler";
import { PostSuperTokensInitCallbacks } from "supertokens-web-js/utils/postSuperTokensInitCallbacks";
import { WindowHandlerReference } from "supertokens-web-js/utils/windowHandler";

import { RoutingComponent } from "./components/routingComponent";
import { getSuperTokensRoutesForReactRouterDom } from "./components/superTokensRoute";
import { getSuperTokensRoutesForReactRouterDomV6 } from "./components/superTokensRouteV6";
import { SSR_ERROR } from "./constants";
import { saveCurrentLanguage, TranslationController } from "./translation/translationHelpers";
import {
    appendQueryParamsToURL,
    appendTrailingSlashToURL,
    getCurrentNormalisedUrlPath,
    getDefaultCookieScope,
    getOriginOfPage,
    isTest,
    normaliseCookieScopeOrThrowError,
    normaliseInputAppInfoOrThrowError,
    redirectWithFullPageReload,
    redirectWithHistory,
} from "./utils";

import type RecipeModule from "./recipe/recipeModule";
import type { NormalisedConfig as NormalisedRecipeModuleConfig } from "./recipe/recipeModule/types";
import type { TranslationFunc, TranslationStore } from "./translation/translationHelpers";
import type {
    ComponentWithRecipeAndMatchingMethod,
    GetRedirectionURLContext,
    NormalisedAppInfo,
    SuperTokensConfig,
} from "./types";
import type { BaseFeatureComponentMap } from "./types";
import type NormalisedURLPath from "supertokens-web-js/utils/normalisedURLPath";

/*
 * Class.
 */

export default class SuperTokens {
    /*
     * Static Attributes.
     */
    private static instance?: SuperTokens;

    private static reactRouterDom?: { router: { Route: any }; useHistoryCustom: () => any };
    private static reactRouterDomIsV6: boolean | undefined = undefined;

    /*
     * Instance Attributes.
     */
    appInfo: NormalisedAppInfo;
    languageTranslations: {
        defaultLanguage: string;
        userTranslationStore: TranslationStore;
        currentLanguageCookieScope: string | undefined;
        translationEventSource: TranslationController;
        userTranslationFunc?: TranslationFunc;
    };
    recipeList: RecipeModule<any, any, any, any>[] = [];
    private pathsToFeatureComponentWithRecipeIdMap?: BaseFeatureComponentMap;
    private userGetRedirectionURL: SuperTokensConfig["getRedirectionURL"];
    /*
     * Constructor.
     */
    constructor(config: SuperTokensConfig) {
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
    static init(config: SuperTokensConfig): void {
        CookieHandlerReference.init(config.cookieHandler);
        WindowHandlerReference.init(config.windowHandler);

        if (SuperTokens.instance !== undefined) {
            console.warn("SuperTokens was already initialized");
            return;
        }

        SuperTokens.instance = new SuperTokens(config);

        PostSuperTokensInitCallbacks.runPostInitCallbacks();
    }

    static getInstanceOrThrow(): SuperTokens {
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

    static canHandleRoute(): boolean {
        return SuperTokens.getInstanceOrThrow().canHandleRoute();
    }

    static getRoutingComponent(): JSX.Element | null {
        return SuperTokens.getInstanceOrThrow().getRoutingComponent();
    }

    static getSuperTokensRoutesForReactRouterDom(reactRouterDom: any): JSX.Element[] {
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
            const useNavigateHookForRRDV6 = function (): any {
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

            return getSuperTokensRoutesForReactRouterDomV6(SuperTokens.getInstanceOrThrow());
        }
        SuperTokens.reactRouterDom = {
            router: reactRouterDom,
            useHistoryCustom: reactRouterDom.useHistory,
        };
        return getSuperTokensRoutesForReactRouterDom(SuperTokens.getInstanceOrThrow());
    }

    static getReactRouterDomWithCustomHistory(): { router: { Route: any }; useHistoryCustom: () => any } | undefined {
        return this.instance !== undefined ? this.instance.getReactRouterDomWithCustomHistory() : undefined;
    }

    /*
     * Instance Methods.
     */
    canHandleRoute = (): boolean => {
        return this.getMatchingComponentForRouteAndRecipeId(getCurrentNormalisedUrlPath()) !== undefined;
    };

    getRoutingComponent = (): JSX.Element | null => {
        return (
            <RoutingComponent path={getCurrentNormalisedUrlPath().getAsStringDangerous()} supertokensInstance={this} />
        );
    };

    getPathsToFeatureComponentWithRecipeIdMap = (): BaseFeatureComponentMap => {
        // Memoized version of the map.
        if (this.pathsToFeatureComponentWithRecipeIdMap !== undefined) {
            return this.pathsToFeatureComponentWithRecipeIdMap;
        }

        const pathsToFeatureComponentWithRecipeIdMap: BaseFeatureComponentMap = {};
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

    getMatchingComponentForRouteAndRecipeId = (
        normalisedUrl: NormalisedURLPath
    ): ComponentWithRecipeAndMatchingMethod | undefined => {
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

    getRecipeOrThrow<T, S, R, N extends NormalisedRecipeModuleConfig<T, S, R>>(
        recipeId: string
    ): RecipeModule<T, S, R, N> {
        const recipe = this.recipeList.find((recipe) => {
            return recipe.config.recipeId === recipeId;
        });

        if (recipe === undefined) {
            throw new Error(`Missing recipe: ${recipeId}`);
        }

        return recipe as RecipeModule<T, S, R, N>;
    }

    getReactRouterDomWithCustomHistory = (): { router: { Route: any }; useHistoryCustom: () => any } | undefined => {
        return SuperTokens.reactRouterDom;
    };

    changeLanguage = async (lang: string): Promise<void> => {
        await saveCurrentLanguage(lang, this.languageTranslations.currentLanguageCookieScope);
        this.languageTranslations.translationEventSource.emit("LanguageChange", lang);
    };

    loadTranslation(store: TranslationStore): void {
        this.languageTranslations.translationEventSource.emit("TranslationLoaded", store);
    }

    async getRedirectUrl(context: GetRedirectionURLContext): Promise<string> {
        if (this.userGetRedirectionURL) {
            const userRes = await this.userGetRedirectionURL(context);
            if (userRes !== undefined) {
                return userRes;
            }
        }
        if (context.action === "TO_AUTH") {
            const redirectUrl = this.appInfo.websiteBasePath.getAsStringDangerous();
            return appendTrailingSlashToURL(redirectUrl);
        }
        throw new Error("Should never come here: unexpected redirection context");
    }

    redirectToAuth = async (options: {
        show?: "signin" | "signup";
        history?: any;
        queryParams?: any;
        redirectBack: boolean;
    }) => {
        const queryParams = options.queryParams === undefined ? {} : options.queryParams;
        if (options.show !== undefined) {
            queryParams.show = options.show;
        }
        if (options.redirectBack === true) {
            queryParams.redirectToPath = getCurrentNormalisedUrlPath().getAsStringDangerous();
        }

        let redirectUrl = await this.getRedirectUrl({
            action: "TO_AUTH",
            showSignIn: options.show === "signin",
        });
        redirectUrl = appendQueryParamsToURL(redirectUrl, queryParams);
        return this.redirectToUrl(redirectUrl, options.history);
    };

    redirectToUrl = async (redirectUrl: string, history?: any): Promise<void> => {
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
    };

    /*
     * Tests methods.
     */
    static reset(): void {
        if (!isTest()) {
            return;
        }

        SuperTokens.instance = undefined;
        return;
    }
}
