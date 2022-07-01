import { RecipeInterface as WebJSThirdPartyRecipeInterface } from "supertokens-web-js/recipe/thirdparty";
import { RecipeInterface as TPPWlessRecipeInterface } from "supertokens-web-js/recipe/thirdpartypasswordless";
export default function getRecipeImplementation(
    originalImplementation: TPPWlessRecipeInterface
): WebJSThirdPartyRecipeInterface;
