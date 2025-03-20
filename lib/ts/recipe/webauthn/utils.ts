import { normaliseAuthRecipe } from "../authRecipe/utils";

import type { Config, NormalisedConfig } from "./types";
import type { FeatureBaseConfig, NormalisedBaseConfig } from "../../types";
import type { RecipeInterface } from "supertokens-web-js/recipe/webauthn";

export function normaliseWebauthnConfig(config?: Config): NormalisedConfig {
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
        signInAndUpFeature: normalisePasskeyBaseConfig(config.signInAndUpFeature),
        recoveryFeature: normalisePasskeyBaseConfig(config.recoveryFeature),
        override,
    };
}

function normalisePasskeyBaseConfig<T>(config?: T & FeatureBaseConfig): T & NormalisedBaseConfig {
    const style = config && config.style !== undefined ? config.style : "";
    return {
        ...(config as T),
        style,
    };
}
