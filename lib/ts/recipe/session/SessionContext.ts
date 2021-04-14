import React from "react";
import { SessionContextType } from "./types";

const SessionContext = React.createContext<SessionContextType>({
    doesSessionExist: false,
    userId: "",
    jwtPayload: {},
});

export default SessionContext;
