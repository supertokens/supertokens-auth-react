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

import { SSR_ERROR, TENANT_ID_QUERY_PARAM } from "./constants";
import { enableLogging, logDebugMessage } from "./logger";
import Multitenancy from "./recipe/multitenancy/recipe";
import { saveCurrentLanguage, TranslationController } from "./translation/translationHelpers";
import {
    appendQueryParamsToURL,
    appendTrailingSlashToURL,
    getCurrentNormalisedUrlPathWithQueryParamsAndFragments,
    getDefaultCookieScope,
    getNormalisedUserContext,
    getOriginOfPage,
    getPublicPlugin,
    getTenantIdFromQueryParams,
    isTest,
    normaliseCookieScopeOrThrowError,
    normaliseInputAppInfoOrThrowError,
    redirectWithFullPageReload,
    redirectWithNavigate,
} from "./utils";
import { package_version } from "./version";

import type RecipeModule from "./recipe/recipeModule";
import type { BaseRecipeModule } from "./recipe/recipeModule/baseRecipeModule";
import type { NormalisedConfig as NormalisedRecipeModuleConfig } from "./recipe/recipeModule/types";
import type { TranslationFunc, TranslationStore } from "./translation/translationHelpers";
import type {
    Navigate,
    GetRedirectionURLContext,
    NormalisedAppInfo,
    SuperTokensConfig,
    UserContext,
    NormalisedGetRedirectionURLContext,
    AllRecipeComponentOverrides,
    SuperTokensPlugin,
    AllRecipeConfigs,
    PluginRouteHandler,
    SuperTokensPublicPlugin,
} from "./types";

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
    // give access to plugins through the instance
    pluginList: SuperTokensPublicPlugin[] = [];
    languageTranslations: {
        defaultLanguage: string;
        userTranslationStore: TranslationStore;
        currentLanguageCookieScope: string | undefined;
        translationEventSource: TranslationController;
        userTranslationFunc?: TranslationFunc;
    };
    recipeList: BaseRecipeModule<any, any, any, any>[] = [];
    private userGetRedirectionURL: SuperTokensConfig["getRedirectionURL"];
    rootStyle: string;
    useShadowDom: boolean;
    privacyPolicyLink: string | undefined;
    termsOfServiceLink: string | undefined;
    defaultToSignUp: boolean;
    disableAuthRoute: boolean;
    componentOverrides: Partial<AllRecipeComponentOverrides> = {};
    pluginRouteHandlers: PluginRouteHandler[] = [];

    /*
     * Constructor.
     */
    constructor(config: SuperTokensConfig, plugins: SuperTokensPlugin[]) {
        this.appInfo = normaliseInputAppInfoOrThrowError(config.appInfo);
        if (config.recipeList === undefined || config.recipeList.length === 0) {
            throw new Error(
                "Please provide at least one recipe to the supertokens.init function call. See https://supertokens.io/docs/emailpassword/quick-setup/frontend"
            );
        }

        this.componentOverrides = {};

        for (const plugin of plugins) {
            if (plugin.overrideMap !== undefined) {
                for (const t of Object.keys(plugin.overrideMap) as (keyof AllRecipeConfigs)[]) {
                    if (plugin.overrideMap[t]?.components) {
                        this.componentOverrides[t] = {
                            ...this.componentOverrides[t],
                            ...(plugin.overrideMap[t]?.components as AllRecipeComponentOverrides[typeof t]),
                        };
                    }
                }
            }
            this.componentOverrides.authRecipe = {
                ...(this.componentOverrides.authRecipe ?? {}),
                ...(plugin.generalAuthRecipeComponentOverrides ?? {}),
            };
        }

        this.pluginList = plugins.map(getPublicPlugin);

        // iterated separately so we can pass the instance plugins  as reference so they always have access to the latest
        for (let pluginIndex = 0; pluginIndex < this.pluginList.length; pluginIndex += 1) {
            const pluginInit = plugins[pluginIndex].init;

            if (pluginInit && !this.pluginList[pluginIndex].initialized) {
                PostSuperTokensInitCallbacks.addPostInitCallback(() => {
                    pluginInit(config, this.pluginList, package_version);
                    this.pluginList[pluginIndex].initialized = true;
                });
            }

            const pluginRouteHandlers = plugins[pluginIndex].routeHandlers;
            if (pluginRouteHandlers) {
                const result = pluginRouteHandlers(config, this.pluginList, package_version);
                if (result.status === "ERROR") {
                    throw new Error(result.message);
                }
                this.pluginRouteHandlers.push(...result.routeHandlers);
            }
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

        const enableDebugLogs = Boolean(config?.enableDebugLogs);

        if (enableDebugLogs) {
            enableLogging();
        }

        this.userGetRedirectionURL = config.getRedirectionURL;
        this.recipeList = config.recipeList.map(({ authReact }) => {
            return authReact(this.appInfo, enableDebugLogs);
        });

        this.rootStyle = config.style ?? "";
        this.privacyPolicyLink = config.privacyPolicyLink;
        this.termsOfServiceLink = config.termsOfServiceLink;

        this.useShadowDom = config.useShadowDom ?? true;
        this.defaultToSignUp = config.defaultToSignUp ?? false;
        this.disableAuthRoute = config.disableAuthRoute ?? false;
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

        const finalPluginList: SuperTokensPlugin[] = [];
        if (config.experimental?.plugins) {
            for (const plugin of config.experimental.plugins) {
                if (plugin.compatibleAuthReactSDKVersions) {
                    const versionContraints = Array.isArray(plugin.compatibleAuthReactSDKVersions)
                        ? plugin.compatibleAuthReactSDKVersions
                        : [plugin.compatibleAuthReactSDKVersions];
                    if (!versionContraints.includes(package_version)) {
                        // TODO: better checks
                        throw new Error("Plugin version mismatch");
                    }
                }
                if (plugin.dependencies) {
                    const result = plugin.dependencies(finalPluginList, package_version);
                    if (result.status === "ERROR") {
                        throw new Error(result.message);
                    }
                    if (result.pluginsToAdd) {
                        finalPluginList.push(...result.pluginsToAdd);
                    }
                }
                finalPluginList.push(plugin);
            }
        }

        for (const plugin of finalPluginList) {
            if (plugin.config) {
                config = { ...config, ...plugin.config(config) };
            }
        }

        SuperTokensWebJS.init({
            ...config,
            recipeList: recipes.map(({ webJS }) => webJS),
            experimental: {
                plugins: finalPluginList.map((plugin) => ({
                    id: plugin.id,
                    overrideMap: plugin.overrideMap as any,
                })),
            },
        });

        SuperTokens.instance = new SuperTokens({ ...config, recipeList: recipes }, finalPluginList);

        PostSuperTokensInitCallbacks.runPostInitCallbacks();
    }

    static getInstance(): SuperTokens | undefined {
        return SuperTokens.instance;
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

    async getRedirectUrl(
        context: NormalisedGetRedirectionURLContext<GetRedirectionURLContext>,
        userContext: UserContext
    ): Promise<string | null> {
        if (this.userGetRedirectionURL) {
            const userRes = await this.userGetRedirectionURL(context, userContext);
            if (userRes !== undefined) {
                return userRes;
            }
        }
        if (context.action === "TO_AUTH") {
            const redirectUrl = this.appInfo.websiteBasePath.getAsStringDangerous();
            const basePath = appendTrailingSlashToURL(redirectUrl);
            if (context.tenantIdFromQueryParams) {
                return appendQueryParamsToURL(basePath, { [TENANT_ID_QUERY_PARAM]: context.tenantIdFromQueryParams });
            }
            return basePath;
        } else if (context.action === "SUCCESS") {
            return context.redirectToPath ?? "/";
        }
        throw new Error("Should never come here: unexpected redirection context");
    }

    redirectToAuth = async (options: {
        show?: "signin" | "signup";
        navigate?: Navigate;
        queryParams?: any;
        redirectBack: boolean;
        userContext: UserContext;
    }): Promise<void> => {
        const queryParams = options.queryParams === undefined ? {} : options.queryParams;
        if (options.show !== undefined) {
            queryParams.show = options.show;
        }
        if (options.redirectBack === true) {
            queryParams.redirectToPath = getCurrentNormalisedUrlPathWithQueryParamsAndFragments();
        }

        let redirectUrl = await this.getRedirectUrl(
            {
                action: "TO_AUTH",
                showSignIn: options.show === "signin",
                tenantIdFromQueryParams: getTenantIdFromQueryParams(),
            },
            options.userContext
        );

        if (redirectUrl === null) {
            logDebugMessage("Skipping redirection because the user override returned null");
            return;
        }
        redirectUrl = appendQueryParamsToURL(redirectUrl, queryParams);
        return this.redirectToUrl(redirectUrl, options.navigate);
    };

    redirectToUrl = async (redirectUrl: string, navigate?: Navigate): Promise<void> => {
        doRedirection(this.appInfo, redirectUrl, navigate);
    };

    redirect = async (
        context: NormalisedGetRedirectionURLContext<GetRedirectionURLContext>,
        navigate?: Navigate,
        queryParams?: Record<string, string>,
        userContext?: UserContext
    ): Promise<void> => {
        // NOTE: We cannot make userContext required in args because it follows optional parameters. Instead we will normalise it if it wasn't passed in.
        let redirectUrl = await this.getRedirectUrl(context, getNormalisedUserContext(userContext));

        if (redirectUrl === null) {
            logDebugMessage(
                `Skipping redirection because the user override returned null for context ${JSON.stringify(
                    context,
                    null,
                    2
                )}`
            );
            return;
        }

        redirectUrl = appendQueryParamsToURL(redirectUrl, queryParams);
        return SuperTokens.getInstanceOrThrow().redirectToUrl(redirectUrl, navigate);
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

export function doRedirection(appInfo: NormalisedAppInfo, redirectUrl: string, navigate?: Navigate) {
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

        // If navigate was provided, use to redirect without reloading.
        if (navigate !== undefined) {
            redirectWithNavigate(redirectUrl, navigate);
            return;
        }
    }
    // Otherwise, redirect in app.
    redirectWithFullPageReload(redirectUrl);
}
