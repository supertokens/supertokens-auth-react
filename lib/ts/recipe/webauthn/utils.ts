import { normaliseAuthRecipe } from "../authRecipe/utils";

import type { Config, NormalisedConfig } from "./types";
import type { RecipeInterface } from "supertokens-web-js/recipe/webauthn";

export function normaliseWebauthnConfig(config: Config): NormalisedConfig {
    if (config === undefined) {
        config = {};
    }

    const override: {
        functions: (originalImplementation: RecipeInterface) => RecipeInterface;
    } = {
        functions: (originalImplementation: RecipeInterface) => originalImplementation,
        ...config.override,
    };

    return {
        ...normaliseAuthRecipe(config),
        override,
    };
}
