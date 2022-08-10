import React from "react";
import Passwordless from "supertokens-auth-react/recipe/passwordless";
import Session from "supertokens-auth-react/recipe/session";

export default function SecondFactor() {
    React.useEffect(() => {
        // we redirect the user back to the auth screen in case
        // their first factor auth is not done
        async function doCheck() {
            if (
                !(await Session.doesSessionExist({
                    userContext: {
                        forceOriginalCheck: true,
                    },
                }))
            ) {
                window.location.href = "/auth";
            }
        }
        doCheck();
    }, []);
    return <Passwordless.SignInUp redirectOnSessionExists={false} />;
}
