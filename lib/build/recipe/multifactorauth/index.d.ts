/// <reference types="react" />
import { RecipeInterface } from "supertokens-web-js/recipe/multifactorauth";
import { GetRedirectionURLContext, PreAPIHookContext, OnHandleEventContext } from "./types";
import { UserInput } from "./types";
import type { RecipeFunctionOptions } from "supertokens-web-js/recipe/multifactorauth";
import type { MFAFactorInfo } from "supertokens-web-js/recipe/multifactorauth/types";
export default class Wrapper {
    static MultiFactorAuthClaim: import("./multiFactorAuthClaim").MultiFactorAuthClaimClass;
    static init(
        config?: UserInput
    ): import("../../types").RecipeInitResult<
        GetRedirectionURLContext,
        "GET_MFA_INFO",
        never,
        import("./types").NormalisedConfig
    >;
    static getMFAInfo(input?: { userContext?: any; options?: RecipeFunctionOptions }): Promise<{
        status: "OK";
        factors: MFAFactorInfo;
        fetchResponse: Response;
    }>;
    static redirectToFactor(factorId: string, redirectBack?: boolean, history?: any): Promise<void>;
    static redirectToFactorChooser(redirectBack?: boolean, history?: any): Promise<void>;
    static ComponentsOverrideProvider: import("react").FC<
        import("react").PropsWithChildren<{
            components: import("./types").ComponentOverrideMap;
        }>
    >;
}
declare const init: typeof Wrapper.init;
declare const getMFAInfo: typeof Wrapper.getMFAInfo;
declare const redirectToFactor: typeof Wrapper.redirectToFactor;
declare const redirectToFactorChooser: typeof Wrapper.redirectToFactorChooser;
declare const MultiFactorAuthComponentsOverrideProvider: import("react").FC<
    import("react").PropsWithChildren<{
        components: import("./types").ComponentOverrideMap;
    }>
>;
declare const MultiFactorAuthClaim: import("./multiFactorAuthClaim").MultiFactorAuthClaimClass;
export {
    init,
    getMFAInfo,
    redirectToFactor,
    redirectToFactorChooser,
    MultiFactorAuthComponentsOverrideProvider,
    GetRedirectionURLContext,
    PreAPIHookContext as PreAPIHookContext,
    OnHandleEventContext,
    UserInput,
    RecipeInterface,
    MultiFactorAuthClaim,
};
