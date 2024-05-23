import PasswordlessWebJS from "supertokens-web-js/recipe/passwordless";
import AuthRecipe from "../authRecipe";
import type {
    GetRedirectionURLContext,
    OnHandleEventContext,
    PreAndPostAPIHookAction,
    NormalisedConfig,
    UserInput,
} from "./types";
import type { RecipeInitResult, NormalisedConfigWithAppInfoAndRecipeID, WebJSRecipeInterface } from "../../types";
export declare const otpPhoneFactor: {
    id: "otp-phone";
    name: string;
    description: string;
    path: string;
    logo: () => import("react/jsx-runtime").JSX.Element;
};
export declare const otpEmailFactor: {
    id: "otp-email";
    name: string;
    description: string;
    path: string;
    logo: () => import("react/jsx-runtime").JSX.Element;
};
export default class Passwordless extends AuthRecipe<
    GetRedirectionURLContext,
    PreAndPostAPIHookAction,
    OnHandleEventContext,
    NormalisedConfig
> {
    readonly webJSRecipe: WebJSRecipeInterface<typeof PasswordlessWebJS>;
    static instance?: Passwordless;
    static RECIPE_ID: string;
    recipeID: string;
    firstFactorIds: ("otp-email" | "otp-phone" | "link-email" | "link-phone")[];
    getFirstFactorsForAuthPage(): string[];
    constructor(
        config: NormalisedConfigWithAppInfoAndRecipeID<NormalisedConfig>,
        webJSRecipe?: WebJSRecipeInterface<typeof PasswordlessWebJS>
    );
    getDefaultRedirectionURL: (context: GetRedirectionURLContext) => Promise<string>;
    static init(
        config: UserInput
    ): RecipeInitResult<GetRedirectionURLContext, PreAndPostAPIHookAction, OnHandleEventContext, NormalisedConfig>;
    static getInstanceOrThrow(): Passwordless;
    static reset(): void;
}
