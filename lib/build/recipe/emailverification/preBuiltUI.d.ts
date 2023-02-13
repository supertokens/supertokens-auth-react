/// <reference types="react" />
import { RecipeFeatureComponentMap } from "../../types";
import { EmailVerificationTheme } from "./components/themes/emailVerification";
import { RecipeRoutes } from "../recipeRoutes";
import EmailVerification from "./recipe";
export declare class EmailVerificationPreBuiltUIRoutes extends RecipeRoutes {
    private readonly recipeInstance;
    constructor(recipeInstance: EmailVerification);
    static instance: EmailVerificationPreBuiltUIRoutes;
    static init(recipeInstance: EmailVerification): void;
    static getInstanceOrInitAndGetInstance(): EmailVerificationPreBuiltUIRoutes;
    static canHandleRoute(): boolean;
    static getRoutingComponent(): JSX.Element | null;
    static getFeatures(): RecipeFeatureComponentMap;
    static getFeatureComponent(_: "emailverification", props: any): JSX.Element;
    static getRoutes(reactRouterDom: any): JSX.Element[];
    getFeatures: () => RecipeFeatureComponentMap;
    getFeatureComponent: (_: "emailverification", props: any) => JSX.Element;
    static EmailVerification: (props?: any) => JSX.Element;
    static EmailVerificationTheme: typeof EmailVerificationTheme;
}
