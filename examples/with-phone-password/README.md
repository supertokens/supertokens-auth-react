## Customisations

### Frontend

-   We modify the sign up and in forms to replace the "Email" label and place holder with "Phon number" (using formFields config).
-   We add a custom validator for phone number in which we add logic to check for the input phone number syntax.
-   Added text translation to password reset forms and sign in / up forms
-   Change the doesSessionExist function on the frontend to return true only when the access token payload has phoneNumberVerified === true. This allows users to see the application only when both the login challenges are complete
-   We create a route for the second challenge (to verify phone number via OTP) on `/auth/verify-phone`. On this route, we send the OTP and ask the user to enter the OTP. Also, in case a session doesn't exist, we redirect the user back to the first login challenge.
-   Provide `getRedirectionURL` to the EmailPassword.init function to redirect the user to the second login challenge in case the first challenge is complete.
-   We disable the default UI of passwordless recipe so that we can render what we want on the /verify-phone route

### Backend

-   Change email validation logic on the backend (in emailpassword recipe) to validate phone number syntax.
-   Provide an impl for resetPasswordUsingTokenFeature.createAndSendCustomEmail on the backend to send an SMS with the password reset link
-   We modify the createNewSession function to add phoneNumberVerified: false when the first login (phone and password) is done. Then when the second challenge is done too, we mark the session to have phoneNumberVerified: true
-   Adds a middleware that runs after verifySession which will allow access to the API only if the access token payload has phoneNumberVerified: true

## TODO (for me):

-   Add phone number validation logic (on frontend and backend)
-   Change style of input field for phone number to use libphonenumber lib on the frontend (sign in, sign up and reset password form)
-   TODO do not ask for phone number again on second challenge

## TODO (for user):

-   Provide a way to send SMS for reset password and for verification purpose.
