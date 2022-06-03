import React from "react";
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
declare const SessionAuthWrapper: React.FC<
    Props & {
        userContext?: any;
    }
>;
export default SessionAuthWrapper;
