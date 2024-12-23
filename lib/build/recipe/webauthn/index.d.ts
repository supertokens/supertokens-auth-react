import type { UserInput } from "./types";
export default class Wrapper {
    static init(
        config: UserInput
    ): import("../../types").RecipeInitResult<
        import("./types").GetRedirectionURLContext,
        import("./types").PreAndPostAPIHookAction,
        import("./types").OnHandleEventContext,
        import("./types").NormalisedConfig
    >;
}
declare const init: typeof Wrapper.init;
export { init };
