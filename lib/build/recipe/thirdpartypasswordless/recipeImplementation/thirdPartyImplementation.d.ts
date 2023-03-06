import type { RecipeInterface as WebJSThirdPartyRecipeInterface } from "supertokens-web-js/recipe/thirdparty";
import type { RecipeInterface as TPPWlessRecipeInterface } from "supertokens-web-js/recipe/thirdpartypasswordless";
export default function getRecipeImplementation(
    originalImplementation: TPPWlessRecipeInterface
): WebJSThirdPartyRecipeInterface;
