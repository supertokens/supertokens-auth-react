import React from "react";
import Logout from "./Logout";
import SuccessView from "./SuccessView";
import Session from "supertokens-auth-react/recipe/session";
import { signOut } from "supertokens-auth-react/recipe/emailpassword";
import { getAuthDomain } from "../utils";
import { useEffect, useState } from "react";

export default function Home() {
    let [userId, setUserId] = useState("");
    useEffect(() => {
        Session.getUserId().then(u => {
            setUserId(u)
        });
    });
    async function logoutClicked() {
        await signOut();
        window.location.replace(getAuthDomain());
    }

    return (
        <div className="fill">
            <Logout logoutClicked={logoutClicked} />
            <SuccessView userId={userId} />
        </div>
    );
}
