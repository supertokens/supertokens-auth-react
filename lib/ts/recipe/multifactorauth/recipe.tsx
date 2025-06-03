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

import MultiFactorAuthWebJS from "supertokens-web-js/recipe/multifactorauth";
import { getNormalisedUserContext } from "supertokens-web-js/utils";
import { PostSuperTokensInitCallbacks } from "supertokens-web-js/utils/postSuperTokensInitCallbacks";
import { SessionClaimValidatorStore } from "supertokens-web-js/utils/sessionClaimValidatorStore";
import { WindowHandlerReference } from "supertokens-web-js/utils/windowHandler";

import { SSR_ERROR } from "../../constants";
import SuperTokens from "../../superTokens";
import {
    appendQueryParamsToURL,
    applyPlugins,
    getCurrentNormalisedUrlPathWithQueryParamsAndFragments,
    getDefaultRedirectionURLForPath,
    getRedirectToPathFromURL,
    getTenantIdFromQueryParams,
    isTest,
} from "../../utils";
import RecipeModule from "../recipeModule";
import Session from "../session/recipe";

import { DEFAULT_FACTOR_CHOOSER_PATH, MFA_INFO_CACHE_KEY } from "./constants";
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
import type {
    Navigate,
    NormalisedConfigWithAppInfoAndRecipeID,
    RecipeInitResult,
    UserContext,
    WebJSRecipeInterface,
} from "../../types";

export default class MultiFactorAuth extends RecipeModule<
    GetRedirectionURLContext,
    PreAndPostAPIHookAction,
    OnHandleEventContext,
    NormalisedConfig
