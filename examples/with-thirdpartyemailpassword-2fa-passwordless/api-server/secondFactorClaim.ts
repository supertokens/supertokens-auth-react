import { BooleanClaim } from "supertokens-node/recipe/session/claims";

export const SecondFactorClaim = new BooleanClaim({
    fetchValue: () => false,
    key: "2fa-completed",
});
