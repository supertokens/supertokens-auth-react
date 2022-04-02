import { SessionClaim, SessionClaimChecker } from "supertokens-node/recipe/session";
import { roleDB } from "../mockRoleDb";

// This isn't really a PrimitiveClaim, but we could add some baseclass for this or extend that
class RolesClaimClass extends SessionClaim<string[]> {
    constructor() {
        super("st-role");
    }

    addToPayload(payload: any, value: string[], _userContext: any): any {
        return {
            ...payload,
            [this.id]: {
                v: value,
                t: new Date().getTime(),
            },
        };
    }
    removeFromPayload(payload: any, _userContext: any): any {
        const res = {
            ...payload,
        };
        delete res[this.id];
        return res;
    }

    getValueFromPayload(payload: any, _userContext: any): string[] {
        return payload[this.id]?.v;
    }

    fetch(userId: string, ctx: any) {
        console.log("fetching role");
        return roleDB.get(userId) || [];
    }

    hasRole(role: string): SessionClaimChecker {
        return {
            claim: this,
            shouldRefetch: (payload, ctx) => {
                return this.getValueFromPayload(payload, ctx) === undefined;
            },
            isValid: (payload, ctx) => {
                return this.getValueFromPayload(payload, ctx).includes(role);
            },
        };
    }
}

export const RolesClaim = new RolesClaimClass();
