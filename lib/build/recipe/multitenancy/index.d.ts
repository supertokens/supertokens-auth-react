import { AllowedDomainsClaim } from "supertokens-web-js/recipe/multitenancy";
import { UserInput } from "./types";
import type { RecipeInterface } from "supertokens-web-js/recipe/multitenancy";
export default class Wrapper {
    static init(config?: UserInput): import("../../types").RecipeInitResult<any, any, any, any>;
    static AllowedDomainsClaim: import("supertokens-web-js/lib/build/recipe/multitenancy/allowedDomainsClaim").AllowedDomainsClaimClass;
}
declare const init: typeof Wrapper.init;
export { init, UserInput, RecipeInterface, AllowedDomainsClaim };
