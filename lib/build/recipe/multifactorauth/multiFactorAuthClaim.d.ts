import { MultiFactorAuthClaimClass as MultiFactorAuthClaimClassWebJS } from "supertokens-web-js/recipe/multifactorauth";
import type { SecondaryFactorRedirectionInfo } from "./types";
import type { SessionClaimValidator, UserContext, ValidationFailureCallback } from "../../types";
import type { RecipeInterface } from "supertokens-web-js/recipe/multifactorauth";
import type { MFARequirementList } from "supertokens-web-js/recipe/multifactorauth/types";
export declare class MultiFactorAuthClaimClass {
    private webJSClaim;
    readonly id: string;
    readonly refresh: (userContext: UserContext) => Promise<void>;
    readonly getLastFetchedTime: (payload: any, _userContext?: UserContext) => number | undefined;
    readonly getValueFromPayload: (
        payload: any,
        _userContext?: UserContext
    ) =>
        | {
              c: Record<string, number | undefined>;
              v: boolean;
          }
        | undefined;
    validators: Omit<
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
                | {
                      action: "GO_TO_FACTOR";
                      factorId: string;
                      forceSetup?: boolean;
                  }
                | {
                      action: "FACTOR_CHOOSER";
                      nextFactorOptions?: string[];
                  },
            userContext: UserContext
        ) => Promise<string | undefined>,
        onFailureRedirection?: ValidationFailureCallback
    );
}
