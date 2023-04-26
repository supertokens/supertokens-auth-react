import { normaliseAuthRecipe } from "../authRecipe/utils";

import type { UserInput, NormalisedConfig, RecipeInterface } from "./types";

export function normaliseMultitenancyConfig(config: UserInput): NormalisedConfig {
    const getTenantID = config.getTenantID !== undefined ? config.getTenantID : () => undefined;
    return {
        ...normaliseAuthRecipe(config),
        getTenantID,
        override: {
            functions: (originalImplementation: RecipeInterface) => originalImplementation,
            ...config.override,
        },
    };
}
