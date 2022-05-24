import * as React from "react";
import { PropsWithChildren } from "react";
declare const EmailPasswordAuthWrapper: React.FC<
    PropsWithChildren<{
        requireAuth?: boolean;
        onSessionExpired?: () => void;
        userContext?: any;
    }>
>;
export default EmailPasswordAuthWrapper;
