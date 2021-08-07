# Account linking example

This example app adds the feature of automatic account linking on user sign up. For example, if a user signs up with gmail using `user@gmail.com` and then signs up again with the same email, but using email / password, we will not create a new user. Instead, we will use the same userId across all login methods that use the same email.

TODO:

-   How to run the demo
-   Explanation of the modification
-   How the custom userId / user data is stored
-   Drawbacks
