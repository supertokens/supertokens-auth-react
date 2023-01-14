import ThirdPartyEmailPasswordWebJS from "supertokens-web-js/recipe/thirdpartyemailpassword";
import { RecipeOnHandleEventFunction } from "../recipeModule/types";
import { OnHandleEventContext } from "./types";
import { getFunctionOverrides as getThirdpartyFunctionOverrides } from "../thirdparty/functionOverrides";
import { getFunctionOverrides as getEmailPasswordFunctionOverrides } from "../emailpassword/functionOverrides";
import getThirdpartyRecipeImplementation from "./recipeImplementation/thirdPartyImplementation";
import getEmailPasswordRecipeImplementation from "./recipeImplementation/emailPasswordImplementation";
import { WebJSRecipeInterface } from "../../types";

type Recipe = WebJSRecipeInterface<typeof ThirdPartyEmailPasswordWebJS>;

export const getFunctionOverrides =
    (recipeId: string, onHandleEvent: RecipeOnHandleEventFunction<OnHandleEventContext>) =>
    (originalImp: Recipe): Recipe => {
        // Get overrides for each recipe that already contains event handler setup.
        // Return them merged into single combined recipe functionOverrides renaming the methods
        const thirdpartyOverrides = getThirdpartyFunctionOverrides(
            recipeId,
            onHandleEvent
        )(getThirdpartyRecipeImplementation(originalImp));
        const emailPasswordOverrides = getEmailPasswordFunctionOverrides(onHandleEvent)(
            getEmailPasswordRecipeImplementation(originalImp)
        );
        return {
            ...thirdpartyOverrides,
            ...emailPasswordOverrides,
            emailPasswordSignIn: emailPasswordOverrides.signIn,
            emailPasswordSignUp: emailPasswordOverrides.signUp,
            thirdPartySignInAndUp: thirdpartyOverrides.signInAndUp,
        };
    };
