import { FeatureBaseConfig, NormalisedBaseConfig, Styles } from "../../types";
import { AuthRecipeModuleUserInput } from "../authRecipeModule/types";
import { EmailPasswordGetRedirectionURLContext, EmailPasswordOnHandleEventContext, EmailPasswordPreAPIHookContext } from "../emailpassword";
import { NormalisedResetPasswordUsingTokenFeatureConfig, NormalisedSignInFormFeatureConfig, NormalisedSignUpFormFeatureConfig, ResetPasswordUsingTokenUserInput, SignInFormFeatureUserInput, SignUpFormFeatureUserInput } from "../emailpassword/types";
import { RecipeModuleConfig } from "../recipeModule/types";
import { ThirdPartyGetRedirectionURLContext, ThirdPartyOnHandleEventContext, ThirdPartyPreAPIHookContext } from "../thirdparty";
import Provider from "../thirdparty/providers";
import { CustomProviderConfig } from "../thirdparty/providers/types";
export declare type ThirdPartyEmailPasswordUserInput = AuthRecipeModuleUserInput<ThirdPartyEmailPasswordGetRedirectionURLContext, ThirdPartyEmailPasswordPreAPIHookContext, ThirdPartyEmailPasswordOnHandleEventContext> & {
    palette?: Record<string, string>;
    useShadowDom?: boolean;
    signInAndUpFeature?: SignInAndUpFeatureUserInput;
    resetPasswordUsingTokenFeature?: ResetPasswordUsingTokenUserInput;
    disableEmailPassword?: boolean;
};
export declare type ThirdPartyEmailPasswordConfig = ThirdPartyEmailPasswordUserInput & RecipeModuleConfig<ThirdPartyEmailPasswordGetRedirectionURLContext, ThirdPartyEmailPasswordPreAPIHookContext, ThirdPartyEmailPasswordOnHandleEventContext>;
export declare type NormalisedThirdPartyEmailPasswordConfig = {
    signInAndUpFeature: NormalisedSignInAndUpFeatureConfig;
    resetPasswordUsingTokenFeature: NormalisedResetPasswordUsingTokenFeatureConfig;
    disableEmailPassword: boolean;
};
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
export declare type ThirdPartyEmailPasswordGetRedirectionURLContext = EmailPasswordGetRedirectionURLContext | ThirdPartyGetRedirectionURLContext;
export declare type ThirdPartyEmailPasswordPreAPIHookContext = EmailPasswordPreAPIHookContext | ThirdPartyPreAPIHookContext;
export declare type ThirdPartyEmailPasswordOnHandleEventContext = ThirdPartyOnHandleEventContext | EmailPasswordOnHandleEventContext;
export declare type ThirdPartyEmailPasswordSignInAndUpThemeProps = {
    recipeId: string;
    history?: any;
    defaultToSignUp: boolean;
    hideThirdParty?: boolean;
    hideEmailPassword?: boolean;
    rawPalette: Record<string, string>;
    styleFromInit: Styles;
};
