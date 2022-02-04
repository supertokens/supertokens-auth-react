import React from "react";
import { SignInAndUp } from "supertokens-auth-react/recipe/thirdpartyemailpassword";

export default function SetPassword() {
    React.useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const show = urlParams.get("show");
        if (show === null) {
            urlParams.set("show", "signup");
            window.location.search = urlParams.toString();
        }
    }, []);
    const urlParams = new URLSearchParams(window.location.search);
    const show = urlParams.get("show");
    if (show === null) {
        return null;
    } else {
        return <SignInAndUp />;
    }
}
