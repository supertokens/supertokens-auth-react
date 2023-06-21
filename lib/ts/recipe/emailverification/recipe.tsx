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

import EmailVerificationWebJS from "supertokens-web-js/recipe/emailverification";
import NormalisedURLPath from "supertokens-web-js/utils/normalisedURLPath";
import { PostSuperTokensInitCallbacks } from "supertokens-web-js/utils/postSuperTokensInitCallbacks";
import { SessionClaimValidatorStore } from "supertokens-web-js/utils/sessionClaimValidatorStore";

import { EmailVerificationClaimClass } from "../../claims/emailVerificationClaim";
import { SSR_ERROR } from "../../constants";
import RecipeModule from "../recipeModule";

import { DEFAULT_VERIFY_EMAIL_PATH } from "./constants";
import { getFunctionOverrides } from "./functionOverrides";
import { normaliseEmailVerificationFeature } from "./utils";

import type {
    UserInput,
    NormalisedConfig,
    GetRedirectionURLContext,
    OnHandleEventContext,
    PreAndPostAPIHookAction,
} from "./types";
import type { NormalisedConfigWithAppInfoAndRecipeID, RecipeInitResult, WebJSRecipeInterface } from "../../types";
import type { NormalisedAppInfo } from "../../types";

export default class EmailVerification extends RecipeModule<
    GetRedirectionURLContext,
    PreAndPostAPIHookAction,
    OnHandleEventContext,
    NormalisedConfig
> {
    static instance?: EmailVerification;
    static RECIPE_ID = "emailverification";

    static EmailVerificationClaim = new EmailVerificationClaimClass(
        () => EmailVerification.getInstanceOrThrow().webJSRecipe
    );

    public recipeID = EmailVerification.RECIPE_ID;

    constructor(
        config: NormalisedConfigWithAppInfoAndRecipeID<NormalisedConfig>,
        public readonly webJSRecipe: WebJSRecipeInterface<typeof EmailVerificationWebJS> = EmailVerificationWebJS
    ) {
        super(config);

        PostSuperTokensInitCallbacks.addPostInitCallback(() => {
            const isVerifiedValidator = EmailVerification.EmailVerificationClaim.validators.isVerified(10);
            SessionClaimValidatorStore.addClaimValidatorFromOtherRecipe(isVerifiedValidator);
        });
    }

    static init(
        config?: UserInput
    ): RecipeInitResult<GetRedirectionURLContext, PreAndPostAPIHookAction, OnHandleEventContext, NormalisedConfig> {
        const normalisedConfig = normaliseEmailVerificationFeature(config);

        return {
            recipeID: EmailVerification.RECIPE_ID,
            authReact: (
                appInfo: NormalisedAppInfo
            ): RecipeModule<
                GetRedirectionURLContext,
                PreAndPostAPIHookAction,
                OnHandleEventContext,
                NormalisedConfig
            > => {
                EmailVerification.instance = new EmailVerification({
                    ...normalisedConfig,
                    appInfo,
                    recipeId: EmailVerification.RECIPE_ID,
                });
                return EmailVerification.instance;
            },
            webJS: EmailVerificationWebJS.init({
                ...normalisedConfig,
                override: {
                    functions: (originalImpl, builder) => {
                        const functions = getFunctionOverrides(normalisedConfig.onHandleEvent);
                        builder.override(functions);
                        builder.override(normalisedConfig.override.functions);
                        return originalImpl;
                    },
                },
            }),
        };
    }

    static getInstanceOrThrow(): EmailVerification {
        if (EmailVerification.instance === undefined) {
            let error = "No instance of EmailVerification found. Make sure to call the EmailVerification.init method.";

            // eslint-disable-next-line supertokens-auth-react/no-direct-window-object
            if (typeof window === "undefined") {
                error = error + SSR_ERROR;
            }
            throw Error(error);
        }

        return EmailVerification.instance;
    }

    async isEmailVerified(userContext: any): Promise<{
        status: "OK";
        isVerified: boolean;
        fetchResponse: Response;
    }> {
        return await this.webJSRecipe.isEmailVerified({
            userContext,
        });
    }

    getDefaultRedirectionURL = async (context: GetRedirectionURLContext): Promise<string> => {
        if (context.action === "VERIFY_EMAIL") {
            const verifyEmailPath = new NormalisedURLPath(DEFAULT_VERIFY_EMAIL_PATH);
            return `${this.config.appInfo.websiteBasePath.appendPath(verifyEmailPath).getAsStringDangerous()}?rid=${
                this.config.recipeId
            }`;
        } else {
            return "/";
        }
    };
}
