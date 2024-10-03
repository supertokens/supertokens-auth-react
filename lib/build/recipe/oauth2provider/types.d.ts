import type { OAuth2LogoutScreenInner } from "./components/themes/oauth2LogoutScreen/OAuth2LogoutScreenInner";
import type { ComponentOverride } from "../../components/componentOverride/componentOverride";
import type {
    NormalisedBaseConfig,
    NormalisedGetRedirectionURLContext,
    SuccessRedirectContextOAuth2,
    UserContext,
} from "../../types";
import type {
    UserInput as RecipeModuleUserInput,
    NormalisedConfig as NormalisedRecipeModuleConfig,
} from "../recipeModule/types";
import type OverrideableBuilder from "supertokens-js-override";
import type { LoginInfo, RecipeInterface } from "supertokens-web-js/recipe/oauth2provider/types";
export declare type PreAndPostAPIHookAction =
    | "GET_LOGIN_CHALLENGE_INFO"
    | "GET_REDIRECT_URL_TO_CONTINUE_OAUTH_FLOW"
    | "LOG_OUT";
export declare type PreAPIHookContext = {
    action: PreAndPostAPIHookAction;
    requestInit: RequestInit;
    url: string;
    userContext: UserContext;
};
export declare type UserInput = {
    disableDefaultUI?: boolean;
    oauth2LogoutScreen?: Partial<OAuth2LogoutScreenConfig>;
    tryRefreshPage?: Partial<OAuth2TryRefreshPageConfig>;
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
    oauth2LogoutScreen: OAuth2LogoutScreenConfig;
    tryRefreshPage: OAuth2TryRefreshPageConfig;
    override: {
        functions: (
            originalImplementation: RecipeInterface,
            builder: OverrideableBuilder<RecipeInterface>
        ) => RecipeInterface;
    };
};
export declare type OAuth2LogoutScreenConfig = NormalisedBaseConfig & {
    disableDefaultUI: boolean;
};
export declare type OAuth2TryRefreshPageConfig = {
    disableDefaultUI: boolean;
};
export declare type ContinueOAuth2AfterRefreshRedirectContext = {
    recipeId: "oauth2provider";
    action: "CONTINUE_OAUTH2_AFTER_REFRESH";
    frontendRedirectTo: string;
};
export declare type PostOAuth2LogoutRedirectContext = {
    recipeId: "oauth2provider";
    action: "POST_OAUTH2_LOGOUT_REDIRECT";
    frontendRedirectTo: string;
};
export declare type GetRedirectionURLContext = NormalisedGetRedirectionURLContext<
    SuccessRedirectContextOAuth2 | ContinueOAuth2AfterRefreshRedirectContext | PostOAuth2LogoutRedirectContext
>;
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
export declare type ComponentOverrideMap = {
    OAuth2LogoutScreenInner_Override?: ComponentOverride<typeof OAuth2LogoutScreenInner>;
};
export declare type OAuth2LogoutScreenThemeProps = {
    config: NormalisedConfig;
    isLoggingOut: boolean;
    onLogoutClicked: () => void;
    showSpinner: boolean;
};
