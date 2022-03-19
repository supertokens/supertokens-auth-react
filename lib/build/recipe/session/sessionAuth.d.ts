import React from "react";
import { Grant } from "./types";
declare type PropsWithoutAuth = {
    requireAuth?: false;
};
declare type PropsWithAuth = {
    requireAuth: true;
    redirectToLogin: () => void;
};
declare type Props = (PropsWithoutAuth | PropsWithAuth) & {
    requiredGrants?: Grant<any>[];
    onSessionExpired?: () => void;
    onMissingGrant?: (grantKey: string) => void;
};
declare const SessionAuth: React.FC<Props>;
export default SessionAuth;
