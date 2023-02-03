import { UserInput as WebJSInputType, RecipeEvent } from "supertokens-web-js/recipe/session/types";
import { ClaimValidationError, RecipeInterface } from "supertokens-web-js/recipe/session";
import { FeatureBaseConfig, NormalisedAppInfo, NormalisedBaseConfig } from "../../types";
import OverrideableBuilder from "supertokens-js-override";
import { ComponentOverride } from "../../components/componentOverride/componentOverride";
import { AccessDeniedTheme } from "./components/themes/accessDeniedScreenTheme";
import { NormalisedConfig } from "../recipeModule/types";
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
    denialInfo?: ClaimValidationError;
};
export declare type ConfigType = InputType & {
    recipeId: string;
    appInfo: NormalisedAppInfo;
    enableDebugLogs: boolean;
};
export declare type ComponentOverrideMap = {
    SessionAccessDenied_Override?: ComponentOverride<typeof AccessDeniedTheme>;
};
