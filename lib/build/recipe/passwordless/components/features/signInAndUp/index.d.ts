import * as React from "react";
import Recipe from "../../../recipe";
import { RecipeInterface, PasswordlessSignInUpAction, SignInUpState, PasswordlessUser } from "../../../types";
import { FeatureBaseProps } from "../../../../../types";
declare type PropType = FeatureBaseProps & {
    recipe: Recipe;
};
export declare const useSuccessInAnotherTabChecker: (
    state: SignInUpState,
    dispatch: React.Dispatch<PasswordlessSignInUpAction>
) => React.MutableRefObject<boolean>;
export declare const usePasswordlessSignInAndUpFeatureReducer: (
    recipeImpl: RecipeInterface | undefined
) => [SignInUpState, React.Dispatch<PasswordlessSignInUpAction>];
export declare function usePasswordlessSignInAndUpChildProps(
    recipe: Recipe | undefined,
    dispatch: React.Dispatch<PasswordlessSignInUpAction>,
    state: SignInUpState,
    callingConsumeCodeRef: React.MutableRefObject<boolean>,
    history: any
):
    | {
          onSuccess: (result: { createdUser: boolean; user: PasswordlessUser }) => Promise<void>;
          loaded: boolean;
          loginAttemptInfo: import("../../../types").LoginAttemptInfo | undefined;
          successInAnotherTab: boolean;
          error: string | undefined;
          recipeImplementation: RecipeInterface;
          config: import("../../../types").NormalisedConfig;
      }
    | undefined;
declare const SignInUpFeature: React.FC<PropType>;
export default SignInUpFeature;
