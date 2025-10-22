import React from "react";
import type { FeatureBaseProps, UserContext } from "../../../../../types";
import type Recipe from "../../../recipe";
import type { ComponentOverrideMap } from "../../../types";
declare const AccessDeniedScreen: React.FC<
    FeatureBaseProps<{
        recipe: Recipe;
        userContext?: UserContext;
        useComponentOverrides: () => ComponentOverrideMap;
        useShadowDom?: boolean;
        error?: string;
    }>
>;
export default AccessDeniedScreen;
