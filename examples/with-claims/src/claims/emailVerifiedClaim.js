import { api } from "../api";

export const EmailVerifiedClaim = {
    id: "st-email-verified",

    getValueFromPayload(payload, _userContext) {
        return payload[this.id]?.v;
    },

    async refresh(ctx) {
        await api.refreshEmailVerifiedInToken();
    },

    isVerified: {
        id: "st-email-verified",
        refresh: (ctx) => EmailVerifiedClaim.refresh(ctx),
        shouldRefresh: (payload, ctx) => {
            return (
                EmailVerifiedClaim.getValueFromPayload(payload, ctx) === undefined ||
                payload[EmailVerifiedClaim.id]?.t < Date.now() - 10000
            );
        },
        isValid: (payload, ctx) => EmailVerifiedClaim.getValueFromPayload(payload, ctx) === true,
    },
};
