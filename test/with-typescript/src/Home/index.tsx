import * as React from "react";
import Logout from "./Logout";
import SuccessView from "./SuccessView";
import { useSessionContext } from "../../../../recipe/session";
import { useNavigate } from "react-router-dom";
import { signOut } from "../../../../recipe/emailpassword";

export default function Home() {
    const sessionContext = useSessionContext();
    const navigate = useNavigate();

    async function logoutClicked() {
        await signOut();
        navigate("/auth");
    }

    if (sessionContext.loading === true) {
        return null;
    }

    return (
        <div className="fill">
            <Logout logoutClicked={logoutClicked} />
            <SuccessView userId={sessionContext.userId} />
        </div>
    );
}
