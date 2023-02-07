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
import { Recipe as WebJSSessionRecipe } from "supertokens-web-js/recipe/session/recipe";

import SuperTokens from "../../superTokens";
import {
    popInvalidClaimRedirectPathFromContext,
    getLocalStorage,
    isTest,
    removeFromLocalStorage,
    setLocalStorage,
} from "../../utils";
import RecipeModule from "../recipeModule";
import { normaliseRecipeModuleConfig } from "../recipeModule/utils";

import type { RecipeEventWithSessionContext, InputType, SessionContextUpdate } from "./types";
import type { CreateRecipeFunction, NormalisedAppInfo, RecipeFeatureComponentMap } from "../../types";
import type { ClaimValidationError, SessionClaimValidator } from "supertokens-web-js/recipe/session";
import type { SessionClaim } from "supertokens-web-js/recipe/session";
import type { RecipeEvent } from "supertokens-web-js/recipe/session/types";

type ConfigType = InputType & { recipeId: string; appInfo: NormalisedAppInfo; enableDebugLogs: boolean };

export default class Session extends RecipeModule<unknown, unknown, unknown, any> {
    static instance?: Session;
    static RECIPE_ID = "session";

    webJsRecipe: WebJSSessionRecipe;

    private eventListeners = new Set<(ctx: RecipeEventWithSessionContext) => void>();
    private redirectionHandlersFromAuthRecipes = new Map<string, (ctx: any, history: any) => Promise<void>>();

