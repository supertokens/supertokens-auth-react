/// <reference types="react" />
import { RecipeInterface } from "supertokens-web-js/recipe/passwordless";
import { UserInput } from "./types";
import { GetRedirectionURLContext, PreAPIHookContext, OnHandleEventContext } from "./types";
import type { RecipeFunctionOptions } from "supertokens-web-js/recipe/passwordless";
import type { PasswordlessFlowType } from "supertokens-web-js/recipe/passwordless/types";
import type { User } from "supertokens-web-js/types";
export default class Wrapper {
    static init(
        config: UserInput
    ): import("../../types").RecipeInitResult<
        import("../authRecipe/types").GetRedirectionURLContext,
        import("./types").PreAndPostAPIHookAction,
        OnHandleEventContext,
        import("./types").NormalisedConfig
    >;
    static signOut(input?: { userContext?: any }): Promise<void>;
    static createCode(
        input:
            | {
                  email: string;
                  userContext?: any;
                  options?: RecipeFunctionOptions;
              }
            | {
                  phoneNumber: string;
                  userContext?: any;
                  options?: RecipeFunctionOptions;
              }
    ): Promise<
        | {
              status: "OK";
              deviceId: string;
              preAuthSessionId: string;
              flowType: PasswordlessFlowType;
              fetchResponse: Response;
          }
        | {
              status: "SIGN_IN_UP_NOT_ALLOWED";
              reason: string;
          }
    >;
    static resendCode(input?: { userContext?: any; options?: RecipeFunctionOptions }): Promise<{
        status: "OK" | "RESTART_FLOW_ERROR";
        fetchResponse: Response;
    }>;
    static consumeCode(
        input?:
            | {
                  userInputCode: string;
                  userContext?: any;
                  options?: RecipeFunctionOptions;
              }
            | {
                  userContext?: any;
                  options?: RecipeFunctionOptions;
              }
    ): Promise<
        | {
              status: "OK";
              createdNewRecipeUser: boolean;
              user: User;
              fetchResponse: Response;
          }
        | {
              status: "INCORRECT_USER_INPUT_CODE_ERROR" | "EXPIRED_USER_INPUT_CODE_ERROR";
              failedCodeInputAttemptCount: number;
              maximumCodeInputAttempts: number;
              fetchResponse: Response;
          }
        | {
              status: "RESTART_FLOW_ERROR";
              fetchResponse: Response;
          }
        | {
              status: "SIGN_IN_UP_NOT_ALLOWED";
              reason: string;
              fetchResponse: Response;
          }
    >;
    static getLinkCodeFromURL(input?: { userContext?: any }): string;
    static getPreAuthSessionIdFromURL(input?: { userContext?: any }): string;
    static doesEmailExist(input: { email: string; userContext?: any; options?: RecipeFunctionOptions }): Promise<{
        status: "OK";
        doesExist: boolean;
        fetchResponse: Response;
    }>;
    static doesPhoneNumberExist(input: {
        phoneNumber: string;
        userContext?: any;
        options?: RecipeFunctionOptions;
    }): Promise<{
        status: "OK";
        doesExist: boolean;
        fetchResponse: Response;
    }>;
    static getLoginAttemptInfo<CustomLoginAttemptInfoProperties>(input?: { userContext?: any }): Promise<
        | undefined
        | ({
              deviceId: string;
              preAuthSessionId: string;
              flowType: PasswordlessFlowType;
          } & CustomLoginAttemptInfoProperties)
    >;
    static setLoginAttemptInfo<CustomStateProperties>(input: {
        attemptInfo: {
            deviceId: string;
            preAuthSessionId: string;
            flowType: PasswordlessFlowType;
        } & CustomStateProperties;
        userContext?: any;
    }): Promise<void>;
    static clearLoginAttemptInfo(input?: { userContext?: any }): Promise<void>;
    static ComponentsOverrideProvider: import("react").FC<
        import("react").PropsWithChildren<{
            components: import("./types").ComponentOverrideMap;
        }>
    >;
}
declare const init: typeof Wrapper.init;
declare const createCode: typeof Wrapper.createCode;
declare const resendCode: typeof Wrapper.resendCode;
declare const consumeCode: typeof Wrapper.consumeCode;
declare const getLinkCodeFromURL: typeof Wrapper.getLinkCodeFromURL;
declare const getPreAuthSessionIdFromURL: typeof Wrapper.getPreAuthSessionIdFromURL;
declare const doesEmailExist: typeof Wrapper.doesEmailExist;
declare const doesPhoneNumberExist: typeof Wrapper.doesPhoneNumberExist;
declare const getLoginAttemptInfo: typeof Wrapper.getLoginAttemptInfo;
declare const setLoginAttemptInfo: typeof Wrapper.setLoginAttemptInfo;
declare const clearLoginAttemptInfo: typeof Wrapper.clearLoginAttemptInfo;
declare const signOut: typeof Wrapper.signOut;
declare const PasswordlessComponentsOverrideProvider: import("react").FC<
    import("react").PropsWithChildren<{
        components: import("./types").ComponentOverrideMap;
    }>
>;
export {
    PasswordlessComponentsOverrideProvider,
    init,
    createCode,
    resendCode,
    consumeCode,
    getLinkCodeFromURL,
    getPreAuthSessionIdFromURL,
    doesEmailExist,
    doesPhoneNumberExist,
    getLoginAttemptInfo,
    setLoginAttemptInfo,
    clearLoginAttemptInfo,
    signOut,
    GetRedirectionURLContext,
    PreAPIHookContext,
    OnHandleEventContext,
    UserInput,
    RecipeInterface,
};
