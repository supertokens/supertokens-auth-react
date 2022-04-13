import { api } from "../test.context";

export const EmailVerifiedClaim = {
    id: "st-ev",

    getValueFromPayload(payload, _userContext) {
        return payload[this.id]?.v;
    },

    async refresh(ctx) {
        await api.refreshEmailVerifiedInToken();
    },

    isVerified: {
        id: "st-ev",
        refresh: (ctx) => EmailVerifiedClaim.refresh(ctx),
        shouldRefresh: (payload, ctx) => {
            return (
                EmailVerifiedClaim.getValueFromPayload(payload, ctx) === undefined ||
                payload[EmailVerifiedClaim.id]?.t < Date.now() - 10_000
            );
        },
        validate: (payload, ctx) => ({ isValid: EmailVerifiedClaim.getValueFromPayload(payload, ctx) === true }),
    },
};
