import type { Header } from "./components/themes/signInUp/header";
import type { ComponentOverride } from "../../components/componentOverride/componentOverride";
import type { FeatureBaseConfig } from "../../types";
import type {
    Config as AuthRecipeModuleConfig,
    NormalisedConfig as NormalisedAuthRecipeModuleConfig,
    UserInput as AuthRecipeModuleUserInput,
} from "../authRecipe/types";
import type {
    GetRedirectionURLContext as PasswordlessGetRedirectionURLContext,
    OnHandleEventContext as PasswordlessOnHandleEventContext,
    PreAPIHookContext as PasswordlessPreAPIHookContext,
} from "../passwordless";
import type { SignInUpScreens } from "../passwordless/components/themes/signInUp";
import type PWlessRecipe from "../passwordless/recipe";
import type { ComponentOverrideMap as PasswordlessOverrideMap } from "../passwordless/types";
import type {
    PasswordlessFeatureBaseConfig,
    PasswordlessSignInUpAction,
    SignInUpFeatureConfigInput as PwlessSignInUpFeatureConfigInput,
    SignInUpChildProps as PwlessChildProps,
    SignInUpState as PWlessSignInUpState,
    PreAndPostAPIHookAction as PasswordlessPreAndPostAPIHookAction,
    NormalisedConfig as NormalisedPasswordlessConfig,
} from "../passwordless/types";
import type {
    GetRedirectionURLContext as ThirdPartyGetRedirectionURLContext,
    OnHandleEventContext as ThirdPartyOnHandleEventContext,
    PreAPIHookContext as ThirdPartyPreAPIHookContext,
} from "../thirdparty";
import type Provider from "../thirdparty/providers";
import type { CustomProviderConfig } from "../thirdparty/providers/types";
import type TPRecipe from "../thirdparty/recipe";
import type {
    ThirdPartySignInAndUpState,
    ThirdPartySignInUpActions,
    ThirdPartySignInUpChildProps,
    PreAndPostAPIHookAction as ThirdPartyPreAndPostAPIHookAction,
    NormalisedConfig as NormalisedThirdPartyConfig,
} from "../thirdparty/types";
import type { ComponentOverrideMap as ThirdPartyOverrideMap } from "../thirdparty/types";
import type { Dispatch } from "react";
import type { OverrideableBuilder } from "supertokens-js-override";
import type { RecipeInterface } from "supertokens-web-js/recipe/thirdpartypasswordless";
declare type WithRenamedOptionalProp<T, K extends keyof T, L extends string> = Omit<T, K> & {
    [P in L]?: T[K];
};
export declare type ComponentOverrideMap = Omit<PasswordlessOverrideMap, "PasswordlessSignInUpHeader_Override"> &
    Omit<ThirdPartyOverrideMap, "ThirdPartySignUpFooter_Override" | "ThirdPartySignInAndUpHeader_Override"> & {
        ThirdPartyPasswordlessHeader_Override?: ComponentOverride<typeof Header>;
    };
export declare type SignInUpFeatureConfigInput = WithRenamedOptionalProp<
    PwlessSignInUpFeatureConfigInput,
    "emailOrPhoneFormStyle",
    "thirdPartyProviderAndEmailOrPhoneFormStyle"
