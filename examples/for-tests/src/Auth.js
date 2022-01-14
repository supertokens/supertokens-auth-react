import React from "react";
import { EmailPasswordAuth } from "supertokens-auth-react/recipe/emailpassword";
import { ThirdPartyAuth } from "supertokens-auth-react/recipe/thirdparty";
import { ThirdPartyEmailPasswordAuth } from "supertokens-auth-react/recipe/thirdpartyemailpassword";
import { PasswordlessAuth } from "supertokens-auth-react/recipe/passwordless";

export default function Auth(props) {
    if (props.authRecipe === "thirdparty") {
        return <ThirdPartyAuth {...props}>{props.children}</ThirdPartyAuth>;
    } else if (props.authRecipe === "thirdpartyemailpassword") {
        return <ThirdPartyEmailPasswordAuth {...props}>{props.children}</ThirdPartyEmailPasswordAuth>;
    } else if (props.authRecipe === "passwordless") {
        return <PasswordlessAuth {...props}>{props.children}</PasswordlessAuth>;
    }
    return <EmailPasswordAuth {...props}>{props.children}</EmailPasswordAuth>;
}
