import { normaliseAuthRecipe } from "../authRecipe/utils";

import type { Config, NormalisedConfig } from "./types";
import type { RecipeInterface } from "supertokens-web-js/recipe/webauthn";

export function normaliseWebauthnConfig(config: Config): NormalisedConfig {
    const override: any = {
        functions: (originalImplementation: RecipeInterface) => originalImplementation,
        ...config.override,
    };

    return {
        ...normaliseAuthRecipe(config),
        override,
    };
}
