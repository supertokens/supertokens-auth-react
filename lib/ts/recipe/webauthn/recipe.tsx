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

import WebauthnWebJS from "supertokens-web-js/lib/build/recipe/webauthn";

import { SSR_ERROR } from "../../constants";
import { getDefaultRedirectionURLForPath, isTest } from "../../utils";
import AuthRecipe from "../authRecipe";
import { FactorIds } from "../multifactorauth/types";

import { DEFAULT_WEBAUTHN_SEND_RECOVERY_EMAIL_PATH } from "./constants";
import { getFunctionOverrides } from "./functionOverrides";
import { normaliseWebauthnConfig } from "./utils";

import type {
    GetRedirectionURLContext,
    NormalisedConfig,
    OnHandleEventContext,
    PreAndPostAPIHookAction,
    UserInput,
} from "./types";
import type {
    NormalisedConfigWithAppInfoAndRecipeID,
    WebJSRecipeInterface,
    NormalisedAppInfo,
    RecipeInitResult,
} from "../../types";
import type RecipeModule from "../recipeModule";

export default class Webauthn extends AuthRecipe<
    GetRedirectionURLContext,
    PreAndPostAPIHookAction,
    OnHandleEventContext,
    NormalisedConfig
> {
    static instance?: Webauthn;
    static RECIPE_ID = "webauthn" as const;

    recipeID = Webauthn.RECIPE_ID as string;
    firstFactorIds = [FactorIds.WEBAUTHN];

    constructor(
        config: NormalisedConfigWithAppInfoAndRecipeID<NormalisedConfig>,
        public readonly webJSRecipe: WebJSRecipeInterface<typeof WebauthnWebJS> = WebauthnWebJS
    ) {
        super(config);
        this.recipeID = config.recipeId;

        // We can ideally call postInitCallbacks to set MFA's if
        // we are using it.
    }

    public getFirstFactorsForAuthPage(): string[] {
        return this.firstFactorIds;
    }

    getDefaultRedirectionURL = async (context: GetRedirectionURLContext): Promise<string> => {
        if (context.action === "SEND_RECOVERY_EMAIL") {
            return getDefaultRedirectionURLForPath(this.config, DEFAULT_WEBAUTHN_SEND_RECOVERY_EMAIL_PATH, context);
        }

        return this.getAuthRecipeDefaultRedirectionURL(context);
    };

    static init(
        config?: UserInput
    ): RecipeInitResult<GetRedirectionURLContext, PreAndPostAPIHookAction, OnHandleEventContext, NormalisedConfig> {
        const normalisedConfig = normaliseWebauthnConfig(config);

        return {
            recipeID: Webauthn.RECIPE_ID,
            authReact: (
                appInfo: NormalisedAppInfo
            ): RecipeModule<
                GetRedirectionURLContext,
                PreAndPostAPIHookAction,
                OnHandleEventContext,
                NormalisedConfig
            > => {
                Webauthn.instance = new Webauthn({
                    ...normalisedConfig,
                    appInfo,
                    recipeId: Webauthn.RECIPE_ID,
                });
                return Webauthn.instance;
            },
            webJS: WebauthnWebJS.init({
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

    static getInstanceOrThrow(): Webauthn {
        if (Webauthn.instance === undefined) {
            let error = "No instance of Webauthn found. Make sure to call the Webauthn.init method.";

            // eslint-disable-next-line supertokens-auth-react/no-direct-window-object
            if (typeof window === "undefined") {
                error = error + SSR_ERROR;
            }
            throw Error(error);
        }

        return Webauthn.instance;
    }

    /*
     * Tests methods.
     */
    static reset(): void {
        if (!isTest()) {
            return;
        }

        Webauthn.instance = undefined;
        return;
    }
}
