/// <reference types="react" />
export default function EmailPasswordAuthWrapper({
    children,
    requireAuth,
    onSessionExpired,
}: {
    children: JSX.Element;
    requireAuth?: boolean;
    onSessionExpired?: () => void;
}): JSX.Element;
