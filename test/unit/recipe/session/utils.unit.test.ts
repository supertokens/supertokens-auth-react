import { getFailureRedirectionInfo } from "../../../../lib/ts/recipe/session/utils";
import * as utils from "supertokens-web-js/utils";

describe(`${getFailureRedirectionInfo.name} functionality`, () => {
    beforeAll(() => {
        jest.spyOn(utils, "getGlobalClaimValidators").mockReturnValue([
            {
                id: "without-onFailureRedirection",
                onFailureRedirection: undefined,
            },
            {
                id: "with-onFailureRedirection-returning-undefined",
                onFailureRedirection: () => undefined,
            },
            {
                id: "with-onFailureRedirection-returning-path",
                onFailureRedirection: () => "/redirect-path",
            },
        ] as any[]);
    });
    it("Failed claim has callback that returns string", async () => {
        expect(
            await getFailureRedirectionInfo({
                invalidClaims: [{ validatorId: "with-onFailureRedirection-returning-path" }],
                userContext: {},
            })
        ).toEqual({
            accessForbidden: false,
            redirectPath: "/redirect-path",
            failedClaim: {
                validatorId: "with-onFailureRedirection-returning-path",
            },
        });
    });

    it("One of the failed claims has callback that returns string and takes precedence in redirection", async () => {
        expect(
            await getFailureRedirectionInfo({
                invalidClaims: [
                    { validatorId: "with-onFailureRedirection-returning-path" },
                    { validatorId: "without-onFailureRedirection" },
                ],
                userContext: {},
            })
        ).toEqual({
            accessForbidden: false,
            redirectPath: "/redirect-path",
            failedClaim: {
                validatorId: "with-onFailureRedirection-returning-path",
            },
        });
    });

    it("One of the failed claims has callback that returns undefined so the one without takes precedence", async () => {
        expect(
            await getFailureRedirectionInfo({
                invalidClaims: [
                    { validatorId: "with-onFailureRedirection-returning-undefined" },
                    { validatorId: "without-onFailureRedirection" },
                ],
                userContext: {},
            })
        ).toEqual({
            accessForbidden: true,
            redirectPath: undefined,
            failedClaim: {
                validatorId: "without-onFailureRedirection",
            },
        });
    });

    it("Priority of redirect paths depend on the order of array returned by getGlobalClaimValidators", async () => {
        jest.spyOn(utils, "getGlobalClaimValidators").mockReturnValue([
            {
                id: "first-in-globalClaims-array",
                onFailureRedirection: () => "/first",
            },
            {
                id: "second-in-globalClaims-array",
                onFailureRedirection: () => "/second",
            },
        ] as any[]);

        expect(
            await getFailureRedirectionInfo({
                invalidClaims: [
                    { validatorId: "second-in-globalClaims-array" },
                    { validatorId: "first-in-globalClaims-array" },
                ],
                userContext: {},
            })
        ).toEqual({
            accessForbidden: false,
            redirectPath: "/first",
            failedClaim: {
                validatorId: "first-in-globalClaims-array",
            },
        });
    });
});
