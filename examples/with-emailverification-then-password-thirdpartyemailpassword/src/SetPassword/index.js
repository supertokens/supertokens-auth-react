import React from "react";
import { SignInAndUp } from "supertokens-auth-react/recipe/thirdpartyemailpassword";

/*
You can build your own UI here to ask the user's password and then call the sign up API.
But for demo purposes, I reused the <SignInAndUp /> component and used JS to modify it as needed.

That being said, I recommend to build your own UI for this page.
*/
export default function SetPassword() {
    React.useEffect(() => {
        // This block is only necessary cause I am reusing <SignInAndUp />
        const urlParams = new URLSearchParams(window.location.search);
        const show = urlParams.get("show");
        if (show === null) {
            urlParams.set("show", "signup");
            window.location.search = urlParams.toString();
            return;
        }
    }, []);

    return <SignInAndUp redirectOnSessionExists={false} />;
}
