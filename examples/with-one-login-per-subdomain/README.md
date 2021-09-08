# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Setup

-   Run the command `npm i -d` in the `with-one-login-per-subdomain` directory.
-   Add the following to your hosts configs `/etc/hosts` to allow for multi tenancy locally

```
127.0.0.1   a.example.com
127.0.0.1   b.example.com
```

> **_NOTE:_** For the demo, the subdomain is extracted from user's email provider, ex. for `user@a.com`, `a` would be the subdomain. A valid email address is required for password reset and email verification, to use these features in the demo you would need to add that email provider as a subdomain in the `/etc/hosts` file.  
> Example:
>
> -   To use `user@gmail.com`, you would need to add `gmail.example.com` to your `/etc/hosts`
> -   On starting the demo, navigate to `http://gmail.example:3000` and signup/signin

## Available Scripts

In the project directory, you can run:

### `npm i && npm start`

Runs the app in the development mode.\
Open [http://a.example.com:3000](http://a.example.com:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.
