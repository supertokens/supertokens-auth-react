import React from "react";
import axios from "axios";
import Session, { useSessionContext } from "supertokens-auth-react/recipe/session";
import EmailPassword from "supertokens-auth-react/recipe/emailpassword";
import { getApiDomain } from "../App";
Session.addAxiosInterceptors(axios);

export default function SuccessView() {
    let { userId } = useSessionContext();
    let [email, setEmail] = React.useState("");
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
            {"UserId: " + userId}
            <div
                style={{
                    height: "10px",
                }}
            />
            New Email:
            <input
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
                        EmailPassword.redirectToAuth();
                    } else {
                        window.alert(JSON.stringify(data));
                    }
                }}>
                Add new email
            </button>
        </div>
    );
}
