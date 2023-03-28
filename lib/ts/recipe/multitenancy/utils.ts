import { normaliseAuthRecipe } from "../authRecipe/utils";

import type { UserInput, NormalisedConfig, RecipeInterface } from "./types";

export function normaliseMultitenancyConfig(config: UserInput): NormalisedConfig {
    return {
        ...normaliseAuthRecipe(config),
        getTenantID: config.getTenantID,
        override: {
            functions: (originalImplementation: RecipeInterface) => originalImplementation,
            ...config.override,
        },
    };
}
