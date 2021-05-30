import { RecipeInterface, NormalisedConfig } from "./types";
import { User } from "../authRecipeModule/types";
import { NormalisedAppInfo } from "../../types";
import Querier from "../../querier";
import { validateForm } from "../../utils";

export default class RecipeImplementation implements RecipeInterface {
    querier: Querier;

    constructor(recipeId: string, appInfo: NormalisedAppInfo) {
        this.querier = new Querier(recipeId, appInfo);
    }

    submitNewPassword = async (input: {
        formFields: {
            id: string;
            value: string;
        }[];
        token: string;
        config: NormalisedConfig;
    }): Promise<SubmitNewPasswordAPIResponse> => {
        // first we validate on the frontend
        const validationErrors = await validateForm(
            input.formFields,
            input.config.resetPasswordUsingTokenFeature.submitNewPasswordForm.formFields
        );

        if (validationErrors.length > 0) {
            return {
                status: "FIELD_ERROR",
                formFields: validationErrors,
            };
        }

        // Verify that both passwords match.
        if (input.formFields[0].value !== input.formFields[1].value) {
            return {
                status: "FIELD_ERROR",
                formFields: [
                    {
                        id: input.formFields[1].id,
                        error: "Confirmation password doesn't match",
                    },
                ],
            };
        }

        // then we call API
        const response: SubmitNewPasswordAPIResponse = await this.querier.post(
            "/user/password/reset",
            { body: JSON.stringify({ formFields: [input.formFields[0]], token: input.token, method: "token" }) },
            (context) => {
                return input.config.preAPIHook({
                    ...context,
                    action: "SUBMIT_NEW_PASSWORD",
                });
            }
        );

        if (response.status === "OK") {
            input.config.onHandleEvent({
                action: "PASSWORD_RESET_SUCCESSFUL",
            });
        }

        return response;
    };

    sendPasswordResetEmail = async (input: {
        formFields: {
            id: string;
            value: string;
        }[];
        config: NormalisedConfig;
    }): Promise<SendPasswordResetEmailAPIResponse> => {
        // first we validate on the frontend
        const validationErrors = await validateForm(
            input.formFields,
            input.config.resetPasswordUsingTokenFeature.enterEmailForm.formFields
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
            { body: JSON.stringify({ formFields: input.formFields }) },
            (context) => {
                return input.config.preAPIHook({
                    ...context,
                    action: "SEND_RESET_PASSWORD_EMAIL",
                });
            }
        );

        if (response.status === "OK") {
            input.config.onHandleEvent({
                action: "RESET_PASSWORD_EMAIL_SENT",
            });
        }
        return response;
    };

    signUp = async (input: {
        formFields: {
            id: string;
            value: string;
        }[];
        config: NormalisedConfig;
    }): Promise<SignUpAPIResponse> => {
        // first we validate on the frontend
        const validationErrors = await validateForm(
            input.formFields,
            input.config.signInAndUpFeature.signUpForm.formFields
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
            { body: JSON.stringify({ formFields: input.formFields }) },
            (context) => {
                return input.config.preAPIHook({
                    ...context,
                    action: "SIGN_UP",
                });
            }
        );

        return response;
    };

    signIn = async (input: {
        formFields: {
            id: string;
            value: string;
        }[];
        config: NormalisedConfig;
    }): Promise<SignInAPIResponse> => {
        // first we validate on the frontend
        const validationErrors = await validateForm(
            input.formFields,
            input.config.signInAndUpFeature.signInForm.formFields
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
            { body: JSON.stringify({ formFields: input.formFields }) },
            (context) => {
                return input.config.preAPIHook({
                    ...context,
                    action: "SIGN_IN",
                });
            }
        );
        return response;
    };

    doesEmailExist = async (input: { email: string; config: NormalisedConfig }): Promise<boolean> => {
        const response: EmailExistsAPIResponse = await this.querier.get(
            "/signup/email/exists",
            {},
            { email: input.email },
            (context) => {
                return input.config.preAPIHook({
                    ...context,
                    action: "EMAIL_EXISTS",
                });
            }
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
