import { getPasswordlessTestCases } from "./passwordless.test_gen";

/*
 * Tests.
 */
describe("SuperTokens Passwordless", function () {
    getPasswordlessTestCases({
        authRecipe: "passwordless",
        logId: "PASSWORDLESS",
        generalErrorRecipeName: "PASSWORDLESS",
        contactMethod: "EMAIL",
    });
});
