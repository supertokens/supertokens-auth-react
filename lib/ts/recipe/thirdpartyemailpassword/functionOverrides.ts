import { StateObject } from "supertokens-web-js/recipe/thirdparty";
import { RecipeInterface, ThirdPartyUserType } from "supertokens-web-js/recipe/thirdpartyemailpassword";
import { getRedirectToPathFromURL } from "../../utils";
import { RecipeOnHandleEventFunction } from "../recipeModule/types";
import { OnHandleEventContext } from "./types";

export const getFunctionOverrides =
    (recipeId: string, onHandleEvent?: RecipeOnHandleEventFunction<OnHandleEventContext>) =>
    (originalImp: RecipeInterface): RecipeInterface => {
        return {
            getAuthorisationURLFromBackend: async function (input): Promise<{
                status: "OK";
                url: string;
                fetchResponse: Response;
            }> {
                const response = await originalImp.getAuthorisationURLFromBackend(input);

                return response;
            },
            getStateAndOtherInfoFromStorage: function <CustomStateProperties>(input: {
                userContext: any;
            }): (StateObject & CustomStateProperties) | undefined {
                return originalImp.getStateAndOtherInfoFromStorage<CustomStateProperties>({
                    userContext: input.userContext,
                });
            },

            thirdPartySignInAndUp: async function (input): Promise<
                | {
                      status: "OK";
                      user: ThirdPartyUserType;
                      createdNewUser: boolean;
                      fetchResponse: Response;
                  }
                | {
                      status: "NO_EMAIL_GIVEN_BY_PROVIDER";
                      fetchResponse: Response;
                  }
            > {
                const response = await originalImp.thirdPartySignInAndUp(input);

                if (response.status === "OK") {
                    onHandleEvent?.({
                        action: "SUCCESS",
                        isNewUser: response.createdNewUser,
                        user: response.user,
                        userContext: input.userContext,
                    });
                }

                return response;
            },
            setStateAndOtherInfoToStorage: function (input): Promise<void> {
                return originalImp.setStateAndOtherInfoToStorage<{
                    rid?: string;
                    redirectToPath?: string;
                }>({
                    state: {
                        ...input.state,
                        rid: recipeId,
                        redirectToPath: getRedirectToPathFromURL(),
                    },
                    userContext: input.userContext,
                });
            },

            getAuthorisationURLWithQueryParamsAndSetState: async function (input) {
                return originalImp.getAuthorisationURLWithQueryParamsAndSetState(input);
            },

            getAuthStateFromURL: function (input): string {
                return originalImp.getAuthStateFromURL(input);
            },

            generateStateToSendToOAuthProvider: function (input) {
                return originalImp.generateStateToSendToOAuthProvider({
                    ...input,
                });
            },
            verifyAndGetStateOrThrowError: function (input) {
                return originalImp.verifyAndGetStateOrThrowError({
                    stateFromAuthProvider: input.stateFromAuthProvider,
                    stateObjectFromStorage: input.stateObjectFromStorage,
                    userContext: input.userContext,
                });
            },

            getAuthCodeFromURL: function (input): string {
                return originalImp.getAuthCodeFromURL({
                    userContext: input.userContext,
                });
            },

            getAuthErrorFromURL: function (input): string | undefined {
                return originalImp.getAuthErrorFromURL({
                    userContext: input.userContext,
                });
            },
            submitNewPassword: async function (input: any) {
                const response = await originalImp.submitNewPassword({
                    ...input,
                    formFields: [input.formFields[0]],
                });

                if (response.status === "OK") {
                    onHandleEvent?.({
                        action: "PASSWORD_RESET_SUCCESSFUL",
                        userContext: input.userContext,
                    });
                }

                return response;
            },

            sendPasswordResetEmail: async function (input: any) {
                const response = await originalImp.sendPasswordResetEmail(input);

                if (response.status === "OK") {
                    onHandleEvent?.({
                        action: "RESET_PASSWORD_EMAIL_SENT",
                        userContext: input.userContext,
                    });
                }
                return response;
            },

            emailPasswordSignUp: async function (input: any) {
                const response = await originalImp.emailPasswordSignUp(input);

                if (response.status === "OK") {
                    onHandleEvent?.({
                        action: "SUCCESS",
                        isNewUser: true,
                        user: response.user,
                        userContext: input.userContext,
                    });
                }

                return response;
            },
            emailPasswordSignIn: async function (input: any) {
                const response = await originalImp.emailPasswordSignIn(input);

                if (response.status === "OK") {
                    onHandleEvent?.({
                        action: "SUCCESS",
                        isNewUser: false,
                        user: response.user,
                        userContext: input.userContext,
                    });
                }
                return response;
            },
            doesEmailExist: async function (input: any) {
                return await originalImp.doesEmailExist(input);
            },

            getResetPasswordTokenFromURL: function (input: any): string {
                return originalImp.getResetPasswordTokenFromURL({
                    userContext: input.userContext,
                });
            },
        };
    };
