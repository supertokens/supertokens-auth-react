/// <reference types="react" />
import RecipeModule from "../recipeModule";
import { RecipeFeatureComponentMap } from "../../types";
import {
    UserInput,
    Config,
    NormalisedConfig,
    GetRedirectionURLContext,
    OnHandleEventContext,
    PreAndPostAPIHookAction as PreAndPostAPIHookActionAuthReact,
} from "./types";
import { CreateRecipeFunction as CreateRecipeFunctionAuthReact } from "../../types";
import { RecipeInterface, EmailVerificationClaimClass } from "supertokens-web-js/recipe/emailverification";
import type { CreateRecipeFunction as CreateRecipeFunctionWebJS } from "supertokens-web-js/lib/build/types";
import type { PreAndPostAPIHookAction as PreAndPostAPIHookActionWebJS } from "supertokens-web-js/lib/build/recipe/emailverification/types";
export default class EmailVerification extends RecipeModule<
    GetRedirectionURLContext,
    PreAndPostAPIHookActionAuthReact,
    OnHandleEventContext,
    NormalisedConfig
> {
    static instance?: EmailVerification;
    static RECIPE_ID: string;
    static EmailVerificationClaim: EmailVerificationClaimClass;
    recipeImpl: RecipeInterface;
    constructor(config: Config);
    static init(config: UserInput): {
        authReact: CreateRecipeFunctionAuthReact<
            GetRedirectionURLContext,
            PreAndPostAPIHookActionAuthReact,
            OnHandleEventContext,
            NormalisedConfig
        >;
        webJS: CreateRecipeFunctionWebJS<PreAndPostAPIHookActionWebJS>;
    };
    static getInstanceOrThrow(): EmailVerification;
    getFeatures: () => RecipeFeatureComponentMap;
    getFeatureComponent: (_: "emailverification", props: any) => JSX.Element;
    isEmailVerified(userContext: any): Promise<{
        status: "OK";
        isVerified: boolean;
        fetchResponse: Response;
    }>;
    getDefaultRedirectionURL: (context: GetRedirectionURLContext) => Promise<string>;
}
