import { SessionContainerInterface } from "supertokens-node/recipe/session/types";
import jwt_decode from "jwt-decode";

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
    };
}
