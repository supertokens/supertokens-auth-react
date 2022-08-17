import React, { PropsWithChildren } from "react";
import { SessionClaimValidator } from "supertokens-website";
export declare type SessionAuthProps = {
    requireAuth?: boolean;
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
