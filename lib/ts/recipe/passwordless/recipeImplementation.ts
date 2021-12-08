import { RecipeInterface, NormalisedConfig } from "./types";
import { NormalisedAppInfo } from "../../types";
import Querier from "../../querier";
import { PASSWORDLESS_LOGIN_ATTEMPT_INFO_STORAGE_KEY } from "./constants";
import { getLocalStorage, removeFromLocalStorage, setLocalStorage } from "../../utils";

type FlowType = "USER_INPUT_CODE" | "MAGIC_LINK" | "USER_INPUT_CODE_AND_MAGIC_LINK";

type CreateCodeApiResponse =
    | {
          status: "OK";
          deviceId: string;
          preAuthSessionId: string;
          flowType: FlowType;
      }
    | {
          status: "GENERAL_ERROR";
          message: string;
      };

type ResendCodeApiResponse = {
    status: "OK" | "RESTART_FLOW_ERROR";
};

type ConsumeCodeApiResponse =
    | {
          status: "OK";
          createdUser: boolean;
          user: {
              id: string;
              email?: string;
              phoneNumber?: string;
              timeJoined: number;
          };
      }
    | {
          status: "INCORRECT_USER_INPUT_CODE_ERROR" | "EXPIRED_USER_INPUT_CODE_ERROR";
          failedCodeInputAttemptCount: number;
          maximumCodeInputAttempts: number;
      }
    | { status: "GENERAL_ERROR"; message: string }
    | { status: "RESTART_FLOW_ERROR" };

type ExistsAPIResponse = {
    status: "OK";
    exists: boolean;
};

