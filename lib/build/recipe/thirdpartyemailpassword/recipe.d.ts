/// <reference types="react" />
import AuthRecipe from "../authRecipe";
import {
    CreateRecipeFunction as CreateRecipeFunctionAuthReact,
    RecipeFeatureComponentMap,
    FeatureBaseProps,
} from "../../types";
import {
    Config,
    GetRedirectionURLContext,
    NormalisedConfig,
    OnHandleEventContext,
    UserInput,
    PreAndPostAPIHookAction,
} from "./types";
import EmailPassword from "../emailpassword/recipe";
import ThirdParty from "../thirdparty/recipe";
import { RecipeInterface } from "supertokens-web-js/recipe/thirdpartyemailpassword";
import type { CreateRecipeFunction as CreateRecipeFunctionWebJS } from "supertokens-web-js/lib/build/types";
import type { PreAndPostAPIHookAction as PreAndPostAPIHookActionWebJS } from "supertokens-web-js/recipe/thirdpartyemailpassword/types";
export default class ThirdPartyEmailPassword extends AuthRecipe<
    GetRedirectionURLContext,
    never,
    OnHandleEventContext,
    NormalisedConfig
> {
    static instance?: ThirdPartyEmailPassword;
    static RECIPE_ID: string;
    emailPasswordRecipe: EmailPassword | undefined;
    thirdPartyRecipe: ThirdParty | undefined;
    recipeImpl: RecipeInterface;
    constructor(
        config: Config,
        recipes: {
            thirdPartyInstance: ThirdParty | undefined;
            emailPasswordInstance: EmailPassword | undefined;
        }
    );
    getFeatures: () => RecipeFeatureComponentMap;
    getDefaultRedirectionURL: (context: GetRedirectionURLContext) => Promise<string>;
    getFeatureComponent: (
        componentName: "signinup" | "signinupcallback" | "resetpassword",
        props: FeatureBaseProps & {
            redirectOnSessionExists?: boolean;
            userContext?: any;
        }
    ) => JSX.Element;
    static init(config: UserInput): {
        authReact: CreateRecipeFunctionAuthReact<
            GetRedirectionURLContext,
            PreAndPostAPIHookAction,
            OnHandleEventContext,
            NormalisedConfig
        >;
        webJS: CreateRecipeFunctionWebJS<PreAndPostAPIHookActionWebJS>;
    };
    static getInstanceOrThrow(): ThirdPartyEmailPassword;
    static reset(): void;
}
