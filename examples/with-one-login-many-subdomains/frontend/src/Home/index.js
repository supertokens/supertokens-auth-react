import React from "react";
import Logout from "./Logout";
import SuccessView from "./SuccessView";
import { useSessionContext } from "supertokens-auth-react/recipe/session";
import { signOut } from "supertokens-auth-react/recipe/emailpassword";
import { getAuthDomain } from "../utils";

export default function Home() {
    let session = useSessionContext();
    async function logoutClicked() {
        await signOut();
        window.location.replace(getAuthDomain());
    }

    return (
        <div className="fill">
            <Logout logoutClicked={logoutClicked} />
            <SuccessView userId={session.userId} />
        </div>
    );
}
