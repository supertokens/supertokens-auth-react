import useSessionContext from "./useSessionContext";

import type { SessionClaim } from "supertokens-web-js/recipe/session";

export const useClaimValue = <T>(
    claim: SessionClaim<T>
): { loading: true } | { loading: false; doesSessionExist: boolean; value: T | undefined } => {
    const ctx = useSessionContext();

    if (ctx.loading) {
        return {
            loading: true,
        };
    }

    if (ctx.doesSessionExist === false) {
        return {
            loading: false,
            doesSessionExist: false,
            value: undefined,
        };
    }

    return {
        loading: false,
        doesSessionExist: true,
        value: claim.getValueFromPayload(ctx.accessTokenPayload),
    };
};
