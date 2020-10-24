import RecipeModule from "../recipeModule";
import { EmailPasswordConfig } from "./types";
import SignInAndUp from "./SignInAndUp";
import SignInAndUpTheme from "./SignInAndUpTheme";
export default class EmailPassword extends RecipeModule {
    static instance?: EmailPassword;
    constructor(config: EmailPasswordConfig);
    static init(config: EmailPasswordConfig): () => RecipeModule;
    static getInstanceIfDefined(): EmailPassword;
}
export { SignInAndUp, SignInAndUpTheme };
