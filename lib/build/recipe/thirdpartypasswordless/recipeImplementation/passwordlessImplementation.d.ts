import PasswordlessWebJS from "supertokens-web-js/recipe/passwordless";
import ThirdPartyPasswordlessWebJS from "supertokens-web-js/recipe/thirdpartypasswordless";
import { WebJSRecipe } from "../../../types";
export default function getRecipeImplementation(
    originalImplementation: WebJSRecipe<typeof ThirdPartyPasswordlessWebJS>
): WebJSRecipe<typeof PasswordlessWebJS>;
