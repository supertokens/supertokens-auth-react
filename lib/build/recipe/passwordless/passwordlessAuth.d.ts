import { PropsWithChildren } from "react";
export default function PasswordlessAuthWrapper({
    children,
    requireAuth,
    onSessionExpired,
    userContext,
}: PropsWithChildren<{
    requireAuth?: boolean;
    onSessionExpired?: () => void;
    userContext?: any;
}>): import("@emotion/react/jsx-runtime").JSX.Element;
