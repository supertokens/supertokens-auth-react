import PasswordlessWebJS from "supertokens-web-js/recipe/passwordless";
import ThirdPartyPasswordlessWebJS from "supertokens-web-js/recipe/thirdpartypasswordless";
import { WebJSRecipeInterface } from "../../../types";
export default function getRecipeImplementation(
    originalImplementation: WebJSRecipeInterface<typeof ThirdPartyPasswordlessWebJS>
): WebJSRecipeInterface<typeof PasswordlessWebJS>;
