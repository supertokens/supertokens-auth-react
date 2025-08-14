import type { SendVerifyEmail } from "./components/themes/emailVerification/sendVerifyEmail";
import type { VerifyEmailLinkClicked } from "./components/themes/emailVerification/verifyEmailLinkClicked";
import type { ComponentOverride } from "../../components/componentOverride/componentOverride";
import type { FeatureBaseConfig, NormalisedGetRedirectionURLContext, ThemeBaseProps, UserContext } from "../../types";
import type {
    Config as RecipeModuleConfig,
    NormalisedConfig as NormalisedRecipeModuleConfig,
    UserInput as RecipeModuleUserInput,
} from "../recipeModule/types";
import type { OverrideableBuilder } from "supertokens-js-override";
import type { RecipeInterface } from "supertokens-web-js/recipe/emailverification";
export declare type ComponentOverrideMap = {
    EmailVerificationSendVerifyEmail_Override?: ComponentOverride<typeof SendVerifyEmail>;
    EmailVerificationVerifyEmailLinkClicked_Override?: ComponentOverride<typeof VerifyEmailLinkClicked>;
};
export declare type UserInput = {
    mode?: "OPTIONAL" | "REQUIRED";
    disableDefaultUI?: boolean;
    sendVerifyEmailScreen?: FeatureBaseConfig;
    verifyEmailLinkClickedScreen?: FeatureBaseConfig;
    override?: {
        functions?: (
            originalImplementation: RecipeInterface,
            builder: OverrideableBuilder<RecipeInterface>
        ) => RecipeInterface;
    };
} & RecipeModuleUserInput<GetRedirectionURLContext, PreAndPostAPIHookAction, OnHandleEventContext>;
export declare type Config = UserInput &
    RecipeModuleConfig<GetRedirectionURLContext, PreAndPostAPIHookAction, OnHandleEventContext>;
export declare type NormalisedConfig = {
    mode: "OPTIONAL" | "REQUIRED";
    disableDefaultUI: boolean;
    sendVerifyEmailScreen: FeatureBaseConfig;
    verifyEmailLinkClickedScreen: FeatureBaseConfig;
    override: {
        functions: (
            originalImplementation: RecipeInterface,
            builder: OverrideableBuilder<RecipeInterface>
        ) => RecipeInterface;
    };
} & NormalisedRecipeModuleConfig<GetRedirectionURLContext, PreAndPostAPIHookAction, OnHandleEventContext>;
export declare type GetRedirectionURLContext = NormalisedGetRedirectionURLContext<{
    action: "VERIFY_EMAIL";
}>;
export declare type PreAndPostAPIHookAction = "VERIFY_EMAIL" | "SEND_VERIFY_EMAIL" | "IS_EMAIL_VERIFIED";
export declare type PreAPIHookContext = {
    action: PreAndPostAPIHookAction;
    requestInit: RequestInit;
    url: string;
    userContext: UserContext;
};
export declare type OnHandleEventContext = {
    action: "VERIFY_EMAIL_SENT" | "EMAIL_VERIFIED_SUCCESSFUL";
    userContext: UserContext;
};
export declare type EmailVerificationThemeProps = {
    sendVerifyEmailScreen: SendVerifyEmailThemeProps;
    verifyEmailLinkClickedScreen?: VerifyEmailLinkClickedThemeProps;
    config: NormalisedConfig;
    userContext?: UserContext;
};
export declare type SendVerifyEmailThemeProps = ThemeBaseProps & {
    recipeImplementation: RecipeInterface;
    config: NormalisedConfig;
    signOut: () => Promise<void>;
    onEmailAlreadyVerified: () => Promise<void>;
    redirectToAuth: () => Promise<void>;
};
export declare type VerifyEmailLinkClickedThemeProps = ThemeBaseProps & {
    recipeImplementation: RecipeInterface;
    config: NormalisedConfig;
    onSuccess: () => Promise<void>;
    onTokenInvalidRedirect: () => Promise<void>;
    token: string;
};
