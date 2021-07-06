import React, { useContext } from "react";
import SessionContext from "../sessionContext";

export const RequireSession: React.FC<{
    whenNotExists: () => React.ReactElement | null;
}> = ({ whenNotExists, children }) => {
    const { doesSessionExist } = useContext(SessionContext);

    if (!doesSessionExist) {
        return whenNotExists();
    }

    return <>{children}</>;
};
