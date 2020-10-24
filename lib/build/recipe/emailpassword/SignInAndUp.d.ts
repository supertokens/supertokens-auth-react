import * as React from "react";
import { RecipeModuleProps } from '../../types';
declare class SignInAndUp extends React.Component<RecipeModuleProps> {
    getRecipeInstanceOrThrow: () => import("../recipeModule").default;
    render(): JSX.Element;
}
export default SignInAndUp;
