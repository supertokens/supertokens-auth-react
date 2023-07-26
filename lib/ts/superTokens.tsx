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
import SuperTokensWebJS from "supertokens-web-js";
import { CookieHandlerReference } from "supertokens-web-js/utils/cookieHandler";
import { PostSuperTokensInitCallbacks } from "supertokens-web-js/utils/postSuperTokensInitCallbacks";
import { WindowHandlerReference } from "supertokens-web-js/utils/windowHandler";

import { SSR_ERROR } from "./constants";
import Multitenancy from "./recipe/multitenancy/recipe";
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
import type { BaseRecipeModule } from "./recipe/recipeModule/baseRecipeModule";
import type { NormalisedConfig as NormalisedRecipeModuleConfig } from "./recipe/recipeModule/types";
import type { TranslationFunc, TranslationStore } from "./translation/translationHelpers";
import type { GetRedirectionURLContext, NormalisedAppInfo, SuperTokensConfig } from "./types";

/*
 * Class.
 */

export default class SuperTokens {
    /*
     * Static Attributes.
     */
    private static instance?: SuperTokens;
    static usesDynamicLoginMethods = false;

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
    recipeList: BaseRecipeModule<any, any, any, any>[] = [];
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
        this.recipeList = config.recipeList.map(({ authReact }) => {
            return authReact(this.appInfo, enableDebugLogs);
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
        SuperTokens.usesDynamicLoginMethods = config.usesDynamicLoginMethods ?? false;

        const recipes =
            config.recipeList.find((recipe) => recipe.recipeID === Multitenancy.RECIPE_ID) !== undefined
                ? config.recipeList
                : config.recipeList.concat(Multitenancy.init({}));

        SuperTokensWebJS.init({
            ...config,
            recipeList: recipes.map(({ webJS }) => webJS),
        });

        SuperTokens.instance = new SuperTokens({ ...config, recipeList: recipes });

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
    }): Promise<void> => {
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
        doRedirection(this.appInfo, redirectUrl, history);
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

export function doRedirection(appInfo: NormalisedAppInfo, redirectUrl: string, history?: any) {
    try {
        new URL(redirectUrl); // If full URL, no error thrown, skip in app redirection.
    } catch (e) {
        // For multi tenancy, If mismatch between websiteDomain and current location, prepend URL relative path with websiteDomain.
        const origin = getOriginOfPage().getAsStringDangerous();
        if (origin !== appInfo.websiteDomain.getAsStringDangerous()) {
            redirectUrl = `${appInfo.websiteDomain.getAsStringDangerous()}${redirectUrl}`;
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
}
