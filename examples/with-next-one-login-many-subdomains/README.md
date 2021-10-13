# SuperTokens Example

This is an implementation of SuperTokens with Next.js where:

-   `example.com:3000/auth` is used to sign in which takes the user to `example.com:3000` post sign in
-   if the user signs in, they will be signed in to `example.com:3000` as well as to `a.example.com:3000`.
-   If the user is not signed in and visits `a.example.com:3000`, then will be redirected to `example.com:3000/auth`

## Project Setup

Use `npm` to install the project dependencies:

```bash
npm install
```

Add the following to your hosts configs `/etc/hosts` to allow for multi tenancy locally:

```
127.0.0.1   example.com
127.0.0.1   a.example.com
```

## Run the demo app

This builds and serves the Next app on port `3000`.

```bash
npm run dev
```

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
