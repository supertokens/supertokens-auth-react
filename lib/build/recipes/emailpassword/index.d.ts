import RecipeModule from "../recipeModule";
import { EmailPasswordConfig } from "../../types";
import SignInUp from "./SignInUp";
export default class EmailPassword extends RecipeModule {
    static instance?: EmailPassword;
    constructor(config: EmailPasswordConfig);
    static init(config: EmailPasswordConfig): RecipeModule;
    static getInstanceIfDefined(): EmailPassword;
}
export { SignInUp };
