import type { ProvidersForm } from "./components/themes/signInAndUp/providersForm";
import type { SignInAndUpHeader } from "./components/themes/signInAndUp/signInAndUpHeader";
import type { SignUpFooter } from "./components/themes/signInAndUp/signUpFooter";
import type { SignInAndUpCallbackTheme } from "./components/themes/signInAndUpCallback";
import type Provider from "./providers";
import type { CustomProviderConfig } from "./providers/types";
import type { ComponentOverride } from "../../components/componentOverride/componentOverride";
import type { FeatureBaseConfig, NormalisedBaseConfig, WebJSRecipeInterface } from "../../types";
import type {
    GetRedirectionURLContext as AuthRecipeModuleGetRedirectionURLContext,
    OnHandleEventContext as AuthRecipeModuleOnHandleEventContext,
    Config as AuthRecipeModuleConfig,
    NormalisedConfig as NormalisedAuthRecipeModuleConfig,
    UserInput as AuthRecipeModuleUserInput,
} from "../authRecipe/types";
import type { OverrideableBuilder } from "supertokens-js-override";
import type ThirdPartyWebJS from "supertokens-web-js/recipe/thirdparty";
import type { StateObject as WebJsStateObject, RecipeInterface } from "supertokens-web-js/recipe/thirdparty";
import type { User } from "supertokens-web-js/types";
export declare type ComponentOverrideMap = {
    ThirdPartySignUpFooter_Override?: ComponentOverride<typeof SignUpFooter>;
    ThirdPartySignInAndUpHeader_Override?: ComponentOverride<typeof SignInAndUpHeader>;
    ThirdPartySignInAndUpProvidersForm_Override?: ComponentOverride<typeof ProvidersForm>;
    ThirdPartySignInAndUpCallbackTheme_Override?: ComponentOverride<typeof SignInAndUpCallbackTheme>;
};
export declare type UserInput = {
    signInAndUpFeature?: SignInAndUpFeatureUserInput;
    oAuthCallbackScreen?: FeatureBaseConfig;
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
    oAuthCallbackScreen: FeatureBaseConfig;
    override: {
        functions: (
            originalImplementation: RecipeInterface,
            builder?: OverrideableBuilder<RecipeInterface>
        ) => RecipeInterface;
    };
} & NormalisedAuthRecipeModuleConfig<GetRedirectionURLContext, PreAndPostAPIHookAction, OnHandleEventContext>;
export declare type SignInAndUpFeatureUserInput = FeatureBaseConfig & {
    disableDefaultUI?: boolean;
    privacyPolicyLink?: string;
    termsOfServiceLink?: string;
    providers?: (Provider | CustomProviderConfig)[];
};
export declare type NormalisedSignInAndUpFeatureConfig = NormalisedBaseConfig & {
    disableDefaultUI: boolean;
    privacyPolicyLink?: string;
    termsOfServiceLink?: string;
    providers: Provider[];
};
export declare type GetRedirectionURLContext = AuthRecipeModuleGetRedirectionURLContext;
export declare type PreAndPostAPIHookAction = "GET_AUTHORISATION_URL" | "THIRD_PARTY_SIGN_IN_UP";
export declare type PreAPIHookContext = {
    action: PreAndPostAPIHookAction;
    requestInit: RequestInit;
    url: string;
    userContext: any;
};
export declare type OnHandleEventContext =
    | AuthRecipeModuleOnHandleEventContext
    | {
          action: "SUCCESS";
          isNewRecipeUser: boolean;
          user: User;
          userContext: any;
      };
export declare type SignInAndUpThemeProps = {
    featureState: {
        error: string | undefined;
    };
    dispatch: (action: ThirdPartySignInUpActions) => void;
    providers: Pick<Provider, "id" | "getButton">[];
    recipeImplementation: WebJSRecipeInterface<typeof ThirdPartyWebJS>;
    config: NormalisedConfig;
};
export declare type ThirdPartySignInUpChildProps = Omit<SignInAndUpThemeProps, "featureState" | "dispatch">;
export declare type ThirdPartySignInUpActions = {
    type: "setError";
    error: string | undefined;
};
export declare type ThirdPartySignInAndUpState = {
    error: string | undefined;
};
export declare type StateObject = WebJsStateObject & {
    rid?: string;
    redirectToPath?: string;
};
export declare type CustomStateProperties = {
    rid: string;
    redirectToPath: string;
};
