import RecipeModule from "../recipeModule";
import { EmailPasswordConfig } from "./types";
import SignInAndUp from "./SignInAndUp";
import SignInAndUpTheme from "./SignInAndUpTheme";
import { CreateRecipeFunction } from "../../types";
export default class EmailPassword extends RecipeModule {
    static instance?: EmailPassword;
    constructor(config: EmailPasswordConfig);
    static init(config: EmailPasswordConfig): CreateRecipeFunction;
    static getInstanceIfDefined(): EmailPassword;
}
export { SignInAndUp, SignInAndUpTheme };
