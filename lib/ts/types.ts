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
import RecipeModule from "./recipe/recipeModule";
import NormalisedURLPath from "./normalisedURLPath";
import NormalisedURLDomain from "./normalisedURLDomain";
import { CSSObject } from "@emotion/react/types/index";
import { ComponentClass, PropsWithChildren } from "react";
import { NormalisedConfig as NormalisedRecipeModuleConfig } from "./recipe/recipeModule/types";
import { TranslationFunc, TranslationStore } from "./translation/translationHelpers";
import { CookieHandlerInput } from "supertokens-website/utils/cookieHandler/types";
import { WindowHandlerInput } from "supertokens-website/utils/windowHandler/types";

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

export type Styles = Record<string, CSSObject>;

/*
 * Features Config Types.
 */

export type FeatureBaseConfig = {
    /*
     * Additional styles to override themes.
     */
    style?: Styles;
};

export type NormalisedBaseConfig = {
    /*
     * Additional styles to override themes.
     */
    style: Styles;
};

export type NormalisedPalette = {
    colors: Record<string, string>;
    fonts: {
        size: string[];
    };
};

export type NormalisedDefaultStyles = Record<string, CSSObject>;

export type ThemeBaseProps = {
    styleFromInit?: Styles;
};

export type FeatureBaseProps = PropsWithChildren<{
    /*
     * History provided by react-router
     */
    history?: any;
}>;

export type PreAPIHookFunction = (context: {
    requestInit: RequestInit;
    url: string;
}) => Promise<{ url: string; requestInit: RequestInit }>;

export type PostAPIHookFunction = (context: {
    requestInit: RequestInit;
    url: string;
    response: Response;
}) => Promise<Response>;
