import type { RecipeInterface as WebJSEmailPasswordRecipeInterface } from "supertokens-web-js/recipe/emailpassword";
import type { RecipeInterface as WebJSThirdPartyEmailPasswordRecipeInterface } from "supertokens-web-js/recipe/thirdpartyemailpassword";
export default function getRecipeImplementation(
    originalImplementation: WebJSThirdPartyEmailPasswordRecipeInterface
): WebJSEmailPasswordRecipeInterface;