> {
    static instance?: MultiFactorAuth;
    static RECIPE_ID = "multifactorauth" as const;

    static MultiFactorAuthClaim = new MultiFactorAuthClaimClass(
        () => MultiFactorAuth.getInstanceOrThrow(),
        async (context, userContext) =>
            (await this.getInstanceOrThrow().getRedirectUrl(
                { ...context, tenantIdFromQueryParams: getTenantIdFromQueryParams() },
                userContext
            )) || undefined
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
                MultiFactorAuth.MultiFactorAuthClaim.validators.hasCompletedMFARequirementsForAuth();
            SessionClaimValidatorStore.addClaimValidatorFromOtherRecipe(defaultFactorsValidator);
            Session.getInstanceOrThrow().addEventListener(() => {
                // We clear the cache if the session updated, since that may mean that the MFA info has changed
                const stWindow = WindowHandlerReference.getReferenceOrThrow();
                stWindow.windowHandler.sessionStorage.removeItemSync(MFA_INFO_CACHE_KEY);
            });
        });
    }

    static init(
        config?: UserInput
    ): RecipeInitResult<GetRedirectionURLContext, PreAndPostAPIHookAction, OnHandleEventContext, NormalisedConfig> {
        return {
            recipeID: MultiFactorAuth.RECIPE_ID,
            authReact: (
                appInfo,
                _,
                overrideMaps
            ): RecipeModule<
                GetRedirectionURLContext,
                PreAndPostAPIHookAction,
                OnHandleEventContext,
                NormalisedConfig
            > => {
                const normalisedConfig = normaliseMultiFactorAuthFeature(
                    applyPlugins(MultiFactorAuth.RECIPE_ID, config, overrideMaps ?? [])
                );
                MultiFactorAuth.instance = new MultiFactorAuth({
                    ...normalisedConfig,
                    appInfo,
                    recipeId: MultiFactorAuth.RECIPE_ID,
                });
                return MultiFactorAuth.instance;
            },
            webJS: (...args) => {
                const normalisedConfig = normaliseMultiFactorAuthFeature(config);
                const init = MultiFactorAuthWebJS.init({
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

    getDefaultRedirectionURL = async (context: GetRedirectionURLContext, userContext: UserContext): Promise<string> => {
        if (context.action === "FACTOR_CHOOSER") {
            const nParam =
                context.nextFactorOptions && context.nextFactorOptions.length > 0
                    ? context.nextFactorOptions.join(",")
                    : undefined;

            return getDefaultRedirectionURLForPath(this.config, DEFAULT_FACTOR_CHOOSER_PATH, context, {
                n: nParam,
                stepUp: context.stepUp ? "true" : undefined,
            });
        } else if (context.action === "GO_TO_FACTOR") {
            const redirectInfo = this.getSecondaryFactors(userContext).find((f) => f.id === context.factorId);
            if (redirectInfo !== undefined) {
                return getDefaultRedirectionURLForPath(this.config, redirectInfo.path, context, {
                    setup: context.forceSetup ? "true" : undefined,
                    stepUp: context.stepUp ? "true" : undefined,
                });
            }
            throw new Error("Requested redirect to unknown factor id: " + context.factorId);
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

    getSecondaryFactors(userContext: UserContext) {
        return this.config.getSecondaryFactorInfo(this.secondaryFactors, userContext);
    }

    async redirectToFactor({
        factorId,
        forceSetup,
        stepUp,
        redirectBack,
        navigate,
        userContext,
    }: {
        factorId: string;
        forceSetup: boolean | undefined;
        stepUp: boolean | undefined;
        redirectBack: boolean | undefined;
        navigate: Navigate | undefined;
        userContext: UserContext | undefined;
    }) {
        let url = await this.getRedirectUrl(
            {
                action: "GO_TO_FACTOR",
                forceSetup,
                stepUp,
                factorId,
                tenantIdFromQueryParams: getTenantIdFromQueryParams(),
            },
            getNormalisedUserContext(userContext)
        );
        if (url === null) {
            return;
        }
        // If redirectBack was set to true we always set redirectToPath to that value
        // otherwise we try and get it from the query params, finally falling back to not setting it.
        // Example:
        // 1. If the app calls this on pathX and with redirectBack=false, we redirect to /auth/mfa/factor-id
        // 2. If the app calls this on pathX and with redirectBack=true, we redirect to /auth/mfa/factor-id?redirectToPath=pathX
        // 3. If:
        //      - the app redirects to the factor chooser with redirectBack=true from path=X, they end up on /auth/mfa?redirectToPath=pathX
        //      - the factor chooser screen then calls this with redirectBack=false, then they end up on /auth/mfa/factor-id?redirectToPath=pathX
        // 4. In the unlikely case that the app itself uses a `redirectToPath` query param internally
        //    and is on a custom path that has a redirectToPath set to pathX when calling this function,
        //    then we keep that in the query params if redirectBack is set to false.
        if (redirectBack) {
            const redirectUrl = getCurrentNormalisedUrlPathWithQueryParamsAndFragments();
            url = appendQueryParamsToURL(url, { redirectToPath: redirectUrl });
        } else {
            const redirectUrl = getRedirectToPathFromURL();
            if (redirectUrl) {
                url = appendQueryParamsToURL(url, { redirectToPath: redirectUrl });
            }
        }
        return SuperTokens.getInstanceOrThrow().redirectToUrl(url, navigate);
    }

    async redirectToFactorChooser({
        redirectBack = false,
        nextFactorOptions = [],
        stepUp,
        navigate,
        userContext,
    }: {
        redirectBack: boolean | undefined;
        nextFactorOptions: string[] | undefined;
        stepUp: boolean | undefined;
        navigate: Navigate | undefined;
        userContext: UserContext | undefined;
    }) {
        let url = await this.getRedirectUrl(
            {
                action: "FACTOR_CHOOSER",
                nextFactorOptions,
                stepUp,
                tenantIdFromQueryParams: getTenantIdFromQueryParams(),
            },
            getNormalisedUserContext(userContext)
        );

        if (url === null) {
            return;
        }
        if (redirectBack) {
            const redirectUrl = getCurrentNormalisedUrlPathWithQueryParamsAndFragments();
            url = appendQueryParamsToURL(url, { redirectToPath: redirectUrl });
        } else {
            const redirectUrl = getRedirectToPathFromURL();
            if (redirectUrl) {
                url = appendQueryParamsToURL(url, { redirectToPath: redirectUrl });
            }
        }
        return SuperTokens.getInstanceOrThrow().redirectToUrl(url, navigate);
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
