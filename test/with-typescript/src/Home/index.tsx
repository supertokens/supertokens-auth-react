import * as React from "react";
import Logout from "./Logout";
import SuccessView from "./SuccessView";
import { useSessionContext } from "../../../../recipe/session";
import { useHistory } from "react-router-dom";
import { signOut } from "../../../../recipe/emailpassword";

export default function Home() {
    const userId = useSessionContext().userId;
    const history = useHistory();

    async function logoutClicked() {
        await signOut();
        history.push("/auth");
    }

    return (
        <div className="fill">
            <Logout logoutClicked={logoutClicked} />
            <SuccessView userId={userId} />
        </div>
    );
}
