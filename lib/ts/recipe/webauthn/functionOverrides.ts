import type { OnHandleEventContext } from "./types";
import type { RecipeOnHandleEventFunction } from "../recipeModule/types";
import type { RecipeInterface } from "supertokens-web-js/recipe/webauthn";

export const getFunctionOverrides =
    (onHandleEvent: RecipeOnHandleEventFunction<OnHandleEventContext>) =>
    (originalImp: RecipeInterface): RecipeInterface => ({
        ...originalImp,
        getRegisterOptions: async function (input) {
            const response = await originalImp.getRegisterOptions(input);

            if (response.status === "OK") {
                onHandleEvent({
                    action: "REGISTER_OPTIONS",
                });
            }

            return response;
        },
        getSignInOptions: async function (input) {
            const response = await originalImp.getSignInOptions(input);

            if (response.status === "OK") {
                onHandleEvent({
                    action: "SIGN_IN_OPTIONS",
                });
            }

            return response;
        },
        signIn: async function (input) {
            const response = await originalImp.signIn(input);

            if (response.status === "OK") {
                onHandleEvent({
                    action: "SIGN_IN",
                });
            }

            return response;
        },
        signUp: async function (input) {
            const response = await originalImp.signUp(input);

            if (response.status === "OK") {
                onHandleEvent({
                    action: "SIGN_UP",
                });
            }

            return response;
        },
        getEmailExists: async function (input) {
            const response = await originalImp.getEmailExists(input);

            if (response.status === "OK") {
                onHandleEvent({
                    action: "GET_EMAIL_EXISTS",
                    exists: response.exists,
                });
            }

            return response;
        },
        generateRecoverAccountToken: async function (input) {
            const response = await originalImp.generateRecoverAccountToken(input);

            if (response.status === "OK") {
                onHandleEvent({
                    action: "GENERATE_RECOVER_ACCOUNT_TOKEN",
                });
            }

            return response;
        },
        recoverAccount: async function (input) {
            const response = await originalImp.recoverAccount(input);

            if (response.status === "OK") {
                onHandleEvent({
                    action: "RECOVER_ACCOUNT",
                });
            }

            return response;
        },
        registerCredential: async function (input) {
            const response = await originalImp.registerCredential(input);

            if (response.status === "OK") {
                onHandleEvent({
                    action: "REGISTER_CREDENTIAL",
                });
            }

            return response;
        },
        authenticateCredential: async function (input) {
            const response = await originalImp.authenticateCredential(input);

            if (response.status === "OK") {
                onHandleEvent({
                    action: "AUTHENTICATE_CREDENTIAL",
                });
            }

            return response;
        },
        registerCredentialWithSignUp: async function (input) {
            const response = await originalImp.registerCredentialWithSignUp(input);

            if (response.status === "OK") {
                onHandleEvent({
                    action: "REGISTER_CREDENTIAL_WITH_SIGN_UP",
                });
            }

            return response;
        },
        authenticateCredentialWithSignIn: async function (input) {
            const response = await originalImp.authenticateCredentialWithSignIn(input);

            if (response.status === "OK") {
                onHandleEvent({
                    action: "AUTHENTICATE_CREDENTIAL_WITH_SIGN_IN",
                });
            }

            return response;
        },
        registerCredentialWithRecoverAccount: async function (input) {
            const response = await originalImp.registerCredentialWithRecoverAccount(input);

            if (response.status === "OK") {
                onHandleEvent({
                    action: "REGISTER_CREDENTIAL_WITH_RECOVER_ACCOUNT",
                });
            }

            return response;
        },
    });
