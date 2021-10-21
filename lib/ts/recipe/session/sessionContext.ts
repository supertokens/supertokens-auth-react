import React from "react";
import { SessionContextType } from "./types";

const SessionContext = React.createContext<SessionContextType>({
    doesSessionExist: false,
    userId: "DEFAULT_USER_ID",
    accessTokenPayload: {},
});

export function isDefaultContext(sessionContext: SessionContextType): boolean {
    return sessionContext.userId === "DEFAULT_USER_ID";
}

export default SessionContext;
