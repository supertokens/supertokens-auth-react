import React, { PropsWithChildren } from "react";
declare type PropsWithoutAuth = {
    requireAuth?: false;
};
declare type PropsWithAuth = {
    requireAuth: true;
    redirectToLogin: () => void;
};
export declare type SessionAuthProps = (PropsWithoutAuth | PropsWithAuth) & {
    onSessionExpired?: () => void;
};
declare const SessionAuthWrapper: React.FC<
    PropsWithChildren<
        SessionAuthProps & {
            userContext?: any;
        }
    >
>;
export default SessionAuthWrapper;
