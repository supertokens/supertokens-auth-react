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

import Session from "../session/recipe";
import RecipeModule from "../recipeModule";
import { NormalisedConfig, GetRedirectionURLContext } from "./types";
import { RecipeFeatureComponentMap, SuccessAPIResponse } from "../../types";
import { signOut } from "./api";
import EmailVerification from "../emailverification/recipe";
import { getWindowOrThrow } from "../../utils";

export default abstract class AuthRecipeModule<
    T,
    S,
    R,
    N extends NormalisedConfig<T | GetRedirectionURLContext, S, R>
> extends RecipeModule<T | GetRedirectionURLContext, S, R, N> {
    emailVerification: EmailVerification;

    constructor(config: N) {
        super(config);
        this.emailVerification = new EmailVerification(
            config.emailVerificationFeature || {
                appInfo: config.appInfo,
                recipeId: config.recipeId,
                signOut: this.signOut,
                postVerificationRedirect: async (history: any) => {
                    this.redirect(
                        {
                            action: "SUCCESS",
                            isNewUser: false,
                        },
                        history
                    );
                },
                redirectToSignIn: async (history: any) => {
                    this.redirectToAuth(undefined, history);
                },
            }
        );
    }

    getAuthRecipeModuleDefaultRedirectionURL = async (context: GetRedirectionURLContext): Promise<string> => {
        if (context.action === "SIGN_IN_AND_UP") {
            return `${this.config.appInfo.websiteBasePath.getAsStringDangerous()}?rid=${this.config.recipeId}`;
        } else if (context.action === "SUCCESS") {
            return context.redirectToPath === undefined ? "/" : context.redirectToPath;
        } else {
            throw new Error("Should never come here");
        }
    };

    getAuthRecipeModuleFeatures = (): RecipeFeatureComponentMap => {
        return this.emailVerification.getFeatures();
    };

    signOut = async (): Promise<SuccessAPIResponse> => {
        return await signOut(this);
    };

    doesSessionExist = (): Promise<boolean> => {
        return Session.getInstanceOrThrow().doesSessionExist();
    };

    redirectToAuth = (show?: "signin" | "signup", history?: any, queryParams?: any) => {
        const redirectToPath = getWindowOrThrow().location.pathname;
        if (queryParams === undefined) {
            queryParams = {};
        }
        queryParams = {
            ...queryParams,
            redirectToPath,
        };
        if (show !== undefined) {
            queryParams = {
                ...queryParams,
                show,
            };
        }
        this.redirect(
            {
                action: "SIGN_IN_AND_UP",
            },
            history,
            queryParams
        );
    };
}
