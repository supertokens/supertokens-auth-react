import { normaliseRecipeModuleConfig } from "../recipeModule/utils";

import type { UserInput, NormalisedConfig } from "./types";

export function normaliseOAuth2Config(config?: UserInput): NormalisedConfig {
    return {
        ...normaliseRecipeModuleConfig(config),
        disableDefaultUI: config?.disableDefaultUI ?? false,
        oauth2LogoutScreen: {
            disableDefaultUI: false,
            style: "",
            ...config?.oauth2LogoutScreen,
        },
        override: {
            functions: (originalImplementation) => originalImplementation,
            ...config?.override,
        },
    };
}
