import RecipeModule, { RecipeModuleConfig } from "../module";
interface EmailPasswordConfig extends RecipeModuleConfig {
    signInAndUpFeature: any;
    resetPasswordUsingTokenFeature: any;
}
export default class EmailPassword extends RecipeModule {
    static instance?: EmailPassword;
    static recipeId: string;
    static routes: Array<string>;
    constructor(config: EmailPasswordConfig);
    static init(config: EmailPasswordConfig): RecipeModule;
    static getInstanceIfDefined(): EmailPassword;
}
export {};
