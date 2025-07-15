/* Copyright (c) 2024, VRAI Labs and/or its affiliates. All rights reserved.
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

import TOTPWebJS from "supertokens-web-js/recipe/totp";
import { PostSuperTokensInitCallbacks } from "supertokens-web-js/utils/postSuperTokensInitCallbacks";

import { TOTPIcon } from "../../components/assets/totpIcon";
import { SSR_ERROR } from "../../constants";
import MultiFactorAuth from "../multifactorauth/recipe";
import { FactorIds } from "../multifactorauth/types";
import RecipeModule from "../recipeModule";

import { getFunctionOverrides } from "./functionOverrides";
import { normaliseMultiFactorAuthFeature } from "./utils";

import type {
    UserInput,
    NormalisedConfig,
    GetRedirectionURLContext,
    OnHandleEventContext,
    PreAndPostAPIHookAction,
} from "./types";
import type { NormalisedConfigWithAppInfoAndRecipeID, RecipeInitResult, WebJSRecipeInterface } from "../../types";

export const totpFactor = {
    id: FactorIds.TOTP,
    name: "TOTP_MFA_NAME",
    description: "TOTP_MFA_DESCRIPTION",
    path: "/mfa/totp",
    logo: TOTPIcon,
};

export default class TOTP extends RecipeModule<
    GetRedirectionURLContext,
    PreAndPostAPIHookAction,
    OnHandleEventContext,
    NormalisedConfig
> {
    static instance?: TOTP;
    static RECIPE_ID = "totp" as const;

    public recipeID = TOTP.RECIPE_ID;

    constructor(
        config: NormalisedConfigWithAppInfoAndRecipeID<NormalisedConfig>,
        public readonly webJSRecipe: WebJSRecipeInterface<typeof TOTPWebJS> = TOTPWebJS
    ) {
        super(config);

        PostSuperTokensInitCallbacks.addPostInitCallback(() => {
            const mfa = MultiFactorAuth.getInstance();
            if (mfa !== undefined) {
                mfa.addMFAFactors([totpFactor]);
            }
        });
    }

    static init(
        config?: UserInput
    ): RecipeInitResult<GetRedirectionURLContext, PreAndPostAPIHookAction, OnHandleEventContext, NormalisedConfig> {
        const normalisedConfig = normaliseMultiFactorAuthFeature(config);

        return {
            recipeID: TOTP.RECIPE_ID,
            authReact: (
                appInfo
            ): RecipeModule<
                GetRedirectionURLContext,
                PreAndPostAPIHookAction,
                OnHandleEventContext,
                NormalisedConfig
            > => {
                TOTP.instance = new TOTP({
                    ...normalisedConfig,
                    appInfo,
                    recipeId: TOTP.RECIPE_ID,
                });
                return TOTP.instance;
            },
            webJS: (...args) => {
                const init = TOTPWebJS.init({
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

    static getInstance(): TOTP | undefined {
        return TOTP.instance;
    }

    static getInstanceOrThrow(): TOTP {
        if (TOTP.instance === undefined) {
            let error = "No instance of TOTP found. Make sure to call the TOTP.init method.";

            // eslint-disable-next-line supertokens-auth-react/no-direct-window-object
            if (typeof window === "undefined") {
                error = error + SSR_ERROR;
            }
            throw Error(error);
        }

        return TOTP.instance;
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    getDefaultRedirectionURL = async (_context: GetRedirectionURLContext): Promise<string> => {
        throw new Error("Should never come here");
    };
}
