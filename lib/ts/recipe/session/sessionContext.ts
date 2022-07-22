import React from "react";
import { SessionContextType } from "./types";

const SessionContext = React.createContext<SessionContextType & { isDefault: boolean }>({
    loading: true,
    isDefault: true,
});

// ts-prune-ignore-next
export function isDefaultContext(sessionContext: SessionContextType & { isDefault: boolean }): boolean {
    return sessionContext.isDefault;
}

export default SessionContext;
