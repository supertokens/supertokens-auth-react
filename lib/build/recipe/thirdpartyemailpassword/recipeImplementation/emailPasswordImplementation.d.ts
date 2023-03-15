import type { WebJSRecipeInterface } from "../../../types";
import type EmailPasswordWebJS from "supertokens-web-js/recipe/emailpassword";
import type ThirdPartyEmailPasswordWebJS from "supertokens-web-js/recipe/thirdpartyemailpassword";
export default function getRecipeImplementation(
    originalImplementation: WebJSRecipeInterface<typeof ThirdPartyEmailPasswordWebJS>
): WebJSRecipeInterface<typeof EmailPasswordWebJS>;
