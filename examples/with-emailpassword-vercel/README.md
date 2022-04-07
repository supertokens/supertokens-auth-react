![SuperTokens banner](https://raw.githubusercontent.com/supertokens/supertokens-logo/master/images/Artboard%20%E2%80%93%2027%402x.png)

# SuperTokens EmailPassword Vercel Demo app

This demo app demonstrates deploying a react + nodejs express app on Vercel.

## Project setup

Follow the steps below to set up the application for deployment.

1. Create an **api** folder in the frontend (**my-demo-app**) part of the application.
2. Copy the folders and files in the backend part of the application to the **api** folder.
3. Rename the **server.js** file in the backend to **index.js**
4. Open the **index.js** and export **app** at the end of the file as shown below
   
    
          module.exports = app;

5. Update your `api/index.js` appInfo object with code snippet below:


          appInfo: {
            appName: "APP_NAME",
            apiDomain: 'process.env.VERCEL_URL',
            websiteDomain: 'process.env.VERCEL_URL',
            apiBasePath: "/api/auth",
            websiteBasePath: "/auth",
          },

6. Update your `src/App.js` appInfo object with the code snippet below:


          appInfo: {
            appName: "APP_NAME",
            apiDomain: 'window.location.hostname',
            websiteDomain: 'window.location.hostname',
            apiBasePath: "/api/auth",
            websiteBasePath: "/auth",
          },

## Deploy to Vercel

Once you have the backend and frontend of your application code updated, create a **Vercel.json** file in the root directory of the **frontend** folder and add a rewrite to push all traffic on **/api** to our **index.js** file with the code snippet below:

    {
       "rewrites": [{ "source": "/api/(.*)", "destination": "/api" }]
    }

Then change the directory to the frontend (**my-demo-app**) folder, and deploy your project to Vercel with the command below.
 

    cd my-demo-app && vercel

## Project structure & Parameters

-   The frontend code is located in the `src` folder.
-   The backend API is in the `api/api-server.js` file.

## Production

Click this [link](https://with-emailpassword-vercel-2b9e53tab-icode247.vercel.app/) to test the deployed application on Vercel.

## Author

Created with :heart: by the folks at supertokens.com.

## License

This project is licensed under the Apache 2.0 license.
