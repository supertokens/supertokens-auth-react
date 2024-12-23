import * as React from "react";
import type { UserContext, PartialAuthComponentProps } from "../../../../../types";
import type Recipe from "../../../recipe";
import type { ComponentOverrideMap, ContinueFor } from "../../../types";
export declare const ContinueWithPasskeyFeature: React.FC<
    PartialAuthComponentProps & {
        recipe: Recipe;
        factorIds: string[];
        userContext?: UserContext;
        useComponentOverrides: () => ComponentOverrideMap;
        continueFor: ContinueFor;
    }
>;
export default ContinueWithPasskeyFeature;
