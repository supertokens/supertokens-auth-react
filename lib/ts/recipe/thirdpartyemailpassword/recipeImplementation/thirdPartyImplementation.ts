import { RecipeInterface } from "../../thirdparty/types";
import { RecipeInterface as TPEPRecipeInterface } from "..";

export default function getImpl(oI: TPEPRecipeInterface): RecipeInterface {
    return {
        getOAuthAuthorisationURL: oI.getOAuthAuthorisationURL.bind(oI),
        getOAuthState: oI.getOAuthState.bind(oI),
        redirectToThirdPartyLogin: oI.redirectToThirdPartyLogin.bind(oI),
        setOAuthState: oI.setOAuthState.bind(oI),
        signInAndUp: async function (input) {
            const response = await oI.signInAndUp({
                type: "thirdparty",
                ...input,
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
                        status: response.status,
                    };
                }
            } else {
                throw Error("Should never come here");
            }
        },
    };
}
