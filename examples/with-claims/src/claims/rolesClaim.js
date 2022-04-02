import { api } from "../api";

// This isn't really a PrimitiveClaim, but we could add some baseclass for this or extend that
class RolesClaimClass {
    constructor() {
        this.id = "st-role";
    }

    getValueFromPayload(payload, _userContext) {
        return payload[this.id]?.v;
    }

    async refresh(ctx) {
        await api.refreshRolesInToken();
    }

    hasRole(role) {
        return {
            refresh: (ctx) => this.refresh(ctx),
            shouldRefresh: (payload, ctx) =>
                this.getValueFromPayload(payload, ctx) === undefined || payload[this.id]?.t < Date.now() - 10000,
            isValid: (payload, ctx) => this.getValueFromPayload(payload, ctx).includes(role),
        };
    }
}

export const RolesClaim = new RolesClaimClass();
