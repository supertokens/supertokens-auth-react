import * as React from "react";
import { PropsWithChildren } from "react";
declare const ThirdPartyPasswordlessAuthWrapper: React.FC<
    PropsWithChildren<{
        requireAuth?: boolean;
        onSessionExpired?: () => void;
        userContext?: any;
    }>
>;
export default ThirdPartyPasswordlessAuthWrapper;
