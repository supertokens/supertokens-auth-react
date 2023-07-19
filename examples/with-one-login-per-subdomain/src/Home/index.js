import React from "react";
import Logout from "./Logout";
import SuccessView from "./SuccessView";
import { useSessionContext, signOut } from "supertokens-auth-react/recipe/session";
import { redirectToAuth } from "supertokens-auth-react";

export default function Home() {
    const session = useSessionContext();

    async function logoutClicked() {
        await signOut();
        redirectToAuth();
    }

    if (session.loading === true) {
        return null;
    }

    return (
        <div className="fill">
            <Logout logoutClicked={logoutClicked} />
            <SuccessView userId={session.userId} />
        </div>
    );
}
