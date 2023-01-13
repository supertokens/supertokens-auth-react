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
import { Config, NormalisedConfig } from "./types";
import { normaliseAuthRecipe } from "../authRecipe/utils";
import { RecipeInterface as TPPWlessRecipeInterface } from "supertokens-web-js/recipe/thirdpartypasswordless";
import { normalisePasswordlessConfig } from "../passwordless/utils";
import { normaliseThirdPartyConfig } from "../thirdparty/utils";

export function normaliseThirdPartyPasswordlessConfig(config: Config = {} as Config): NormalisedConfig {
    const disablePasswordless = config.disablePasswordless === true;
    const disableThirdParty =
        config.signInUpFeature === undefined ||
        config.signInUpFeature.providers === undefined ||
        config.signInUpFeature.providers.length === 0;
    if (disablePasswordless && disableThirdParty) {
        throw new Error("You need to enable either passwordless or third party providers login.");
    }

    const override: any = {
        functions: (originalImplementation: TPPWlessRecipeInterface) => originalImplementation,
        ...config.override,
    };

    const thirdPartyProviderAndEmailOrPhoneFormStyle =
        config?.signInUpFeature?.thirdPartyProviderAndEmailOrPhoneFormStyle === undefined
            ? {}
            : config?.signInUpFeature.thirdPartyProviderAndEmailOrPhoneFormStyle;
    return {
        ...normaliseAuthRecipe(config),

        thirdPartyProviderAndEmailOrPhoneFormStyle,
        thirdpartyConfig: disableThirdParty
            ? undefined
            : normaliseThirdPartyConfig({
                  getRedirectionURL: config.getRedirectionURL,
                  style: config.style,
                  onHandleEvent: config.onHandleEvent,
                  palette: config.palette,
                  preAPIHook: config.preAPIHook,
                  signInAndUpFeature: {
                      ...config.signInUpFeature,
                      style: thirdPartyProviderAndEmailOrPhoneFormStyle,
                  },
                  oAuthCallbackScreen: config.oAuthCallbackScreen,
                  useShadowDom: config.useShadowDom,
                  override: {},
              }),
        passwordlessConfig: disablePasswordless
            ? undefined
            : normalisePasswordlessConfig({
                  contactMethod: config.contactMethod,
                  style: config.style,
                  validateEmailAddress: "validateEmailAddress" in config ? config.validateEmailAddress : undefined,
                  validatePhoneNumber: "validatePhoneNumber" in config ? config.validatePhoneNumber : undefined,
                  getRedirectionURL: config.getRedirectionURL,
                  onHandleEvent: config.onHandleEvent,
                  palette: config.palette,
                  preAPIHook: config.preAPIHook,
                  useShadowDom: config.useShadowDom,
                  signInUpFeature: {
                      ...config.signInUpFeature,
                      emailOrPhoneFormStyle: thirdPartyProviderAndEmailOrPhoneFormStyle,
                  },
                  linkClickedScreenFeature: config.linkClickedScreenFeature,
                  override: {},
              }),
        override,
    };
}
