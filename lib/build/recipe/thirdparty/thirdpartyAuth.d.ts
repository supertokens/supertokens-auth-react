import * as React from "react";
import { PropsWithChildren } from "react";
declare const ThirdPartyAuthWrapper: React.FC<
    PropsWithChildren<{
        requireAuth?: boolean;
        onSessionExpired?: () => void;
        userContext?: any;
    }>
>;
export default ThirdPartyAuthWrapper;
