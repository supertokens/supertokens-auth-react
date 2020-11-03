import RecipeModule from "../recipeModule";
import { CreateRecipeFunction, RequestJson, APIFormField } from "../../types";
import { EmailPasswordConfig, EmailPasswordUserInput, FormFieldError, NormalisedEmailPasswordConfig, SignInThemeResponse, SubmitNewPasswordThemeResponse } from "./types";
export default class EmailPassword extends RecipeModule {
    static instance?: EmailPassword;
    private config;
    private httpRequest;
    constructor(config: EmailPasswordConfig);
    getConfig: () => NormalisedEmailPasswordConfig;
    getFeatures: () => Record<string, import("../../types").ReactComponentClass>;
    signUpAPI: (requestJson: RequestJson, headers: HeadersInit) => Promise<import("./types").BaseResponse>;
    signInAPI: (requestJson: RequestJson, headers: HeadersInit) => Promise<SignInThemeResponse>;
    submitNewPasswordAPI: (requestJson: RequestJson, headers: HeadersInit) => Promise<SubmitNewPasswordThemeResponse>;
    enterEmailAPI: (requestJson: RequestJson, headers: HeadersInit) => Promise<import("./types").BaseResponse>;
    signUpValidate(input: APIFormField[]): Promise<FormFieldError[]>;
    signInValidate(input: APIFormField[]): Promise<FormFieldError[]>;
    submitNewPasswordValidate(input: APIFormField[]): Promise<FormFieldError[]>;
    enterEmailValidate(input: APIFormField[]): Promise<FormFieldError[]>;
    static init(config?: EmailPasswordUserInput): CreateRecipeFunction;
    static getInstanceOrThrow(): EmailPassword;
    static reset(): void;
}
