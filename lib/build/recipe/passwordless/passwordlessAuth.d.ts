import { PropsWithChildren } from "react";
import { SessionClaimValidator } from "../session/types";
export default function PasswordlessAuthWrapper({
    children,
    requireAuth,
    onSessionExpired,
    requiredClaims,
}: PropsWithChildren<{
    requireAuth?: boolean;
    onSessionExpired?: () => void;
    requiredClaims?: SessionClaimValidator<any>[];
}>): JSX.Element;
