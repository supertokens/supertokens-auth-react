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

import type RecipeModule from "./recipe/recipeModule";
import type { NormalisedConfig as NormalisedRecipeModuleConfig } from "./recipe/recipeModule/types";
import type { TranslationFunc, TranslationStore } from "./translation/translationHelpers";
import type { ComponentClass, PropsWithChildren } from "react";
import type { CookieHandlerInput } from "supertokens-web-js/utils/cookieHandler/types";
import type NormalisedURLDomain from "supertokens-web-js/utils/normalisedURLDomain";
import type NormalisedURLPath from "supertokens-web-js/utils/normalisedURLPath";
import type { WindowHandlerInput } from "supertokens-web-js/utils/windowHandler/types";

export type GetRedirectionURLContext = {
    action: "TO_AUTH";
    showSignIn: boolean | undefined;
};

/*
 * Recipe Module Manager Config Types.
 */

export type SuperTokensConfig = {
    /*
     * App Info configurations.
     */
    appInfo: AppInfoUserInput;

    /*
     * List of recipes for authentication and session management.
     */
    recipeList: CreateRecipeFunction<any, any, any, any>[];

    cookieHandler?: CookieHandlerInput;

    windowHandler?: WindowHandlerInput;

    languageTranslations?: {
        /*
         * Default (and fallback) language
         */
        defaultLanguage?: string;

        /*
         * The scope of the cookie storing the current language.
         * This is used to save the language choice between refreshes
         */
        currentLanguageCookieScope?: string;

        /*
         * Language -> translation key -> copy string mapping object.
         *
         * e.g.:
         * {
         *     en: {
         *         PWLESS_SIGN_IN_UP_FOOTER_TOS: "TOS",
         *     }
         * }
         */
        translations?: TranslationStore;

        /*
         * By providing this you can take direct control of the entire translation process.
         */
        translationFunc?: TranslationFunc;
    };
    enableDebugLogs?: boolean;
    getRedirectionURL?: (context: GetRedirectionURLContext) => Promise<string | undefined>;
};

export type CreateRecipeFunction<T, S, R, N extends NormalisedRecipeModuleConfig<T, S, R>> = (
    appInfo: NormalisedAppInfo,
    enableDebugLogs: boolean
) => RecipeModule<T, S, R, N>;

export type AppInfoUserInput = {
    /*
     * The name of the application.
     */
    appName: string;

    /*
     * The API that connects with the application.
     */
    apiDomain: string;

    /*
     * The domain on which the application runs.
     */
    websiteDomain: string;

    /*
     * The base path for SuperTokens middleware in the API.
     * Default to `/auth`
     */
    apiBasePath?: string;

    /*
     * The base path for SuperTokens middleware in the front end application.
     * Default to `/auth`
     */
    websiteBasePath?: string;

    /**
     * An API gateway may be used which prepends a path to the API route.
     * That path should be specified here.
     */
    apiGatewayPath?: string;
};

export type NormalisedAppInfo = {
    /*
     * The name of the application.
     */
    appName: string;

    /*
     * The API that connects with the application.
     */
    apiDomain: NormalisedURLDomain;

    /*
     * The domain on which the application runs.
     */
    websiteDomain: NormalisedURLDomain;

    /*
     * The base path for SuperTokens middleware in the API.
     * Default to `/auth`
     */
    apiBasePath: NormalisedURLPath;

    /*
     * The base path for SuperTokens middleware in the front end application.
     * Default to `/auth`
     */
    websiteBasePath: NormalisedURLPath;
};

/*
 * Routing manipulation types.
 */
export type ComponentWithRecipeAndMatchingMethod = {
    /*
     * Component.
     */
    component: ReactComponentClass;

    /*
     * Matching method.
     */
    matches: () => boolean;
};

export type RecipeFeatureComponentMap = Record<string, ComponentWithRecipeAndMatchingMethod>;

export type BaseFeatureComponentMap = Record<string, ComponentWithRecipeAndMatchingMethod[]>;

export type FormFieldBaseConfig = {
    /*
     * name of the input field.
     */
    id: string;

    /*
     * Label of the input field.
     */
    label: string;

    /*
     * placeholder of the input field.
     */
    placeholder?: string;
};

export type FormField = FormFieldBaseConfig & {
    /*
     * Validation function of the input field. Returns an error as a string, or undefined.
     */
    validate?: (value: any) => Promise<string | undefined>;

    /*
     * Whether the field is optional or not.
     */
    optional?: boolean;
};

export type APIFormField = {
    /*
     * Id, or name of the input.
     */
    id: string;

    /*
     * Value of the corresponding id.
     */
    value: string;
};

export type NormalisedFormField = {
    /*
     * name of the input field.
     */
    id: string;

    /*
     * Label of the input field.
     */
    label: string;

    /*
     * placeholder of the input field.
     */
    placeholder: string;

    /*
     * Validation function of the input field. Returns an error as a string, or undefined.
     */
    validate: (value: any) => Promise<string | undefined> | string | undefined;

    /*
     * Whether the field is optional or not.
     */
    optional: boolean;

    /*
     * Autocomplete input.
     */
    autoComplete?: string;

    /*
     * Moves focus to the input element when it mounts
     */
    autofocus?: boolean;
};

export type ReactComponentClass = ComponentClass<any, any> | (<T>(props: T) => JSX.Element);

/*
 * Features Config Types.
 */

export type FeatureBaseConfig = {
    /*
     * Additional styles to override themes.
     */
    style?: string;
};

export type NormalisedBaseConfig = {
    /*
     * Additional styles to override themes.
     */
    style: string;
};

export type ThemeBaseProps = {
    styleFromInit?: string;
};

export type FeatureBaseProps = PropsWithChildren<{
    /*
     * History provided by react-router
     */
    history?: any;
}>;

// Built-in in later versions of TS
export type Awaited<T> = T extends null | undefined
    ? T // special case for `null | undefined` when not in `--strictNullChecks` mode
    : // eslint-disable-next-line @typescript-eslint/ban-types
    T extends object & { then(onfulfilled: infer F): any } // `await` only unwraps object types with a callable `then`. Non-object types are not unwrapped
    ? F extends (value: infer V, ...args: any) => any // if the argument to `then` is callable, extracts the first argument
        ? V // unwrap the value (this is recursive in the built-in version, but that needs features from a later version to work)
        : never // the argument to `then` was not callable
    : T; // non-object or non-thenable
