/// <reference types="react" />
import { RecipeInterface } from "supertokens-web-js/recipe/totp";
import { GetRedirectionURLContext, PreAPIHookContext, OnHandleEventContext } from "./types";
import { UserInput } from "./types";
import type { UserContext } from "../../types";
import type { RecipeFunctionOptions } from "supertokens-web-js/recipe/totp";
export default class Wrapper {
    static init(
        config?: UserInput
    ): import("../../types").RecipeInitResult<
        never,
        import("./types").PreAndPostAPIHookAction,
        OnHandleEventContext,
        import("./types").NormalisedConfig
    >;
    static createDevice(input?: {
        deviceName?: string;
        options?: RecipeFunctionOptions;
        userContext?: UserContext;
    }): Promise<
        | {
              status: "OK";
              deviceName: string;
              secret: string;
              qrCodeString: string;
              fetchResponse: Response;
          }
        | {
              status: "DEVICE_ALREADY_EXISTS_ERROR";
              fetchResponse: Response;
          }
    >;
    static verifyCode(input: { totp: string; options?: RecipeFunctionOptions; userContext?: UserContext }): Promise<
        | {
              status: "OK";
              fetchResponse: Response;
          }
        | {
              status: "INVALID_TOTP_ERROR";
              currentNumberOfFailedAttempts: number;
              maxNumberOfFailedAttempts: number;
              fetchResponse: Response;
          }
        | {
              status: "LIMIT_REACHED_ERROR";
              retryAfterMs: number;
              fetchResponse: Response;
          }
    >;
    static verifyDevice(input: {
        deviceName: string;
        totp: string;
        options?: RecipeFunctionOptions | undefined;
        userContext?: UserContext;
    }): Promise<
        | {
              status: "OK";
              wasAlreadyVerified: boolean;
              fetchResponse: Response;
          }
        | {
              status: "INVALID_TOTP_ERROR";
              currentNumberOfFailedAttempts: number;
              maxNumberOfFailedAttempts: number;
              fetchResponse: Response;
          }
        | {
              status: "UNKNOWN_DEVICE_ERROR";
              fetchResponse: Response;
          }
        | {
              status: "LIMIT_REACHED_ERROR";
              retryAfterMs: number;
              fetchResponse: Response;
          }
    >;
    static removeDevice(input: {
        deviceName: string;
        options?: RecipeFunctionOptions;
        userContext?: UserContext;
    }): Promise<{
        status: "OK";
        didDeviceExist: boolean;
        fetchResponse: Response;
    }>;
    static listDevices(input?: { options?: RecipeFunctionOptions; userContext?: UserContext }): Promise<{
        status: "OK";
        devices: {
            name: string;
            period: number;
            skew: number;
            verified: boolean;
        }[];
        fetchResponse: Response;
    }>;
    static ComponentsOverrideProvider: import("react").FC<
        import("react").PropsWithChildren<{
            components: import("./types").ComponentOverrideMap;
        }>
    >;
}
declare const init: typeof Wrapper.init;
declare const createDevice: typeof Wrapper.createDevice;
declare const verifyCode: typeof Wrapper.verifyCode;
declare const verifyDevice: typeof Wrapper.verifyDevice;
declare const removeDevice: typeof Wrapper.removeDevice;
declare const listDevices: typeof Wrapper.listDevices;
declare const TOTPComponentsOverrideProvider: import("react").FC<
    import("react").PropsWithChildren<{
        components: import("./types").ComponentOverrideMap;
    }>
>;
export {
    init,
    createDevice,
    verifyCode,
    verifyDevice,
    removeDevice,
    listDevices,
    TOTPComponentsOverrideProvider,
    GetRedirectionURLContext,
    PreAPIHookContext as PreAPIHookContext,
    OnHandleEventContext,
    UserInput,
    RecipeInterface,
};
