/// <reference types="react" />
import { UserInput } from "./types";
import type { RecipeInterface } from "supertokens-web-js/recipe/oauth2";
export default class Wrapper {
    static init(config?: UserInput): import("../../types").RecipeInitResult<any, never, any, any>;
    static ComponentsOverrideProvider: import("react").FC<
        import("react").PropsWithChildren<{
            components: import("./types").ComponentOverrideMap;
        }>
    >;
}
declare const init: typeof Wrapper.init;
declare const MultitenancyComponentsOverrideProvider: import("react").FC<
    import("react").PropsWithChildren<{
        components: import("./types").ComponentOverrideMap;
    }>
>;
export { init, UserInput, RecipeInterface, MultitenancyComponentsOverrideProvider };
