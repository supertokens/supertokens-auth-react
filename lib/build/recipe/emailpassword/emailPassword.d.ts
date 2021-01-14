import RecipeModule from "../recipeModule";
import { CreateRecipeFunction, RequestJson, APIFormField } from "../../types";
import { EmailPasswordConfig, EmailPasswordUserInput, FormFieldError, NormalisedEmailPasswordConfig, SignInAPIResponse, SignOutAPIResponse, SubmitNewPasswordAPIResponse, EmailExistsAPIResponse, VerifyEmailAPIResponse, IsEmailVerifiedAPIResponse, PreAPIHookContext, GetRedirectionURLContext, OnHandleEventContext } from "./types";
import { API_RESPONSE_STATUS } from "./constants";
import { History } from "history";
import Session from "../session/session";
export default class EmailPassword extends RecipeModule {
    static instance?: EmailPassword;
    static RECIPE_ID: string;
    private config;
    private httpRequest;
    constructor(config: EmailPasswordConfig);
    getConfig: () => NormalisedEmailPasswordConfig;
    getFeatures: () => Record<string, import("../../types").ReactComponentClass>;
    preAPIHook: (context: PreAPIHookContext) => Promise<RequestInit>;
    redirect: (context: GetRedirectionURLContext, shouldReload?: boolean, title?: string | undefined, history?: History<unknown> | undefined) => Promise<void>;
    getRedirectionURL: (context: GetRedirectionURLContext) => Promise<string>;
    onHandleEvent(context: OnHandleEventContext): void;
    getSessionRecipe(): Session | undefined;
    doesSessionExist: () => boolean;
    signUpAPI: (requestJson: RequestJson, headers: HeadersInit) => Promise<import("./types").BaseSignInUpAPIResponse>;
    emailExistsAPI: (value: string, headers: HeadersInit) => Promise<EmailExistsAPIResponse>;
    signInAPI: (requestJson: RequestJson, headers: HeadersInit) => Promise<SignInAPIResponse>;
    submitNewPasswordAPI: (requestJson: RequestJson, headers: HeadersInit) => Promise<SubmitNewPasswordAPIResponse>;
    enterEmailAPI: (requestJson: RequestJson, headers: HeadersInit) => Promise<import("./types").BaseResetPasswordAPIResponse>;
    signOut: () => Promise<{
        status: API_RESPONSE_STATUS.OK;
    }>;
    sendVerificationEmailAPI: (headers: HeadersInit) => Promise<{
        status: API_RESPONSE_STATUS.OK;
    }>;
    verifyEmailAPI: (requestJson: RequestJson, headers: HeadersInit) => Promise<VerifyEmailAPIResponse>;
    isEmailVerifiedAPI: (headers: HeadersInit) => Promise<IsEmailVerifiedAPIResponse>;
    isEmailVerified(): Promise<boolean>;
    signUpValidate(input: APIFormField[]): Promise<FormFieldError[]>;
    signInValidate(input: APIFormField[]): Promise<FormFieldError[]>;
    submitNewPasswordValidate(input: APIFormField[]): Promise<FormFieldError[]>;
    enterEmailValidate(input: APIFormField[]): Promise<FormFieldError[]>;
    static init(config?: EmailPasswordUserInput): CreateRecipeFunction;
    static signOut(): Promise<SignOutAPIResponse>;
    static isEmailVerified(): Promise<boolean>;
    static getInstanceOrThrow(): EmailPassword;
    static reset(): void;
}
