import React from "react";
import { EmailPasswordAuth } from "supertokens-auth-react/recipe/emailpassword";
import { ThirdPartyAuth } from "supertokens-auth-react/recipe/thirdparty";
import { ThirdPartyEmailPasswordAuth } from "supertokens-auth-react/recipe/thirdpartyemailpassword";

export default function Auth(props) {
    if (props.authRecipe === "thirdparty") {
        return <ThirdPartyAuth {...props}>{props.children}</ThirdPartyAuth>;
    } else if (props.authRecipe === "thirdpartyemailpassword") {
        return <ThirdPartyEmailPasswordAuth {...props}>{props.children}</ThirdPartyEmailPasswordAuth>;
    }
    return <EmailPasswordAuth {...props}>{props.children}</EmailPasswordAuth>;
}
