import React, { PropsWithChildren } from "react";
import { SessionClaimValidator } from "./types";
export declare type SessionAuthProps = {
    requireAuth?: boolean;
    redirectToLogin?: () => void;
    onSessionExpired?: () => void;
    overwriteDefaultClaimValidators?: (
        defaultClaimValidators: SessionClaimValidator<any>[]
    ) => SessionClaimValidator<any>[];
};
declare const SessionAuthWrapper: React.FC<
    PropsWithChildren<
        SessionAuthProps & {
            userContext?: any;
        }
    >
>;
export default SessionAuthWrapper;
