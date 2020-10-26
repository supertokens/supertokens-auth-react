import RecipeModule from "../recipeModule";
import { CreateRecipeFunction, RouteToFeatureComponentMap, RequestJson } from "../../types";
import { EmailPasswordConfig, SignInAndUpConfig, EmailPasswordUserInput } from "./types";
import SignInFeature from "./signInFeature";
import SignUpFeature from "./signUpFeature";
export default class EmailPassword extends RecipeModule {
    static instance?: EmailPassword;
    private signInFeature;
    private signUpFeature;
    private onSuccessRedirectURL;
    private httpRequest;
    constructor(config: EmailPasswordConfig, features?: RouteToFeatureComponentMap);
    getSignInFeature: () => SignInFeature;
    getSignUpFeature: () => SignUpFeature;
    getOnSuccessRedirectURL: () => string;
    signUpApi: (requestJson: RequestJson, headers: HeadersInit) => Promise<Response>;
    signInApi: (requestJson: RequestJson, headers: HeadersInit) => Promise<Response>;
    static init(config?: EmailPasswordUserInput): CreateRecipeFunction;
    static getInstanceOrThrow(): EmailPassword;
    static getSignInAndUpConfig(config: EmailPasswordUserInput): SignInAndUpConfig | undefined;
    static hasDisabledSignInAndUpDefaultImplementation(signInAndUpConfig?: SignInAndUpConfig): boolean;
    static reset(): void;
}
