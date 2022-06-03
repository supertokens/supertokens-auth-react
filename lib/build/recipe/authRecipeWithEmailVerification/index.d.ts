/// <reference types="react" />
import AuthRecipe from "../authRecipe";
import { NormalisedConfig, GetRedirectionURLContext, PreAndPostAPIHookAction, OnHandleEventContext } from "./types";
import EmailVerification from "../emailverification/recipe";
export default abstract class AuthRecipeWithEmailVerification<
    T,
    R,
    N extends NormalisedConfig<T | GetRedirectionURLContext, PreAndPostAPIHookAction, R | OnHandleEventContext>
> extends AuthRecipe<T | GetRedirectionURLContext, PreAndPostAPIHookAction, R | OnHandleEventContext, N> {
    emailVerification: EmailVerification;
    constructor(
        config: N,
        recipes: {
            emailVerificationInstance: EmailVerification | undefined;
        }
    );
    savePostEmailVerificationSuccessRedirectState: (context: T) => Promise<void>;
    getAuthRecipeWithEmailVerificationDefaultRedirectionURL: (context: GetRedirectionURLContext) => Promise<string>;
    getAuthRecipeWithEmailVerificationFeatureComponent: (componentName: "emailverification", props: any) => JSX.Element;
    getAuthRecipeWithEmailVerificationFeatures: () => Record<
        string,
        import("../../types").ComponentWithRecipeAndMatchingMethod
    >;
}
