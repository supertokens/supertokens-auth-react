import React from "react";
import Session from "supertokens-auth-react/recipe/session";
import { SignInAndUp } from "supertokens-auth-react/recipe/thirdpartyemailpassword";

/*
You can build your own UI here to ask the user's password and then call the sign up API.
But for demo purposes, I reused the <SignInAndUp /> component and used JS to modify it as needed.

That being said, I recommend to build your own UI for this page.
*/
export default function SetPassword() {
    const [showUI, setShowUI] = React.useState(false);
    React.useEffect(() => {
        {
            // This block is only necessary cause I am reusing <SignInAndUp />
            const urlParams = new URLSearchParams(window.location.search);
            const show = urlParams.get("show");
            if (show === null) {
                urlParams.set("show", "signup");
                window.location.search = urlParams.toString();
                return;
            }
        }

        // Here we check if the session exists. If it doesn't, we redirect the user
        // to the /auth route.
        Session.getAccessTokenPayloadSecurely()
            .then(() => {
                setShowUI(true);
            })
            .catch((err) => {
                if (err.message === "No session exists") {
                    window.location.href = "/auth";
                }
            });
    }, []);

    if (!showUI) {
        return null;
    } else {
        return <SignInAndUp redirectOnSessionExists={false} />;
    }
}
