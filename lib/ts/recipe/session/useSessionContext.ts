import React from "react";

import SessionContext from "./sessionContext";
import { SessionContextType } from "./types";

const useSessionContext = (): SessionContextType => React.useContext(SessionContext);

export default useSessionContext;
