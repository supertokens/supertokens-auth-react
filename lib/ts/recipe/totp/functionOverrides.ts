import type { OnHandleEventContext } from "./types";
import type { RecipeOnHandleEventFunction } from "../recipeModule/types";
import type { RecipeInterface } from "supertokens-web-js/recipe/totp";

export const getFunctionOverrides =
    (onHandleEvent: RecipeOnHandleEventFunction<OnHandleEventContext>) =>
    (originalImp: RecipeInterface): RecipeInterface => ({
        ...originalImp,
        createDevice: async function (input) {
            const response = await originalImp.createDevice(input);

            if (response.status === "OK") {
                onHandleEvent({
                    action: "TOTP_DEVICE_CREATED",
                    deviceName: response.deviceName,
                    userContext: input.userContext,
                });
            }

            return response;
        },
        verifyDevice: async function (input) {
            const response = await originalImp.verifyDevice(input);

            if (response.status === "OK") {
                onHandleEvent({
                    action: "TOTP_DEVICE_VERIFIED",
                    deviceName: input.deviceName,
                    wasAlreadyVerified: response.wasAlreadyVerified,
                    userContext: input.userContext,
                });
            }

            return response;
        },
        verifyCode: async function (input) {
            const response = await originalImp.verifyCode(input);

            if (response.status === "OK") {
                onHandleEvent({
                    action: "TOTP_CODE_VERIFIED",
                    userContext: input.userContext,
                });
            }

            return response;
        },
    });
