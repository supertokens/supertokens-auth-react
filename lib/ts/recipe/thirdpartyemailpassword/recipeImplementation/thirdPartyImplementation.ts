import { RecipeInterface } from "../../thirdparty/types";
import { RecipeInterface as TPEPRecipeInterface } from "..";

export default function getImpl(oI: TPEPRecipeInterface): RecipeInterface {
    return {
        getOAuthAuthorisationURL: oI.getOAuthAuthorisationURL,
        signInAndUp: async (thirdPartyId, code, redirectURI, options) => {
            const response = await oI.signInAndUp({
                type: "thirdparty",
                code,
                redirectURI,
                thirdPartyId,
                options,
            });
            if (response.type === "thirdparty") {
                if (response.status === "OK") {
                    return {
                        status: "OK",
                        createdNewUser: response.createdNewUser,
                        user: response.user,
                    };
                } else if (response.status === "FIELD_ERROR") {
                    return {
                        status: "FIELD_ERROR",
                        error: response.error,
                    };
                } else {
                    return {
                        status: "NO_EMAIL_GIVEN_BY_PROVIDER",
                    };
                }
            } else {
                throw Error("Should never come here");
            }
        },
    };
}
