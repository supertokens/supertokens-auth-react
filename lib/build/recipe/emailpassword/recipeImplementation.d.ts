import { RecipeInterface, NormalisedConfig } from "./types";
import { User } from "../authRecipeModule/types";
import { PreAPIHookFunction } from "../../types";
import Querier from "../../querier";
export default class RecipeImplementation implements RecipeInterface {
    querier: Querier;
    config: NormalisedConfig;
    constructor(config: NormalisedConfig);
    submitNewPassword: (formFields: {
        id: string;
        value: string;
    }[], token: string, preAPIHook?: PreAPIHookFunction | undefined) => Promise<SubmitNewPasswordAPIResponse>;
    sendPasswordResetEmail: (formFields: {
        id: string;
        value: string;
    }[], preAPIHook?: PreAPIHookFunction | undefined) => Promise<SendPasswordResetEmailAPIResponse>;
    signUp: (formFields: {
        id: string;
        value: string;
    }[], preAPIHook?: PreAPIHookFunction | undefined) => Promise<SignUpAPIResponse>;
    signIn: (formFields: {
        id: string;
        value: string;
    }[], preAPIHook?: PreAPIHookFunction | undefined) => Promise<SignInAPIResponse>;
    doesEmailExist: (email: string, preAPIHook?: PreAPIHookFunction | undefined) => Promise<boolean>;
}
declare type SubmitNewPasswordAPIResponse = {
    status: "OK" | "RESET_PASSWORD_INVALID_TOKEN_ERROR";
} | {
    status: "FIELD_ERROR";
    formFields: {
        id: string;
        error: string;
    }[];
};
declare type SendPasswordResetEmailAPIResponse = {
    status: "OK";
} | {
    status: "FIELD_ERROR";
    formFields: {
        id: string;
        error: string;
    }[];
};
declare type SignUpAPIResponse = {
    status: "OK";
    user: User;
} | {
    status: "FIELD_ERROR";
    formFields: {
        id: string;
        error: string;
    }[];
};
declare type SignInAPIResponse = {
    status: "OK";
    user: User;
} | {
    status: "FIELD_ERROR";
    formFields: {
        id: string;
        error: string;
    }[];
} | {
    status: "WRONG_CREDENTIALS_ERROR";
};
export {};
