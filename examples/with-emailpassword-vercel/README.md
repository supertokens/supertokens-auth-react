![SuperTokens banner](https://raw.githubusercontent.com/supertokens/supertokens-logo/master/images/Artboard%20%E2%80%93%2027%402x.png)

# SuperTokens EmailPassword Vercel Demo app

This demo app demonstrates deploying a react + nodejs express app on Vercel that uses the emailpassword recipe of SuperTokens.

## Project structure & Parameters

-   The frontend code is located in the `src` folder.
-   The backend API is in the `api/index.js` file. This is an express app.
-   The `vercel.json` file contains the configurations that instructs Vercel to push all traffic for `/api` routes to the backend server on `api/index.js`.

## Run application locally

Follow the steps outlined below to run the application locally:

1. Change directory to the **with-emailpassword-vercel** folder.

    ```
    cd supertokens-auth-react/examples/with-emailpassword-vercel
    ```

2. Run the command below to install the project dependencies.

    ```
    npm install
    ```

3. Start the application with the command below:
    ```
    npm start
    ```

## Deploy to Vercel

To deploy this demo application on Vercel, follow the steps outlined below:

1. Clone or download this project.

2. Change directory to the **with-emailpassword-vercel** folder.

    ```
    cd supertokens-auth-react/examples/with-emailpassword-vercel
    ```

3. Run the `vercel` command, to deploy the project.
    ```
    vercel --prod
    ```

Also, this project is [live](https://with-emailpassword-vercel-beryl.vercel.app/) on Vercel, feel free to test out the project.

## Author

Created with :heart: by the folks at supertokens.com.

## License

This project is licensed under the Apache 2.0 license.
