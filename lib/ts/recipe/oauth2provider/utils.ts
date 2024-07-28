import { normaliseRecipeModuleConfig } from "../recipeModule/utils";

import type { UserInput, NormalisedConfig } from "./types";

export function normaliseOAuth2Config(config?: UserInput): NormalisedConfig {
    return {
        ...normaliseRecipeModuleConfig(config),
        override: {
            functions: (originalImplementation) => originalImplementation,
            ...config?.override,
        },
    };
}
