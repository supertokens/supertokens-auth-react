## Customisations

### Frontend

-   We modify the sign up and in forms to replace the "Email" label and place holder with "Phon number" (using formFields config).
-   We add a custom validator for phone number in which we add logic to check for the input phone number syntax.
-   Added text translation to password reset forms and sign in / up forms
-   Change the doesSessionExist function on the frontend to return true only when the access token payload has phoneNumberVerified === true. This allows users to see the application only when both the login challenges are complete
-   We create a route for the second challenge (to verify phone number via OTP) on `/auth/verify-phone`. On this route, we send the OTP and ask the user to enter the OTP. Also, in case a session doesn't exist, we redirect the user back to the first login challenge.
-   Provide `getRedirectionURL` to the EmailPassword.init function to redirect the user to the second login challenge in case the first challenge is complete.
-   We disable the default UI of passwordless recipe so that we can render what we want on the /verify-phone route
-   We override the enter phone number component for passwordless recipe to send the OTP to the phone number directly - as opposed to it asking the user to enter it again.
-   We override the "Change phone number button" in the enter OTP screen with a custom button which will logout the user and take them back to the first login challenge.

### Backend

-   Change email validation logic on the backend (in emailpassword recipe) to validate phone number syntax.
-   Provide an impl for resetPasswordUsingTokenFeature.createAndSendCustomEmail on the backend to send an SMS with the password reset link
-   We modify the createNewSession function to add phoneNumberVerified: false when the first login (phone and password) is done. Then when the second challenge is done too, we mark the session to have phoneNumberVerified: true. We also add the phone number of the user in the session so that the frontend can access it to send the OTP without asking the user for it.
-   Adds a middleware that runs after verifySession which will allow access to the API only if the access token payload has phoneNumberVerified: true

## TODO (for me):

-   Change style of input field for phone number to use libphonenumber lib on the frontend (sign in, sign up and reset password form)

## TODO (for user):

-   Provide a way to send SMS for reset password and for verification purpose.
