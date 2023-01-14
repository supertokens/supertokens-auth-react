import EmailPasswordWebJS from "supertokens-web-js/recipe/emailpassword";
import ThirdPartyEmailPasswordWebJS from "supertokens-web-js/recipe/thirdpartyemailpassword";
import { WebJSRecipeInterface } from "../../../types";
export default function getRecipeImplementation(
    originalImplementation: WebJSRecipeInterface<typeof ThirdPartyEmailPasswordWebJS>
): WebJSRecipeInterface<typeof EmailPasswordWebJS>;
