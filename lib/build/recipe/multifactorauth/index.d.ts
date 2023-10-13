/// <reference types="react" />
import { RecipeInterface } from "supertokens-web-js/recipe/emailverification";
import { GetRedirectionURLContext, PreAPIHookContext, OnHandleEventContext } from "./types";
import { UserInput } from "./types";
import type { MFAFactorInfo } from "supertokens-web-js/lib/build/recipe/multifactorauth/types";
import type { RecipeFunctionOptions } from "supertokens-web-js/recipe/emailverification";
export default class Wrapper {
    static MultiFactorAuthClaim: import("supertokens-web-js/lib/build/recipe/multifactorauth/multiFactorAuthClaim").MultiFactorAuthClaimClass;
    static init(
        config?: UserInput
    ): import("../../types").RecipeInitResult<
        GetRedirectionURLContext,
        "GET_MFA_INFO",
        OnHandleEventContext,
        import("./types").NormalisedConfig
    >;
    static getMFAInfo(input?: { userContext?: any; options?: RecipeFunctionOptions }): Promise<{
        status: "OK";
        factors: MFAFactorInfo;
        fetchResponse: Response;
    }>;
    static ComponentsOverrideProvider: import("react").FC<
        import("react").PropsWithChildren<{
            components: import("./types").ComponentOverrideMap;
        }>
    >;
}
declare const init: typeof Wrapper.init;
declare const getMFAInfo: typeof Wrapper.getMFAInfo;
declare const MultiFactorAuthComponentsOverrideProvider: import("react").FC<
    import("react").PropsWithChildren<{
        components: import("./types").ComponentOverrideMap;
    }>
>;
declare const MultiFactorAuthClaim: import("supertokens-web-js/lib/build/recipe/multifactorauth/multiFactorAuthClaim").MultiFactorAuthClaimClass;
export {
    init,
    getMFAInfo,
    MultiFactorAuthComponentsOverrideProvider,
    GetRedirectionURLContext,
    PreAPIHookContext as PreAPIHookContext,
    OnHandleEventContext,
    UserInput,
    RecipeInterface,
    MultiFactorAuthClaim,
};
