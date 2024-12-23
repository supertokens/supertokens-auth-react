import type {
    FeatureBaseConfig,
    NormalisedGetRedirectionURLContext,
    UserContext,
    WebJSRecipeInterface,
} from "../../types";
import type {
    OnHandleEventContext as AuthRecipeModuleOnHandleEventContext,
    UserInput as AuthRecipeModuleUserInput,
    NormalisedConfig as NormalisedAuthRecipeModuleConfig,
    Config as AuthRecipeModuleConfig,
} from "../authRecipe/types";
import type WebJSRecipe from "supertokens-web-js/recipe/webauthn";
import type { RecipeInterface } from "supertokens-web-js/recipe/webauthn";
import type { User } from "supertokens-web-js/types";
export declare type WebauthnFeatureBaseConfig = {
    disableDefaultUI?: boolean;
} & FeatureBaseConfig;
export declare type GetRedirectionURLContext = NormalisedGetRedirectionURLContext<{
    action: "RECOVER_ACCOUNT";
}>;
export declare type PreAndPostAPIHookAction =
    | "REGISTER_OPTIONS"
    | "SIGN_IN_OPTIONS"
    | "SIGN_UP"
    | "SIGN_IN"
    | "EMAIL_EXISTS"
    | "GENERATE_RECOVER_ACCOUNT_TOKEN"
    | "RECOVER_ACCOUNT";
export declare type OnHandleEventContext =
    | {
          action: "SUCCESS";
          isNewRecipeUser: boolean;
          createdNewSession: boolean;
          user: User;
      }
    | {
          action: "REGISTER_OPTIONS";
      }
    | {
          action: "SIGN_IN_OPTIONS";
      }
    | {
          action: "GET_EMAIL_EXISTS";
          exists: boolean;
      }
    | {
          action: "REGISTER_CREDENTIAL";
      }
    | {
          action: "AUTHENTICATE_CREDENTIAL";
      }
    | {
          action: "SIGN_IN";
      }
    | {
          action: "SIGN_UP";
      }
    | {
          action: "GENERATE_RECOVER_ACCOUNT_TOKEN";
      }
    | {
          action: "RECOVER_ACCOUNT";
      }
    | {
          action: "REGISTER_CREDENTIAL_WITH_SIGN_UP";
      }
    | {
          action: "AUTHENTICATE_CREDENTIAL_WITH_SIGN_IN";
      }
    | {
          action: "REGISTER_CREDENTIAL_WITH_RECOVER_ACCOUNT";
      }
    | AuthRecipeModuleOnHandleEventContext;
export declare type UserInput = Record<string, unknown> & {
    override?: {
        functions?: (originalImplementation: RecipeInterface) => RecipeInterface;
    };
    linkClickedScreenFeature?: WebauthnFeatureBaseConfig;
    mfaFeature?: WebauthnFeatureBaseConfig;
} & AuthRecipeModuleUserInput<GetRedirectionURLContext, PreAndPostAPIHookAction, OnHandleEventContext>;
export declare type Config = UserInput &
    AuthRecipeModuleConfig<GetRedirectionURLContext, PreAndPostAPIHookAction, OnHandleEventContext>;
export declare type NormalisedConfig = {
    override: {
        functions: (originalImplementation: RecipeInterface) => RecipeInterface;
    };
} & NormalisedAuthRecipeModuleConfig<GetRedirectionURLContext, PreAndPostAPIHookAction, OnHandleEventContext>;
export declare type RecipeImplementation = WebJSRecipeInterface<typeof WebJSRecipe>;
export declare type ComponentOverrideMap = Record<string, undefined>;
export declare type WebauthnSignUpState = {
    showBackButton: boolean;
    loaded: boolean;
    error: string | undefined;
};
export declare type SignUpChildProps = {
    recipeImplementation: RecipeImplementation;
    factorIds: string[];
    config: NormalisedConfig;
    onSuccess?: (result: { createdNewRecipeUser: boolean; user: User }) => void;
    onFetchError: (err: Response) => void;
    onError: (err: string) => void;
    error: string | undefined;
    userContext: UserContext;
};
export declare type ContinueFor = "SIGN_UP" | "SIGN_IN";
