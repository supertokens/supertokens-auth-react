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

/*
 * Imports.
 */
import RecipeModule from "../recipeModule";
import { CreateRecipeFunction, NormalisedAppInfo, RouteToFeatureComponentMap } from "../../types";
import { SessionUserInput, SessionConfig } from "./types";
import { isTest } from "../../utils";

/*
 * Class.
 */
export default class Session extends RecipeModule {
    /*
     * Static Attributes.
     */
    static instance?: Session;
    static RECIPE_ID = "session";

    /*
     * Instance Attributes.
     */
    private sessionSdk: any;

    /*
     * Constructor.
     */
    constructor(config: SessionConfig) {
        super(config);
        const SuperTokensRequest = require("supertokens-website");
        SuperTokensRequest.init({
            sessionScope: config.sessionScope,
            refreshAPICustomHeaders: config.refreshAPICustomHeaders,
            autoAddCredentials: config.autoAddCredentials,
            sessionExpiredStatusCode: config.sessionExpiredStatusCode,
            apiDomain: config.appInfo.apiDomain.getAsStringDangerous(),
            apiBasePath: config.appInfo.apiBasePath.getAsStringDangerous()
        });

        this.sessionSdk = SuperTokensRequest;
    }

    /*
     * Instance methods.
     */

    getFeatures = (): RouteToFeatureComponentMap => {
        return {};
    };

    getRefreshURLDomain = (): string => {
        return this.sessionSdk.getRefreshURLDomain();
    };

    getUserId = (): string => {
        return this.sessionSdk.getUserId();
    };

    getJWTPayloadSecurely = async (): Promise<any> => {
        return this.sessionSdk.getJWTPayloadSecurely();
    };

    attemptRefreshingSession = async (): Promise<boolean> => {
        return this.sessionSdk.attemptRefreshingSession();
    };

    doesSessionExist = (): boolean => {
        return this.sessionSdk.doesSessionExist();
    };

    /*
     * Static methods.
     */

    static init(config?: SessionUserInput): CreateRecipeFunction {
        return (appInfo: NormalisedAppInfo): RecipeModule => {
            Session.instance = new Session({
                ...config,
                appInfo,
                recipeId: Session.RECIPE_ID
            });
            return Session.instance;
        };
    }

    static getInstanceOrThrow(): Session {
        if (Session.instance === undefined) {
            throw Error(`No instance of ${Session.constructor.name} found. Make sure to call the "init" method.`); // TODO Add relevant doc.
        }

        return Session.instance;
    }

    static getRefreshURLDomain(): string {
        return Session.getInstanceOrThrow().getRefreshURLDomain();
    }

    static getUserId(): string {
        return Session.getInstanceOrThrow().getUserId();
    }

    static async getJWTPayloadSecurely(): Promise<any> {
        return Session.getInstanceOrThrow().getJWTPayloadSecurely();
    }

    static async attemptRefreshingSession(): Promise<boolean> {
        return Session.getInstanceOrThrow().attemptRefreshingSession();
    }

    static doesSessionExist(): boolean {
        return Session.getInstanceOrThrow().doesSessionExist();
    }

    /*
     * Tests methods.
     */
    static reset(): void {
        if (!isTest()) {
            return;
        }

        Session.instance = undefined;
        return;
    }
}