    constructor(config: ConfigType) {
        const normalizedConfig = { ...config, ...normaliseRecipeModuleConfig(config) };
        super(normalizedConfig);

        this.webJsRecipe = new WebJSSessionRecipe({
            ...normalizedConfig,
            onHandleEvent: (event) => {
                if (config.onHandleEvent !== undefined) {
                    config.onHandleEvent(event);
                }

                void this.notifyListeners(event);
            },
            preAPIHook: async (context) => {
                const headers = new Headers(context.requestInit.headers);
                headers.set("rid", config.recipeId);
                const response = {
                    ...context,
                    requestInit: {
                        ...context.requestInit,
                        headers,
                    },
                };
                if (config.preAPIHook === undefined) {
                    return response;
                } else {
                    return config.preAPIHook(context);
                }
            },
        });
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    getFeatureComponent = (_: string): JSX.Element => {
        throw new Error("should never come here");
    };

    getFeatures = (): RecipeFeatureComponentMap => {
        return {};
    };

    getUserId = (input: { userContext: any }): Promise<string> => {
        return this.webJsRecipe.getUserId(input);
    };

    getAccessToken = (input: { userContext: any }): Promise<string | undefined> => {
        return this.webJsRecipe.getAccessToken(input);
    };

    getClaimValue = (input: { claim: SessionClaim<unknown>; userContext: any }): Promise<unknown> => {
        return this.webJsRecipe.getClaimValue(input);
    };

    getAccessTokenPayloadSecurely = async (input: { userContext: any }): Promise<any> => {
        return this.webJsRecipe.getAccessTokenPayloadSecurely(input);
    };

    doesSessionExist = (input: { userContext: any }): Promise<boolean> => {
        return this.webJsRecipe.doesSessionExist(input);
    };

    signOut = (input: { userContext: any }): Promise<void> => {
        return this.webJsRecipe.signOut(input);
    };

    attemptRefreshingSession = async (): Promise<boolean> => {
        return this.webJsRecipe.attemptRefreshingSession();
    };

    validateClaims = (input: {
        overrideGlobalClaimValidators?: (
            globalClaimValidators: SessionClaimValidator[],
            userContext: any
        ) => SessionClaimValidator[];
        userContext: any;
    }): Promise<ClaimValidationError[]> | ClaimValidationError[] => {
        return this.webJsRecipe.validateClaims(input);
    };

    getInvalidClaimsFromResponse = (input: {
        response: { data: any } | Response;
        userContext: any;
    }): Promise<ClaimValidationError[]> => {
        return this.webJsRecipe.getInvalidClaimsFromResponse(input);
    };

    /**
     * @returns Function to remove event listener
     */
    addEventListener = (listener: (ctx: RecipeEventWithSessionContext) => void): (() => void) => {
        this.eventListeners.add(listener);

        return () => this.eventListeners.delete(listener);
    };

    addAuthRecipeRedirectionHandler = (rid: string, redirect: (ctx: any, history: any) => Promise<void>) => {
        this.redirectionHandlersFromAuthRecipes.set(rid, redirect);
    };

    validateGlobalClaimsAndHandleSuccessRedirection = async (
        redirectInfo?: {
            rid: string;
            successRedirectContext: any;
        },
        userContext?: any,
        history?: any
    ): Promise<void> => {
        // First we check if there is an active session
        if (!(await this.doesSessionExist({ userContext }))) {
            // If there is none, we have no way of checking claims, so we redirect to the auth page
            // This can happen e.g.: if the user clicked on the email verification link in a browser without an active session
            return SuperTokens.getInstanceOrThrow().redirectToAuth({
                history,
                redirectBack: false,
            });
        }

        // We validate all the global claims
        const invalidClaims = await this.validateClaims({ userContext });

        // Check if any of those claim errors requests a redirection
        const invalidClaimRedirectPath = popInvalidClaimRedirectPathFromContext(userContext);
        if (invalidClaims.length > 0 && invalidClaimRedirectPath !== undefined) {
            if (redirectInfo !== undefined) {
                // if we have to redirect and we have success context we wanted to use we save it in localstorage
                // this way after the other page did solved the validation error it can contine
                // the sign in process by calling this function without passing the redirect info
                const jsonContext = JSON.stringify(redirectInfo);
                await setLocalStorage("supertokens-success-redirection-context", jsonContext);
            }
            // then we do the redirection.
            return SuperTokens.getInstanceOrThrow().redirectToUrl(invalidClaimRedirectPath, history);
        }

        // If we don't need to redirect because of a claim, we try and execute the original redirection
        if (redirectInfo === undefined) {
            // if this wasn't set directly we try and grab it from local storage
            const successContextStr = await getLocalStorage("supertokens-success-redirection-context");
            if (successContextStr !== null) {
                try {
                    redirectInfo = JSON.parse(successContextStr);
                } finally {
                    await removeFromLocalStorage("supertokens-success-redirection-context");
                }
            } else {
                // If there was nothing in localstorage we set a default
                // this can happen if the user visited email verification screen without an auth recipe redirecting them there
                // but already had the email verified and an active session
                redirectInfo = {
                    rid: Session.RECIPE_ID,
                    successRedirectContext: {
                        action: "SUCCESS",
                        isNewUser: false,
                    },
                };
            }
        }

        // We get the redirection handler registered by the relevant auth recipe
        const authRecipeRedirectHandler = this.redirectionHandlersFromAuthRecipes.get(redirectInfo!.rid);
        if (authRecipeRedirectHandler !== undefined) {
            // and call it with the saved info
            return authRecipeRedirectHandler(redirectInfo!.successRedirectContext, history);
        }

        // This should only happen if the configuration changed between saving the context and finishing the sign in process
        // or if the user navigated to a page where they were expected to have a stored redirectInfo but didn't
        // (e.g.: pressed back after email verification)
        return this.redirect(redirectInfo!.successRedirectContext!, history);
    };

    /**
     * This should only get called if validateGlobalClaimsAndHandleSuccessRedirection couldn't get a redirectInfo
     * @returns "/"
     */
    getDefaultRedirectionURL = async (): Promise<string> => {
        return "/";
    };

    private notifyListeners = async (event: RecipeEvent) => {
        const sessionContext = await this.getSessionContext(event);

        // We copy this.eventListeners into a new array to "freeze" it for the loop
        // We do this to avoid an infinite loop in case one of the listeners causes a new listener to be added (e.g.: through re-rendering)
        Array.from(this.eventListeners).forEach((listener) =>
            listener({
                sessionContext,
                ...event,
            })
        );
    };

    private async getSessionContext({ action, userContext }: RecipeEvent): Promise<SessionContextUpdate> {
        if (
            action === "SESSION_CREATED" ||
            action === "REFRESH_SESSION" ||
            action === "API_INVALID_CLAIM" ||
            action === "ACCESS_TOKEN_PAYLOAD_UPDATED"
        ) {
            const [userId, accessTokenPayload] = await Promise.all([
                this.getUserId({
                    userContext,
                }),
                this.getAccessTokenPayloadSecurely({
                    userContext,
                }),
            ]);

            return {
                doesSessionExist: true,
                accessTokenPayload,
                userId,
            };
        }

        if (action === "SIGN_OUT" || action === "UNAUTHORISED") {
            return {
                doesSessionExist: false,
                accessTokenPayload: {},
                userId: "",
            };
        }

        throw new Error(`Unhandled recipe event: ${action}`);
    }

    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    static addAxiosInterceptors(axiosInstance: any, userContext: any): void {
        return WebJSSessionRecipe.addAxiosInterceptors(axiosInstance, userContext);
    }

    static init(config?: InputType): CreateRecipeFunction<unknown, unknown, unknown, any> {
        return (appInfo: NormalisedAppInfo, enableDebugLogs: boolean): RecipeModule<unknown, unknown, unknown, any> => {
            Session.instance = new Session({
                ...config,
                appInfo,
                recipeId: Session.RECIPE_ID,
                enableDebugLogs,
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

    static getInstance(): Session | undefined {
        return Session.instance;
    }

    static reset(): void {
        if (!isTest()) {
            return;
        }

        Session.instance = undefined;
        return;
    }
}
