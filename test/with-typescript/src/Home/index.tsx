import * as React from "react";
import Logout from "./Logout";
import SuccessView from "./SuccessView";
import { useSessionContext } from "../../../../recipe/session";
import { useNavigate } from "react-router-dom";
import { signOut } from "../../../../recipe/emailpassword";

export default function Home() {
    const userId = useSessionContext().userId;
    const navigate = useNavigate();

    async function logoutClicked() {
        await signOut();
        navigate("/auth");
    }

    return (
        <div className="fill">
            <Logout logoutClicked={logoutClicked} />
            <SuccessView userId={userId} />
        </div>
    );
}
