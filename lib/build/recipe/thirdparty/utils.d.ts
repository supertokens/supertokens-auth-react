import { NormalisedSignInAndUpFeatureConfig, NormalisedThirdPartyConfig, SignInAndUpFeatureUserInput, StateObject, ThirdPartyConfig } from "./types";
export declare function normaliseThirdPartyConfig(config: ThirdPartyConfig, allowEmptyProviders?: boolean): NormalisedThirdPartyConfig;
export declare function normaliseSignInAndUpFeature(config: SignInAndUpFeatureUserInput, allowEmptyProviders: boolean): NormalisedSignInAndUpFeatureConfig;
export declare function getOAuthState(): StateObject | undefined;
export declare function matchRecipeIdUsingState(recipeId: string): () => boolean;
