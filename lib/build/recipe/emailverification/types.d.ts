import { FeatureBaseConfig, ThemeBaseProps } from "../../types";
import { Config as RecipeModuleConfig, NormalisedConfig as NormalisedRecipeModuleConfig } from "../recipeModule/types";
import RecipeImplementation from "./recipeImplementation";
import { ComponentOverride } from "../../components/componentOverride/componentOverride";
import { SendVerifyEmail } from "./components/themes/emailVerification/sendVerifyEmail";
import { VerifyEmailLinkClicked } from "./components/themes/emailVerification/verifyEmailLinkClicked";
export declare type UserInputForAuthRecipeModule = {
    mode?: "OFF" | "REQUIRED";
    disableDefaultImplementation?: boolean;
    sendVerifyEmailScreen?: FeatureBaseConfig;
    verifyEmailLinkClickedScreen?: FeatureBaseConfig;
};
export declare type ComponentOverrideMap = {
    EmailVerificationSendVerifyEmail?: ComponentOverride<typeof SendVerifyEmail>;
    EmailVerificationVerifyEmailLinkClicked?: ComponentOverride<typeof VerifyEmailLinkClicked>;
};
export declare type UserInput = UserInputForAuthRecipeModule & {
    signOut(): Promise<void>;
    redirectToSignIn(history?: any): Promise<void>;
    postVerificationRedirect(history?: any): Promise<void>;
    override?: {
        functions?: (originalImplementation: RecipeImplementation) => RecipeInterface;
        components?: ComponentOverrideMap;
    };
};
export declare type Config = UserInput &
    RecipeModuleConfig<GetRedirectionURLContext, PreAPIHookContext, OnHandleEventContext>;
export declare type NormalisedConfig = {
    mode: "OFF" | "REQUIRED";
    disableDefaultImplementation: boolean;
    sendVerifyEmailScreen: FeatureBaseConfig;
    verifyEmailLinkClickedScreen: FeatureBaseConfig;
    signOut(): Promise<void>;
    redirectToSignIn(history?: any): Promise<void>;
    postVerificationRedirect(history?: any): Promise<void>;
    override: {
        functions: (originalImplementation: RecipeImplementation) => RecipeInterface;
        components: ComponentOverrideMap;
    };
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
export declare type EmailVerificationThemeProps = {
    sendVerifyEmailScreen: SendVerifyEmailThemeProps;
    verifyEmailLinkClickedScreen?: VerifyEmailLinkClickedThemeProps;
    config: NormalisedConfig;
};
export declare type SendVerifyEmailThemeProps = ThemeBaseProps & {
    recipeImplementation: RecipeInterface;
    config: NormalisedConfig;
    signOut: () => Promise<void>;
    onEmailAlreadyVerified: () => Promise<void>;
};
export declare type VerifyEmailLinkClickedThemeProps = ThemeBaseProps & {
    recipeImplementation: RecipeInterface;
    config: NormalisedConfig;
    onContinueClicked: () => Promise<void>;
    onTokenInvalidRedirect: () => Promise<void>;
    token: string;
};
export interface RecipeInterface {
    verifyEmail: (input: { token: string; config: NormalisedConfig }) => Promise<{
        status: "EMAIL_VERIFICATION_INVALID_TOKEN_ERROR" | "OK";
    }>;
    sendVerificationEmail: (input: { config: NormalisedConfig }) => Promise<{
        status: "EMAIL_ALREADY_VERIFIED_ERROR" | "OK";
    }>;
    isEmailVerified: (input: { config: NormalisedConfig }) => Promise<boolean>;
}
