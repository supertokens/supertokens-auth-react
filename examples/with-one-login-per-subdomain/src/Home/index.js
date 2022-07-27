import React, { useEffect, useState } from "react";
import Logout from "./Logout";
import SuccessView from "./SuccessView";
import { useSessionContext } from "supertokens-auth-react/recipe/session";
import { signOut } from "supertokens-auth-react/recipe/emailpassword";
import { redirectToAuth } from "supertokens-auth-react";
import { getRedirectToIfOnWrongSubdomain } from "../utils";

export default function Home() {
    const session = useSessionContext();
    let [show, setShow] = useState(false);

    useEffect(() => {
        async function checkRedirect() {
            // If the user `abc` navigates to `xyz.example.com`, redirect them back to
            // their correct subdomain i.e `abc.example.com`
            let redirectTo = await getRedirectToIfOnWrongSubdomain();
            if (redirectTo !== undefined) {
                window.location.href = redirectTo;
            } else {
                setShow(true);
            }
        }

        checkRedirect();
    }, []);

    async function logoutClicked() {
        await signOut();
        redirectToAuth();
    }

    if (session.loading === true) {
        return null;
    }

    if (show) {
        return (
            <div className="fill">
                <Logout logoutClicked={logoutClicked} />
                <SuccessView userId={session.userId} />
            </div>
        );
    } else {
        return null;
    }
}
