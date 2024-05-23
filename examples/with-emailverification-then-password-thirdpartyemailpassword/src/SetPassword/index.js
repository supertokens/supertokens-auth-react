import React from "react";
import { AuthPage } from "supertokens-auth-react/ui";
import { EmailPasswordPreBuiltUI } from "supertokens-auth-react/recipe/emailpassword/prebuiltui";

/*
You can build your own UI here to ask the user's password and then call the sign up API.
But for demo purposes, I reused the <AuthPage /> component and used JS to modify it as needed.

That being said, I recommend to build your own UI for this page.
*/
export default function SetPassword() {
    return (
        <AuthPage
            preBuiltUIList={[EmailPasswordPreBuiltUI]}
            redirectOnSessionExists={false}
            factors={["emailpassword"]}
            isSignUp={true}
        />
    );
}
