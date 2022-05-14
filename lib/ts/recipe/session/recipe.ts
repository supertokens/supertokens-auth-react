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
import { InputType, RecipeEvent, RecipeEventWithSessionContext, SessionContextType } from "./types";
import sessionSdk from "supertokens-website";

type ConfigType = InputType & { recipeId: string; appInfo: NormalisedAppInfo; enableDebugLogs: boolean };

export default class Session extends RecipeModule<unknown, unknown, unknown, any> {
    static instance?: Session;
    static RECIPE_ID = "session";

    private eventListeners = new Set<(ctx: RecipeEventWithSessionContext) => void>();

    constructor(config: ConfigType) {
        super(config);

        sessionSdk.init({
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
            apiDomain: config.appInfo.apiDomain.getAsStringDangerous(),
            apiBasePath: config.appInfo.apiBasePath.getAsStringDangerous(),
        });
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    getFeatureComponent = (_: string): JSX.Element => {
        throw new Error("should never come here");
    };

    getFeatures = (): RecipeFeatureComponentMap => {
        return {};
    };

    getUserId = (): Promise<string> => {
        return sessionSdk.getUserId();
    };

    getAccessTokenPayloadSecurely = async (): Promise<any> => {
        return sessionSdk.getAccessTokenPayloadSecurely();
    };

    doesSessionExist = (): Promise<boolean> => {
        return sessionSdk.doesSessionExist();
    };

    signOut = (): Promise<void> => {
        return sessionSdk.signOut();
    };

    attemptRefreshingSession = async (): Promise<boolean> => {
        return sessionSdk.attemptRefreshingSession();
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

    private async getSessionContext({ action }: RecipeEvent): Promise<SessionContextType> {
        if (action === "SESSION_CREATED" || action === "REFRESH_SESSION" || action === "ACCESS_TOKEN_PAYLOAD_UPDATED") {
            const [userId, accessTokenPayload] = await Promise.all([
                this.getUserId(),
                this.getAccessTokenPayloadSecurely(),
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
    static addAxiosInterceptors(axiosInstance: any): void {
        return sessionSdk.addAxiosInterceptors(axiosInstance);
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
