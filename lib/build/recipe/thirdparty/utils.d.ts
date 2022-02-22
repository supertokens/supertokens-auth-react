import { NormalisedSignInAndUpFeatureConfig, NormalisedConfig, SignInAndUpFeatureUserInput, Config } from "./types";
import Recipe from "./recipe";
export declare function normaliseThirdPartyConfig(config: Config): NormalisedConfig;
export declare function normaliseSignInAndUpFeature(
    config: SignInAndUpFeatureUserInput | undefined
): NormalisedSignInAndUpFeatureConfig;
export declare function matchRecipeIdUsingState(recipe: Recipe, userContext: any): boolean;
