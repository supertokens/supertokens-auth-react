import React, { PropsWithChildren } from "react";
declare type PropsWithoutAuth = {
    requireAuth?: false;
};
declare type PropsWithAuth = {
    requireAuth: true;
    redirectToLogin: () => void;
};
declare type Props = (PropsWithoutAuth | PropsWithAuth) & {
    onSessionExpired?: () => void;
};
declare const SessionAuth: React.FC<PropsWithChildren<Props>>;
export default SessionAuth;
