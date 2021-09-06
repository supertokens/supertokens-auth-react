# SuperTokens Example

## How to use:

-   Start server by running `npm run build && npm run start`
-   Start ngrok: `ngrok http 3000`
-   Put the https domain of ngrok in config/supertokensConfig.js
-   In chrome > settings > privacy > cookies > check block third party cookies in incognito
-   Open chrome incognito on `http://localhost:3000/iframe`

## IMPORTANT: This example currently doesn't work on incognito chrome and safari due to their third party cookie blocking rules. You can fix this by making use of localstorage instead of cookies. Here is a [guide](https://supertokens.io/recipe-redirect?to=/advanced-customizations/examples/localstorage/about) on how to do it.
