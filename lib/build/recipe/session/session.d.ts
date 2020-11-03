import RecipeModule from "../recipeModule";
import { CreateRecipeFunction } from "../../types";
import { SessionUserInput, NormalisedSessionConfig, SessionConfig } from "./types";
export default class Session extends RecipeModule {
    static instance?: Session;
    private config;
    private httpRequest;
    constructor(config: SessionConfig);
    getConfig: () => NormalisedSessionConfig;
    getFeatures: () => Record<string, import("../../types").ReactComponentClass>;
    static init(config?: SessionUserInput): CreateRecipeFunction;
    static getInstanceOrThrow(): Session;
    static reset(): void;
}
