import type { OnHandleEventContext } from "./types";
import type { RecipeOnHandleEventFunction } from "../recipeModule/types";
import type { RecipeInterface } from "supertokens-web-js/recipe/oauth2provider";

export const getFunctionOverrides =
    (onHandleEvent: RecipeOnHandleEventFunction<OnHandleEventContext>) =>
    (originalImp: RecipeInterface): RecipeInterface => ({
        ...originalImp,
        async getLoginChallengeInfo(input) {
            const response = await originalImp.getLoginChallengeInfo(input);
            onHandleEvent({
                action: "LOADED_LOGIN_CHALLENGE",
                loginChallenge: input.loginChallenge,
                loginInfo: response.info,
                userContext: input.userContext,
            });
            return response;
        },
        async logOut(input) {
            const response = await originalImp.logOut(input);
            onHandleEvent({
                action: "OAUTH2_LOGOUT_SUCCESS",
                frontendRedirectTo: response.frontendRedirectTo,
                userContext: input.userContext,
            });
            return response;
        },
    });
