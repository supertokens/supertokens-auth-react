import * as React from "react";
import { SessionClaim } from "../session/types";
export default function EmailPasswordAuthWrapper({
    children,
    requireAuth,
    onSessionExpired,
    onMissingClaim,
    requiredClaims,
}: {
    children: React.ReactNode;
    requireAuth?: boolean;
    onSessionExpired?: () => void;
    onMissingClaim?: (claimId: string) => void;
    requiredClaims?: SessionClaim<any>[];
}): JSX.Element;
