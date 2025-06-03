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
import SessionWebJS from "supertokens-web-js/recipe/session";
import WebJSSessionRecipe from "supertokens-web-js/recipe/session";

import SuperTokens from "../../superTokens";
import {
    applyPlugins,
    getLocalStorage,
    getNormalisedUserContext,
    getTenantIdFromQueryParams,
    isTest,
    removeFromLocalStorage,
    setLocalStorage,
} from "../../utils";
import OAuth2Provider from "../oauth2provider/recipe";
import RecipeModule from "../recipeModule";

import {
    getFailureRedirectionInfo,
    normaliseSessionConfig,
    validateAndCompareOnFailureRedirectionURLToCurrent,
} from "./utils";

import type { NormalisedSessionConfig } from "./types";
import type { RecipeEventWithSessionContext, InputType, SessionContextUpdate } from "./types";
import type {
    Navigate,
    NormalisedConfigWithAppInfoAndRecipeID,
    NormalisedGetRedirectionURLContext,
    RecipeInitResult,
    SuccessRedirectContextInApp,
    SuccessRedirectContextOAuth2,
    UserContext,
} from "../../types";
import type { ClaimValidationError, SessionClaimValidator } from "supertokens-web-js/recipe/session";
import type { SessionClaim } from "supertokens-web-js/recipe/session";
import type { RecipeEvent } from "supertokens-web-js/recipe/session/types";

export default class Session extends RecipeModule<unknown, unknown, unknown, NormalisedSessionConfig> {
    static instance?: Session;
    static RECIPE_ID = "session" as const;

    public recipeID = Session.RECIPE_ID;

    private eventListeners = new Set<(ctx: RecipeEventWithSessionContext) => void>();

    constructor(
        config: NormalisedConfigWithAppInfoAndRecipeID<NormalisedSessionConfig>,
        public readonly webJSRecipe: Omit<typeof WebJSSessionRecipe, "init" | "default"> = WebJSSessionRecipe
    ) {
        super(config);
    }

    getUserId = (input: { userContext: UserContext }): Promise<string> => {
        return this.webJSRecipe.getUserId(input);
    };

    getAccessToken = (input: { userContext: UserContext }): Promise<string | undefined> => {
        return this.webJSRecipe.getAccessToken(input);
    };

    getClaimValue = <T extends unknown>(input: {
        claim: SessionClaim<T>;
        userContext: UserContext;
    }): Promise<T | undefined> => {
        return this.webJSRecipe.getClaimValue(input);
    };

    getAccessTokenPayloadSecurely = async (input: { userContext: UserContext }): Promise<any> => {
        return this.webJSRecipe.getAccessTokenPayloadSecurely(input);
    };

    doesSessionExist = (input: { userContext: UserContext }): Promise<boolean> => {
        return this.webJSRecipe.doesSessionExist(input);
    };

    signOut = (input: { userContext: UserContext }): Promise<void> => {
        return this.webJSRecipe.signOut(input);
    };

    attemptRefreshingSession = async (): Promise<boolean> => {
        return this.webJSRecipe.attemptRefreshingSession();
    };

    validateClaims = (input: {
        overrideGlobalClaimValidators?: (
            globalClaimValidators: SessionClaimValidator[],
            userContext: UserContext
        ) => SessionClaimValidator[];
        userContext: UserContext;
    }): Promise<ClaimValidationError[]> | ClaimValidationError[] => {
        return this.webJSRecipe.validateClaims(input);
    };

    getInvalidClaimsFromResponse = (input: {
        response: { data: any } | Response;
        userContext: UserContext;
    }): Promise<ClaimValidationError[]> => {
        return this.webJSRecipe.getInvalidClaimsFromResponse(input);
    };

    /**
     * @returns Function to remove event listener
     */
    addEventListener = (listener: (ctx: RecipeEventWithSessionContext) => void): (() => void) => {
        this.eventListeners.add(listener);

        return () => this.eventListeners.delete(listener);
    };

