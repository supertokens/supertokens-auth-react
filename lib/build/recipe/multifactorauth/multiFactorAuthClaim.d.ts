import { MultiFactorAuthClaimClass as MultiFactorAuthClaimClassWebJS } from "supertokens-web-js/recipe/multifactorauth";
import type { SessionClaimValidator, ValidationFailureCallback } from "../../types";
import type { RecipeInterface } from "supertokens-web-js/recipe/multifactorauth";
import type { MFARequirementList } from "supertokens-web-js/recipe/multifactorauth/types";
export declare class MultiFactorAuthClaimClass {
    private webJSClaim;
    readonly id: string;
    readonly refresh: (userContext: any) => Promise<void>;
    readonly getLastFetchedTime: (payload: any, _userContext?: any) => number | undefined;
    readonly getValueFromPayload: (
        payload: any,
        _userContext?: any
    ) =>
        | {
              c: Record<string, number>;
              n: string[];
          }
        | undefined;
    validators: Omit<
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
                | {
                      action: "GO_TO_FACTOR";
                      factorId: string;
                      forceSetup?: boolean;
                  }
                | {
                      action: "FACTOR_CHOOSER";
                      nextFactorOptions?: string[];
                  },
            userContext: any
        ) => Promise<string>,
        onFailureRedirection?: ValidationFailureCallback
    );
}
