import React from "react";
import { SessionContextType } from "./types";

const SessionContext = React.createContext<SessionContextType & { isDefault?: boolean }>({
    loading: true,
    isDefault: true,
});

export default SessionContext;
