import * as React from "react";
import type { FeatureBaseProps, Navigate, UserContext } from "../../../../../types";
import type Recipe from "../../../recipe";
import type { ComponentOverrideMap, MFAChildProps } from "../../../types";
import type { MFAAction, MFAState } from "../../../types";
import type { RecipeInterface } from "supertokens-web-js/recipe/passwordless";
import type { PasswordlessFlowType } from "supertokens-web-js/recipe/passwordless/types";
export declare const useFeatureReducer: () => [MFAState, React.Dispatch<MFAAction>];
export declare function useChildProps(
    recipe: Recipe,
    recipeImplementation: RecipeInterface,
    state: MFAState,
    contactMethod: "PHONE" | "EMAIL",
    dispatch: React.Dispatch<MFAAction>,
    userContext: UserContext,
    navigate?: Navigate
): MFAChildProps;
export declare const MFAFeature: React.FC<
    FeatureBaseProps<{
        contactMethod: "PHONE" | "EMAIL";
        flowType: PasswordlessFlowType;
        recipe: Recipe;
        useComponentOverrides: () => ComponentOverrideMap;
    }>
>;
export default MFAFeature;
