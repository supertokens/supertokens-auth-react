import { UserInput } from "./types";
import type { RecipeInterface } from "supertokens-web-js/recipe/oauth2";
export default class Wrapper {
    static init(config?: UserInput): import("../../types").RecipeInitResult<any, never, any, any>;
}
declare const init: typeof Wrapper.init;
export { init, UserInput, RecipeInterface };
