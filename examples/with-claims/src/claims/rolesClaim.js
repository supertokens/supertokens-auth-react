import { api } from "../test.context";

class RolesClaimClass {
    constructor() {
        this.key = "st-r";
    }

    getValueFromPayload(payload, _userContext) {
        return payload[this.key]?.v;
    }

    async refresh(ctx) {
        await api.refreshRolesInToken();
    }

    hasRole = {
        includes: (role) => {
            return {
                id: this.key + "-" + role,
                refresh: (ctx) => this.refresh(ctx),
                shouldRefresh: (payload, ctx) => this.getValueFromPayload(payload, ctx) === undefined,
                validate: (payload, ctx) => {
                    return this.getValueFromPayload(payload, ctx).includes(role)
                        ? { isValid: true }
                        : { isValid: false, reason: { missingRole: role } };
                },
            };
        },
    };
}

export const RolesClaim = new RolesClaimClass();
