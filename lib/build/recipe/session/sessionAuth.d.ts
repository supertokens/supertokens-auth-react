import React, { PropsWithChildren } from "react";
import { SessionClaimValidator } from "./types";
declare type PropsWithoutAuth = {
    requireAuth?: false;
};
declare type PropsWithAuth = {
    requireAuth: true;
    redirectToLogin: () => void;
};
declare type Props = (PropsWithoutAuth | PropsWithAuth) & {
    onSessionExpired?: () => void;
    claimValidators?: SessionClaimValidator<any>[];
};
declare const SessionAuth: React.FC<PropsWithChildren<Props>>;
export default SessionAuth;
