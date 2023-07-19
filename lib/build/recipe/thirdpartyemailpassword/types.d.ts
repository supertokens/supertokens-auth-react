import type { Header } from "./components/themes/signInAndUp/header";
import type { ComponentOverride } from "../../components/componentOverride/componentOverride";
import type { FeatureBaseConfig, NormalisedBaseConfig } from "../../types";
import type {
    Config as AuthRecipeModuleConfig,
    NormalisedConfig as NormalisedAuthRecipeModuleConfig,
    UserInput as AuthRecipeModuleUserInput,
} from "../authRecipe/types";
import type {
    GetRedirectionURLContext as EmailPasswordGetRedirectionURLContext,
    OnHandleEventContext as EmailPasswordOnHandleEventContext,
    PreAPIHookContext as EmailPasswordPreAPIHookContext,
} from "../emailpassword";
import type EPRecipe from "../emailpassword/recipe";
import type {
    ResetPasswordUsingTokenUserInput,
    SignInFormFeatureUserInput,
    SignUpFormFeatureUserInput,
    PreAndPostAPIHookAction as EmailPasswordPreAndPostAPIHookAction,
    SignInAndUpState as EmailPasswordSignInAndUpState,
    EmailPasswordSignInAndUpAction,
    EmailPasswordSignInAndUpChildProps,
    NormalisedConfig as NormalisedEmailPasswordConfig,
} from "../emailpassword/types";
import type { ComponentOverrideMap as EmailPasswordOverrideMap } from "../emailpassword/types";
import type {
    GetRedirectionURLContext as ThirdPartyGetRedirectionURLContext,
    OnHandleEventContext as ThirdPartyOnHandleEventContext,
    PreAPIHookContext as ThirdPartyPreAPIHookContext,
} from "../thirdparty";
import type Provider from "../thirdparty/providers";
import type { CustomProviderConfig } from "../thirdparty/providers/types";
import type TPRecipe from "../thirdparty/recipe";
import type {
    PreAndPostAPIHookAction as ThirdPartyPreAndPostAPIHookAction,
    ThirdPartySignInAndUpState,
    ThirdPartySignInUpActions,
    ThirdPartySignInUpChildProps,
    NormalisedConfig as NormalisedThirdPartyConfig,
} from "../thirdparty/types";
import type { ComponentOverrideMap as ThirdPartyOverrideMap } from "../thirdparty/types";
import type { Dispatch } from "react";
import type { OverrideableBuilder } from "supertokens-js-override";
import type { RecipeInterface } from "supertokens-web-js/recipe/thirdpartyemailpassword";
export declare type ComponentOverrideMap = Omit<
    EmailPasswordOverrideMap,
    "EmailPasswordSignUp_Override" | "EmailPasswordSignIn_Override"
> &
    ThirdPartyOverrideMap & {
        ThirdPartyEmailPasswordHeader_Override?: ComponentOverride<typeof Header>;
    };
export declare type UserInput = {
    signInAndUpFeature?: SignInAndUpFeatureUserInput;
    oAuthCallbackScreen?: FeatureBaseConfig;
    resetPasswordUsingTokenFeature?: ResetPasswordUsingTokenUserInput;
    disableEmailPassword?: boolean;
    override?: {
        functions?: (
            originalImplementation: RecipeInterface,
            builder?: OverrideableBuilder<RecipeInterface>
        ) => RecipeInterface;
    };
} & AuthRecipeModuleUserInput<GetRedirectionURLContext, PreAndPostAPIHookAction, OnHandleEventContext>;
export declare type Config = UserInput &
    AuthRecipeModuleConfig<GetRedirectionURLContext, PreAndPostAPIHookAction, OnHandleEventContext>;
export declare type NormalisedConfig = {
    signInAndUpFeature: NormalisedSignInAndUpFeatureConfig;
    disableEmailPassword: boolean;
    emailPasswordConfig: NormalisedEmailPasswordConfig;
    thirdPartyConfig: NormalisedThirdPartyConfig;
    override: {
        functions: (
            originalImplementation: RecipeInterface,
            builder?: OverrideableBuilder<RecipeInterface>
        ) => RecipeInterface;
    };
} & NormalisedAuthRecipeModuleConfig<GetRedirectionURLContext, PreAndPostAPIHookAction, OnHandleEventContext>;
export declare type SignInAndUpFeatureUserInput = FeatureBaseConfig & {
    disableDefaultUI?: boolean;
    defaultToSignUp?: boolean;
    signUpForm?: SignUpFormFeatureUserInput;
    signInForm?: SignInFormFeatureUserInput;
    providers?: (Provider | CustomProviderConfig)[];
};
export declare type NormalisedSignInAndUpFeatureConfig = NormalisedBaseConfig & {
    disableDefaultUI: boolean;
    defaultToSignUp: boolean;
    signUpForm?: SignUpFormFeatureUserInput;
    signInForm?: SignInFormFeatureUserInput;
    providers?: (Provider | CustomProviderConfig)[];
};
export declare type GetRedirectionURLContext =
    | EmailPasswordGetRedirectionURLContext
    | ThirdPartyGetRedirectionURLContext;
export declare type PreAndPostAPIHookAction = EmailPasswordPreAndPostAPIHookAction | ThirdPartyPreAndPostAPIHookAction;
export declare type PreAPIHookContext = EmailPasswordPreAPIHookContext | ThirdPartyPreAPIHookContext;
export declare type OnHandleEventContext = ThirdPartyOnHandleEventContext | EmailPasswordOnHandleEventContext;
export declare type ThirdPartyEmailPasswordSignInAndUpThemeProps = {
    config: NormalisedConfig;
    history?: any;
    commonState: {
        error: string | undefined;
    };
    emailPasswordRecipe?: EPRecipe;
    epState: EmailPasswordSignInAndUpState;
    epDispatch: Dispatch<EmailPasswordSignInAndUpAction>;
    epChildProps?: EmailPasswordSignInAndUpChildProps;
    thirdPartyRecipe?: TPRecipe;
    tpState: ThirdPartySignInAndUpState;
    tpDispatch: Dispatch<ThirdPartySignInUpActions>;
    tpChildProps?: ThirdPartySignInUpChildProps;
};
