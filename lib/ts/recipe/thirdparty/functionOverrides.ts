import { RecipeInterface } from "supertokens-web-js/recipe/thirdparty";
import { getRedirectToPathFromURL } from "../../utils";
import { RecipeOnHandleEventFunction } from "../recipeModule/types";
import { OnHandleEventContext } from "./types";

export const getFunctionOverrides =
    (recipeId: string, onHandleEvent: RecipeOnHandleEventFunction<OnHandleEventContext>) =>
    (originalImp: RecipeInterface): RecipeInterface => ({
        ...originalImp,
        getAuthorisationURLFromBackend: async function (input) {
            const response = await originalImp.getAuthorisationURLFromBackend(input);

            return response;
        },

        signInAndUp: async function (input) {
            const response = await originalImp.signInAndUp(input);

            if (response.status === "OK") {
                onHandleEvent({
                    action: "SUCCESS",
                    isNewUser: response.createdNewUser,
                    user: response.user,
                    userContext: input?.userContext,
                });
            }

            return response;
        },
        getStateAndOtherInfoFromStorage: function <CustomStateProperties>(input: { userContext: any }) {
            return originalImp.getStateAndOtherInfoFromStorage<CustomStateProperties>({
                userContext: input.userContext,
            });
        },

        setStateAndOtherInfoToStorage: function (input) {
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
    });
