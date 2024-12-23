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

import type { FactorChooserFooter } from "./components/themes/factorChooser/factorChooserFooter";
import type { FactorChooserHeader } from "./components/themes/factorChooser/factorChooserHeader";
import type { FactorList } from "./components/themes/factorChooser/factorList";
import type { FactorOption } from "./components/themes/factorChooser/factorOption";
import type { ComponentOverride } from "../../components/componentOverride/componentOverride";
import type { FeatureBaseConfig, NormalisedGetRedirectionURLContext, UserContext } from "../../types";
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
    MFAFactorChooserFooter_Override?: ComponentOverride<typeof FactorChooserFooter>;
    MFAFactorChooserHeader_Override?: ComponentOverride<typeof FactorChooserHeader>;
    MFAFactorList_Override?: ComponentOverride<typeof FactorList>;
    MFAFactorOption_Override?: ComponentOverride<typeof FactorOption>;
};

// Config is what does in the constructor of the recipe.
export type UserInput = {
    firstFactors?: string[];
    getSecondaryFactorInfo?: (
        builtInFactors: SecondaryFactorRedirectionInfo[],
        userContext: UserContext
    ) => SecondaryFactorRedirectionInfo[];
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
    firstFactors?: string[];
    getSecondaryFactorInfo: (
        builtInFactors: SecondaryFactorRedirectionInfo[],
        userContext: UserContext
    ) => SecondaryFactorRedirectionInfo[];
    disableDefaultUI: boolean;
    factorChooserScreen: FeatureBaseConfig;

    override: {
        functions: (
            originalImplementation: RecipeInterface,
            builder?: OverrideableBuilder<RecipeInterface>
        ) => RecipeInterface;
    };
} & NormalisedRecipeModuleConfig<GetRedirectionURLContext, PreAndPostAPIHookAction, OnHandleEventContext>;

export type GetRedirectionURLContext = NormalisedGetRedirectionURLContext<
    | {
          action: "FACTOR_CHOOSER";
          nextFactorOptions?: string[];
          stepUp?: boolean;
      }
    | {
          action: "GO_TO_FACTOR";
          factorId: string;
          forceSetup?: boolean;
          stepUp?: boolean;
      }
>;

export type PreAndPostAPIHookAction = "GET_MFA_INFO";

export type PreAPIHookContext = {
    action: PreAndPostAPIHookAction;
    requestInit: RequestInit;
    url: string;
    userContext: UserContext;
};

export type OnHandleEventContext = {
    action: "FACTOR_CHOOSEN";
    factorId: string;
};

export type LoadedMFAInfo = {
    factors: MFAFactorInfo;
    emails: Record<string, string[] | undefined>;
    phoneNumbers: Record<string, string[] | undefined>;
};

export type FactorChooserThemeProps = {
    mfaInfo: LoadedMFAInfo;
    availableFactors: SecondaryFactorRedirectionInfo[];
    showBackButton: boolean;
    onBackButtonClicked: () => void;
    navigateToFactor: (factorId: string) => void;
    onLogoutClicked: () => void;
    config: NormalisedConfig;
    userContext?: UserContext;
};

export type SecondaryFactorRedirectionInfo = {
    id: string;
    name: string;
    description: string;
    logo: FC;
    path: string;
};

export const FactorIds = {
    EMAILPASSWORD: "emailpassword",
    OTP_EMAIL: "otp-email",
    OTP_PHONE: "otp-phone",
    LINK_EMAIL: "link-email",
    LINK_PHONE: "link-phone",
    THIRDPARTY: "thirdparty",
    TOTP: "totp",
    WEBAUTHN: "webauthn",
} as const;
