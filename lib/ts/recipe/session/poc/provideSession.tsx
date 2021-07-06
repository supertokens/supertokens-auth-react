import React, { useEffect, useState } from "react";
import { AuthenticationSource } from "./authenticationSource";
import { SessionContextType } from "../types";
import SessionContext from "../sessionContext";
import { AuthenticationUpdated } from "./authenticationUpdated";
import { AuthenticationExpired } from "./authenticationExpired";
import { AuthenticationSourceContext } from "./authenticationSourceContext";

export const ProvideSession: React.FC<{
    source: AuthenticationSource;
}> = ({ source, children }) => {
    const [session, setSession] = useState<SessionContextType>({
        doesSessionExist: false,
        jwtPayload: {},
        userId: "",
    });

    useEffect(() => {
        return source.addListener(event => {
            setSession(() => {
                if (event instanceof AuthenticationUpdated) {
                    return {
                        userId: event.authentication.userId,
                        jwtPayload: event.authentication.jwtPayload,
                        doesSessionExist: true,
                    };
                }

                if (event instanceof AuthenticationExpired) {
                    return {
                        userId: "",
                        jwtPayload: {},
                        doesSessionExist: false,
                    };
                }

                throw new Error("Not all authentication events have a handler. This is issue with this library.");
            });
        });
    }, [source]);

    return <AuthenticationSourceContext.Provider value={source}>
        <SessionContext.Provider value={session}>
            {children}
        </SessionContext.Provider>
    </AuthenticationSourceContext.Provider>;
};
