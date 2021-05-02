import React, { useEffect } from "react";
import Logout from "./Logout";
import SuccessView from "./SuccessView";
import { useSessionContext } from "supertokens-auth-react/recipe/session";
import { signOut, redirectToAuth } from "supertokens-auth-react/recipe/emailpassword";
import { getRedirectToIfOnWrongSubdomain } from "../utils";

export default function Home() {
    const { userId } = useSessionContext();

    useEffect(() => {
        async function checkRedirect() {
            // If the user `abc` navigates to `xyz.example.com`, redirect them back to
            // their correct subdomain i.e `abc.example.com`
            let redirectTo = await getRedirectToIfOnWrongSubdomain();
            if (redirectTo !== undefined) {
                await signOut();
                window.location.href = redirectTo;
            }
        }

        checkRedirect();
    }, []);

    async function logoutClicked() {
        await signOut();
        redirectToAuth();
    }

    return (
        <div className="fill">
            <Logout logoutClicked={logoutClicked} />
            <SuccessView userId={userId} />
        </div>
    );
}
