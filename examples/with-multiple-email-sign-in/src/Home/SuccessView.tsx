import React from "react";
import axios from "axios";
import { redirectToAuth } from "supertokens-auth-react";
import Session, { useSessionContext } from "supertokens-auth-react/recipe/session";
import { getApiDomain } from "../App";
Session.addAxiosInterceptors(axios);

export default function SuccessView() {
    let sessionCtx = useSessionContext();
    let [email, setEmail] = React.useState("");
    if (sessionCtx.loading) {
        return null;
    }
    const { userId } = sessionCtx;
    return (
        <div
            className="fill"
            style={{
                width: "100%",
                alignItems: "center",
                justifyContent: "center",
                textAlign: "center",
                fontWeight: "bold",
                color: "#333333",
                paddingTop: "10px",
                paddingBottom: "40px",
            }}>
            UserId:
            <span id="userId"> {userId} </span>
            <div
                style={{
                    height: "10px",
                }}
            />
            New Email:
            <input
                id="emailInput"
                type="text"
                value={email}
                onChange={(e) => {
                    setEmail(e.target.value);
                }}
            />
            <div
                style={{
                    height: "10px",
                }}
            />
            <button
                onClick={async () => {
                    let response = await axios.post(getApiDomain() + "/add-email", {
                        email,
                    });
                    let data = response.data;
                    if (data.status === "OK") {
                        // the user may need to verify their email, so we redirect them to auth
                        redirectToAuth();
                    } else {
                        window.alert(JSON.stringify(data));
                    }
                }}
                id="emailBtn">
                Add new email
            </button>
        </div>
    );
}
