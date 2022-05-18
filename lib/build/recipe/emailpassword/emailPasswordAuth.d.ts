import * as React from "react";
import { SessionClaimValidator } from "../session/types";
import { PropsWithChildren } from "react";
declare const EmailPasswordAuthWrapper: React.FC<
    PropsWithChildren<{
        requireAuth?: boolean;
        onSessionExpired?: () => void;
        requiredClaims?: SessionClaimValidator<any>[];
    }>
>;
export default EmailPasswordAuthWrapper;
