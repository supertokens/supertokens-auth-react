import React from "react";
import { SessionContextType } from "./types";
declare const SessionContext: React.Context<
    SessionContextType & {
        isDefault?: boolean | undefined;
    }
>;
export default SessionContext;
