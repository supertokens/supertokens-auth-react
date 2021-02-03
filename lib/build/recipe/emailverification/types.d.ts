import { FeatureBaseConfig, RecipeModuleConfig, RecipeModuleHooks, ThemeBaseProps } from "../../types";
import AuthRecipeModule from "../authRecipeModule";
import { ThemeResponseGeneralError } from "../emailpassword/types";
export declare type EmailVerificationUserInput = {
    mode?: "OFF" | "REQUIRED";
    disableDefaultImplementation?: boolean;
    sendVerifyEmailScreen?: FeatureBaseConfig;
    verifyEmailLinkClickedScreen?: FeatureBaseConfig;
};
export declare type NormalisedEmailVerificationConfig = {
    mode: "OFF" | "REQUIRED";
    disableDefaultImplementation: boolean;
    sendVerifyEmailScreen: FeatureBaseConfig;
    verifyEmailLinkClickedScreen: FeatureBaseConfig;
    authRecipe: AuthRecipeModule;
};
export declare type EmailVerificationUserInputAndHooks = RecipeModuleHooks<unknown, unknown> & EmailVerificationUserInput & {
    authRecipe: AuthRecipeModule;
};
export declare type EmailVerificationConfig = RecipeModuleConfig<unknown, unknown> & EmailVerificationUserInput & {
    authRecipe: AuthRecipeModule;
};
export declare type IsEmailVerifiedAPIResponse = {
    status: "OK";
    isVerified: boolean;
};
export declare type VerifyEmailAPIResponse = {
    status: "OK" | "EMAIL_VERIFICATION_INVALID_TOKEN_ERROR";
};
export declare type EmailVerificationThemeProps = {
    sendVerifyEmailScreen: SendVerifyEmailThemeProps;
    verifyEmailLinkClickedScreen: VerifyEmailLinkClickedThemeProps;
    hasToken: boolean;
    rawPalette: Record<string, string>;
};
export declare type SendVerifyEmailThemeProps = ThemeBaseProps & {
    sendVerifyEmailAPI: () => Promise<SendVerifyEmailThemeResponse>;
    signOut: () => Promise<void>;
    onEmailAlreadyVerified: () => Promise<void>;
};
export declare type VerifyEmailLinkClickedThemeProps = ThemeBaseProps & {
    verifyEmailAPI: () => Promise<VerifyEmailThemeResponse>;
    onTokenInvalidRedirect: () => Promise<void>;
    onContinueClicked: () => Promise<void>;
};
export declare type SendVerifyEmailAPIResponse = {
    status: "OK" | "EMAIL_ALREADY_VERIFIED_ERROR";
};
export declare type SendVerifyEmailThemeResponse = SendVerifyEmailAPIResponse | ThemeResponseGeneralError;
export declare type VerifyEmailThemeResponse = {
    status: "LOADING" | "INVALID" | "GENERAL_ERROR" | "SUCCESSFUL";
};
export declare type VerifyEmailLinkClickedThemeState = {
    status: "LOADING" | "INVALID" | "GENERAL_ERROR" | "SUCCESSFUL";
};
