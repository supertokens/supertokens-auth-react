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
    requiredClaims?: SessionClaim<any>[];
    onSessionExpired?: () => void;
    onMissingClaim?: (claimId: string) => void;
};
declare const SessionAuth: React.FC<Props>;
export default SessionAuth;
