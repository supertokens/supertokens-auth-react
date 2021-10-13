# SuperTokens Example

This is an implementation of SuperTokens with Next.js where:

-   `example.com:3000/auth` is used to sign in which takes the user to `example.com:3000` post sign in
-   if the user signs in, they will be signed in to `example.com:3000` as well as to `a.example.com:3000`.
-   If the user is not signed in and visits `a.example.com:3000`, then will be redirected to `example.com:3000/auth`

## Project Setup

Install the project dependencies:

```bash
yarn install
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

## Production build

```bash
npm run build && npm run start
```

## Author

Created with :heart: by the folks at SuperTokens.io.

## License

This project is licensed under the Apache 2.0 license.
