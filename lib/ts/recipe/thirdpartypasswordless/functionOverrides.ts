import { RecipeInterface, StateObject, ThirdPartyUserType } from "supertokens-web-js/recipe/thirdpartypasswordless";
import { getRedirectToPathFromURL } from "../../utils";
import { RecipeOnHandleEventFunction } from "../recipeModule/types";
import { OnHandleEventContext } from "./types";

export const getFunctionOverrides =
    (recipeId: string, onHandleEvent?: RecipeOnHandleEventFunction<OnHandleEventContext>) =>
    (originalImp: RecipeInterface): RecipeInterface => {
        return {
            createPasswordlessCode: async function (input) {
                const response = await originalImp.createPasswordlessCode(input);

                if (response.status === "OK") {
                    onHandleEvent?.({
                        action: "PASSWORDLESS_CODE_SENT",
                        isResend: false,
                    });
                }

                return response;
            },
            resendPasswordlessCode: async function (input) {
                const response = await originalImp.resendPasswordlessCode(input);

                if (response.status === "RESTART_FLOW_ERROR") {
                    onHandleEvent?.({
                        action: "PASSWORDLESS_RESTART_FLOW",
                    });
                } else if (response.status === "OK") {
                    onHandleEvent?.({
                        action: "PASSWORDLESS_CODE_SENT",
                        isResend: true,
                    });
                }
                return response;
            },
            consumePasswordlessCode: async function (input) {
                const response = await originalImp.consumePasswordlessCode(input);

                if (response.status === "RESTART_FLOW_ERROR") {
                    onHandleEvent?.({
                        action: "PASSWORDLESS_RESTART_FLOW",
                    });
                } else if (response.status === "OK") {
                    onHandleEvent?.({
                        action: "SUCCESS",
                        isNewUser: response.createdNewUser,
                        user: response.user,
                    });
                }
                return response;
            },
            getPasswordlessLinkCodeFromURL: function (input) {
                return originalImp.getPasswordlessLinkCodeFromURL(input);
            },
            getPasswordlessPreAuthSessionIdFromURL: function (input) {
                return originalImp.getPasswordlessPreAuthSessionIdFromURL(input);
            },
            doesPasswordlessUserEmailExist: async function (input) {
                return await originalImp.doesPasswordlessUserEmailExist(input);
            },
            doesPasswordlessUserPhoneNumberExist: async function (input) {
                return await originalImp.doesPasswordlessUserPhoneNumberExist(input);
            },
            getPasswordlessLoginAttemptInfo: function <CustomAttemptInfoProperties>(input: { userContext: any }) {
                return originalImp.getPasswordlessLoginAttemptInfo<CustomAttemptInfoProperties>(input);
            },
            setPasswordlessLoginAttemptInfo: async function (input) {
                return originalImp.setPasswordlessLoginAttemptInfo({
                    ...input,
                    attemptInfo: {
                        ...input.attemptInfo,
                        ...input.userContext.additionalAttemptInfo,
                    },
                });
            },
            clearPasswordlessLoginAttemptInfo: function (input) {
                return originalImp.clearPasswordlessLoginAttemptInfo(input);
            },
            getAuthorisationURLFromBackend: async function (input): Promise<{
                status: "OK";
                url: string;
                fetchResponse: Response;
            }> {
                const response = await originalImp.getAuthorisationURLFromBackend(input);

                return response;
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
            getThirdPartyStateAndOtherInfoFromStorage: function <CustomStateProperties>(input: {
                userContext: any;
            }): (StateObject & CustomStateProperties) | undefined {
                return originalImp.getThirdPartyStateAndOtherInfoFromStorage<CustomStateProperties>({
                    userContext: input.userContext,
                });
            },

            setThirdPartyStateAndOtherInfoToStorage: function (input): Promise<void> {
                return originalImp.setThirdPartyStateAndOtherInfoToStorage<{
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

            getThirdPartyAuthorisationURLWithQueryParamsAndSetState: async function (input) {
                return originalImp.getThirdPartyAuthorisationURLWithQueryParamsAndSetState(input);
            },

            getThirdPartyAuthStateFromURL: function (input): string {
                return originalImp.getThirdPartyAuthStateFromURL(input);
            },

            generateThirdPartyStateToSendToOAuthProvider: function (input) {
                return originalImp.generateThirdPartyStateToSendToOAuthProvider({
                    ...input,
                });
            },
            verifyAndGetThirdPartyStateOrThrowError: function (input) {
                return originalImp.verifyAndGetThirdPartyStateOrThrowError({
                    stateFromAuthProvider: input.stateFromAuthProvider,
                    stateObjectFromStorage: input.stateObjectFromStorage,
                    userContext: input.userContext,
                });
            },

            getThirdPartyAuthCodeFromURL: function (input): string {
                return originalImp.getThirdPartyAuthCodeFromURL({
                    userContext: input.userContext,
                });
            },

            getThirdPartyAuthErrorFromURL: function (input): string | undefined {
                return originalImp.getThirdPartyAuthErrorFromURL({
                    userContext: input.userContext,
                });
            },
        };
    };
