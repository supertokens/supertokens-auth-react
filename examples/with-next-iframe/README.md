# SuperTokens Example

## Project Setup:

Use `npm` to install the project dependencies:

```bash
npm install
```

Start ngrok and expose port `3000` 

```bash
ngrok http 3000
```

## Run the demo app

- Put the https domain of ngrok in `config/supertokensConfig.js`

- Build and serve the Next app.

    ```bash
    npm run dev
    ```

- In chrome > settings > privacy > cookies > check block third party cookies in incognito
- Open chrome incognito on `http://localhost:3000/iframe`

### IMPORTANT: This example currently doesn't work on incognito chrome and safari due to their third party cookie blocking rules. You can fix this by making use of localstorage instead of cookies. Here is a [guide](https://supertokens.io/recipe-redirect?to=/advanced-customizations/examples/localstorage/about) on how to do it.


## Providers credentials

The demo is currently configured with development OAuth credentials for Google and Github. These keys are to be used for testing purposes and you should use your own keys for production.

Please refer to the corresponding documentations to get your **client IDs** and **client secrets** for each of the providers you want to integrate with:<br/>

-   <a href="https://developers.google.com/identity/sign-in/web/sign-in#create_authorization_credentials" rel="noopener noreferrer" target="_blank" >Google</a> (authorisation callback URL: `http://localhost:3000/auth/callback/google`)
-   <a href="https://docs.github.com/en/developers/apps/creating-an-oauth-app" rel="noopener noreferrer" target="_blank" >Github</a> (authorisation callback URL: `http://localhost:3000/auth/callback/github`)

You can now set your provider's **client ID** and **client secret** in `config/supertokensConfig.js`

## Production build

```bash
npm run build && npm run start
```

## Author

Created with :heart: by the folks at SuperTokens.io.

## License

This project is licensed under the Apache 2.0 license.