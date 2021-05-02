import { FeatureBaseConfig, SuccessAPIResponse, ThemeBaseProps } from "../../types";
import { ThemeResponseGeneralError } from "../emailpassword/types";
import { RecipeModuleConfig } from "../recipeModule/types";
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
};
export declare type EmailVerificationConfig<T, S, R> = RecipeModuleConfig<T, S, R> & NormalisedEmailVerificationConfig & {
    signOut(): Promise<SuccessAPIResponse>;
    useShadowDom: boolean;
    palette: Record<string, string>;
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
