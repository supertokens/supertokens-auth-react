import { RecipeInterface } from "supertokens-web-js/recipe/thirdpartyemailpassword";
import { RecipeOnHandleEventFunction } from "../recipeModule/types";
import { OnHandleEventContext } from "./types";
import { getFunctionOverrides as getThirdpartyFunctionOverrides } from "../thirdparty/functionOverrides";
import { getFunctionOverrides as getEmailPasswordFunctionOverrides } from "../emailpassword/functionOverrides";
import getThirdpartyRecipeImplementation from "./recipeImplementation/thirdPartyImplementation";
import getEmailPasswordRecipeImplementation from "./recipeImplementation/emailPasswordImplementation";

export const getFunctionOverrides =
    (recipeId: string, onHandleEvent?: RecipeOnHandleEventFunction<OnHandleEventContext>) =>
    (originalImp: RecipeInterface): RecipeInterface => {
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
