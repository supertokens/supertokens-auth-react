import React from "react";
declare type Props = {
    requireAuth?: boolean;
    redirectToLogin: () => void;
};
declare const SessionAuth: React.FC<Props>;
export default SessionAuth;
