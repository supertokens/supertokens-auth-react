import type { WebJSRecipeInterface } from "../../../types";
import type PasswordlessWebJS from "supertokens-web-js/recipe/passwordless";
import type ThirdPartyPasswordlessWebJS from "supertokens-web-js/recipe/thirdpartypasswordless";
export default function getRecipeImplementation(
    originalImplementation: WebJSRecipeInterface<typeof ThirdPartyPasswordlessWebJS>
): WebJSRecipeInterface<typeof PasswordlessWebJS>;
