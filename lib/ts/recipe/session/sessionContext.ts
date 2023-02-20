import React from "react";

import type { SessionContextType } from "./types";

const SessionContext = React.createContext<SessionContextType & { isDefault?: boolean }>({
    loading: true,
    isDefault: true,
});

export default SessionContext;
