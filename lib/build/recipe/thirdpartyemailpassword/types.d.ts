import { FeatureBaseConfig, NormalisedBaseConfig, Styles } from "../../types";
import {
    GetRedirectionURLContext as EmailPasswordGetRedirectionURLContext,
    OnHandleEventContext as EmailPasswordOnHandleEventContext,
    PreAPIHookContext as EmailPasswordPreAPIHookContext,
} from "../emailpassword";
import {
    NormalisedResetPasswordUsingTokenFeatureConfig,
    NormalisedSignInFormFeatureConfig,
    NormalisedSignUpFormFeatureConfig,
    ResetPasswordUsingTokenUserInput,
    SignInFormFeatureUserInput,
    SignUpFormFeatureUserInput,
} from "../emailpassword/types";
import {
    GetRedirectionURLContext as ThirdPartyGetRedirectionURLContext,
    OnHandleEventContext as ThirdPartyOnHandleEventContext,
    PreAPIHookContext as ThirdPartyPreAPIHookContext,
} from "../thirdparty";
import Provider from "../thirdparty/providers";
import { CustomProviderConfig } from "../thirdparty/providers/types";
import {
    Config as AuthRecipeModuleConfig,
    NormalisedConfig as NormalisedAuthRecipeModuleConfig,
} from "../authRecipeModule/types";
export declare type Config = {
    signInAndUpFeature?: SignInAndUpFeatureUserInput;
    resetPasswordUsingTokenFeature?: ResetPasswordUsingTokenUserInput;
    disableEmailPassword?: boolean;
} & AuthRecipeModuleConfig<GetRedirectionURLContext, PreAPIHookContext, OnHandleEventContext>;
export declare type NormalisedConfig = {
    signInAndUpFeature: NormalisedSignInAndUpFeatureConfig;
    resetPasswordUsingTokenFeature: NormalisedResetPasswordUsingTokenFeatureConfig;
    disableEmailPassword: boolean;
} & NormalisedAuthRecipeModuleConfig<GetRedirectionURLContext, PreAPIHookContext, OnHandleEventContext>;
export declare type SignInAndUpFeatureUserInput = FeatureBaseConfig & {
    disableDefaultImplementation?: boolean;
    defaultToSignUp?: boolean;
    signUpForm?: SignUpFormFeatureUserInput;
    signInForm?: SignInFormFeatureUserInput;
    providers: (Provider | CustomProviderConfig)[];
};
export declare type NormalisedSignInAndUpFeatureConfig = NormalisedBaseConfig & {
    disableDefaultImplementation: boolean;
    providers: Provider[];
    defaultToSignUp: boolean;
    signUpForm: NormalisedSignUpFormFeatureConfig;
    signInForm: NormalisedSignInFormFeatureConfig;
};
export declare type GetRedirectionURLContext =
    | EmailPasswordGetRedirectionURLContext
    | ThirdPartyGetRedirectionURLContext;
export declare type PreAPIHookContext = EmailPasswordPreAPIHookContext | ThirdPartyPreAPIHookContext;
export declare type OnHandleEventContext = ThirdPartyOnHandleEventContext | EmailPasswordOnHandleEventContext;
export declare type ThirdPartyEmailPasswordSignInAndUpThemeProps = {
    recipeId: string;
    history?: any;
    defaultToSignUp: boolean;
    hideThirdParty?: boolean;
    hideEmailPassword?: boolean;
    rawPalette: Record<string, string>;
    styleFromInit: Styles;
};
