import { MultiFactorAuthClaimClass as MultiFactorAuthClaimClassWebJS } from "supertokens-web-js/recipe/multifactorauth";

import type { SessionClaimValidator, ValidationFailureCallback } from "../../types";
import type { RecipeInterface } from "supertokens-web-js/recipe/multifactorauth";
import type { MFARequirementList } from "supertokens-web-js/recipe/multifactorauth/types";

export class MultiFactorAuthClaimClass {
    private webJSClaim: MultiFactorAuthClaimClassWebJS;
    public readonly id: string;
    public readonly refresh: (userContext: any) => Promise<void>;
    public readonly getLastFetchedTime: (payload: any, _userContext?: any) => number | undefined;
    public readonly getValueFromPayload: (
        payload: any,
        _userContext?: any
    ) => { c: Record<string, number>; n: string[] } | undefined;
    public validators: Omit<
        MultiFactorAuthClaimClassWebJS["validators"],
        "hasCompletedDefaultFactors" | "hasCompletedFactors"
    > & {
        hasCompletedDefaultFactors: (
            doRedirection?: boolean,
            showAccessDeniedOnFailure?: boolean
        ) => SessionClaimValidator;
        hasCompletedFactors: (
            requirements: MFARequirementList,
            doRedirection?: boolean,
            showAccessDeniedOnFailure?: boolean
        ) => SessionClaimValidator;
    };

    constructor(
        getRecipeImpl: () => RecipeInterface,
        getRedirectURL: (
            context: { action: "GO_TO_FACTOR"; factorId: string } | { action: "FACTOR_CHOOSER" },
            userContext: any
        ) => Promise<string>,
        onFailureRedirection?: ValidationFailureCallback
    ) {
        this.webJSClaim = new MultiFactorAuthClaimClassWebJS(getRecipeImpl);
        this.refresh = this.webJSClaim.refresh;
        this.getLastFetchedTime = this.webJSClaim.getLastFetchedTime;
        this.getValueFromPayload = this.webJSClaim.getValueFromPayload;
        this.id = this.webJSClaim.id;

        const defaultOnFailureRedirection = ({ reason, userContext }: any) => {
            if (reason.nextFactorOptions !== undefined) {
                if (reason.nextFactorOptions.length === 1) {
                    return getRedirectURL(
                        { action: "GO_TO_FACTOR", factorId: reason.nextFactorOptions[0] },
                        userContext
                    );
                } else {
                    return getRedirectURL({ action: "FACTOR_CHOOSER" }, userContext);
                }
            }
            if (reason.factorId !== undefined) {
                return getRedirectURL({ action: "GO_TO_FACTOR", factorId: reason.factorId }, userContext);
            }

            // This should basically never happen, but it will show the access denied screen
            return undefined;
        };

        this.validators = {
            ...this.webJSClaim.validators,
            hasCompletedDefaultFactors: (doRedirection = true, showAccessDeniedOnFailure = true) => {
                const orig = this.webJSClaim.validators.hasCompletedDefaultFactors();
                return {
                    ...orig,
                    showAccessDeniedOnFailure,
                    onFailureRedirection:
                        onFailureRedirection ??
                        ((
                            { reason, userContext } // TODO: feels brittle to rely on reason
                        ) => (doRedirection ? defaultOnFailureRedirection({ reason, userContext }) : undefined)),
                };
            },

            hasCompletedFactors: (
                requirements: MFARequirementList,
                doRedirection = true,
                showAccessDeniedOnFailure = true
            ) => {
                const orig = this.webJSClaim.validators.hasCompletedFactors(requirements);
                return {
                    ...orig,
                    showAccessDeniedOnFailure,
                    onFailureRedirection:
                        onFailureRedirection ??
                        ((
                            { reason, userContext } // TODO: feels brittle to rely on reason
                        ) => (doRedirection ? defaultOnFailureRedirection({ reason, userContext }) : undefined)),
                };
            },
        };
    }
}