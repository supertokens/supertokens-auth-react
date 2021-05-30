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
import { Config, UserInput, RecipeInterface } from "./types";
import { isTest } from "../../utils";
import sessionSdk from "supertokens-website";
import RecipeImplementation from "./recipeImplementation";

export default class Session extends RecipeModule<unknown, unknown, unknown, any> {
    static instance?: Session;
    static RECIPE_ID = "session";

    recipeImpl: RecipeImplementation;

    constructor(config: Config) {
        super(config);

        const override: {
            functions: (originalImplementation: RecipeImplementation) => RecipeInterface;
        } = {
            functions: (originalImplementation: RecipeImplementation) => originalImplementation,
            ...config.override,
        };

        this.recipeImpl = override.functions(new RecipeImplementation(config));
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    getFeatureComponent = (_: string): JSX.Element => {
        throw new Error("should never come here");
    };

    getFeatures = (): RecipeFeatureComponentMap => {
        return {};
    };

    getUserId = (): Promise<string> => {
        return this.recipeImpl.getUserId();
    };

    getJWTPayloadSecurely = async (): Promise<any> => {
        return this.recipeImpl.getJWTPayloadSecurely();
    };

    doesSessionExist = (): Promise<boolean> => {
        return this.recipeImpl.doesSessionExist();
    };

    signOut = (): Promise<void> => {
        return this.recipeImpl.signOut();
    };

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

    attemptRefreshingSession = async (): Promise<boolean> => {
        // we don't use recipeImpl for this one since if a user overrides
        // this, then refreshing is not gonna call this anyway.
        // plus it's not a generic session sematic function..
        // it's specific to our implementation only.
        return sessionSdk.attemptRefreshingSession();
    };

    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    static addAxiosInterceptors(axiosInstance: any): void {
        // we don't have recipeImpl for this since it's not a generic
        // session sematic function.. it's specific to our implementation only.
        return sessionSdk.addAxiosInterceptors(axiosInstance);
    }

    static reset(): void {
        if (!isTest()) {
            return;
        }

        Session.instance = undefined;
        return;
    }
}
