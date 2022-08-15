import { SessionClaim } from "supertokens-web-js/recipe/session";

import useSessionContext from "./useSessionContext";

export const useClaimValue = <T>(
    claim: SessionClaim<T>
): { loading: true; value: undefined } | { loading: false; value: T | undefined } => {
    const ctx = useSessionContext();
    if (ctx.loading) {
        return {
            loading: true,
            value: undefined,
        };
    }
    return {
        loading: false,
        value: claim.getValueFromPayload(ctx.accessTokenPayload),
    };
};
