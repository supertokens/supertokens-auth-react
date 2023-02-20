import React from "react";

import SessionContext from "./sessionContext";

import type { SessionContextType } from "./types";

const useSessionContext = (): SessionContextType => {
    const ctx = React.useContext(SessionContext);

    if (ctx.isDefault === true) {
        throw new Error("Cannot use useSessionContext outside auth wrapper components.");
    }
    return ctx;
};

export default useSessionContext;
