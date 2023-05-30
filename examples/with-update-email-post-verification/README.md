![SuperTokens banner](https://raw.githubusercontent.com/supertokens/supertokens-logo/master/images/Artboard%20%E2%80%93%2027%402x.png)

# SuperTokens update email post verification after login

This demo app demonstrates how we can implement change in a user's email password account's email in such a way that the email change requires the user to go through the email verification flow.

In case the user is unable to complete the email verification flow, their account's email is not changed. We also prevent the user to change their email to that which belongs to another account.

If a user has verified multiple emails during the course of changing their email multiple times, if they further choose to change their email to an already verified email, then it won't ask them to verify the email again.

This demo app uses SuperTokens' pre built UI in a react app with a node JS, express backend. These changes more or less apply to custom UI apps as well.

## Project setup

Clone the repo, enter the directory, and use `npm` to install the project dependencies:

```bash
git clone https://github.com/supertokens/supertokens-auth-react
cd supertokens-auth-react/examples/with-update-email-post-verification
npm install
```

## Run the demo app

This compiles and serves the React app and starts the backend API server on port 3001.

```bash
npm run start
```

The app will start the frontend app on `http://localhost:3000` and the backend app on `http://localhost:3001`.

Once you login / sign up, you will see a change email input option.

## How it works

### Summary

The overall customization idea is that when the user starts the change email flow, the frontend calls an API on the backend (the implementation of which is also provided in this demo app), which checks if the email is verified for this user ID, if yes, it makes the change via the `EmailPassword.updateEmailOrPassword` function. If the email is not verified for this userID, the API will add a custom claim in the access token (`toUpdateEmail` in our demo app), which will then be used by the email verification recipe to fetch the new email during the verification process.

Once the verification process of the new email is finished, then we will call the `EmailPassword.updateEmailOrPassword` function to update the email for the user.

### Details

-   First, have a look at the `POST /change-email` API on the `backend/index.ts` file. This is an API which accepts the new email of the user who is logged in and attempts to update the email if it's already verified. If it's not verified, it will update the session's access token payload with the email so that the email verification recipe can fetch it during the verification process. The API has extensive comments to explain the flow of the API.
-   If the above API returns a `202` to the frontend, your frontend needs to redirect the user to the email verification page. In the pre built UI, this happens on its own, for custom UI, you need to do the redirection yourself.
-   Now let's discuss the basic email verification flow (without the new email update):
    -   The email verification page (for the pre built UI) checks if the email is actually already verified or not by calling the `isEmailVerifiedGET` API exposed by our middleware (via the email verification recipe). If this API returns `false`, then the frontend queries the `generateEmailVerifyTokenPOST` API to send an email verification email to the user.
    -   Both of the APIs mentioned above need the session as an input. From the session, these APIs get the user ID and then from the user ID, get their email. An email verification token is then generated for this (userID, email) pair, which gets sent via an email.
    -   When the user gets the email, they can click on the link to consume the token and mark the email as verified (for that user ID). Now here, the link can either be opened on the original browser, in which the user is logged in, or on a different browser, in which the user is not logged in. So this API (`verifyEmailPOST`), may or may not have a session object. In this case however, the API has the email verification token which is mapped to the same (userId, email) pair for which it was created. Either way, this API marks the email as verified for the user ID, and updates the session's claim for email verification to `true` (if the session exists).
    -   If the session did not exist in the `verifyEmailPOST`, then the session's claim is outdated as the user's email is verified in the db, but not yet in the session. For this case, when the frontend queries the `isEmailVerifiedGET` API again, that API will make the session's state consistent with the db state.
-   An important piece of information is that when the email verification recipe has the user's ID and needs to get the email for that ID, it calls an internal function called `getEmailForUserId` which you can hook into. By default, this function gets the email based on the other recipes that are initialized (EmailPassword recipe in this demo app), but if you return some other email from this function, the email verification flow will happen for that email and the user ID pair. So the next customization point is exactly this function. You can see it in the `/backend/config.ts` in the `EmailVerification.init` function call.
-   The final customization needed is that we need to call the `EmailPassword.updateEmailOrPassword` function after the email is verified. Email verification happens in the `verifyEmailPOST` API, so we override it (`/backend/config.ts` file), and if verification was successful, we call this function.

## Author

Created with :heart: by the folks at supertokens.com.

## License

This project is licensed under the Apache 2.0 license.
