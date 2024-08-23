import type { FeatureBaseConfig, NormalisedBaseConfig, SuccessRedirectContextOAuth2, UserContext } from "../../types";
import type {
    UserInput as RecipeModuleUserInput,
    NormalisedConfig as NormalisedRecipeModuleConfig,
} from "../recipeModule/types";
import type OverrideableBuilder from "supertokens-js-override";
import type { LoginInfo, RecipeInterface } from "supertokens-web-js/recipe/oauth2provider/types";
export declare type PreAndPostAPIHookAction = "GET_LOGIN_CHALLENGE_INFO" | "LOG_OUT";
export declare type PreAPIHookContext = {
    action: PreAndPostAPIHookAction;
    requestInit: RequestInit;
    url: string;
    userContext: UserContext;
};
export declare type UserInput = {
    disableDefaultUI?: boolean;
    oauth2LogoutScreen?: FeatureBaseConfig;
    override?: {
        functions?: (
            originalImplementation: RecipeInterface,
            builder: OverrideableBuilder<RecipeInterface>
        ) => RecipeInterface;
    };
} & RecipeModuleUserInput<GetRedirectionURLContext, PreAndPostAPIHookAction, OnHandleEventContext>;
export declare type NormalisedConfig = NormalisedRecipeModuleConfig<
    GetRedirectionURLContext,
    PreAndPostAPIHookAction,
    OnHandleEventContext
> & {
    disableDefaultUI: boolean;
    oauth2LogoutScreen: NormalisedBaseConfig;
    override: {
        functions: (
            originalImplementation: RecipeInterface,
            builder: OverrideableBuilder<RecipeInterface>
        ) => RecipeInterface;
    };
};
export declare type ContinueOAuth2AfterRefreshRedirectContext = {
    recipeId: "oauth2provider";
    action: "CONTINUE_OAUTH2_AFTER_REFRESH";
    loginChallenge: string;
};
export declare type PostOAuth2LogoutRedirectContext = {
    recipeId: "oauth2provider";
    action: "POST_OAUTH2_LOGOUT_REDIRECT";
    frontendRedirectTo: string;
};
export declare type GetRedirectionURLContext =
    | SuccessRedirectContextOAuth2
    | ContinueOAuth2AfterRefreshRedirectContext
    | PostOAuth2LogoutRedirectContext;
export declare type OnHandleEventContext =
    | {
          action: "LOADED_LOGIN_CHALLENGE";
          loginChallenge: string;
          loginInfo: LoginInfo;
          userContext: UserContext;
      }
    | {
          action: "OAUTH2_LOGOUT_SUCCESS";
          frontendRedirectTo: string;
          userContext: UserContext;
      };
export declare type ComponentOverrideMap = any;
export declare type OAuth2LogoutScreenThemeProps = {
    config: NormalisedConfig;
    isLoggingOut: boolean;
    onLogoutClicked: () => void;
    showSpinner: boolean;
};
