/// <reference types="react" />
import { RecipeInterface } from "supertokens-web-js/recipe/multifactorauth";
import { GetRedirectionURLContext, PreAPIHookContext, OnHandleEventContext } from "./types";
import { UserInput } from "./types";
import type { UserContext } from "../../types";
import type { RecipeFunctionOptions } from "supertokens-web-js/recipe/multifactorauth";
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
    static resyncSessionAndFetchMFAInfo(input?: {
        userContext?: UserContext;
        options?: RecipeFunctionOptions;
    }): Promise<{
        status: "OK";
        nextFactors: string[];
        emails: Record<string, string[] | undefined>;
        phoneNumbers: Record<string, string[] | undefined>;
        fetchResponse: Response;
    }>;
    static redirectToFactor(
        factorId: string,
        forceSetup?: boolean,
        redirectBack?: boolean,
        history?: any
    ): Promise<void>;
    static redirectToFactorChooser(redirectBack?: boolean, nextFactorOptions?: string[], history?: any): Promise<void>;
    static ComponentsOverrideProvider: import("react").FC<
        import("react").PropsWithChildren<{
            components: import("./types").ComponentOverrideMap;
        }>
    >;
}
declare const init: typeof Wrapper.init;
declare const resyncSessionAndFetchMFAInfo: typeof Wrapper.resyncSessionAndFetchMFAInfo;
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
    resyncSessionAndFetchMFAInfo,
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
