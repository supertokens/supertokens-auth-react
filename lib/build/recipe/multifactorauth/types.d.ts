import type { FactorChooserFooter } from "./components/themes/factorChooser/factorChooserFooter";
import type { FactorChooserHeader } from "./components/themes/factorChooser/factorChooserHeader";
import type { FactorList } from "./components/themes/factorChooser/factorList";
import type { FactorOption } from "./components/themes/factorChooser/factorOption";
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
    MFAFactorChooserFooter_Override?: ComponentOverride<typeof FactorChooserFooter>;
    MFAFactorChooserHeader_Override?: ComponentOverride<typeof FactorChooserHeader>;
    MFAFactorList_Override?: ComponentOverride<typeof FactorList>;
    MFAFactorOption_Override?: ComponentOverride<typeof FactorOption>;
};
export declare type UserInput = {
    firstFactors?: string[];
    getFactorInfo?: (builtInFactors: SecondaryFactorRedirectionInfo[]) => SecondaryFactorRedirectionInfo[];
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
    firstFactors?: string[];
    getFactorInfo: (builtInFactors: SecondaryFactorRedirectionInfo[]) => SecondaryFactorRedirectionInfo[];
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
          action: "FACTOR_CHOOSER";
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
export declare type OnHandleEventContext = never;
export declare type FactorChooserThemeProps = {
    mfaInfo: MFAFactorInfo;
    availableFactors: SecondaryFactorRedirectionInfo[];
    showBackButton: boolean;
    onBackButtonClicked: () => void;
    navigateToFactor: (factorId: string) => void;
    onLogoutClicked: () => void;
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