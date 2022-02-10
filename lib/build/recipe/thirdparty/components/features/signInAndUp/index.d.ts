import * as React from "react";
import { FeatureBaseProps } from "../../../../../types";
import { ThirdPartySignInAndUpState, RecipeInterface, NormalisedConfig } from "../../../types";
import Recipe from "../../../recipe";
export declare type ThirdPartySignInUpActions = {
    type: "setError";
    error: string | undefined;
};
export declare const getModifiedThirdPartyRecipeImplementation: (origImpl: RecipeInterface) => RecipeInterface;
export declare const useFeatureReducer: () => [ThirdPartySignInAndUpState, React.Dispatch<ThirdPartySignInUpActions>];
export declare type ChildProps = {
    providers: {
        id: string;
        buttonComponent: JSX.Element;
    }[];
    recipeImplementation: RecipeInterface;
    config: NormalisedConfig;
};
export declare function useChildProps(recipe: Recipe | undefined): ChildProps | undefined;
declare type PropType = FeatureBaseProps & {
    recipe: Recipe;
};
export declare const SignInAndUpFeature: React.FC<PropType>;
export default SignInAndUpFeature;
