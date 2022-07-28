![SuperTokens banner](https://raw.githubusercontent.com/supertokens/supertokens-logo/master/images/Artboard%20%E2%80%93%2027%402x.png)

# SuperTokens Okta PKCE Flow Demo app

This demo app demonstrates the Thirdparty Login using Okta using PKCE flow.
Ref: https://developer.okta.com/blog/2019/08/22/okta-authjs-pkce

This demo app demonstrates the following:

- How to add custom thirdparty provider to support Okta
  - Passing state from frontend to the backend APIs
  - Code Challenge and verifier implementation
- How to handle multi-tenancy
  - Accepting tenant id in the frontend
  - Passing tenant id to the backend APIs
  - Simulate multiple User Pool using the tenant id


## Required changes
- Update the config.go to update the tenantIDs and corresponding okta configs.

## Run the demo app

### Backend server

```bash
cd api-server
go run .
```

The app will start on `http://localhost:8000`

### Frontend

```bash
npm install
npm start
```

Frontend will start on `http://localhost:3000`

## How to use the demo app

- Once the frontend and backend are running, navigate to http://localhost:3000
- Enter the tenant id and click on Login (as configured in the config.go file)
- You should now be provided with a login link to Okta, click that
- Login to the Okta as prompted by the provider
- You should now be redirected to the Dashboard page with JWT token displayed
- Verify that the JWT contains tenantID using the utility - https://jwt.io

## Author

Created with :heart: by the folks at supertokens.com.

## License

This project is licensed under the Apache 2.0 license.
