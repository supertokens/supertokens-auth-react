import ThirdPartyWebJS from "supertokens-web-js/recipe/thirdparty";
import ThirdPartyPasswordlessWebJS from "supertokens-web-js/recipe/thirdpartypasswordless";
import { WebJSRecipeInterface } from "../../../types";
export default function getRecipeImplementation(
    originalImplementation: WebJSRecipeInterface<typeof ThirdPartyPasswordlessWebJS>
): WebJSRecipeInterface<typeof ThirdPartyWebJS>;
