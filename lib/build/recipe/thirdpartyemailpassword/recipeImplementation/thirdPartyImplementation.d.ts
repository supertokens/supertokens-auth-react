import ThirdPartyWebJS from "supertokens-web-js/recipe/thirdparty";
import ThirdPartyEmailPasswordWebJS from "supertokens-web-js/recipe/thirdpartyemailpassword";
import { WebJSRecipeInterface } from "../../../types";
export default function getRecipeImplementation(
    originalImplementation: WebJSRecipeInterface<typeof ThirdPartyEmailPasswordWebJS>
): WebJSRecipeInterface<typeof ThirdPartyWebJS>;
