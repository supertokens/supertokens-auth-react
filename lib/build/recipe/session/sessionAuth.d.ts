import React from "react";
declare type Props = {
    requireAuth?: boolean;
    redirectToLogin: () => void;
};
/**
 * SessionAuth provides a layer of compatibility between AuthenticationContext and previous APIs.
 * It maps AuthenticationContext to SessionContext
 */
declare const SessionAuth: React.FC<Props>;
export default SessionAuth;
