![SuperTokens banner](https://raw.githubusercontent.com/supertokens/supertokens-logo/master/images/Artboard%20%E2%80%93%2027%402x.png)

# SuperTokens Okta PKCE Flow Demo app

This demo app demonstrates the Thirdparty Login using Okta using PKCE flow

## Required changes:


## Run the demo app

Add `multitenant.com` to point to `127.0.0.1` by editing `/etc/hosts`


### Backend server

```bash
cd api-server
go run .
```

The app will start on `http://multitenant.com:8000`

### Frontend

```bash
npm install
npm start
```

Frontend will start on `http://multitenant.com:3000`

## Author

Created with :heart: by the folks at supertokens.com.

## License

This project is licensed under the Apache 2.0 license.
