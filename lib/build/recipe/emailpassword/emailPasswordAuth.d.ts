import * as React from "react";
export default function EmailPasswordAuthWrapper({
    children,
    requireAuth,
    onSessionExpired,
}: {
    children: React.ReactNode;
    requireAuth?: boolean;
    onSessionExpired?: () => void;
}): JSX.Element;
