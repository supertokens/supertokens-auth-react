import { RecipeInterface } from "../../thirdparty/types";
import { RecipeInterface as TPEPRecipeInterface } from "..";

export default function getImpl(oI: TPEPRecipeInterface): RecipeInterface {
    return {
        getAuthorisationURLFromBackend: oI.getAuthorisationURLFromBackend.bind(oI),
        getStateAndOtherInfoFromStorage: oI.getStateAndOtherInfoFromStorage.bind(oI),
        redirectToThirdPartyLogin: oI.redirectToThirdPartyLogin.bind(oI),
        setStateAndOtherInfoToStorage: oI.setStateAndOtherInfoToStorage.bind(oI),
        generateStateToSendToOAuthProvider: oI.generateStateToSendToOAuthProvider.bind(oI),
        verifyAndGetStateOrThrowError: oI.verifyAndGetStateOrThrowError.bind(oI),
        getAuthCodeFromURL: oI.getAuthCodeFromURL.bind(oI),
        getAuthErrorFromURL: oI.getAuthErrorFromURL.bind(oI),
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
                        fetchResponse: response.fetchResponse,
                    };
                } else {
                    return {
                        status: response.status,
                        fetchResponse: response.fetchResponse,
                    };
                }
            } else {
                throw Error("Should never come here");
            }
        },
    };
}
