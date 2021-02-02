import React from 'react';
import Logout from "./Logout";
import SuccessView from "./SuccessView";
import Session from 'supertokens-auth-react/recipe/session';
import { signOut } from "supertokens-auth-react/recipe/emailpassword";
import { getWebsiteDomain } from '../App';

export default function Home() {
    const userId = Session.getUserId();
    async function logoutClicked() {
        await signOut();
        window.location.replace(getWebsiteDomain());
    }

    return (
        <div className="fill">
            <Logout
                logoutClicked={logoutClicked} />
            <SuccessView
                userId={userId} />
        </div>
    );
}