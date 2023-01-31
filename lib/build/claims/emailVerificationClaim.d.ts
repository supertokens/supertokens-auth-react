import {
    EmailVerificationClaimClass as EmailVerificationClaimClassWebJS,
    RecipeInterface,
} from "supertokens-web-js/recipe/emailverification";
import { ValidationFailureCallback, ValidationSuccessCallback } from "../types";
export declare class EmailVerificationClaimClass extends EmailVerificationClaimClassWebJS {
    constructor(
        getRecipeImpl: () => RecipeInterface,
        onSuccessRedirection?: ValidationSuccessCallback,
        onFailureRedirection?: ValidationFailureCallback
    );
}
