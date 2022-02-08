import React from "react";
import Passwordless from "supertokens-auth-react/recipe/passwordless";
import Session from "supertokens-auth-react/recipe/session";

export default function SecondFactor() {
    React.useEffect(() => {
        // we redirect the user back to the auth screen in case
        // their first factor auth is not done
        async function doCheck() {
            // TODO: a better way of doing this would be to
            // call doesSessionExist with a context that tells
            // it to just run the original implementation only.
            // But until we have that feature, we use this.
            try {
                await Session.getAccessTokenPayloadSecurely();
            } catch (err) {
                if (err.message === "No session exists") {
                    window.location.href = "/auth";
                }
            }
        }
        doCheck();
    }, []);
    return <Passwordless.SignInUp />;
}
