## Customisations

### Frontend

-   We modify the sign up and in forms to replace the "Email" label and place holder with "Phon number" (using formFields config).
-   We add a custom validator for phone number in which we add logic to check for the input phone number syntax.
-   Added text translation to password reset forms and sign in / up forms

### Backend

-   Change email validation logic on the backend (in emailpassword recipe) to validate phone number syntax.
-   Provide an impl for resetPasswordUsingTokenFeature.createAndSendCustomEmail on the backend to send an SMS with the password reset link
-   We modify the createNewSession function to add phoneNumberVerified: false when the first login (phone and password) is done. Then when the second challenge is done too, we mark the session to have phoneNumberVerified: true
-   Adds a middleware that runs after verifySession which will allow access to the API only if the access token payload has phoneNumberVerified: true

## TODO (for me):

-   Add phone number validation logic (on frontend and backend)
-   Change style of input field for phone number to use libphonenumber lib on the frontend (sign in, sign up and reset password form)

## TODO (for user):

-   Provide a way to send SMS for reset password and for verification purpose.
