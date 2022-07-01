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
import { isTest } from "../../utils";
import { RecipeEventWithSessionContext, SessionContextType, InputType } from "./types";
import { Recipe as WebJSSessionRecipe } from "supertokens-web-js/recipe/session/recipe";
import { RecipeEvent } from "supertokens-web-js/recipe/session/types";

type ConfigType = InputType & { recipeId: string; appInfo: NormalisedAppInfo; enableDebugLogs: boolean };

export default class Session extends RecipeModule<unknown, unknown, unknown, any> {
    static instance?: Session;
    static RECIPE_ID = "session";

    webJsRecipe: WebJSSessionRecipe;

    private eventListeners = new Set<(ctx: RecipeEventWithSessionContext) => void>();

    constructor(config: ConfigType) {
        super(config);

        this.webJsRecipe = new WebJSSessionRecipe({
            ...config,
            onHandleEvent: (event) => {
                if (config.onHandleEvent !== undefined) {
                    config.onHandleEvent(event);
                }

                void this.notifyListeners(event);
            },
            preAPIHook: async (context) => {
                const response = {
                    ...context,
                    requestInit: {
                        ...context.requestInit,
                        headers: {
                            ...context.requestInit.headers,
                            rid: config.recipeId,
                        },
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

    /**
     * @returns Function to remove event listener
     */
    addEventListener = (listener: (ctx: RecipeEventWithSessionContext) => void): (() => void) => {
        this.eventListeners.add(listener);

        return () => this.eventListeners.delete(listener);
    };

    private notifyListeners = async (event: RecipeEvent) => {
        const sessionContext = await this.getSessionContext(event);

        this.eventListeners.forEach((listener) =>
            listener({
                sessionContext,
                ...event,
            })
        );
    };

    private async getSessionContext({ action, userContext }: RecipeEvent): Promise<SessionContextType> {
        if (action === "SESSION_CREATED" || action === "REFRESH_SESSION" || action === "ACCESS_TOKEN_PAYLOAD_UPDATED") {
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
                loading: false,
            };
        }

        if (action === "SIGN_OUT" || action === "UNAUTHORISED") {
            return {
                doesSessionExist: false,
                accessTokenPayload: {},
                userId: "",
                loading: false,
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

    static reset(): void {
        if (!isTest()) {
            return;
        }

        Session.instance = undefined;
        return;
    }
}
