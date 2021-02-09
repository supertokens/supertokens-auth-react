import { NormalisedSignInAndUpFeatureConfig, NormalisedThirdPartyConfig, SignInAndUpFeatureUserInput, StateObject, ThirdPartyConfig } from "./types";
export declare function normaliseThirdPartyConfig(config: ThirdPartyConfig): NormalisedThirdPartyConfig;
export declare function normaliseSignInAndUpFeature(config: SignInAndUpFeatureUserInput): NormalisedSignInAndUpFeatureConfig;
export declare function getOAuthState(): StateObject | undefined;
export declare function matchRecipeIdUsingState(recipeId: string): () => boolean;
