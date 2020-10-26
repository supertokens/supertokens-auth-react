import RecipeModule from "../recipeModule";
import { CreateRecipeFunction, RouteToFeatureComponentMap } from "../../types";
import { EmailPasswordConfig, SignInAndUpConfig, EmailPasswordUserInput } from "./types";
import SignInFeature from "./signInFeature";
import SignUpFeature from "./signUpFeature";
export default class EmailPassword extends RecipeModule {
    static instance?: EmailPassword;
    private signInFeature;
    private signUpFeature;
    private onSuccessRedirectURL;
    constructor(config: EmailPasswordConfig, features?: RouteToFeatureComponentMap);
    getSignInFeature: () => SignInFeature;
    getSignUpFeature: () => SignUpFeature;
    getOnSuccessRedirectURL: () => string;
    static init(config?: EmailPasswordUserInput): CreateRecipeFunction;
    static getInstanceOrThrow(): EmailPassword;
    static getSignInAndUpConfig(config: EmailPasswordUserInput): SignInAndUpConfig | undefined;
    static hasDisabledSignInAndUpDefaultImplementation(signInAndUpConfig?: SignInAndUpConfig): boolean;
    static reset(): void;
}
