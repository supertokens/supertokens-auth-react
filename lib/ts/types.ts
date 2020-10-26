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
import { ComponentClass } from "react";
import RecipeModule from "./recipe/recipeModule";
import NormalisedURLPath from "./normalisedURLPath";
import NormalisedURLDomain from "./normalisedURLDomain";

/*
 * Config Types.
 */

export type SuperTokensConfig = {
    /*
     * Configurations for authentication.
     */
    appInfo: AppInfoUserInput;

    /*
     * List of recipes for authentication and session management.
     */
    recipeList: CreateRecipeFunction[];
};

export type CreateRecipeFunction = (appInfo: AppInfo) => RecipeModule;

export type AppInfoUserInput = {
    /*
     * The name of your application.
     */
    appName: string;

    /*
     * The API that connects with your application.
     */
    apiDomain: string;

    /*
     * The domain on which your application runs.
     */
    websiteDomain: string;

    /*
     * The base path for SuperTokens middleware in your API.
     * Default to `/auth`
     */
    apiBasePath?: string;

    /*
     * The base path for SuperTokens middleware in your front end application.
     * Default to `/auth`
     */
    websiteBasePath?: string;
};

export type AppInfo = {
    /*
     * The name of your application.
     */
    appName: string;

    /*
     * The API that connects with your application.
     */
    apiDomain: NormalisedURLDomain;

    /*
     * The domain on which your application runs.
     */
    websiteDomain: NormalisedURLDomain;

    /*
     * The base path for SuperTokens middleware in your API.
     * Default to `/auth`
     */
    apiBasePath: NormalisedURLPath;

    /*
     * The base path for SuperTokens middleware in your front end application.
     * Default to `/auth`
     */
    websiteBasePath: NormalisedURLPath;
};

/*
 * Routing manipulation types.
 */
export type RouteToFeatureComponentMap = {
    [route: string]: ComponentClass;
};

export type RecipeModuleConfig = {
    /*
     * Features that the module responds to.
     */
    features: RouteToFeatureComponentMap;

    /*
     * Unique Identifier of a module.
     */
    recipeId: string;

    /**
     *
     * AppInfo as present in the recipe module manager
     */
    appInfo: AppInfo;
};

export type ComponentWithRecipeId = {
    /*
     * recipeId of the component.
     */
    rid: string;

    /*
     * Component.
     */
    component: ComponentClass;
};

export type PathToComponentWithRecipeIdMap = {
    [path: string]: ComponentWithRecipeId[];
};

/*
 * Props Types.
 */
export type RecipeModuleProps = {
    __internal?: InternalRecipeModuleProps;
};

type InternalRecipeModuleProps = {
    instance: RecipeModule;
};

export type ThemeProps = {
    formFields: FormFieldsProps[];
};

export type FormFieldsProps = {
    id: string;
    label: string;
    placeholder?: string;
    validate?: (value: string) => Promise<boolean | undefined>;
    optional?: boolean;
};
