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

import MultiFactorAuthWebJS from "supertokens-web-js/recipe/multifactorauth";
import NormalisedURLPath from "supertokens-web-js/utils/normalisedURLPath";
import { PostSuperTokensInitCallbacks } from "supertokens-web-js/utils/postSuperTokensInitCallbacks";
import { SessionClaimValidatorStore } from "supertokens-web-js/utils/sessionClaimValidatorStore";

import { SSR_ERROR } from "../../constants";
import SuperTokens from "../../superTokens";
import { appendQueryParamsToURL, getCurrentNormalisedUrlPath, getRedirectToPathFromURL, isTest } from "../../utils";
import RecipeModule from "../recipeModule";

import { DEFAULT_FACTOR_CHOOSER_PATH } from "./constants";
import { getFunctionOverrides } from "./functionOverrides";
import { MultiFactorAuthClaimClass } from "./multiFactorAuthClaim";
import { normaliseMultiFactorAuthFeature } from "./utils";

import type {
    UserInput,
    NormalisedConfig,
    GetRedirectionURLContext,
    OnHandleEventContext,
    PreAndPostAPIHookAction,
    SecondaryFactorRedirectionInfo,
} from "./types";
import type { NormalisedConfigWithAppInfoAndRecipeID, RecipeInitResult, WebJSRecipeInterface } from "../../types";
import type { NormalisedAppInfo } from "../../types";

export default class MultiFactorAuth extends RecipeModule<
    GetRedirectionURLContext,
    PreAndPostAPIHookAction,
    OnHandleEventContext,
    NormalisedConfig
> {
    static instance?: MultiFactorAuth;
    static RECIPE_ID = "multifactorauth";

    static MultiFactorAuthClaim = new MultiFactorAuthClaimClass(
        () => MultiFactorAuth.getInstanceOrThrow().webJSRecipe,
        (context) => this.getInstanceOrThrow().getDefaultRedirectionURL(context)
    );

    public recipeID = MultiFactorAuth.RECIPE_ID;
    private secondaryFactors: SecondaryFactorRedirectionInfo[] = [];

    constructor(
        config: NormalisedConfigWithAppInfoAndRecipeID<NormalisedConfig>,
        public readonly webJSRecipe: WebJSRecipeInterface<typeof MultiFactorAuthWebJS> = MultiFactorAuthWebJS
    ) {
        super(config);

        PostSuperTokensInitCallbacks.addPostInitCallback(() => {
            const defaultFactorsValidator =
                MultiFactorAuth.MultiFactorAuthClaim.validators.hasCompletedDefaultFactors();
            SessionClaimValidatorStore.addClaimValidatorFromOtherRecipe(defaultFactorsValidator);
        });
    }

    static init(
        config?: UserInput
    ): RecipeInitResult<GetRedirectionURLContext, PreAndPostAPIHookAction, OnHandleEventContext, NormalisedConfig> {
        const normalisedConfig = normaliseMultiFactorAuthFeature(config);

        return {
            recipeID: MultiFactorAuth.RECIPE_ID,
            authReact: (
                appInfo: NormalisedAppInfo
            ): RecipeModule<
                GetRedirectionURLContext,
                PreAndPostAPIHookAction,
                OnHandleEventContext,
                NormalisedConfig
            > => {
                MultiFactorAuth.instance = new MultiFactorAuth({
                    ...normalisedConfig,
                    appInfo,
                    recipeId: MultiFactorAuth.RECIPE_ID,
                });
                return MultiFactorAuth.instance;
            },
            webJS: MultiFactorAuthWebJS.init({
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

    static getInstance(): MultiFactorAuth | undefined {
        return MultiFactorAuth.instance;
    }

    static getInstanceOrThrow(): MultiFactorAuth {
        if (MultiFactorAuth.instance === undefined) {
            let error = "No instance of MultiFactorAuth found. Make sure to call the MultiFactorAuth.init method.";

            // eslint-disable-next-line supertokens-auth-react/no-direct-window-object
            if (typeof window === "undefined") {
                error = error + SSR_ERROR;
            }
            throw Error(error);
        }

        return MultiFactorAuth.instance;
    }

    getDefaultRedirectionURL = async (context: GetRedirectionURLContext): Promise<string> => {
        if (context.action === "FACTOR_CHOOSER") {
            const chooserPath = new NormalisedURLPath(DEFAULT_FACTOR_CHOOSER_PATH);
            return this.config.appInfo.websiteBasePath.appendPath(chooserPath).getAsStringDangerous();
        } else if (context.action === "GO_TO_FACTOR") {
            const redirectInfo = this.getSecondaryFactors().find((f) => f.id === context.factorId);
            if (redirectInfo !== undefined) {
                return this.config.appInfo.websiteBasePath
                    .appendPath(new NormalisedURLPath(redirectInfo.path))
                    .getAsStringDangerous();
            }
            throw new Error("Requested redirect to unknown factor id");
        } else {
            return "/";
        }
    };

    addMFAFactors(secondaryFactors: SecondaryFactorRedirectionInfo[]) {
        this.secondaryFactors = [
            ...this.secondaryFactors.filter((factor) =>
                secondaryFactors.every((newFactor) => factor.id !== newFactor.id)
            ),
            ...secondaryFactors,
        ];
    }

    isFirstFactorEnabledOnClient(factorId: string) {
        return this.config.firstFactors === undefined || this.config.firstFactors.includes(factorId);
    }

    getSecondaryFactors() {
        return this.config.getFactorInfo(this.secondaryFactors);
    }

    async redirectToFactor(factorId: string, redirectBack = false, history?: any) {
        let url = await this.getRedirectUrl({ action: "GO_TO_FACTOR", factorId });
        if (redirectBack) {
            const redirectUrl = getCurrentNormalisedUrlPath().getAsStringDangerous();
            url = appendQueryParamsToURL(url, { redirectToPath: redirectUrl });
        } else {
            const redirectUrl = getRedirectToPathFromURL();
            if (redirectUrl) {
                url = appendQueryParamsToURL(url, { redirectToPath: redirectUrl });
            }
        }
        return SuperTokens.getInstanceOrThrow().redirectToUrl(url, history);
    }

    async redirectToFactorChooser(redirectBack = false, history?: any) {
        let url = await this.getRedirectUrl({ action: "FACTOR_CHOOSER" });
        if (redirectBack) {
            const redirectUrl = getCurrentNormalisedUrlPath().getAsStringDangerous();
            url = appendQueryParamsToURL(url, { redirectToPath: redirectUrl });
        } else {
            const redirectUrl = getRedirectToPathFromURL();
            if (redirectUrl) {
                url = appendQueryParamsToURL(url, { redirectToPath: redirectUrl });
            }
        }
        return SuperTokens.getInstanceOrThrow().redirectToUrl(url, history);
    }

    /*
     * Tests methods.
     */
    static reset(): void {
        if (!isTest()) {
            return;
        }

        MultiFactorAuth.instance = undefined;
        return;
    }
}
