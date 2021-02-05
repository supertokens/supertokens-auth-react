import AuthRecipeModule from ".";
import { AuthRecipeModuleConfig, NormalisedAuthRecipeConfig } from "./types";
export declare function isAuthRecipeModule(x: any): x is AuthRecipeModule;
export declare function normaliseAuthRecipeModuleConfig(config: AuthRecipeModuleConfig<unknown, unknown, unknown>): NormalisedAuthRecipeConfig;
