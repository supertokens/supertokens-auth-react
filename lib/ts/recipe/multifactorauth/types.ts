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

import type { ComponentOverride } from "../../components/componentOverride/componentOverride";
import type { FeatureBaseConfig } from "../../types";
import type {
    Config as RecipeModuleConfig,
    NormalisedConfig as NormalisedRecipeModuleConfig,
    UserInput as RecipeModuleUserInput,
} from "../recipeModule/types";
import type { FC } from "react";
import type { OverrideableBuilder } from "supertokens-js-override";
import type { RecipeInterface } from "supertokens-web-js/recipe/multifactorauth";
import type { MFAFactorInfo } from "supertokens-web-js/recipe/multifactorauth/types";

export type ComponentOverrideMap = {
    FactorChooser_Override?: ComponentOverride<any>; // TODO
};

// Config is what does in the constructor of the recipe.
export type UserInput = {
    firstFactors?: string[];
    disableDefaultUI?: boolean;
    factorChooserScreen?: FeatureBaseConfig;

    override?: {
        functions?: (
            originalImplementation: RecipeInterface,
            builder?: OverrideableBuilder<RecipeInterface>
        ) => RecipeInterface;
    };
} & RecipeModuleUserInput<GetRedirectionURLContext, PreAndPostAPIHookAction, OnHandleEventContext>;

// Config is what does in the constructor of the recipe.
export type Config = UserInput &
    RecipeModuleConfig<GetRedirectionURLContext, PreAndPostAPIHookAction, OnHandleEventContext>;

export type NormalisedConfig = {
    getFirstFactors: () => string[];
    disableDefaultUI: boolean;
    factorChooserScreen: FeatureBaseConfig;

    override: {
        functions: (
            originalImplementation: RecipeInterface,
            builder?: OverrideableBuilder<RecipeInterface>
        ) => RecipeInterface;
    };
} & NormalisedRecipeModuleConfig<GetRedirectionURLContext, PreAndPostAPIHookAction, OnHandleEventContext>;

export type GetRedirectionURLContext =
    | {
          action: "FACTOR_CHOICE_REQUIRED";
      }
    | {
          action: "GO_TO_FACTOR";
          factorId: string;
      };

export type PreAndPostAPIHookAction = "GET_MFA_INFO";

export type PreAPIHookContext = {
    action: PreAndPostAPIHookAction;
    requestInit: RequestInit;
    url: string;
    userContext: any;
};

export type OnHandleEventContext = {
    action: "FACTOR_CHOSEN";
    userContext: any;
};

export type FactorChooserThemeProps = {
    mfaInfo: MFAFactorInfo;
    availableFactors: SecondaryFactorRedirectionInfo[];
    navigateToFactor: (factorId: string) => void;
    logout: () => void;
    config: NormalisedConfig;
    userContext?: any;
};

export type SecondaryFactorRedirectionInfo = {
    id: string;
    name: string;
    description: string;
    logo: FC;
    path: string;
};
