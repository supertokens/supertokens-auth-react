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

import type { AccessDeniedScreenTheme } from "./components/themes/accessDeniedScreenTheme";
import type Session from "./recipe";
import type { ComponentOverride } from "../../components/componentOverride/componentOverride";
import type { Navigate, FeatureBaseConfig, NormalisedBaseConfig } from "../../types";
import type { NormalisedConfig } from "../recipeModule/types";
import type OverrideableBuilder from "supertokens-js-override";
import type { RecipeInterface } from "supertokens-web-js/recipe/session";
import type { ClaimValidationError } from "supertokens-web-js/recipe/session";
import type { UserInput as WebJSInputType, RecipeEvent } from "supertokens-web-js/recipe/session/types";

export type RecipeEventWithSessionContext = RecipeEvent & { sessionContext: SessionContextUpdate };

export type InputType = WebJSInputType & {
    useShadowDom?: boolean;
    style?: string;
    accessDeniedScreen?: SessionFeatureBaseConfig;
    onHandleEvent?: (event: RecipeEventWithSessionContext) => void;
};

export type NormalisedSessionConfig = NormalisedConfig<unknown, any, any> & {
    useShadowDom: boolean;
    accessDeniedScreen: NormalisedBaseConfig;
    override: {
        functions: (
            originalImplementation: RecipeInterface,
            builder?: OverrideableBuilder<RecipeInterface>
        ) => RecipeInterface;
    };
};

export type SessionFeatureBaseConfig = FeatureBaseConfig;

export type SessionContextUpdate = {
    doesSessionExist: boolean;
    userId: string;
    accessTokenPayload: any;
};

export type LoadedSessionContext = {
    loading: false;
    invalidClaims: ClaimValidationError[];
    accessDeniedValidatorError?: ClaimValidationError;
} & SessionContextUpdate;

export type SessionContextType =
    | LoadedSessionContext
    | {
          loading: true;
      };

export type AccessDeniedThemeProps = {
    recipe: Session;
    // In certain places, like when SessionAuth would render this screen for roles claim not passing,
    // we do not pass an error message to the AccessDenied component.
    // In this case, it just doesn't display any message below the main access denied text.
    error?: string;
    navigate: Navigate;
    config: NormalisedSessionConfig;
};

export type ComponentOverrideMap = {
    SessionAccessDenied_Override?: ComponentOverride<typeof AccessDeniedScreenTheme>;
};
