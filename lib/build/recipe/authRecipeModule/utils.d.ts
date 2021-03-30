import AuthRecipeModule from ".";
import { AuthRecipeModuleConfig, NormalisedAuthRecipeConfig } from "./types";
export declare function isAuthRecipeModule<T, S, R, N>(x: unknown): x is AuthRecipeModule<T, S, R, N>;
export declare function normaliseAuthRecipeModuleConfig<T, S, R>(config: AuthRecipeModuleConfig<T, S, R>): NormalisedAuthRecipeConfig;
