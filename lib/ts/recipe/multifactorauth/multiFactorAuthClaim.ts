import { MultiFactorAuthClaimClass as MultiFactorAuthClaimClassWebJS } from "supertokens-web-js/recipe/multifactorauth";

import { logDebugMessage } from "../../logger";

import type { SecondaryFactorRedirectionInfo } from "./types";
import type { SessionClaimValidator, UserContext, ValidationFailureCallback } from "../../types";
import type { RecipeInterface } from "supertokens-web-js/recipe/multifactorauth";
import type { MFARequirementList } from "supertokens-web-js/recipe/multifactorauth/types";

export class MultiFactorAuthClaimClass {
    private webJSClaim: MultiFactorAuthClaimClassWebJS;
    public readonly id: string;
    public readonly refresh: (userContext: UserContext) => Promise<void>;
    public readonly getLastFetchedTime: (payload: any, _userContext?: UserContext) => number | undefined;
    public readonly getValueFromPayload: (
        payload: any,
        _userContext?: UserContext
    ) => { c: Record<string, number | undefined>; v: boolean } | undefined;
    public validators: Omit<
        MultiFactorAuthClaimClassWebJS["validators"],
        "hasCompletedMFARequirementsForAuth" | "hasCompletedFactors"
    > & {
        hasCompletedMFARequirementsForAuth: (
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
        getRecipe: () => {
            webJSRecipe: RecipeInterface;
            getSecondaryFactors: (ctx: UserContext) => SecondaryFactorRedirectionInfo[];
        },
        getRedirectURL: (
            context:
                | { action: "GO_TO_FACTOR"; factorId: string; forceSetup?: boolean }
                | { action: "FACTOR_CHOOSER"; nextFactorOptions?: string[] },
            userContext: UserContext
        ) => Promise<string | undefined>,
        onFailureRedirection?: ValidationFailureCallback
    ) {
        this.webJSClaim = new MultiFactorAuthClaimClassWebJS(() => getRecipe().webJSRecipe);
        this.refresh = this.webJSClaim.refresh;
        this.getLastFetchedTime = this.webJSClaim.getLastFetchedTime;
        this.getValueFromPayload = this.webJSClaim.getValueFromPayload;
        this.id = this.webJSClaim.id;

        const defaultOnFailureRedirection = async ({ reason, userContext }: any) => {
            const recipe = getRecipe();
            const nextFactorOptions =
                reason.oneOf ||
                reason.allOfInAnyOrder ||
                (reason.factorId !== undefined ? [reason.factorId] : undefined);

            if (nextFactorOptions !== undefined) {
                logDebugMessage(
                    "Redirecting to MFA on next array from validation failure: " + nextFactorOptions.join(", ")
                );
                const availableFactors = recipe
                    .getSecondaryFactors(userContext)
                    .filter((v) => nextFactorOptions.factors.next.includes(v.id))
                    .map((v) => v.id);
                // In this case we got here from a validator that defined the list of validators
                if (availableFactors.length === 1) {
                    return getRedirectURL({ action: "GO_TO_FACTOR", factorId: availableFactors[0] }, userContext);
                } else {
                    return getRedirectURL({ action: "FACTOR_CHOOSER", nextFactorOptions }, userContext);
                }
            } else {
                // If we got here, it means that the default validator failed
                const mfaInfo = await recipe.webJSRecipe.resyncSessionAndFetchMFAInfo({ userContext });
                const availableFactors = recipe
                    .getSecondaryFactors(userContext)
                    .filter((v) => mfaInfo.factors.next.includes(v.id))
                    .map((v) => v.id);

                if (availableFactors.length !== 0) {
                    logDebugMessage("Redirecting to MFA on next array from backend: " + availableFactors.join(", "));
                    if (availableFactors.length === 1) {
                        return getRedirectURL({ action: "GO_TO_FACTOR", factorId: availableFactors[0] }, userContext);
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
            hasCompletedMFARequirementsForAuth: (doRedirection = true, showAccessDeniedOnFailure = true) => {
                const orig = this.webJSClaim.validators.hasCompletedMFARequirementsForAuth();
                return {
                    ...orig,
                    showAccessDeniedOnFailure,
                    onFailureRedirection:
                        onFailureRedirection ??
                        (({ reason, userContext }) =>
                            doRedirection ? defaultOnFailureRedirection({ reason, userContext }) : undefined),
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
                        (({ reason, userContext }) =>
                            doRedirection ? defaultOnFailureRedirection({ reason, userContext }) : undefined),
                };
            },
        };
    }
}
