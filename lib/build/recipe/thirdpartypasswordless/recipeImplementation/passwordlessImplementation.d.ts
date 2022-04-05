import { RecipeInterface as WebJSPasswordlessRecipeInterface } from "supertokens-web-js/recipe/passwordless";
import { TPPWlessRecipeInterface } from "../types";
export default function getRecipeImplementation(
    originalImplementation: TPPWlessRecipeInterface
): WebJSPasswordlessRecipeInterface;
