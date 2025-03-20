import type { OnHandleEventContext } from "./types";
import type { RecipeOnHandleEventFunction } from "../recipeModule/types";
import type { RecipeInterface } from "supertokens-web-js/recipe/webauthn";

export const getFunctionOverrides =
    (onHandleEvent: RecipeOnHandleEventFunction<OnHandleEventContext>) =>
    (originalImp: RecipeInterface): RecipeInterface => ({
        ...originalImp,
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
        registerCredential: async function (input) {
            const response = await originalImp.registerCredential(input);

            if (response.status === "OK") {
                onHandleEvent({
                    action: "REGISTER_CREDENTIAL_OK",
                });
            }

            return response;
        },
        authenticateCredential: async function (input) {
            const response = await originalImp.authenticateCredential(input);

            if (response.status === "OK") {
                onHandleEvent({
                    action: "AUTHENTICATE_CREDENTIAL_OK",
                });
            }

            return response;
        },
        registerCredentialWithSignUp: async function (input) {
            const response = await originalImp.registerCredentialWithSignUp(input);

            if (response.status === "FAILED_TO_REGISTER_USER") {
                onHandleEvent({
                    action: "FAILED_TO_REGISTER_USER",
                });
            }

            return response;
        },
    });
