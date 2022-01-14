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

import AuthRecipe from "../authRecipe";
import { NormalisedConfig, GetRedirectionURLContext, PreAPIHookContext, OnHandleEventContext } from "./types";
import { RecipeFeatureComponentMap } from "../../types";
import EmailVerification from "../emailverification/recipe";
import { setLocalStorage, getLocalStorage, removeFromLocalStorage } from "../../utils";

export default abstract class AuthRecipeWithEmailVerification<
    T,
    S,
    R,
    N extends NormalisedConfig<T | GetRedirectionURLContext, S | PreAPIHookContext, R | OnHandleEventContext>
> extends AuthRecipe<T | GetRedirectionURLContext, S | PreAPIHookContext, R | OnHandleEventContext, N> {
    emailVerification: EmailVerification;

    constructor(
        config: N,
        recipes: {
            emailVerificationInstance: EmailVerification | undefined;
        }
    ) {
        super(config);
        this.emailVerification =
            recipes.emailVerificationInstance === undefined
                ? new EmailVerification({
                      appInfo: config.appInfo,
                      recipeId: config.recipeId,
                      signOut: this.signOut,
                      style: this.config.rootStyle,
                      postVerificationRedirect: async (history: any) => {
                          try {
                              // if there is a SUCCESS context saved in localstorage, we use that in the redirect.
                              const successContextStr = getLocalStorage("supertokens-post-email-verification");
                              if (successContextStr !== null) {
                                  await this.redirect(JSON.parse(successContextStr), history);
                              } else {
                                  // else, we do the default behaviour
                                  await this.redirect({
                                      action: "SUCCESS",
                                      isNewUser: false,
                                  });
                              }
                          } finally {
                              removeFromLocalStorage("supertokens-post-email-verification");
                          }
                      },
                      redirectToSignIn: async (history: any) =>
                          this.redirectToAuthWithoutRedirectToPath(undefined, history),
                      getRedirectionURL: config.getRedirectionURL,
                      onHandleEvent: config.onHandleEvent,
                      palette: config.palette,
                      preAPIHook: config.preAPIHook,
                      useShadowDom: config.useShadowDom,
                      ...config.emailVerificationFeature,
                      override: config.override === undefined ? undefined : config.override.emailVerification,
                  })
                : recipes.emailVerificationInstance;
    }

    // this function is used by auth recipes to save the success context before
    // redirecting to email verification screen - so that post verification,
    // the user is redirected to the correct place.
    savePostEmailVerificationSuccessRedirectState = async (context: T): Promise<void> => {
        const jsonContext = JSON.stringify(context);
        setLocalStorage("supertokens-post-email-verification", jsonContext);
    };

    getAuthRecipeWithEmailVerificationDefaultRedirectionURL = async (
        context: GetRedirectionURLContext
    ): Promise<string> => {
        if (context.action === "SIGN_IN_AND_UP") {
            return `${this.config.appInfo.websiteBasePath.getAsStringDangerous()}?rid=${this.config.recipeId}`;
        } else if (context.action === "SUCCESS") {
            return context.redirectToPath === undefined ? "/" : context.redirectToPath;
        } else {
            throw new Error("Should never come here");
        }
    };

    getAuthRecipeWithEmailVerificationFeatureComponent = (
        componentName: "emailverification",
        props: any
    ): JSX.Element => {
        return this.emailVerification.getFeatureComponent(componentName, props);
    };

    getAuthRecipeWithEmailVerificationFeatures = (): RecipeFeatureComponentMap => {
        return this.emailVerification.getFeatures();
    };
}
