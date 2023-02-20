import React from "react";
import type { PropsWithChildren } from "react";
import type { SessionClaimValidator } from "supertokens-web-js/recipe/session";
export declare type SessionAuthProps = {
    /**
     * For a detailed explanation please see https://github.com/supertokens/supertokens-auth-react/issues/570
     */
    requireAuth?: boolean;
    /**
     * For a detailed explanation please see https://github.com/supertokens/supertokens-auth-react/issues/570
     */
    doRedirection?: boolean;
    onSessionExpired?: () => void;
    overrideGlobalClaimValidators?: (
        globalClaimValidators: SessionClaimValidator[],
        userContext: any
    ) => SessionClaimValidator[];
};
declare const SessionAuthWrapper: React.FC<
    PropsWithChildren<
        SessionAuthProps & {
            userContext?: any;
        }
    >
>;
export default SessionAuthWrapper;
