import React from "react";
import { SessionClaim } from "./types";
declare type PropsWithoutAuth = {
    requireAuth?: false;
};
declare type PropsWithAuth = {
    requireAuth: true;
    redirectToLogin: () => void;
};
declare type Props = (PropsWithoutAuth | PropsWithAuth) & {
    onSessionExpired?: () => void;
    requiredClaims?: SessionClaim<any>[];
    onMissingClaim?: (claimId: string) => void;
};
declare const SessionAuth: React.FC<Props>;
export default SessionAuth;
