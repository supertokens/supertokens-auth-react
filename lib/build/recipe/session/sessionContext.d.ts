import React from "react";
import type { SessionContextType } from "./types";
declare const SessionContext: React.Context<
    SessionContextType & {
        isDefault?: boolean | undefined;
    }
>;
export default SessionContext;
