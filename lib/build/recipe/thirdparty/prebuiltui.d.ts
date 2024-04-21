/// <reference types="react" />
import { RecipeRouter } from "../recipeRouter";
import SignInAndUpTheme from "./components/themes/signInAndUp";
import { SignInAndUpCallbackTheme } from "./components/themes/signInAndUpCallback";
import ThirdParty from "./recipe";
import type { GenericComponentOverrideMap } from "../../components/componentOverride/componentOverrideContext";
import type { RecipeFeatureComponentMap, FeatureBaseProps, UserContext } from "../../types";
import type { AuthComponent } from "../../types";
export declare class ThirdPartyPreBuiltUI extends RecipeRouter {
    readonly recipeInstance: ThirdParty;
    static instance?: ThirdPartyPreBuiltUI;
    constructor(recipeInstance: ThirdParty);
    static getInstanceOrInitAndGetInstance(): ThirdPartyPreBuiltUI;
    static getFeatures(useComponentOverrides?: () => GenericComponentOverrideMap<any>): RecipeFeatureComponentMap;
    static getFeatureComponent(
        componentName: "signinupcallback",
        props: FeatureBaseProps<{
            redirectOnSessionExists?: boolean;
            userContext: UserContext;
        }>,
        useComponentOverrides?: () => GenericComponentOverrideMap<any>
    ): JSX.Element;
    getFeatures: (useComponentOverrides?: () => GenericComponentOverrideMap<any>) => RecipeFeatureComponentMap;
    getFeatureComponent: (
        componentName: "signinupcallback",
        props: FeatureBaseProps<{
            redirectOnSessionExists?: boolean;
            userContext?: UserContext;
        }>,
        useComponentOverrides?: () => GenericComponentOverrideMap<any>
    ) => JSX.Element;
    getAuthComponents(): AuthComponent[];
    static reset(): void;
    static SignInAndUpCallback: (
        prop: FeatureBaseProps<{
            userContext?: UserContext;
        }>
    ) => JSX.Element;
    static SignInAndUpTheme: import("react").FC<
        import("../../types").AuthComponentProps & {
            providers: Pick<import("./providers").default, "id" | "getButton">[];
            recipeImplementation: import("../../types").WebJSRecipeInterface<
                typeof import("supertokens-web-js/lib/build/recipe/thirdparty")
            >;
            config: import("./types").NormalisedConfig;
        } & {
            userContext?: UserContext | undefined;
        }
    >;
    static SignInAndUpCallbackTheme: (props: { config: import("./types").NormalisedConfig }) => JSX.Element;
}
declare const SignInAndUpCallback: (
    prop: FeatureBaseProps<{
        userContext?: UserContext;
    }>
) => JSX.Element;
export { SignInAndUpCallback, SignInAndUpCallbackTheme, SignInAndUpTheme };
