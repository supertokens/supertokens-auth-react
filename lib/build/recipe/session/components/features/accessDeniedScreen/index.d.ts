import React from "react";
import type { FeatureBaseProps } from "../../../../../types";
import type Recipe from "../../../recipe";
import type { ComponentOverrideMap } from "../../../types";
declare const AccessDeniedScreen: React.FC<
    FeatureBaseProps & {
        recipe: Recipe;
        useComponentOverrides: () => ComponentOverrideMap;
        useShadowDom?: boolean;
        error?: string;
    }
>;
export default AccessDeniedScreen;
