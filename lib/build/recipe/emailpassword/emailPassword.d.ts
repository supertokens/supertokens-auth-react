import RecipeModule from "../recipeModule";
import { CreateRecipeFunction, RouteToFeatureComponentMap, RequestJson, APIFormField } from "../../types";
import { EmailPasswordConfig, EmailPasswordUserInput, FormFieldError, NormalisedEmailPasswordConfig } from "./types";
export default class EmailPassword extends RecipeModule {
    static instance?: EmailPassword;
    private config;
    private httpRequest;
    constructor(config: EmailPasswordConfig);
    getConfig: () => NormalisedEmailPasswordConfig;
    getFeatures: () => RouteToFeatureComponentMap;
    signUpApi: (requestJson: RequestJson, headers: HeadersInit) => Promise<Response>;
    signInApi: (requestJson: RequestJson, headers: HeadersInit) => Promise<Response>;
    submitNewPasswordAPI: (requestJson: RequestJson, headers: HeadersInit) => Promise<Response>;
    enterEmailAPI: (requestJson: RequestJson, headers: HeadersInit) => Promise<Response>;
    signUpValidate(input: APIFormField[]): Promise<FormFieldError[]>;
    signInValidate(input: APIFormField[]): Promise<FormFieldError[]>;
    submitNewPasswordValidate(input: APIFormField[]): Promise<FormFieldError[]>;
    enterEmailValidate(input: APIFormField[]): Promise<FormFieldError[]>;
    static init(config?: EmailPasswordUserInput): CreateRecipeFunction;
    static getInstanceOrThrow(): EmailPassword;
    static reset(): void;
}
