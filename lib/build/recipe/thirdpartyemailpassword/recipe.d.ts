/// <reference types="react" />
import AuthRecipe from "../authRecipe";
import EmailPassword from "../emailpassword/recipe";
import ThirdParty from "../thirdparty/recipe";
import type {
    Config,
    GetRedirectionURLContext,
    NormalisedConfig,
    OnHandleEventContext,
    UserInput,
    PreAndPostAPIHookAction,
} from "./types";
import type { GenericComponentOverrideMap } from "../../components/componentOverride/componentOverrideContext";
import type { CreateRecipeFunction, FeatureBaseProps, RecipeFeatureComponentMap } from "../../types";
import type { RecipeInterface } from "supertokens-web-js/recipe/thirdpartyemailpassword";
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
    getFeatures: (useComponentOverrides?: () => GenericComponentOverrideMap<any>) => RecipeFeatureComponentMap;
    getDefaultRedirectionURL: (context: GetRedirectionURLContext) => Promise<string>;
    getFeatureComponent: (
        componentName: "signinup" | "signinupcallback" | "resetpassword",
        props: FeatureBaseProps & {
            redirectOnSessionExists?: boolean;
            userContext?: any;
        },
        useComponentOverrides?: () => GenericComponentOverrideMap<any>
    ) => JSX.Element;
    static init(
        config: UserInput
    ): CreateRecipeFunction<GetRedirectionURLContext, PreAndPostAPIHookAction, OnHandleEventContext, NormalisedConfig>;
    static getInstanceOrThrow(): ThirdPartyEmailPassword;
    static reset(): void;
}
