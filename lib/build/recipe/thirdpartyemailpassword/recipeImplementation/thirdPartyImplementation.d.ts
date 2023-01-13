import ThirdPartyWebJS from "supertokens-web-js/recipe/thirdparty";
import ThirdPartyEmailPasswordWebJS from "supertokens-web-js/recipe/thirdpartyemailpassword";
import { WebJSRecipe } from "../../../types";
export default function getRecipeImplementation(
    originalImplementation: WebJSRecipe<typeof ThirdPartyEmailPasswordWebJS>
): WebJSRecipe<typeof ThirdPartyWebJS>;
