import type { FeatureBaseConfig, NormalisedBaseConfig, SuccessRedirectContextOAuth2, UserContext } from "../../types";
import type {
    UserInput as RecipeModuleUserInput,
    NormalisedConfig as NormalisedRecipeModuleConfig,
} from "../recipeModule/types";
import type OverrideableBuilder from "supertokens-js-override";
import type { LoginInfo, RecipeInterface } from "supertokens-web-js/recipe/oauth2provider/types";

export type PreAndPostAPIHookAction = "GET_LOGIN_CHALLENGE_INFO" | "LOG_OUT";

export type PreAPIHookContext = {
    action: PreAndPostAPIHookAction;
    requestInit: RequestInit;
    url: string;
    userContext: UserContext;
};

export type UserInput = {
    disableDefaultUI?: boolean;
    oauth2LogoutScreen?: FeatureBaseConfig;
    override?: {
        functions?: (
            originalImplementation: RecipeInterface,
            builder: OverrideableBuilder<RecipeInterface>
        ) => RecipeInterface;
    };
} & RecipeModuleUserInput<GetRedirectionURLContext, PreAndPostAPIHookAction, OnHandleEventContext>;

export type NormalisedConfig = NormalisedRecipeModuleConfig<
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

export type ContinueOAuth2AfterRefreshRedirectContext = {
    recipeId: "oauth2provider";
    action: "CONTINUE_OAUTH2_AFTER_REFRESH";
    loginChallenge: string;
};

export type PostOAuth2LogoutRedirectContext = {
    recipeId: "oauth2provider";
    action: "POST_OAUTH2_LOGOUT_REDIRECT";
    frontendRedirectTo: string;
};

export type GetRedirectionURLContext =
    | SuccessRedirectContextOAuth2
    | ContinueOAuth2AfterRefreshRedirectContext
    | PostOAuth2LogoutRedirectContext;

export type OnHandleEventContext =
    | {
          /*
           * On Handle Event actions
           */
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

// TODO: update this whenever we add components
export type ComponentOverrideMap = any;

export type OAuth2LogoutScreenThemeProps = {
    config: NormalisedConfig;
    isLoggingOut: boolean;
    onLogoutClicked: () => void;
    showSpinner: boolean;
};
