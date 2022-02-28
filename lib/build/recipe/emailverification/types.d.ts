import { FeatureBaseConfig, ThemeBaseProps } from "../../types";
import { Config as RecipeModuleConfig, NormalisedConfig as NormalisedRecipeModuleConfig } from "../recipeModule/types";
import { InputType as WebJSInputType } from "supertokens-web-js/recipe/emailverification";
import { ComponentOverride } from "../../components/componentOverride/componentOverride";
import { SendVerifyEmail } from "./components/themes/emailVerification/sendVerifyEmail";
import { VerifyEmailLinkClicked } from "./components/themes/emailVerification/verifyEmailLinkClicked";
import OverrideableBuilder from "supertokens-js-override";
import { RecipeInterface } from "supertokens-web-js/recipe/emailverification";
import EmailVerificationRecipe from "./recipe";
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
        functions?: (
            originalImplementation: RecipeInterface,
            builder?: OverrideableBuilder<RecipeInterface>
        ) => RecipeInterface;
        components?: ComponentOverrideMap;
    };
};
export declare type Config = UserInput &
    RecipeModuleConfig<GetRedirectionURLContext, PreAndPostAPIHookAction, OnHandleEventContext>;
export declare type NormalisedConfig = WebJSInputType & {
    mode: "OFF" | "REQUIRED";
    disableDefaultImplementation: boolean;
    sendVerifyEmailScreen: FeatureBaseConfig;
    verifyEmailLinkClickedScreen: FeatureBaseConfig;
    signOut(): Promise<void>;
    redirectToSignIn(history?: any): Promise<void>;
    postVerificationRedirect(history?: any): Promise<void>;
    override: {
        components: ComponentOverrideMap;
    };
} & NormalisedRecipeModuleConfig<GetRedirectionURLContext, PreAndPostAPIHookAction, OnHandleEventContext>;
export declare type GetRedirectionURLContext = {
    action: "VERIFY_EMAIL";
};
export declare type PreAndPostAPIHookAction = "VERIFY_EMAIL" | "SEND_VERIFY_EMAIL" | "IS_EMAIL_VERIFIED";
export declare type PreAPIHookContext = {
    action: PreAndPostAPIHookAction;
    requestInit: RequestInit;
    url: string;
    userContext: any;
};
export declare type OnHandleEventContext = {
    action: "VERIFY_EMAIL_SENT" | "EMAIL_VERIFIED_SUCCESSFUL";
};
export declare type EmailVerificationThemeProps = {
    recipe: EmailVerificationRecipe;
    sendVerifyEmailScreen: SendVerifyEmailThemeProps;
    verifyEmailLinkClickedScreen?: VerifyEmailLinkClickedThemeProps;
    config: NormalisedConfig;
};
export declare type SendVerifyEmailThemeProps = ThemeBaseProps & {
    recipe: EmailVerificationRecipe;
    recipeImplementation: RecipeInterface;
    config: NormalisedConfig;
    signOut: () => Promise<void>;
    onEmailAlreadyVerified: () => Promise<void>;
};
export declare type VerifyEmailLinkClickedThemeProps = ThemeBaseProps & {
    recipe: EmailVerificationRecipe;
    recipeImplementation: RecipeInterface;
    config: NormalisedConfig;
    onContinueClicked: () => Promise<void>;
    onTokenInvalidRedirect: () => Promise<void>;
    token: string;
};
