import React from "react";
import Logout from "./Logout";
import SuccessView from "./SuccessView";
import { useSessionContext } from "supertokens-auth-react/recipe/session";
import { useHistory } from "react-router-dom";
import { signOut } from "supertokens-auth-react/recipe/emailpassword";
import axios from "axios";
import { getApiDomain } from '../App'

export default function Home({ loggedUser }) {
    console.log(useSessionContext());
    const { userId } = useSessionContext();
    const history = useHistory();

    async function logoutClicked() {
        await signOut();
        await axios.post(getApiDomain() + "/postSignOut", {email: loggedUser})
        history.push("/auth");
    }

    return (
        <div className="fill">
            <Logout logoutClicked={logoutClicked} />
            <SuccessView userId={userId} />
        </div>
    );
}
