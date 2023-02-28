import type { AccessDeniedTheme } from "./components/themes/accessDeniedScreenTheme";
import type { ComponentOverride } from "../../components/componentOverride/componentOverride";
import type { FeatureBaseConfig, NormalisedAppInfo, NormalisedBaseConfig } from "../../types";
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
    accessDeniedScreen: NormalisedBaseConfig;
    override: {
        functions: (
            originalImplementation: RecipeInterface,
            builder?: OverrideableBuilder<RecipeInterface>
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
} & SessionContextUpdate;
export declare type SessionContextType =
    | LoadedSessionContext
    | {
          loading: true;
      };
export declare type AccessDeniedThemeProps = {
    config: NormalisedSessionConfig;
};
export declare type ConfigType = InputType & {
    recipeId: string;
    appInfo: NormalisedAppInfo;
    enableDebugLogs: boolean;
};
export declare type ComponentOverrideMap = {
    SessionAccessDenied_Override?: ComponentOverride<typeof AccessDeniedTheme>;
};
