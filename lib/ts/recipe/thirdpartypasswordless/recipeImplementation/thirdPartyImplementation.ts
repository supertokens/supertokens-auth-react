import type { WebJSRecipeInterface } from "../../../types";
import type ThirdPartyWebJS from "supertokens-web-js/recipe/thirdparty";
import type ThirdPartyPasswordlessWebJS from "supertokens-web-js/recipe/thirdpartypasswordless";

export default function getRecipeImplementation(
    originalImplementation: WebJSRecipeInterface<typeof ThirdPartyPasswordlessWebJS>
): WebJSRecipeInterface<typeof ThirdPartyWebJS> {
    return {
        getAuthorisationURLWithQueryParamsAndSetState:
            originalImplementation.getThirdPartyAuthorisationURLWithQueryParamsAndSetState.bind(originalImplementation),
        getStateAndOtherInfoFromStorage:
            originalImplementation.getThirdPartyStateAndOtherInfoFromStorage.bind(originalImplementation),
        signInAndUp: originalImplementation.thirdPartySignInAndUp.bind(originalImplementation),
    };
}
