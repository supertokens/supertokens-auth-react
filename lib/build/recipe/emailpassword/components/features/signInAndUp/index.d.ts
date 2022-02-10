import * as React from "react";
import { FormFieldThemeProps, NormalisedConfig } from "../../../types";
import { FeatureBaseProps, NormalisedFormField, Styles } from "../../../../../types";
import { SignInAndUpState, RecipeInterface } from "../../../types";
import Recipe from "../../../recipe";
import { Dispatch } from "react";
export declare type EmailPasswordSignInAndUpAction =
    | {
          type: "setError";
          error: string | undefined;
      }
    | {
          type: "setSignUp";
      }
    | {
          type: "setSignIn";
      };
export declare const useFeatureReducer: (
    recipe: Recipe | undefined
) => [SignInAndUpState, React.Dispatch<EmailPasswordSignInAndUpAction>];
export declare type ChildProps = {
    config: NormalisedConfig;
    signInForm: {
        recipeImplementation: RecipeInterface;
        config: NormalisedConfig;
        styleFromInit: Styles;
        formFields: NormalisedFormField[];
        error: string | undefined;
        clearError: () => void;
        onError: (error: string) => void;
        onSuccess: () => Promise<void>;
        forgotPasswordClick: () => Promise<void>;
    };
    signUpForm: {
        recipeImplementation: RecipeInterface;
        config: NormalisedConfig;
        styleFromInit: Styles;
        formFields: FormFieldThemeProps[];
        error: string | undefined;
        clearError: () => void;
        onError: (error: string) => void;
        onSuccess: () => Promise<void>;
    };
};
export declare function useChildProps(
    recipe: Recipe | undefined,
    state: SignInAndUpState,
    dispatch: Dispatch<EmailPasswordSignInAndUpAction>,
    history: any
): ChildProps | undefined;
declare type PropType = FeatureBaseProps & {
    recipe: Recipe;
};
export declare const SignInAndUpFeature: React.FC<PropType>;
export default SignInAndUpFeature;
