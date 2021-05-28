import { RecipeInterface, FunctionOptions } from "./types";
import { User } from "../authRecipeModule/types";
import { NormalisedAppInfo } from "../../types";
import Querier from "../../querier";
import { validateForm } from "../../utils";

export default class RecipeImplementation implements RecipeInterface {
    querier: Querier;

    constructor(recipeId: string, appInfo: NormalisedAppInfo) {
        this.querier = new Querier(recipeId, appInfo);
    }

    submitNewPassword = async (
        formFields: {
            id: string;
            value: string;
        }[],
        token: string,
        options: FunctionOptions
    ): Promise<SubmitNewPasswordAPIResponse> => {
        // first we validate on the frontend
        const validationErrors = await validateForm(
            formFields,
            options.config.resetPasswordUsingTokenFeature.submitNewPasswordForm.formFields
        );

        if (validationErrors.length > 0) {
            return {
                status: "FIELD_ERROR",
                formFields: validationErrors,
            };
        }

        // Verify that both passwords match.
        if (formFields[0].value !== formFields[1].value) {
            return {
                status: "FIELD_ERROR",
                formFields: [
                    {
                        id: formFields[1].id,
                        error: "Confirmation password doesn't match",
                    },
                ],
            };
        }

        // then we call API
        const response: SubmitNewPasswordAPIResponse = await this.querier.post(
            "/user/password/reset",
            { body: JSON.stringify({ formFields: [formFields[0]], token, method: "token" }) },
            options.preAPIHook
        );

        return response;
    };

    sendPasswordResetEmail = async (
        formFields: {
            id: string;
            value: string;
        }[],
        options: FunctionOptions
    ): Promise<SendPasswordResetEmailAPIResponse> => {
        // first we validate on the frontend
        const validationErrors = await validateForm(
            formFields,
            options.config.resetPasswordUsingTokenFeature.enterEmailForm.formFields
        );

        if (validationErrors.length > 0) {
            return {
                status: "FIELD_ERROR",
                formFields: validationErrors,
            };
        }

        // then we call API
        const response: SendPasswordResetEmailAPIResponse = await this.querier.post(
            "/user/password/reset/token",
            { body: JSON.stringify({ formFields }) },
            options.preAPIHook
        );
        return response;
    };

    signUp = async (
        formFields: {
            id: string;
            value: string;
        }[],
        options: FunctionOptions
    ): Promise<SignUpAPIResponse> => {
        // first we validate on the frontend
        const validationErrors = await validateForm(
            formFields,
            options.config.signInAndUpFeature.signUpForm.formFields
        );

        if (validationErrors.length > 0) {
            return {
                status: "FIELD_ERROR",
                formFields: validationErrors,
            };
        }

        // then we call API
        const response: SignUpAPIResponse = await this.querier.post(
            "/signup",
            { body: JSON.stringify({ formFields }) },
            options.preAPIHook
        );

        return response;
    };

    signIn = async (
        formFields: {
            id: string;
            value: string;
        }[],
        options: FunctionOptions
    ): Promise<SignInAPIResponse> => {
        // first we validate on the frontend
        const validationErrors = await validateForm(
            formFields,
            options.config.signInAndUpFeature.signInForm.formFields
        );

        if (validationErrors.length > 0) {
            return {
                status: "FIELD_ERROR",
                formFields: validationErrors,
            };
        }

        // then we call API
        const response: SignInAPIResponse = await this.querier.post(
            "/signin",
            { body: JSON.stringify({ formFields }) },
            options.preAPIHook
        );
        return response;
    };

    doesEmailExist = async (email: string, options: FunctionOptions): Promise<boolean> => {
        const response: EmailExistsAPIResponse = await this.querier.get(
            "/signup/email/exists",
            {},
            { email },
            options.preAPIHook
        );

        return response.exists;
    };
}

type SubmitNewPasswordAPIResponse =
    | {
          status: "OK" | "RESET_PASSWORD_INVALID_TOKEN_ERROR";
      }
    | {
          status: "FIELD_ERROR";
          formFields: {
              id: string;
              error: string;
          }[];
      };

type SendPasswordResetEmailAPIResponse =
    | {
          status: "OK";
      }
    | {
          status: "FIELD_ERROR";
          formFields: {
              id: string;
              error: string;
          }[];
      };

type SignUpAPIResponse =
    | {
          status: "OK";
          user: User;
      }
    | {
          status: "FIELD_ERROR";
          formFields: {
              id: string;
              error: string;
          }[];
      };

type SignInAPIResponse =
    | {
          status: "OK";
          user: User;
      }
    | {
          status: "FIELD_ERROR";
          formFields: {
              id: string;
              error: string;
          }[];
      }
    | {
          status: "WRONG_CREDENTIALS_ERROR";
      };

type EmailExistsAPIResponse = {
    status: "OK";
    exists: boolean;
};
