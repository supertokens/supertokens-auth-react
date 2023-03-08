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

## Author

Created with :heart: by the folks at supertokens.com.

## License

This project is licensed under the Apache 2.0 license.
