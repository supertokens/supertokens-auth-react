import React from "react";
import Logout from "./Logout";
import SuccessView from "./SuccessView";
import { useSessionContext, signOut } from "supertokens-auth-react/recipe/session";
import { getAuthDomain } from "../utils";

export default function Home() {
    const session = useSessionContext();

    async function logoutClicked() {
        await signOut();
        window.location.replace(getAuthDomain() + "?tenantId");
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
