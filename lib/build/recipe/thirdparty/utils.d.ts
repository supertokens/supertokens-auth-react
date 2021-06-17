import { NormalisedSignInAndUpFeatureConfig, NormalisedConfig, SignInAndUpFeatureUserInput, Config } from "./types";
import Recipe from "./recipe";
export declare function normaliseThirdPartyConfig(config: Config, allowEmptyProviders?: boolean): NormalisedConfig;
export declare function normaliseSignInAndUpFeature(
    config: SignInAndUpFeatureUserInput | undefined,
    allowEmptyProviders: boolean
): NormalisedSignInAndUpFeatureConfig;
export declare function matchRecipeIdUsingState(recipe: Recipe): boolean;
