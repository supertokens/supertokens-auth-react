import * as React from "react";
export default function EmailPasswordAuthWrapper({
    children,
    requireAuth,
    onSessionExpired,
    userContext,
}: {
    children: React.ReactNode;
    requireAuth?: boolean;
    onSessionExpired?: () => void;
    userContext?: any;
}): JSX.Element;
