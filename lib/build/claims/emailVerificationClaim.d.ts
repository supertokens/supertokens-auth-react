import {
    EmailVerificationClaimClass as EmailVerificationClaimClassWebJS,
    RecipeInterface,
} from "supertokens-web-js/recipe/emailverification";
declare type ValidationCallback = (() => Promise<string | undefined>) | undefined;
export declare class EmailVerificationClaimClass extends EmailVerificationClaimClassWebJS {
    constructor(
        getRecipeImpl: () => RecipeInterface,
        updateContextOnIsVerifiedFalse?: (userContext: any) => void | Promise<void>,
        onSuccessRedirection?: ValidationCallback,
        onFailureRedirection?: ValidationCallback
    );
}
export {};
