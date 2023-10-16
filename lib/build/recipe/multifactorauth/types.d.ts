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
export declare type ComponentOverrideMap = {
    FactorChooser_Override?: ComponentOverride<any>;
};
export declare type UserInput = {
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
export declare type Config = UserInput &
    RecipeModuleConfig<GetRedirectionURLContext, PreAndPostAPIHookAction, OnHandleEventContext>;
export declare type NormalisedConfig = {
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
export declare type GetRedirectionURLContext =
    | {
          action: "FACTOR_CHOICE_REQUIRED";
      }
    | {
          action: "GO_TO_FACTOR";
          factorId: string;
      };
export declare type PreAndPostAPIHookAction = "GET_MFA_INFO";
export declare type PreAPIHookContext = {
    action: PreAndPostAPIHookAction;
    requestInit: RequestInit;
    url: string;
    userContext: any;
};
export declare type OnHandleEventContext = {
    action: "FACTOR_CHOSEN";
    userContext: any;
};
export declare type FactorChooserThemeProps = {
    mfaInfo: MFAFactorInfo;
    availableFactors: SecondaryFactorRedirectionInfo[];
    navigateToFactor: (factorId: string) => void;
    logout: () => void;
    config: NormalisedConfig;
    userContext?: any;
};
export declare type SecondaryFactorRedirectionInfo = {
    id: string;
    name: string;
    description: string;
    logo: FC;
    path: string;
};