> & {
    providers?: (Provider | CustomProviderConfig)[];
};
export declare type UserInput = (
    | {
          contactMethod: "EMAIL";
          validateEmailAddress?: (email: string) => Promise<string | undefined> | string | undefined;
          signInUpFeature?: SignInUpFeatureConfigInput;
      }
    | {
          contactMethod: "PHONE";
          validatePhoneNumber?: (phoneNumber: string) => Promise<string | undefined> | string | undefined;
          signInUpFeature?: SignInUpFeatureConfigInput & {
              defaultCountry?: string;
          };
      }
    | {
          contactMethod: "EMAIL_OR_PHONE";
          validateEmailAddress?: (email: string) => Promise<string | undefined> | string | undefined;
          validatePhoneNumber?: (phoneNumber: string) => Promise<string | undefined> | string | undefined;
          signInUpFeature?: SignInUpFeatureConfigInput & {
              defaultCountry?: string;
              guessInternationPhoneNumberFromInputPhoneNumber?: (
                  inputPhoneNumber: string,
                  defaultCountryFromConfig?: string
              ) => Promise<string | undefined> | string | undefined;
          };
      }
) & {
    override?: {
        functions?: (
            originalImplementation: RecipeInterface,
            builder?: OverrideableBuilder<RecipeInterface>
        ) => RecipeInterface;
    };
    linkClickedScreenFeature?: PasswordlessFeatureBaseConfig;
    oAuthCallbackScreen?: FeatureBaseConfig;
    disablePasswordless?: boolean;
} & AuthRecipeModuleUserInput<GetRedirectionURLContext, PreAndPostAPIHookAction, OnHandleEventContext>;
export declare type Config = UserInput &
    AuthRecipeModuleConfig<GetRedirectionURLContext, PreAndPostAPIHookAction, OnHandleEventContext>;
export declare type NormalisedConfig = {
    passwordlessConfig: NormalisedPasswordlessConfig;
    thirdpartyConfig: NormalisedThirdPartyConfig;
    thirdPartyProviderAndEmailOrPhoneFormStyle: string | undefined;
    disablePasswordless: boolean;
    override: {
        functions: (
            originalImplementation: RecipeInterface,
            builder?: OverrideableBuilder<RecipeInterface>
        ) => RecipeInterface;
    };
} & NormalisedAuthRecipeModuleConfig<GetRedirectionURLContext, PreAndPostAPIHookAction, OnHandleEventContext>;
export declare type GetRedirectionURLContext =
    | PasswordlessGetRedirectionURLContext
    | ThirdPartyGetRedirectionURLContext;
export declare type PreAndPostAPIHookAction = ThirdPartyPreAndPostAPIHookAction | PasswordlessPreAndPostAPIHookAction;
export declare type PreAPIHookContext = PasswordlessPreAPIHookContext | ThirdPartyPreAPIHookContext;
export declare type OnHandleEventContext = PasswordlessOnHandleEventContext | ThirdPartyOnHandleEventContext;
export declare type ThirdPartyPasswordlessSignInAndUpThemeProps = {
    config: NormalisedConfig;
    history?: any;
    commonState: {
        error: string | undefined;
    };
    passwordlessRecipe?: PWlessRecipe;
    pwlessState: PWlessSignInUpState;
    pwlessDispatch: Dispatch<PasswordlessSignInUpAction>;
    pwlessChildProps?: PwlessChildProps;
    thirdPartyRecipe?: TPRecipe;
    tpState: ThirdPartySignInAndUpState;
    tpDispatch: Dispatch<ThirdPartySignInUpActions>;
    tpChildProps?: ThirdPartySignInUpChildProps;
};
export declare type ThirdPartyPasswordlessSignInAndUpThemePropsWithActiveScreen = {
    config: NormalisedConfig;
    history?: any;
    commonState: {
        error: string | undefined;
    };
    thirdPartyRecipe?: TPRecipe;
    tpState: ThirdPartySignInAndUpState;
    tpDispatch: Dispatch<ThirdPartySignInUpActions>;
    tpChildProps?: ThirdPartySignInUpChildProps;
} & (
    | {
          activeScreen: undefined;
          passwordlessRecipe: undefined;
          pwlessState: PWlessSignInUpState;
          pwlessDispatch: Dispatch<PasswordlessSignInUpAction>;
          pwlessChildProps: undefined;
      }
    | {
          activeScreen: SignInUpScreens;
          passwordlessRecipe: PWlessRecipe;
          pwlessState: PWlessSignInUpState;
          pwlessDispatch: Dispatch<PasswordlessSignInUpAction>;
          pwlessChildProps: PwlessChildProps;
      }
);
export {};
