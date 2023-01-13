import EmailPasswordWebJS from "supertokens-web-js/recipe/emailpassword";
import ThirdPartyEmailPasswordWebJS from "supertokens-web-js/recipe/thirdpartyemailpassword";
import { WebJSRecipe } from "../../../types";
export default function getRecipeImplementation(
    originalImplementation: WebJSRecipe<typeof ThirdPartyEmailPasswordWebJS>
): WebJSRecipe<typeof EmailPasswordWebJS>;
