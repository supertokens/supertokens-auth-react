import type { ProvidersForm } from "./components/themes/signInAndUp/providersForm";
import type { SignInAndUpCallbackTheme } from "./components/themes/signInAndUpCallback";
import type Provider from "./providers";
import type { CustomProviderConfig } from "./providers/types";
import type { ComponentOverride } from "../../components/componentOverride/componentOverride";
import type {
    FeatureBaseConfig,
    NormalisedBaseConfig,
    PartialAuthComponentProps,
    UserContext,
    WebJSRecipeInterface,
} from "../../types";
import type {
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
    ThirdPartySignInAndUpProvidersForm_Override?: ComponentOverride<typeof ProvidersForm>;
    ThirdPartySignInAndUpCallbackTheme_Override?: ComponentOverride<typeof SignInAndUpCallbackTheme>;
};
export declare type UserInput = {
    signInAndUpFeature?: SignInAndUpFeatureUserInput;
    oAuthCallbackScreen?: FeatureBaseConfig;
    override?: {
        functions?: (
            originalImplementation: RecipeInterface,
            builder: OverrideableBuilder<RecipeInterface>
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
            builder: OverrideableBuilder<RecipeInterface>
        ) => RecipeInterface;
    };
} & NormalisedAuthRecipeModuleConfig<GetRedirectionURLContext, PreAndPostAPIHookAction, OnHandleEventContext>;
export declare type SignInAndUpFeatureUserInput = FeatureBaseConfig & {
    providers?: (Provider | CustomProviderConfig)[];
};
export declare type NormalisedSignInAndUpFeatureConfig = NormalisedBaseConfig & {
    providers: Provider[];
};
export declare type GetRedirectionURLContext = never;
export declare type PreAndPostAPIHookAction = "GET_AUTHORISATION_URL" | "THIRD_PARTY_SIGN_IN_UP";
export declare type PreAPIHookContext = {
    action: PreAndPostAPIHookAction;
    requestInit: RequestInit;
    url: string;
    userContext: UserContext;
};
export declare type OnHandleEventContext =
    | AuthRecipeModuleOnHandleEventContext
    | {
          action: "SUCCESS";
          isNewRecipeUser: boolean;
          createdNewSession: boolean;
          user: User;
          userContext: UserContext;
      };
export declare type SignInAndUpThemeProps = PartialAuthComponentProps & {
    providers: Pick<Provider, "id" | "getButton">[];
    recipeImplementation: WebJSRecipeInterface<typeof ThirdPartyWebJS>;
    config: NormalisedConfig;
};
export declare type StateObject = WebJsStateObject & {
    rid?: string;
    redirectToPath?: string;
};
export declare type CustomStateProperties = {
    rid: string;
    redirectToPath: string;
    oauth2LoginChallenge?: string;
};
