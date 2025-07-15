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
 * Import
 */

// /!\ ThirdParty must be imported before any of the providers to prevent circular dependencies.
import { RecipeInterface } from "supertokens-web-js/recipe/thirdparty";

import { getNormalisedUserContext } from "../../utils";

import { RecipeComponentsOverrideContextProvider } from "./componentOverrideContext";
import ActiveDirectory from "./providers/activeDirectory";
import Apple from "./providers/apple";
import Bitbucket from "./providers/bitbucket";
import BoxySAML from "./providers/boxySaml";
import Discord from "./providers/discord";
import Facebook from "./providers/facebook";
import Github from "./providers/github";
import Gitlab from "./providers/gitlab";
import Google from "./providers/google";
import GoogleWorkspaces from "./providers/googleWorkspaces";
import LinkedIn from "./providers/linkedIn";
import Okta from "./providers/okta";
import Twitter from "./providers/twitter";
import ThirdParty from "./recipe";
import { UserInput, GetRedirectionURLContext, PreAPIHookContext, OnHandleEventContext } from "./types";
import { redirectToThirdPartyLogin as UtilsRedirectToThirdPartyLogin } from "./utils";

import type { UserContext } from "../../types";
import type { StateObject, RecipeFunctionOptions } from "supertokens-web-js/recipe/thirdparty";
import type { User } from "supertokens-web-js/types";

export default class Wrapper {
    /*
     * Static attributes.
     */

    static init(config?: UserInput) {
        return ThirdParty.init(config);
    }

    static async signOut(input?: { userContext?: UserContext }): Promise<void> {
        return ThirdParty.getInstanceOrThrow().signOut({
            userContext: getNormalisedUserContext(input?.userContext),
        });
    }

    static async redirectToThirdPartyLogin(input: {
        thirdPartyId: string;
        shouldTryLinkingWithSessionUser?: boolean;
        userContext?: UserContext;
    }): Promise<{ status: "OK" | "ERROR" }> {
        const recipeInstance: ThirdParty = ThirdParty.getInstanceOrThrow();

        return UtilsRedirectToThirdPartyLogin({
            thirdPartyId: input.thirdPartyId,
            config: recipeInstance.config,
            userContext: getNormalisedUserContext(input.userContext),
            shouldTryLinkingWithSessionUser: input.shouldTryLinkingWithSessionUser,
            recipeImplementation: recipeInstance.webJSRecipe,
        });
    }

    static getStateAndOtherInfoFromStorage<CustomStateProperties>(input?: {
        userContext?: UserContext;
    }): (StateObject & CustomStateProperties) | undefined {
        return ThirdParty.getInstanceOrThrow().webJSRecipe.getStateAndOtherInfoFromStorage({
            ...input,
            userContext: getNormalisedUserContext(input?.userContext),
        });
    }

    static async getAuthorisationURLWithQueryParamsAndSetState(input: {
        thirdPartyId: string;
        frontendRedirectURI: string;
        redirectURIOnProviderDashboard?: string;
        shouldTryLinkingWithSessionUser?: boolean;
        userContext?: UserContext;
        options?: RecipeFunctionOptions;
    }): Promise<string> {
        return ThirdParty.getInstanceOrThrow().webJSRecipe.getAuthorisationURLWithQueryParamsAndSetState({
            ...input,
            userContext: getNormalisedUserContext(input.userContext),
        });
    }

    static async signInAndUp(input?: { userContext?: UserContext; options?: RecipeFunctionOptions }): Promise<
        | {
              status: "OK";
              user: User;
              createdNewRecipeUser: boolean;
              fetchResponse: Response;
          }
        | {
              status: "NO_EMAIL_GIVEN_BY_PROVIDER";
              fetchResponse: Response;
          }
        | {
              status: "SIGN_IN_UP_NOT_ALLOWED";
              reason: string;
              fetchResponse: Response;
          }
    > {
        return ThirdParty.getInstanceOrThrow().webJSRecipe.signInAndUp({
            ...input,
            userContext: getNormalisedUserContext(input?.userContext),
        });
    }

    static getProviders(): { id: string; name: string }[] {
        return ThirdParty.getInstanceOrThrow().config.signInAndUpFeature.providers.map((provider) => ({
            id: provider.id,
            name: provider.name,
        }));
    }

    /*
     * Providers
     */
    static Apple = Apple;
    static Bitbucket = Bitbucket;
    static Discord = Discord;
    static Github = Github;
    static Gitlab = Gitlab;
    static Google = Google;
    static GoogleWorkspaces = GoogleWorkspaces;
    static Facebook = Facebook;
    static LinkedIn = LinkedIn;
    static ActiveDirectory = ActiveDirectory;
    static BoxySAML = BoxySAML;
    static Okta = Okta;
    static Twitter = Twitter;
    static ComponentsOverrideProvider = RecipeComponentsOverrideContextProvider;
}

const init = Wrapper.init;
const signOut = Wrapper.signOut;
const redirectToThirdPartyLogin = Wrapper.redirectToThirdPartyLogin;
const getStateAndOtherInfoFromStorage = Wrapper.getStateAndOtherInfoFromStorage;
const getAuthorisationURLWithQueryParamsAndSetState = Wrapper.getAuthorisationURLWithQueryParamsAndSetState;
const signInAndUp = Wrapper.signInAndUp;
const getProviders = Wrapper.getProviders;
const ThirdpartyComponentsOverrideProvider = Wrapper.ComponentsOverrideProvider;

export {
    init,
    Apple,
    Bitbucket,
    Discord,
    Github,
    Gitlab,
    Google,
    GoogleWorkspaces,
    Facebook,
    LinkedIn,
    ActiveDirectory,
    BoxySAML,
    Okta,
    Twitter,
    getStateAndOtherInfoFromStorage,
    getAuthorisationURLWithQueryParamsAndSetState,
    signInAndUp,
    getProviders,
    redirectToThirdPartyLogin,
    ThirdpartyComponentsOverrideProvider,
    signOut,
    GetRedirectionURLContext,
    PreAPIHookContext,
    OnHandleEventContext,
    UserInput,
    RecipeInterface,
};
