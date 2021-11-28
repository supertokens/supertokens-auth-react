import { RecipeInterface, NormalisedConfig } from "./types";
import { NormalisedAppInfo } from "../../types";
import Querier from "../../querier";
import { PASSWORDLESS_LOGIN_ATTEMPT_INFO_STORAGE_KEY } from "./constants";

type FlowType = "USER_INPUT_CODE" | "MAGICLINK" | "USER_INPUT_CODE_AND_LINK";

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
      }
    | {
          status: "RESTART_FLOW_ERROR";
      };

type ConsumeCodeApiResponse =
    | {
          status: "OK";
          createdUser: boolean;
          user: {
              id: string;
              email?: string;
              phoneNumber?: string;
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
            if ("deviceId" in input) {
                bodyObj = {
                    deviceId: input.deviceId,
                    preAuthSessionId: input.preAuthSessionId,
                };
            }

            return await querier.post("/signinup/code", { body: JSON.stringify(bodyObj) }, (context) => {
                return input.config.preAPIHook({
                    ...context,
                    action: "PASSWORDLESS_CREATE_CODE",
                });
            });
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

            return await querier.post("/signinup/code/consume", { body: JSON.stringify(bodyObj) }, (context) => {
                return input.config.preAPIHook({
                    ...context,
                    action: "PASSWORDLESS_CONSUME_CODE",
                });
            });
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
                  contactInfoType: "EMAIL" | "PHONE";
                  lastResend: number;
              } {
            const storedInfo = localStorage.getItem(PASSWORDLESS_LOGIN_ATTEMPT_INFO_STORAGE_KEY);
            if (!storedInfo) {
                return undefined;
            }
            try {
                const info = JSON.parse(storedInfo);

                return {
                    contactInfo: info.contactInfo,
                    contactInfoType: info.contactInfoType,
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
            contactInfoType: "EMAIL" | "PHONE";
        }): void {
            localStorage.setItem(
                PASSWORDLESS_LOGIN_ATTEMPT_INFO_STORAGE_KEY,
                JSON.stringify({
                    // This can make future changes/migrations a lot cleaner
                    version: 1,
                    ...input,
                })
            );
        },
        clearLoginAttemptInfo: function (): void {
            localStorage.removeItem(PASSWORDLESS_LOGIN_ATTEMPT_INFO_STORAGE_KEY);
        },
    };
}
