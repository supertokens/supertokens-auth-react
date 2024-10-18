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

import { RecipeComponentsOverrideContextProvider } from "./componentOverrideContext";
import OAuth2Provider from "./recipe";
import { UserInput, GetRedirectionURLContext, PreAPIHookContext, OnHandleEventContext } from "./types";

import type { RecipeFunctionOptions, LoginInfo } from "supertokens-web-js/recipe/oauth2provider";
import type { RecipeInterface } from "supertokens-web-js/recipe/oauth2provider";

export default class Wrapper {
    static init(config?: UserInput) {
        return OAuth2Provider.init(config);
    }

    /**
     * Returns information about an OAuth login in progress
     *
     * @param loginChallenge The login challenge from the url
     *
     * @param userContext (OPTIONAL) Refer to {@link https://supertokens.com/docs/emailpassword/advanced-customizations/user-context the documentation}
     *
     * @param options (OPTIONAL) Use this to configure additional properties (for example pre api hooks)
     *
     * @returns `{status: "OK", info: LoginInfo}`
     *
     * @throws STGeneralError if the API exposed by the backend SDKs returns `status: "GENERAL_ERROR"`
     */
    static getLoginChallengeInfo(input: {
        loginChallenge: string;
        options?: RecipeFunctionOptions;
        userContext?: any;
    }): Promise<{
        status: "OK";
        info: LoginInfo;
        fetchResponse: Response;
    }> {
        return OAuth2Provider.getInstanceOrThrow().webJSRecipe.getLoginChallengeInfo(input);
    }

    /**
     * Accepts the OAuth2 Login request and returns the redirect URL to continue the OAuth flow.
     *
     * @param loginChallenge The login challenge from the url
     *
     * @param userContext (OPTIONAL) Refer to {@link https://supertokens.com/docs/emailpassword/advanced-customizations/user-context the documentation}
     *
     * @param options (OPTIONAL) Use this to configure additional properties (for example pre api hooks)
     *
     * @returns `{status: "OK", frontendRedirectTo: string}`
     *
     * @throws STGeneralError if the API exposed by the backend SDKs returns `status: "GENERAL_ERROR"`
     */
    static getRedirectURLToContinueOAuthFlow(input: {
        loginChallenge: string;
        options?: RecipeFunctionOptions;
        userContext?: any;
    }): Promise<{
        status: "OK";
        frontendRedirectTo: string;
        fetchResponse: Response;
    }> {
        return OAuth2Provider.getInstanceOrThrow().webJSRecipe.getRedirectURLToContinueOAuthFlow(input);
    }

    /**
     * Accepts the OAuth2 Logout request, clears the SuperTokens session and returns post logout redirect URL.
     *
     * @param logoutChallenge The logout challenge from the url
     *
     * @param userContext (OPTIONAL) Refer to {@link https://supertokens.com/docs/emailpassword/advanced-customizations/user-context the documentation}
     *
     * @param options (OPTIONAL) Use this to configure additional properties (for example pre api hooks)
     *
     * @returns `{status: "OK", frontendRedirectTo: string}`
     *
     * @throws STGeneralError if the API exposed by the backend SDKs returns `status: "GENERAL_ERROR"`
     */
    static logOut(input: { logoutChallenge: string; options?: RecipeFunctionOptions; userContext?: any }): Promise<{
        status: "OK";
        frontendRedirectTo: string;
        fetchResponse: Response;
    }> {
        return OAuth2Provider.getInstanceOrThrow().webJSRecipe.logOut(input);
    }

    static ComponentsOverrideProvider = RecipeComponentsOverrideContextProvider;
}

const init = Wrapper.init;
const getLoginChallengeInfo = Wrapper.getLoginChallengeInfo;
const logOut = Wrapper.logOut;

export {
    init,
    getLoginChallengeInfo,
    logOut,
    GetRedirectionURLContext,
    PreAPIHookContext,
    OnHandleEventContext,
    UserInput,
    RecipeInterface,
    RecipeComponentsOverrideContextProvider,
};
