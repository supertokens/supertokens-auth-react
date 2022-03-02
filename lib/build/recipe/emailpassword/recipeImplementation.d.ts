import { NormalisedConfig } from "./types";
import { RecipeInterface } from "supertokens-web-js/recipe/emailpassword";
export default function getRecipeImplementation(
    webJsImplementation: RecipeInterface,
    authReactConfig: NormalisedConfig
): RecipeInterface;
