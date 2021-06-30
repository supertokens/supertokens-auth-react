import React from "react";
import { SessionContextType } from "./types";
declare const SessionContext: React.Context<SessionContextType>;
export declare function isDefaultContext(sessionContext: SessionContextType): boolean;
export default SessionContext;
