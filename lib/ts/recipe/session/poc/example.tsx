import React from "react";
import { Session } from "./session";

const App = () => {
    return <>
        <Session.Provide>
            <h1>I will be rendered</h1>
            <Session.Require whenNotExists={() => {
                return <h1>I'm rendered when session doesn't exist</h1>
            }}>
                <h1>I will be rendered when session exists</h1>
            </Session.Require>
            <Session.OnExpired render={({ didSessionExpire, session }) => {
                if (session !== null) {
                    // session exists
                    return <h1>{session.userId}</h1>;
                }

                if (session === null) {
                    // session doesn't exist
                }

                return null;
            }} />
        </Session.Provide>
    </>;
}