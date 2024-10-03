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
export declare type ComponentOverrideMap = {
    MFAFactorChooserFooter_Override?: ComponentOverride<typeof FactorChooserFooter>;
    MFAFactorChooserHeader_Override?: ComponentOverride<typeof FactorChooserHeader>;
    MFAFactorList_Override?: ComponentOverride<typeof FactorList>;
    MFAFactorOption_Override?: ComponentOverride<typeof FactorOption>;
};
export declare type UserInput = {
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
export declare type Config = UserInput &
    RecipeModuleConfig<GetRedirectionURLContext, PreAndPostAPIHookAction, OnHandleEventContext>;
export declare type NormalisedConfig = {
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
export declare type GetRedirectionURLContext = NormalisedGetRedirectionURLContext<
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
export declare type PreAndPostAPIHookAction = "GET_MFA_INFO";
export declare type PreAPIHookContext = {
    action: PreAndPostAPIHookAction;
    requestInit: RequestInit;
    url: string;
    userContext: UserContext;
};
export declare type OnHandleEventContext = {
    action: "FACTOR_CHOOSEN";
    factorId: string;
};
export declare type LoadedMFAInfo = {
    factors: MFAFactorInfo;
    emails: Record<string, string[] | undefined>;
    phoneNumbers: Record<string, string[] | undefined>;
};
export declare type FactorChooserThemeProps = {
    mfaInfo: LoadedMFAInfo;
    availableFactors: SecondaryFactorRedirectionInfo[];
    showBackButton: boolean;
    onBackButtonClicked: () => void;
    navigateToFactor: (factorId: string) => void;
    onLogoutClicked: () => void;
    config: NormalisedConfig;
    userContext?: UserContext;
};
export declare type SecondaryFactorRedirectionInfo = {
    id: string;
    name: string;
    description: string;
    logo: FC;
    path: string;
};
export declare const FactorIds: {
    readonly EMAILPASSWORD: "emailpassword";
    readonly OTP_EMAIL: "otp-email";
    readonly OTP_PHONE: "otp-phone";
    readonly LINK_EMAIL: "link-email";
    readonly LINK_PHONE: "link-phone";
    readonly THIRDPARTY: "thirdparty";
    readonly TOTP: "totp";
};
