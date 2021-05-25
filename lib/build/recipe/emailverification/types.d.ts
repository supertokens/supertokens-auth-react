import { FeatureBaseConfig, SuccessAPIResponse, ThemeBaseProps } from "../../types";
import { ThemeResponseGeneralError } from "../emailpassword/types";
import { Config as RecipeModuleConfig, NormalisedConfig as NormalisedRecipeModuleConfig } from "../recipeModule/types";
export declare type UserInput = {
    signOut(): Promise<SuccessAPIResponse>;
    redirectToSignIn(history?: any): Promise<void>;
    postVerificationRedirect(history?: any): Promise<void>;
    mode?: "OFF" | "REQUIRED";
    disableDefaultImplementation?: boolean;
    sendVerifyEmailScreen?: FeatureBaseConfig;
    verifyEmailLinkClickedScreen?: FeatureBaseConfig;
};
export declare type Config = UserInput & RecipeModuleConfig<GetRedirectionURLContext, PreAPIHookContext, OnHandleEventContext>;
export declare type NormalisedConfig = {
    mode: "OFF" | "REQUIRED";
    disableDefaultImplementation: boolean;
    sendVerifyEmailScreen: FeatureBaseConfig;
    verifyEmailLinkClickedScreen: FeatureBaseConfig;
    signOut(): Promise<SuccessAPIResponse>;
    redirectToSignIn(history?: any): Promise<void>;
    postVerificationRedirect(history?: any): Promise<void>;
} & NormalisedRecipeModuleConfig<GetRedirectionURLContext, PreAPIHookContext, OnHandleEventContext>;
export declare type GetRedirectionURLContext = {
    action: "VERIFY_EMAIL";
};
export declare type PreAPIHookContext = {
    action: "VERIFY_EMAIL" | "SEND_VERIFY_EMAIL" | "IS_EMAIL_VERIFIED";
    requestInit: RequestInit;
    url: string;
};
export declare type OnHandleEventContext = {
    action: "VERIFY_EMAIL_SENT" | "EMAIL_VERIFIED_SUCCESSFUL";
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
