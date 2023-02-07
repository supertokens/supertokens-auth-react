import type { RecipeInterface as WebJSPasswordlessRecipeInterface } from "supertokens-web-js/recipe/passwordless";
import type { RecipeInterface as TPPWlessRecipeInterface } from "supertokens-web-js/recipe/thirdpartypasswordless";
export default function getRecipeImplementation(
    originalImplementation: TPPWlessRecipeInterface
): WebJSPasswordlessRecipeInterface;
