import RecipeModule from "../recipeModule";
import { CreateRecipeFunction, RouteToFeatureComponentMap, RequestJson, APIFormField } from "../../types";
import { EmailPasswordConfig, EmailPasswordUserInput, FormFieldError, NormalisedEmailPasswordConfig } from "./types";
export default class EmailPassword extends RecipeModule {
    static instance?: EmailPassword;
    private config;
    private httpRequest;
    constructor(config: EmailPasswordConfig);
    getConfig: () => NormalisedEmailPasswordConfig;
    signUpApi: (requestJson: RequestJson, headers: HeadersInit) => Promise<Response>;
    signInApi: (requestJson: RequestJson, headers: HeadersInit) => Promise<Response>;
    signUpValidate(input: APIFormField[]): Promise<FormFieldError[]>;
    signInValidate(input: APIFormField[]): Promise<FormFieldError[]>;
    getFeatures: () => RouteToFeatureComponentMap;
    static init(config?: EmailPasswordUserInput): CreateRecipeFunction;
    static getInstanceOrThrow(): EmailPassword;
    static reset(): void;
}
