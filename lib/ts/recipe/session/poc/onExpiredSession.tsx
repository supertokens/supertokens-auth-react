import React, { useContext, useEffect, useState } from "react";
import { SessionContextType } from "../types";
import { AuthenticationSourceContext } from "./authenticationSourceContext";
import { AuthenticationExpired } from "./authenticationExpired";
import { AuthenticationUpdated } from "./authenticationUpdated";

export const OnExpiredSession: React.FC<{
    render: (props: { session: SessionContextType | null; didSessionExpire: boolean }) => React.ReactElement | null;
}> = ({ render }) => {
    const [didSessionExpire, setDidSessionExpire] = useState(false);
    const [session, setSession] = useState<SessionContextType | null>(null);
    const source = useContext(AuthenticationSourceContext);

    // todo read current session state and set it. Should be synchronous

    useEffect(() => {
        return source.addListener(event => {
            if (event instanceof AuthenticationExpired) {
                return setDidSessionExpire(true);
            }

            if (event instanceof AuthenticationUpdated) {
                return setSession(() => ({
                    doesSessionExist: true,
                    userId: event.authentication.userId,
                    jwtPayload: event.authentication.jwtPayload,
                }));
            }
        });
    }, [source]);

    return render({ session, didSessionExpire });
};
