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
import RecipeModule from "../recipeModule";
import { CreateRecipeFunction, NormalisedAppInfo, RecipeFeatureComponentMap } from "../../types";
import { SessionUserInput, SessionConfig } from "./types";
import { isTest } from "../../utils";
import sessionSdk from "supertokens-website";

/*
 * Class.
 */
export default class Session extends RecipeModule<unknown, unknown, unknown> {
    /*
     * Static Attributes.
     */
    static instance?: Session;
    static RECIPE_ID = "session";

    /*
     * Constructor.
     */
    constructor(config: SessionConfig) {
        super(config);
        let usersHeadersForRefreshAPI = {};
        if (config.refreshAPICustomHeaders !== undefined) {
            usersHeadersForRefreshAPI = config.refreshAPICustomHeaders;
        }
        let usersHeadersForSignoutAPI = {};
        if (config.signoutAPICustomHeaders !== undefined) {
            usersHeadersForSignoutAPI = config.signoutAPICustomHeaders;
        }
        sessionSdk.init({
            sessionScope: config.sessionScope,
            refreshAPICustomHeaders: {
                rid: this.recipeId,
                ...usersHeadersForRefreshAPI,
            },
            signoutAPICustomHeaders: {
                rid: this.recipeId,
                ...usersHeadersForSignoutAPI,
            },
            autoAddCredentials: config.autoAddCredentials,
            sessionExpiredStatusCode: config.sessionExpiredStatusCode,
            apiDomain: config.appInfo.apiDomain.getAsStringDangerous(),
            apiBasePath: config.appInfo.apiBasePath.getAsStringDangerous(),
        });
    }

    /*
     * Instance methods.
     */

    getFeatures = (): RecipeFeatureComponentMap => {
        return {};
    };

    getRefreshURLDomain = (): string | undefined => {
        return sessionSdk.getRefreshURLDomain();
    };

    getUserId = (): string => {
        return sessionSdk.getUserId();
    };

    getJWTPayloadSecurely = async (): Promise<any> => {
        return sessionSdk.getJWTPayloadSecurely();
    };

    attemptRefreshingSession = async (): Promise<boolean> => {
        return sessionSdk.attemptRefreshingSession();
    };

    doesSessionExist = (): boolean => {
        return sessionSdk.doesSessionExist();
    };

    setAuth0API = (apiPath: string): void => {
        return sessionSdk.setAuth0API(apiPath);
    };

    getAuth0API = (): { apiPath: string | undefined } => {
        return sessionSdk.getAuth0API();
    };

    signOut = (): Promise<void> => {
        return sessionSdk.signOut();
    };

    /*
     * Static methods.
     */

    static init(config?: SessionUserInput): CreateRecipeFunction<unknown, unknown, unknown> {
        return (appInfo: NormalisedAppInfo): RecipeModule<unknown, unknown, unknown> => {
            Session.instance = new Session({
                ...config,
                appInfo,
                recipeId: Session.RECIPE_ID,
            });
            return Session.instance;
        };
    }

    static getInstanceOrThrow(): Session {
        if (Session.instance === undefined) {
            throw Error(
                "No instance of Session found. Make sure to call the Session.init method. See https://supertokens.io/docs/emailpassword/quick-setup/frontend"
            );
        }

        return Session.instance;
    }

    static getRefreshURLDomain(): string | undefined {
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

    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    static addAxiosInterceptors(axiosInstance: any): void {
        return sessionSdk.addAxiosInterceptors(axiosInstance);
    }

    static setAuth0API(apiPath: string): void {
        return Session.getInstanceOrThrow().setAuth0API(apiPath);
    }

    static getAuth0API(): { apiPath: string | undefined } {
        return Session.getInstanceOrThrow().getAuth0API();
    }

    static signOut(): Promise<void> {
        return Session.getInstanceOrThrow().signOut();
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
