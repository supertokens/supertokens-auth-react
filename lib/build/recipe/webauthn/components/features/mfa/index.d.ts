import * as React from "react";
import type { FeatureBaseProps, UserContext, Navigate } from "../../../../../types";
import type Recipe from "../../../recipe";
import type { ComponentOverrideMap, WebAuthnMFAAction, WebAuthnMFAProps, WebAuthnMFAState } from "../../../types";
import type { RecipeInterface } from "supertokens-web-js/recipe/webauthn";
export declare const useFeatureReducer: () => [WebAuthnMFAState, React.Dispatch<WebAuthnMFAAction>];
export declare function useChildProps(
    recipe: Recipe,
    recipeImplementation: RecipeInterface,
    state: WebAuthnMFAState,
    dispatch: React.Dispatch<WebAuthnMFAAction>,
    userContext: UserContext,
    navigate?: Navigate
): Omit<WebAuthnMFAProps, "featureState" | "dispatch">;
export declare const MFAFeature: React.FC<
    FeatureBaseProps<{
        recipe: Recipe;
        useComponentOverrides: () => ComponentOverrideMap;
    }>
>;
export default MFAFeature;
