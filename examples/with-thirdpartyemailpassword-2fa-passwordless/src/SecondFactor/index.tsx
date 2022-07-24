import React from "react";
import { redirectToAuthWithoutRedirectToPath } from "supertokens-auth-react";
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
                redirectToAuthWithoutRedirectToPath();
            }
        }
        doCheck();
    }, []);
    return (
        <div
            style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
            }}>
            <Passwordless.SignInUp />
            <div
                onClick={async () => {
                    await Passwordless.clearLoginAttemptInfo();
                    await Session.signOut({
                        userContext: {
                            forceOriginalCheck: true,
                        },
                    });
                    redirectToAuthWithoutRedirectToPath();
                }}
                style={{
                    cursor: "pointer",
                    color: "blue",
                    textDecoration: "underline",
                }}>
                Login with another account
            </div>
        </div>
    );
}
