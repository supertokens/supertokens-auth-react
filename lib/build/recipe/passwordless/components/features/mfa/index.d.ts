import * as React from "react";
import type { FeatureBaseProps } from "../../../../../types";
import type Recipe from "../../../recipe";
import type { ComponentOverrideMap, MFAChildProps } from "../../../types";
import type { MFAAction, MFAState } from "../../../types";
import type { RecipeInterface } from "supertokens-web-js/recipe/passwordless";
import type { PasswordlessFlowType } from "supertokens-web-js/recipe/thirdpartypasswordless";
export declare const useSuccessInAnotherTabChecker: (
    callingConsumeCodeRef: React.MutableRefObject<boolean>,
    recipeImpl: RecipeInterface,
    state: MFAState,
    dispatch: React.Dispatch<MFAAction>,
    userContext: any
) => void;
export declare const useFeatureReducer: () => [MFAState, React.Dispatch<MFAAction>];
export declare function useChildProps(
    recipe: Recipe,
    recipeImplementation: RecipeInterface,
    state: MFAState,
    contactMethod: "PHONE" | "EMAIL",
    userContext: any,
    history: any
): MFAChildProps;
export declare function useChildProps(
    recipe: Recipe | undefined,
    recipeImplementation: RecipeInterface,
    state: MFAState,
    contactMethod: "PHONE" | "EMAIL",
    userContext: any,
    history: any
): MFAChildProps | undefined;
export declare const MFAFeature: React.FC<
    FeatureBaseProps & {
        contactMethod: "PHONE" | "EMAIL";
        flowType: PasswordlessFlowType;
        recipe: Recipe;
        useComponentOverrides: () => ComponentOverrideMap;
    }
>;
export default MFAFeature;
