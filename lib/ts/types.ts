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
import { Component, ComponentClass } from "react";
import RecipeModule from "./recipes/recipeModule";

export type SuperTokensConfig = {
    /*
     * Configurations for authentication.
     */
    appInfo: AppInfoConfig;

    /*
     * List of recipes for authentication and session management.
     */
    recipeList: RecipeModule[];
};

type AppInfoBase = {
    /*
     * The name of your application.
     */
    appName: string;

    /*
     * The API that connects with your application.
     */
    apiDomain: string;

    /*
     * The base path for SuperTokens middleware in your API.
     * Default to `/auth`
     */
    apiBasePath?: string;

    /*
     * The domain on which your application runs.
     */
    websiteDomain: string;

    /*
     * The base path for SuperTokens middleware in your front end application.
     * Default to `/auth`
     */
    websiteBasePath?: string;

    /*
     * (Optional) URL for your logo that will be displayed on the login form.
     */
    logoFullURL?: string;
};

export type AppInfoConfig = AppInfoBase & {
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

export type AppInfo = AppInfoBase & {
    /*
     * The base path for SuperTokens middleware in your API.
     * Default to `/auth`
     */
    apiBasePath: string;

    /*
     * The base path for SuperTokens middleware in your front end application.
     * Default to `/auth`
     */
    websiteBasePath: string;
};

export type FeatureHash = {
    [route: string]: ComponentClass;
};

export type RecipeModuleConfig = {
    /*
     * Features that the module responds to.
     */
    features: FeatureHash;

    /*
     * Unique Identifier of a module.
     */
    recipeId: string;
};

export type EmailPasswordConfig = RecipeModuleConfig & {
    /*
     * Sign In and Sign Up feature.
     */
    signInAndUpFeature: any;

    /*
     * Reset password Using Token feature.
     */
    resetPasswordUsingTokenFeature: any;
};
