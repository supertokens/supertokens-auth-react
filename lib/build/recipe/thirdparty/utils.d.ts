import {
    NormalisedSignInAndUpFeatureConfig,
    NormalisedConfig,
    SignInAndUpFeatureUserInput,
    StateObject,
    Config,
} from "./types";
export declare function normaliseThirdPartyConfig(config: Config, allowEmptyProviders?: boolean): NormalisedConfig;
export declare function normaliseSignInAndUpFeature(
    config: SignInAndUpFeatureUserInput,
    allowEmptyProviders: boolean
): NormalisedSignInAndUpFeatureConfig;
export declare function getOAuthState(): StateObject | undefined;
export declare function matchRecipeIdUsingState(recipeId: string): () => boolean;
