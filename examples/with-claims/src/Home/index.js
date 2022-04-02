import React from "react";
import Logout from "./Logout";
import { useSessionContext } from "supertokens-auth-react/recipe/session";
import { useNavigate } from "react-router-dom";
import { signOut } from "supertokens-auth-react/recipe/emailpassword";
import { ClaimStatuses } from "../Route1/common.component";

export default function Home() {
    const { userId } = useSessionContext();
    const navigate = useNavigate();

    async function logoutClicked() {
        await signOut();
        navigate("/auth");
    }

    return (
        <div className="fill">
            <Logout logoutClicked={logoutClicked} />
            <ClaimStatuses />
        </div>
    );
}
