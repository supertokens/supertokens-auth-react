# SuperTokens Example

## Project Setup:

Install the project dependencies:

```bash
yarn install
```

Start ngrok and expose port `3000`

```bash
ngrok http 3000
```

## Run the demo app

-   Put the https domain of ngrok in `config/appInfo.js`

-   Build and serve the Next app.

    ```bash
    npm run dev
    ```

-   In chrome > settings > privacy > cookies > check block third party cookies in incognito
-   Open chrome incognito on `http://localhost:3000/iframe`

## Production build

```bash
npm run build && npm run start
```

## A note for safari and chrome incognito

Safari doesn't allow writing to `document.cookie` in an iframe, so we need to switch to using `localstorage` instead. This works, with a few restrictions:

-   You cannot share a session across sub domains. So if you have loaded an iframe on `example.com` and another one on `abc.example.com`, they both will not see the same session.
-   `localstorage` is cleared after 7 days of inactivity. So if the user is inactive for 7 days, they will be logged out.

Chrome incognito doesn't even allow writing to `localstorage`, so we must use an in memory storage. This means that whenever a user refreshes the page, or if your app does a full page navigation, they will be logged out.

To do these, we pass in a `cookieHandler` and `windowHandler` into the frontendConfig's `supertokens.init` function call.

## Author

Created with :heart: by the folks at supertokens.com.

## License

This project is licensed under the Apache 2.0 license.
