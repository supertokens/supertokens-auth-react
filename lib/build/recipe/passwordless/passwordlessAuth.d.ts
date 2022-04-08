import { PropsWithChildren } from "react";
export default function PasswordlessAuthWrapper({
    children,
    requireAuth,
    onSessionExpired,
}: PropsWithChildren<{
    requireAuth?: boolean;
    onSessionExpired?: () => void;
}>): JSX.Element;
