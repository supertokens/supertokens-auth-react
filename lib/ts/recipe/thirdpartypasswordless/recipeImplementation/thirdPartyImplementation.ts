import { RecipeInterface } from "../../thirdparty/types";
import { RecipeInterface as TPEPRecipeInterface } from "..";

export default function getImpl(oI: TPEPRecipeInterface): RecipeInterface {
    return {
        getOAuthAuthorisationURL: oI.getOAuthAuthorisationURL.bind(oI),
        getOAuthState: oI.getOAuthState.bind(oI),
        redirectToThirdPartyLogin: oI.redirectToThirdPartyLogin.bind(oI),
        setOAuthState: oI.setOAuthState.bind(oI),
        signInAndUp: oI.signInAndUp.bind(oI),
    };
}
