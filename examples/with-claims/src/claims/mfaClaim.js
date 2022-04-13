const claimIds = ["st-mfa-otp", "st-mfa-totp"];

class MFAClaimClass {
    constructor() {
        this.id = "st-mfa";
    }

    getValueFromPayload(payload, _userContext) {
        return claimIds.reduce((acc, curr) => acc || payload[curr]?.v, undefined);
    }

    refresh(ctx) {}

    completed2FA() {
        return {
            id: this.id,
            refresh: (ctx) => this.refresh(ctx),
            shouldRefresh: (payload, ctx) => false,
            validate: (payload, ctx) => ({ isValid: this.getValueFromPayload(payload, ctx) === true }),
        };
    }
}

export const MFAClaim = new MFAClaimClass();
