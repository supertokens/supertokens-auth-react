import * as React from "react";
import { RecipeModuleProps } from '../../types';
declare class SignInUp extends React.Component<RecipeModuleProps> {
    getRecipeInstanceOrThrow: () => import("../recipeModule").default;
    render(): JSX.Element;
}
export default SignInUp;
