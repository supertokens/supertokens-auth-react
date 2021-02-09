import React from "react";
import {EmailPasswordAuth} from 'supertokens-auth-react/recipe/emailpassword';
import {ThirdPartyAuth} from 'supertokens-auth-react/recipe/thirdparty';

export default function Auth (props) {
    if (props.authRecipe === "thirdparty") {
      return <ThirdPartyAuth>
          {props.children}
      </ThirdPartyAuth>;
    }
  
    return <EmailPasswordAuth>
      {props.children}
    </EmailPasswordAuth>;
  
  }