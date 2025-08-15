import type { AccessDeniedScreenTheme } from "./components/themes/accessDeniedScreenTheme";
import type Session from "./recipe";
import type { ComponentOverride } from "../../components/componentOverride/componentOverride";
import type { Navigate, FeatureBaseConfig, NormalisedBaseConfig } from "../../types";
import type { NormalisedConfig } from "../recipeModule/types";
import type OverrideableBuilder from "supertokens-js-override";
import type { RecipeInterface } from "supertokens-web-js/recipe/session";
import type { ClaimValidationError } from "supertokens-web-js/recipe/session";
import type { UserInput as WebJSInputType, RecipeEvent } from "supertokens-web-js/recipe/session/types";
export declare type RecipeEventWithSessionContext = RecipeEvent & {
    sessionContext: SessionContextUpdate;
};
export declare type InputType = WebJSInputType & {
    style?: string;
    accessDeniedScreen?: SessionFeatureBaseConfig;
    onHandleEvent?: (event: RecipeEventWithSessionContext) => void;
};
export declare type NormalisedSessionConfig = NormalisedConfig<unknown, any, any> & {
    invalidClaimStatusCode: number;
    accessDeniedScreen: NormalisedBaseConfig;
    override: {
        functions: (
            originalImplementation: RecipeInterface,
            builder: OverrideableBuilder<RecipeInterface>
        ) => RecipeInterface;
    };
};
export declare type SessionFeatureBaseConfig = FeatureBaseConfig;
export declare type SessionContextUpdate = {
    doesSessionExist: boolean;
    userId: string;
    accessTokenPayload: any;
};
export declare type LoadedSessionContext = {
    loading: false;
    invalidClaims: ClaimValidationError[];
    accessDeniedValidatorError?: ClaimValidationError;
} & SessionContextUpdate;
export declare type SessionContextType =
    | LoadedSessionContext
    | {
          loading: true;
      };
export declare type AccessDeniedThemeProps = {
    recipe: Session;
    error?: string;
    navigate: Navigate;
    config: NormalisedSessionConfig;
};
export declare type ComponentOverrideMap = {
    SessionAccessDenied_Override?: ComponentOverride<typeof AccessDeniedScreenTheme>;
};