    validateGlobalClaimsAndHandleSuccessRedirection = async (
        // We redefine recipeId to be a string here, because everywhere in the SDK we treat
        // it as a string (e.g.: when defining it in recipes), but we want to type it more
        // strictly in the callbacks the app provides to help integrating our SDK.
        // This is the "meeting point" between the two types, so we need to cast between them here.
        successRedirectContext:
            | ((Omit<SuccessRedirectContextInApp, "recipeId"> | Omit<SuccessRedirectContextOAuth2, "recipeId">) & {
                  recipeId: string;
                  tenantIdFromQueryParams: string | undefined;
              })
            | undefined,
        fallbackRecipeId: string,
        redirectToPath: string | undefined,
        userContext: UserContext | undefined,
        navigate: Navigate | undefined
    ): Promise<void> => {
        userContext = getNormalisedUserContext(userContext);
        // First we check if there is an active session
        if (!(await this.doesSessionExist({ userContext }))) {
            // If there is none, we have no way of checking claims, so we redirect to the auth page
            // This can happen e.g.: if the user clicked on the email verification link in a browser without an active session
            return SuperTokens.getInstanceOrThrow().redirectToAuth({
                navigate,
                redirectBack: false,
                userContext,
            });
        }

        // We validate all the global claims
        const invalidClaims = await this.validateClaims({ userContext });

        if (invalidClaims.length > 0) {
            if (successRedirectContext !== undefined) {
                // if we have to redirect and we have success context we wanted to use we save it in localstorage
                // this way after the other page did solved the validation error it can continue
                // the sign in process by calling this function without passing the redirect info
                const jsonContext = JSON.stringify({ successRedirectContext, redirectToPath });
                await setLocalStorage("supertokens-success-redirection-context", jsonContext);
            }

            // we try to find claim validator among failed validators with onFailure cb that returns string
            const failureRedirectInfo = await getFailureRedirectionInfo({
                invalidClaims,
                userContext,
            });

            // if redirectPath is string that means failed claim had callback that returns path, we redirect there otherwise continue
            if (failureRedirectInfo.redirectPath !== undefined) {
                // the validation part can throw, but this is handled in all places where this is called,
                // since getFailureRedirectionInfo can also throw
                if (validateAndCompareOnFailureRedirectionURLToCurrent(failureRedirectInfo.redirectPath)) {
                    throw new Error(
                        `onFailureRedirectionURL returned the current URL (${failureRedirectInfo.redirectPath}) during success redirection. This indicates that the user is in a stuck state.`
                    );
                }
                return SuperTokens.getInstanceOrThrow().redirectToUrl(failureRedirectInfo.redirectPath, navigate);
            }
        }

        // If we don't need to redirect because of a claim, we try and execute the original redirection
        if (successRedirectContext === undefined) {
            // if this wasn't set directly we try and grab it from local storage
            // generally this means this is a secondary factor completion or emailverification
            const successContextStr = await getLocalStorage("supertokens-success-redirection-context");
            if (successContextStr !== null) {
                try {
                    const storedContext = JSON.parse(successContextStr);
                    successRedirectContext = storedContext.successRedirectContext;

                    // if we have a redirectToPath set in the queryparams that takes priority over the stored value
                    if (redirectToPath === undefined) {
                        redirectToPath = storedContext.redirectToPath;
                    }
                } finally {
                    await removeFromLocalStorage("supertokens-success-redirection-context");
                }
            } else {
                // If there was nothing in localstorage we set a default
                // this can happen if the user visited email verification screen without an auth recipe redirecting them there
                // but already had the email verified and an active session
                successRedirectContext = {
                    recipeId: fallbackRecipeId!,
                    action: "SUCCESS",
                    createdNewUser: false,
                    isNewRecipeUser: false,
                    newSessionCreated: false,
                    tenantIdFromQueryParams: getTenantIdFromQueryParams(),
                };
            }
        }

        if (successRedirectContext === undefined) {
            throw new Error("This should never happen: successRedirectContext undefined ");
        }

        if (successRedirectContext.action === "SUCCESS_OAUTH2") {
            return OAuth2Provider.getInstanceOrThrow().redirect(
                successRedirectContext as NormalisedGetRedirectionURLContext<SuccessRedirectContextOAuth2>,
                navigate,
                {},
                userContext
            );
        }

        if (successRedirectContext.action === "SUCCESS" && redirectToPath !== undefined) {
            successRedirectContext.redirectToPath = redirectToPath;
        }

        return SuperTokens.getInstanceOrThrow().redirect(
            successRedirectContext as NormalisedGetRedirectionURLContext<SuccessRedirectContextInApp>,
            navigate,
            {},
            userContext
        );
    };

    /**
     * This should only get called if validateGlobalClaimsAndHandleSuccessRedirection couldn't get a redirectInfo
     * @returns "/"
     */
    getDefaultRedirectionURL = async (): Promise<string> => {
        // We do not use the util here, since we are redirecting outside of the SDK routes
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
    static addAxiosInterceptors(axiosInstance: any, userContext: UserContext): void {
        return WebJSSessionRecipe.addAxiosInterceptors(axiosInstance, userContext);
    }

    static init(config?: InputType): RecipeInitResult<unknown, unknown, unknown, any> {
        return {
            recipeID: Session.RECIPE_ID,
            authReact: (appInfo, _, overrideMaps): RecipeModule<unknown, unknown, unknown, any> => {
                const normalisedConfig = normaliseSessionConfig(
                    applyPlugins(Session.RECIPE_ID, config, overrideMaps ?? [])
                );
                Session.instance = new Session({
                    ...normalisedConfig,
                    appInfo,
                    recipeId: Session.RECIPE_ID,
                });
                return Session.instance;
            },
            webJS: (...args) => {
                const normalisedConfig = normaliseSessionConfig(config);
                const init = SessionWebJS.init({
                    ...normalisedConfig,
                    onHandleEvent: (event) => {
                        if (normalisedConfig.onHandleEvent !== undefined) {
                            normalisedConfig.onHandleEvent(event);
                        }

                        void Session.getInstanceOrThrow().notifyListeners(event);
                    },
                    preAPIHook: async (context) => {
                        const response = {
                            ...context,
                            requestInit: {
                                ...context.requestInit,
                                headers: {
                                    ...context.requestInit.headers,
                                    rid: Session.RECIPE_ID,
                                },
                            },
                        };
                        if (normalisedConfig.preAPIHook === undefined) {
                            return response;
                        } else {
                            return normalisedConfig.preAPIHook(context);
                        }
                    },
                });
                return init(...args);
            },
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
