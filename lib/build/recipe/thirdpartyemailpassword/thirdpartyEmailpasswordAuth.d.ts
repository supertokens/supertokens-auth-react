import * as React from "react";
import { PropsWithChildren } from "react";
declare const ThirdPartyEmailPasswordAuthWrapper: React.FC<
    PropsWithChildren<{
        requireAuth?: boolean;
        onSessionExpired?: () => void;
    }>
>;
export default ThirdPartyEmailPasswordAuthWrapper;
