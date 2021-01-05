import RecipeModule from "../recipeModule";
import { CreateRecipeFunction, RequestJson, APIFormField } from "../../types";
import { EmailPasswordConfig, EmailPasswordUserInput, FormFieldError, NormalisedEmailPasswordConfig, SignInAPIResponse, SignOutAPIResponse, SubmitNewPasswordAPIResponse, EmailExistsAPIResponse } from "./types";
import { API_RESPONSE_STATUS } from "./constants";
export default class EmailPassword extends RecipeModule {
    static instance?: EmailPassword;
    static RECIPE_ID: string;
    private config;
    private httpRequest;
    constructor(config: EmailPasswordConfig);
    getConfig: () => NormalisedEmailPasswordConfig;
    getFeatures: () => Record<string, import("../../types").ReactComponentClass>;
    signUpAPI: (requestJson: RequestJson, headers: HeadersInit) => Promise<import("./types").BaseSignInUpAPIResponse>;
    emailExistsAPI: (value: string, headers: HeadersInit) => Promise<EmailExistsAPIResponse>;
    signInAPI: (requestJson: RequestJson, headers: HeadersInit) => Promise<SignInAPIResponse>;
    submitNewPasswordAPI: (requestJson: RequestJson, headers: HeadersInit) => Promise<SubmitNewPasswordAPIResponse>;
    enterEmailAPI: (requestJson: RequestJson, headers: HeadersInit) => Promise<import("./types").BaseResetPasswordAPIResponse>;
    signOut: () => Promise<{
        status: API_RESPONSE_STATUS.OK;
    }>;
    signUpValidate(input: APIFormField[]): Promise<FormFieldError[]>;
    signInValidate(input: APIFormField[]): Promise<FormFieldError[]>;
    submitNewPasswordValidate(input: APIFormField[]): Promise<FormFieldError[]>;
    enterEmailValidate(input: APIFormField[]): Promise<FormFieldError[]>;
    static init(config?: EmailPasswordUserInput): CreateRecipeFunction;
    static signOut(): Promise<SignOutAPIResponse>;
    static getInstanceOrThrow(): EmailPassword;
    static reset(): void;
}
