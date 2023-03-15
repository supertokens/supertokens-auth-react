import type { WebJSRecipeInterface } from "../../../types";
import type ThirdPartyWebJS from "supertokens-web-js/recipe/thirdparty";
import type ThirdPartyEmailPasswordWebJS from "supertokens-web-js/recipe/thirdpartyemailpassword";
export default function getRecipeImplementation(
    originalImplementation: WebJSRecipeInterface<typeof ThirdPartyEmailPasswordWebJS>
): WebJSRecipeInterface<typeof ThirdPartyWebJS>;