export default function getRecipeImplementation(recipeId: string, appInfo: NormalisedAppInfo): RecipeInterface {
    const querier = new Querier(recipeId, appInfo);

    return {
        createCode: async function (
            input: ({ email: string } | { phoneNumber: string } | { deviceId: string; preAuthSessionId: string }) & {
                config: NormalisedConfig;
            }
        ): Promise<CreateCodeApiResponse> {
            let bodyObj;
            if ("email" in input) {
                const validationRes = await input.config.validateEmailAddress(input.email);
                if (validationRes !== undefined) {
                    return {
                        status: "GENERAL_ERROR",
                        message: validationRes,
                    };
                }
                bodyObj = {
                    email: input.email,
                };
            }
            if ("phoneNumber" in input) {
                const validationRes = await input.config.validatePhoneNumber(input.phoneNumber);
                if (validationRes !== undefined) {
                    return {
                        status: "GENERAL_ERROR",
                        message: validationRes,
                    };
                }
                bodyObj = {
                    phoneNumber: input.phoneNumber,
                };
            }

            const response: CreateCodeApiResponse = await querier.post(
                "/signinup/code",
                { body: JSON.stringify(bodyObj) },
                (context) => {
                    return input.config.preAPIHook({
                        ...context,
                        action: "PASSWORDLESS_CREATE_CODE",
                    });
                }
            );

            if (response.status === "OK") {
                input.config.onHandleEvent({
                    action: "PASSWORDLESS_CODE_SENT",
                    isResend: false,
                });
            }

            return response;
        },
        resendCode: async function (
            input: { deviceId: string; preAuthSessionId: string } & {
                config: NormalisedConfig;
            }
        ): Promise<ResendCodeApiResponse> {
            const bodyObj = {
                deviceId: input.deviceId,
                preAuthSessionId: input.preAuthSessionId,
            };

            const response: ResendCodeApiResponse = await querier.post(
                "/signinup/code/resend",
                { body: JSON.stringify(bodyObj) },
                (context) => {
                    return input.config.preAPIHook({
                        ...context,
                        action: "PASSWORDLESS_RESEND_CODE",
                    });
                }
            );

            if (response.status === "RESTART_FLOW_ERROR") {
                input.config.onHandleEvent({
                    action: "PASSWORDLESS_RESTART_FLOW",
                });
            } else if (response.status === "OK") {
                input.config.onHandleEvent({
                    action: "PASSWORDLESS_CODE_SENT",
                    isResend: true,
                });
            }
            return response;
        },
        consumeCode: async function (
            input: (
                | {
                      userInputCode: string;
                      deviceId: string;
                      preAuthSessionId: string;
                  }
                | {
                      preAuthSessionId: string;
                      linkCode: string;
                  }
            ) & {
                config: NormalisedConfig;
            }
        ): Promise<ConsumeCodeApiResponse> {
            let bodyObj;
            if ("userInputCode" in input) {
                // TODO: validate input code?
                bodyObj = {
                    userInputCode: input.userInputCode,
                    deviceId: input.deviceId,
                    preAuthSessionId: input.preAuthSessionId,
                };
            }
            if ("linkCode" in input) {
                bodyObj = {
                    linkCode: input.linkCode,
                    preAuthSessionId: input.preAuthSessionId,
                };
            }

            const response: ConsumeCodeApiResponse = await querier.post(
                "/signinup/code/consume",
                { body: JSON.stringify(bodyObj) },
                (context) => {
                    return input.config.preAPIHook({
                        ...context,
                        action: "PASSWORDLESS_CONSUME_CODE",
                    });
                }
            );

            if (response.status === "RESTART_FLOW_ERROR") {
                input.config.onHandleEvent({
                    action: "PASSWORDLESS_RESTART_FLOW",
                });
            } else if (response.status === "OK") {
                input.config.onHandleEvent({
                    action: "SUCCESS",
                    isNewUser: response.createdUser,
                    user: response.user,
                });
            }
            return response;
        },
        doesEmailExist: async function (input: { email: string; config: NormalisedConfig }): Promise<boolean> {
            const response: ExistsAPIResponse = await querier.get(
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
        },

        doesPhoneNumberExist: async function (input: {
            phoneNumber: string;
            config: NormalisedConfig;
        }): Promise<boolean> {
            const response: ExistsAPIResponse = await querier.get(
                "/signup/phoneNumber/exists",
                {},
                { phoneNumber: input.phoneNumber },
                (context) => {
                    return input.config.preAPIHook({
                        ...context,
                        action: "PHONE_NUMBER_EXISTS",
                    });
                }
            );

            return response.exists;
        },
        getLoginAttemptInfo: function ():
            | undefined
            | {
                  deviceId: string;
                  preAuthSessionId: string;
                  flowType: FlowType;
                  contactInfo: string;
                  contactMethod: "EMAIL" | "PHONE";
                  lastResend: number;
              } {
            const storedInfo = getLocalStorage(PASSWORDLESS_LOGIN_ATTEMPT_INFO_STORAGE_KEY);
            if (!storedInfo) {
                return undefined;
            }
            try {
                const info = JSON.parse(storedInfo);

                return {
                    contactInfo: info.contactInfo,
                    contactMethod: info.contactMethod,
                    deviceId: info.deviceId,
                    flowType: info.flowType,
                    preAuthSessionId: info.preAuthSessionId,
                    lastResend: info.lastResend,
                };
            } catch (ex) {
                return undefined;
            }
        },
        setLoginAttemptInfo: function (input: {
            deviceId: string;
            preAuthSessionId: string;
            flowType: FlowType;
            contactInfo: string;
            contactMethod: "EMAIL" | "PHONE";
        }): void {
            setLocalStorage(
                PASSWORDLESS_LOGIN_ATTEMPT_INFO_STORAGE_KEY,
                JSON.stringify({
                    // This can make future changes/migrations a lot cleaner
                    version: 1,
                    ...input,
                })
            );
        },
        clearLoginAttemptInfo: function (): void {
            removeFromLocalStorage(PASSWORDLESS_LOGIN_ATTEMPT_INFO_STORAGE_KEY);
        },
    };
}
