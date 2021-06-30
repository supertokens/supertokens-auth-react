import React from "react";

import SessionContext from "./SessionContext";
import { SessionContextType } from "./types";

const useSessionContext = (): SessionContextType => React.useContext(SessionContext);

export default useSessionContext;
