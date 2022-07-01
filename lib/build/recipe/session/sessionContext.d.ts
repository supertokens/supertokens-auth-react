import React from "react";
import { SessionContextType } from "./types";
declare const SessionContext: React.Context<
    SessionContextType & {
        isDefault: boolean;
    }
>;
export declare function isDefaultContext(
    sessionContext: SessionContextType & {
        isDefault: boolean;
    }
): boolean;
export default SessionContext;
