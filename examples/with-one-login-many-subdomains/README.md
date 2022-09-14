# Getting Started with Create React App

## Setup

-   Run the command `npm i -d` in the `with-one-login-many-subdomains` directory.
-   Add the following to your hosts configs `/etc/hosts` to allow for multi tenancy locally:

```
127.0.0.1   example.com
127.0.0.1   auth.example.com
127.0.0.1   gmail.example.com
127.0.0.1   supertokens.example.com
```

> **_NOTE:_** For the purpose of the demo, the subdomain for each user is extracted from their email provider, ex. for `user@abc.com`, `abc` would be the subdomain. A valid email address is required for password reset and email verification, to use these features in the demo you would need to add that email provider as a subdomain in `/etc/hosts` and add it to the cors domain whitelist on the server.  
> Example:
>
> -   To use `user@gmail.com`, you would need to add `gmail.example.com` to your `/etc/hosts`
> -   In [api-server.js](./api-server.js) add `http://gmail.example.com:${websitePort}` to the cors whitelist
> -   On starting the demo, navigate to `http://auth.example:3000` and signup/signin

## Available Scripts

In the project directory, you can run:

### `npm i && npm start`

Runs the app in the development mode.\
Open [http://auth.example:3000](http://auth.example:3000) to view it in the browser.
