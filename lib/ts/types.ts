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
import { ComponentClass } from "react";
import { NormalisedConfig as NormalisedRecipeModuleConfig } from "./recipe/recipeModule/types";

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
};

export type CreateRecipeFunction<T, S, R, N extends NormalisedRecipeModuleConfig<T, S, R>> = (
    appInfo: NormalisedAppInfo
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
     * recipeId of the component.
     */
    rid: string;

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
    validate: (value: any) => Promise<string | undefined>;

    /*
     * Whether the field is optional or not.
     */
    optional: boolean;

    /*
     * Autocomplete input.
     */
    autoComplete?: string;
};

export type ReactComponentClass = ComponentClass<any, any> | (<T>(props: T) => JSX.Element);
export type WithRouterType = (Component: ReactComponentClass) => ReactComponentClass;

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

export type SuccessAPIResponse = {
    /*
     * Success.
     */
    status: "OK";
};

export type NormalisedPalette = {
    colors: Record<string, string>;
    fonts: {
        size: string[];
    };
};

export type NormalisedDefaultStyles = Record<string, CSSObject>;

export type ThemeBaseProps = {
    /*
     * Custom styling from user.
     */
    styleFromInit?: Styles;

    /*
     * Called on successful state.
     */
    onSuccess: () => void;
};

export type FeatureBaseProps = {
    /*
     * recipeId.
     */
    recipeId: string;

    /*
     * Children element
     */
    children?: JSX.Element;

    /*
     * History provided by react-router
     */
    history?: any;

    /*
     * Nested Features
     * This is used to avoid reinitialising feature wrapper for nested features.
     */
    isEmbedded?: boolean;
};
