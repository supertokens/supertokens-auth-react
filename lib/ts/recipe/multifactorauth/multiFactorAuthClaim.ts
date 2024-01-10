import { MultiFactorAuthClaimClass as MultiFactorAuthClaimClassWebJS } from "supertokens-web-js/recipe/multifactorauth";

import { logDebugMessage } from "../../logger";

import type { SessionClaimValidator, UserContext, ValidationFailureCallback } from "../../types";
import type { RecipeInterface } from "supertokens-web-js/recipe/multifactorauth";
import type { MFARequirementList } from "supertokens-web-js/recipe/multifactorauth/types";

export class MultiFactorAuthClaimClass {
    private webJSClaim: MultiFactorAuthClaimClassWebJS;
    public readonly id: string;
    public readonly refresh: (userContext: any) => Promise<void>;
    public readonly getLastFetchedTime: (payload: any, _userContext?: UserContext) => number | undefined;
    public readonly getValueFromPayload: (
        payload: any,
        _userContext?: UserContext
    ) => { c: Record<string, number | undefined>; v: boolean } | undefined;
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
            context:
                | { action: "GO_TO_FACTOR"; factorId: string; forceSetup?: boolean }
                | { action: "FACTOR_CHOOSER"; nextFactorOptions?: string[] },
            userContext: any
        ) => Promise<string | undefined>,
        onFailureRedirection?: ValidationFailureCallback
    ) {
        this.webJSClaim = new MultiFactorAuthClaimClassWebJS(getRecipeImpl);
        this.refresh = this.webJSClaim.refresh;
        this.getLastFetchedTime = this.webJSClaim.getLastFetchedTime;
        this.getValueFromPayload = this.webJSClaim.getValueFromPayload;
        this.id = this.webJSClaim.id;

        const defaultOnFailureRedirection = async ({ reason, userContext }: any) => {
            const nextFactorOptions =
                reason.nextFactorOptions ||
                reason.oneOf ||
                reason.allOfInAnyOrder ||
                (reason.factorId !== undefined ? [reason.factorId] : undefined);

            if (nextFactorOptions !== undefined) {
                logDebugMessage(
                    "Redirecting to MFA on next array from validation failure: " + nextFactorOptions.join(", ")
                );
                // In this case we got here from a validator that defined the list of validators
                if (nextFactorOptions.length === 1) {
                    return getRedirectURL({ action: "GO_TO_FACTOR", factorId: nextFactorOptions[0] }, userContext);
                } else {
                    return getRedirectURL({ action: "FACTOR_CHOOSER", nextFactorOptions }, userContext);
                }
            } else {
                // If we got here, it means that the default validator failed
                const mfaInfo = await getRecipeImpl().resyncSessionAndFetchMFAInfo({ userContext });

                if (mfaInfo.factors.next.length !== 0) {
                    logDebugMessage(
                        "Redirecting to MFA on next array from backend: " + mfaInfo.factors.next.join(", ")
                    );
                    if (mfaInfo.factors.next.length === 1) {
                        return getRedirectURL(
                            { action: "GO_TO_FACTOR", factorId: mfaInfo.factors.next[0] },
                            userContext
                        );
                    } else {
                        return getRedirectURL({ action: "FACTOR_CHOOSER" }, userContext);
                    }
                }
            }

            // If this happens the user can't complete sign-in (the claim validator fails, but there is no valid next factor for us)
            // Returning undefined here will make SessionAuth render an access denied screen.
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
