import React, { useContext } from "react";
import SessionContext from "./sessionContext";

type Props = {
    requireSession?: boolean;
};

export const RequireSession: React.FC<Props> = ({ children, requireSession = true }) => {
    const { doesSessionExist } = useContext(SessionContext);

    if (requireSession === false) {
        return <>{children}</>;
    }

    return doesSessionExist ? <>{children}</> : null;
};
