import React, { useEffect, useState } from "react";
import Logout from "./Logout";
import SuccessView from "./SuccessView";
import { useSessionContext } from "supertokens-auth-react/recipe/session";
import { signOut } from "supertokens-auth-react/recipe/emailpassword";
import { getAuthDomain, redirectIfOnWrongSubdomain } from "../utils";

export default function Home() {
    let session = useSessionContext();
    let [show, setShow] = useState(false);
    async function logoutClicked() {
        await signOut();
        window.location.replace(getAuthDomain());
    }
    useEffect(() => {
        // If the user `abc` navigates to `xyz.example.com`, redirect them back to
        // their correct subdomain i.e `abc.example.com`
        redirectIfOnWrongSubdomain().then((redirected) => {
            console.log(redirected);
            if (!redirected) {
                setShow(true);
            }
        });
    }, []);

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
