import { SessionContainerInterface } from "supertokens-node/recipe/session/types";
import jwt_decode from "jwt-decode";
import Session from "supertokens-node/recipe/session";
import SuperTokensError from "supertokens-node/lib/build/error";

export function makeSessionContainerFromJWT(jwt: string): SessionContainerInterface {
    let decoded: any = jwt_decode(jwt);
    return {
        getAccessToken: () => {
            return jwt;
        },
        getAccessTokenPayload: () => {
            return decoded;
        },
        getExpiry: async () => {
            return decoded.exp;
        },
        getHandle: () => {
            throw new Error("Unsupported operation");
        },
        getSessionData: async () => {
            throw new Error("Unsupported operation");
        },
        getTimeCreated: async () => {
            return decoded.iat;
        },
        getUserId: () => {
            return decoded.sub;
        },
        revokeSession: async () => {
            throw new Error("Unsupported operation");
        },
        updateAccessTokenPayload: async () => {
            throw new Error("Unsupported operation");
        },
        updateSessionData: async () => {
            throw new Error("Unsupported operation");
        },
        mergeIntoAccessTokenPayload: async () => {
            throw new Error("Unsupported operation");
        },
        assertClaims: async (claimValidators, ctx) => {
            const { invalidClaims } = await Session.validateClaimsInJWTPayload(
                decoded.sub,
                decoded,
                () => claimValidators,
                ctx
            );
            if (invalidClaims.length > 0) {
                throw new SuperTokensError({
                    type: "INVALID_CLAIMS",
                    message: "INVALID_CLAIMS",
                    payload: invalidClaims,
                });
            }
        },
        fetchAndSetClaim: async () => {
            throw new Error("Unsupported operation");
        },
        setClaimValue: async () => {
            throw new Error("Unsupported operation");
        },
        getClaimValue: async () => {
            throw new Error("Unsupported operation");
        },
        removeClaim: async () => {
            throw new Error("Unsupported operation");
        },
    };
}
