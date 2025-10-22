import React from "react";
import type { Navigate, ReactComponentClass, SessionClaimValidator, UserContext } from "../../types";
import type { PropsWithChildren } from "react";
import type { ClaimValidationError } from "supertokens-web-js/recipe/session";
export declare type SessionAuthProps = {
    /**
     * For a detailed explanation please see https://github.com/supertokens/supertokens-auth-react/issues/570
     */
    requireAuth?: boolean;
    /**
     * For a detailed explanation please see https://github.com/supertokens/supertokens-auth-react/issues/570
     */
    doRedirection?: boolean;
    accessDeniedScreen?: ReactComponentClass<{
        userContext?: UserContext;
        navigate?: Navigate;
        validationError: ClaimValidationError;
    }>;
    onSessionExpired?: () => void;
    overrideGlobalClaimValidators?: (
        globalClaimValidators: SessionClaimValidator[],
        userContext: UserContext
    ) => SessionClaimValidator[];
};
declare const SessionAuthWrapper: React.FC<
    PropsWithChildren<
        SessionAuthProps & {
            userContext?: UserContext;
        }
    >
>;
export default SessionAuthWrapper;
