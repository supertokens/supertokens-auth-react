![SuperTokens banner](https://raw.githubusercontent.com/supertokens/supertokens-logo/master/images/Artboard%20%E2%80%93%2027%402x.png)

# Test app for updating email post verification

This is meant for testing one of the issues in the SDK that used to exist wherein the SessionAuth component would not redirect to the email verification screen even if the claim failed unless we added a `userContext={{}}` as a prop to it.
