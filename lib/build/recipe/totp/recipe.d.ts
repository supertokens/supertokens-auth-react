import TOTPWebJS from "supertokens-web-js/recipe/totp";
import RecipeModule from "../recipeModule";
import type {
    UserInput,
    NormalisedConfig,
    GetRedirectionURLContext,
    OnHandleEventContext,
    PreAndPostAPIHookAction,
} from "./types";
import type { NormalisedConfigWithAppInfoAndRecipeID, RecipeInitResult, WebJSRecipeInterface } from "../../types";
export declare const totpFactor: {
    id: "totp";
    name: string;
    description: string;
    path: string;
    logo: () => import("react/jsx-runtime").JSX.Element;
};
export default class TOTP extends RecipeModule<
    GetRedirectionURLContext,
    PreAndPostAPIHookAction,
    OnHandleEventContext,
    NormalisedConfig
> {
    readonly webJSRecipe: WebJSRecipeInterface<typeof TOTPWebJS>;
    static instance?: TOTP;
    static RECIPE_ID: string;
    recipeID: string;
    constructor(
        config: NormalisedConfigWithAppInfoAndRecipeID<NormalisedConfig>,
        webJSRecipe?: WebJSRecipeInterface<typeof TOTPWebJS>
    );
    static init(
        config?: UserInput
    ): RecipeInitResult<GetRedirectionURLContext, PreAndPostAPIHookAction, OnHandleEventContext, NormalisedConfig>;
    static getInstance(): TOTP | undefined;
    static getInstanceOrThrow(): TOTP;
    getDefaultRedirectionURL: (_context: GetRedirectionURLContext) => Promise<string>;
}
