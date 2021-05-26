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
import { Config, UserInput } from "./types";
import { isTest } from "../../utils";
import sessionSdk from "supertokens-website";

/*
 * Class.
 */
export default class Session extends RecipeModule<unknown, unknown, unknown, any> {
    /*
     * Static Attributes.
     */
    static instance?: Session;
    static RECIPE_ID = "session";

    /*
     * Constructor.
     */
    constructor(config: Config) {
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
            sessionScope:
                config.sessionScope === undefined
                    ? undefined
                    : {
                          scope: config.sessionScope,
                          authDomain: config.appInfo.websiteDomain.getAsStringDangerous(),
                      },
            refreshAPICustomHeaders: {
                rid: this.config.recipeId,
                ...usersHeadersForRefreshAPI,
            },
            signoutAPICustomHeaders: {
                rid: this.config.recipeId,
                ...usersHeadersForSignoutAPI,
            },
            autoAddCredentials: config.autoAddCredentials,
            sessionExpiredStatusCode: config.sessionExpiredStatusCode,
            apiDomain: config.appInfo.apiDomain.getAsStringDangerous(),
            apiBasePath: config.appInfo.apiBasePath.getAsStringDangerous(),
            isInIframe: config.isInIframe,
        });
    }

    getFeatureComponent = (_: string): JSX.Element => {
        throw new Error("should never come here");
    };

    getFeatures = (): RecipeFeatureComponentMap => {
        return {};
    };

    getRefreshURLDomain = (): string | undefined => {
        return sessionSdk.getRefreshURLDomain();
    };

    getUserId = (): Promise<string> => {
        return sessionSdk.getUserId();
    };

    getJWTPayloadSecurely = async (): Promise<any> => {
        return sessionSdk.getJWTPayloadSecurely();
    };

    attemptRefreshingSession = async (): Promise<boolean> => {
        return sessionSdk.attemptRefreshingSession();
    };

    doesSessionExist = (): Promise<boolean> => {
        return sessionSdk.doesSessionExist();
    };

    signOut = (): Promise<void> => {
        return sessionSdk.signOut();
    };

    /*
     * Static methods.
     */

    static init(config?: UserInput): CreateRecipeFunction<unknown, unknown, unknown, any> {
        return (appInfo: NormalisedAppInfo): RecipeModule<unknown, unknown, unknown, any> => {
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

    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    static addAxiosInterceptors(axiosInstance: any): void {
        return sessionSdk.addAxiosInterceptors(axiosInstance);
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
