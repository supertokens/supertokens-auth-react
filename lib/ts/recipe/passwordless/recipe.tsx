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

import PasswordlessWebJS from "supertokens-web-js/recipe/passwordless";
import { PostSuperTokensInitCallbacks } from "supertokens-web-js/utils/postSuperTokensInitCallbacks";

import { OTPEmailIcon } from "../../components/assets/otpEmailIcon";
import { OTPSMSIcon } from "../../components/assets/otpSMSIcon";
import { SSR_ERROR } from "../../constants";
import { isTest } from "../../utils";
import AuthRecipe from "../authRecipe";
import MultiFactorAuth from "../multifactorauth/recipe";
import { FactorIds } from "../multifactorauth/types";

import { getFunctionOverrides } from "./functionOverrides";
import { normalisePasswordlessConfig } from "./utils";

import type {
    GetRedirectionURLContext,
    OnHandleEventContext,
    PreAndPostAPIHookAction,
    NormalisedConfig,
    UserInput,
} from "./types";
import type { RecipeInitResult, NormalisedConfigWithAppInfoAndRecipeID, WebJSRecipeInterface } from "../../types";
import type RecipeModule from "../recipeModule";

export const otpPhoneFactor = {
    id: FactorIds.OTP_PHONE,
    name: "PWLESS_MFA_OTP_PHONE_NAME",
    description: "PWLESS_MFA_OTP_PHONE_DESCRIPTION",
    path: "/mfa/otp-phone",
    logo: OTPSMSIcon,
};
export const otpEmailFactor = {
    id: FactorIds.OTP_EMAIL,
    name: "PWLESS_MFA_OTP_EMAIL_NAME",
    description: "PWLESS_MFA_OTP_EMAIL_DESCRIPTION",
    path: "/mfa/otp-email",
    logo: OTPEmailIcon,
};

/*
 * Class.
 */
export default class Passwordless extends AuthRecipe<
    GetRedirectionURLContext,
    PreAndPostAPIHookAction,
    OnHandleEventContext,
    NormalisedConfig
> {
    static instance?: Passwordless;
    static RECIPE_ID = "passwordless" as const;

    recipeID = Passwordless.RECIPE_ID;
    firstFactorIds = [FactorIds.OTP_EMAIL, FactorIds.OTP_PHONE, FactorIds.LINK_EMAIL, FactorIds.LINK_PHONE];

    public getFirstFactorsForAuthPage(): string[] {
        if (this.config.contactMethod === "EMAIL") {
            return [FactorIds.OTP_EMAIL, FactorIds.LINK_EMAIL];
        }
        if (this.config.contactMethod === "PHONE") {
            return [FactorIds.OTP_PHONE, FactorIds.LINK_PHONE];
        }
        return this.firstFactorIds;
    }

    constructor(
        config: NormalisedConfigWithAppInfoAndRecipeID<NormalisedConfig>,
        public readonly webJSRecipe: WebJSRecipeInterface<typeof PasswordlessWebJS> = PasswordlessWebJS
    ) {
        super(config);

        PostSuperTokensInitCallbacks.addPostInitCallback(() => {
            const mfa = MultiFactorAuth.getInstance();
            if (mfa !== undefined) {
                mfa.addMFAFactors([otpPhoneFactor, otpEmailFactor]);
            }
        });
    }

    getDefaultRedirectionURL = async (context: GetRedirectionURLContext): Promise<string> => {
        return this.getAuthRecipeDefaultRedirectionURL(context);
    };

    static init(
        config: UserInput
    ): RecipeInitResult<GetRedirectionURLContext, PreAndPostAPIHookAction, OnHandleEventContext, NormalisedConfig> {
        const normalisedConfig = normalisePasswordlessConfig(config);

        return {
            recipeID: Passwordless.RECIPE_ID,
            authReact: (
                appInfo
            ): RecipeModule<
                GetRedirectionURLContext,
                PreAndPostAPIHookAction,
                OnHandleEventContext,
                NormalisedConfig
            > => {
                Passwordless.instance = new Passwordless({
                    ...normalisedConfig,
                    appInfo,
                    recipeId: Passwordless.RECIPE_ID,
                });
                return Passwordless.instance;
            },
            webJS: (...args) => {
                const init = PasswordlessWebJS.init({
                    ...normalisedConfig,
                    override: {
                        functions: (originalImpl, builder) => {
                            const functions = getFunctionOverrides(normalisedConfig.onHandleEvent);
                            builder.override(functions);
                            builder.override(normalisedConfig.override.functions);
                            return originalImpl;
                        },
                    },
                });
                return init(...args);
            },
        };
    }

    static getInstanceOrThrow(): Passwordless {
        if (Passwordless.instance === undefined) {
            let error =
                "No instance of Passwordless found. Make sure to call the Passwordless.init method." +
                "See https://supertokens.io/docs/passwordless/quick-setup/frontend";

            // eslint-disable-next-line supertokens-auth-react/no-direct-window-object
            if (typeof window === "undefined") {
                error = error + SSR_ERROR;
            }
            throw Error(error);
        }

        return Passwordless.instance;
    }

    /*
     * Tests methods.
     */
    static reset(): void {
        if (!isTest()) {
            return;
        }

        Passwordless.instance = undefined;
        return;
    }
}
