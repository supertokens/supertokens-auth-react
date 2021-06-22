import React, { useState } from "react";
import { AuthenticationContext } from "./AuthenticationContext";
import { Authentication } from "supertokens-website/lib/ts/Authentication";

export const AuthenticationProvider: React.FC = ({ children }) => {
    const [authentication, setAuthentication] = useState<Authentication | undefined>();

    // TODO: Receive Authentication object and update context value accordingly

    return <AuthenticationContext.Provider value={authentication}>{children}</AuthenticationContext.Provider>;
};
