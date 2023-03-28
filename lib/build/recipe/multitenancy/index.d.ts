import { RecipeInterface } from "supertokens-web-js/recipe/multitenancy";
import { UserInput } from "./types";
export default class Wrapper {
    static init(config: UserInput): import("../../types").RecipeInitResult<any, any, any, any>;
}
declare const init: typeof Wrapper.init;
export { init, UserInput, RecipeInterface };
