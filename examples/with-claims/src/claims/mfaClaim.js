const claimIds = ["st-mfa-otp", "st-mfa-totp"];

// This isn't really a PrimitiveClaim, but we could add some baseclass for this or extend that
class MFAClaimClass {
    constructor() {
        this.id = "st-mfa";
    }

    getValueFromPayload(payload, _userContext) {
        return claimIds.reduce((acc, curr) => acc || payload[curr]?.v === true, false);
    }

    refresh(ctx) {}

    isVerified = {
        refresh: (ctx) => this.refresh(ctx),
        shouldRefresh: (payload, ctx) => false,
        isValid: (payload, ctx) => this.getValueFromPayload(payload, ctx) === true,
    };
}

export const MFAClaim = new MFAClaimClass();
