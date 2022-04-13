import * as React from "react";
import { SessionClaimValidator } from "../session/types";
export default function ThirdPartyPasswordlessAuthWrapper({
    children,
    requireAuth,
    onSessionExpired,
    requiredClaims,
}: {
    children: React.ReactNode;
    requireAuth?: boolean;
    onSessionExpired?: () => void;
    requiredClaims?: SessionClaimValidator<any>[];
}): JSX.Element;
