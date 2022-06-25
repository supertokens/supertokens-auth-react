import React from "react";

import SessionContext from "./sessionContext";
import { SessionContextType } from "./types";

const useSessionContext = (): SessionContextType => {
    const ctx = React.useContext(SessionContext);

    if (ctx.isDefault) {
        throw new Error("Cannot use useSessionContext outside auth components.");
    }
    return ctx;
};

export default useSessionContext;
