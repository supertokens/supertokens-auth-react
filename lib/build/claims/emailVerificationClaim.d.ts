import { EmailVerificationClaimClass as EmailVerificationClaimClassWebJS } from "supertokens-web-js/recipe/emailverification";
import type { ValidationFailureCallback, ValidationSuccessCallback } from "../types";
import type { RecipeInterface } from "supertokens-web-js/recipe/emailverification";
export declare class EmailVerificationClaimClass extends EmailVerificationClaimClassWebJS {
    constructor(
        getRecipeImpl: () => RecipeInterface,
        onSuccessRedirection?: ValidationSuccessCallback,
        onFailureRedirection?: ValidationFailureCallback
    );
}
