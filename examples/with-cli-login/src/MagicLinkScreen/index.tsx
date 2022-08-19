import React from "react";
import Session from "supertokens-auth-react/recipe/session";
import ThirdPartyEmailPassword from "supertokens-auth-react/recipe/thirdpartyemailpassword";

export function MagicLinkScreen() {
    let sessionContext = Session.useSessionContext();

    React.useEffect(() => {
        if (sessionContext.loading) {
            return;
        }
        async function consumeCode(token: string, preAuthSessionId: string) {
            fetch("http://localhost:3001/consumetoken", {
                method: "post",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    token,
                    preAuthSessionId,
                }),
            });
        }
        if (!sessionContext.doesSessionExist) {
            // we save the token from the URL to use it later on..
            let token = window.location.hash;
            const urlParams = new URLSearchParams(window.location.search);
            const preAuthSessionId = urlParams.get("preAuthSessionId");
            if (token !== undefined && token !== null && token !== "" && preAuthSessionId !== null) {
                token = token.split("#")[1];
                localStorage.setItem("passwordless-token", token);
                localStorage.setItem("passwordless-preAuthSessionId", preAuthSessionId);
            }
            ThirdPartyEmailPassword.redirectToAuth({
                redirectBack: true,
            });
        } else {
            let token = window.location.hash;
            const urlParams = new URLSearchParams(window.location.search);
            let preAuthSessionId = urlParams.get("preAuthSessionId");
            if (token !== undefined && token !== null && token !== "" && preAuthSessionId !== null) {
                token = token.split("#")[1];
            } else {
                token = localStorage.getItem("passwordless-token")!;
                preAuthSessionId = localStorage.getItem("passwordless-preAuthSessionId")!;
            }
            consumeCode(token, preAuthSessionId);
        }
    }, [sessionContext]);

    return null;
}
