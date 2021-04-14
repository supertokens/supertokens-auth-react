import React from "react";
import { SessionContextType } from "./types";

const SessionContext = React.createContext<SessionContextType>({ doesSessionExist: false, userId: "" });

export default SessionContext;
