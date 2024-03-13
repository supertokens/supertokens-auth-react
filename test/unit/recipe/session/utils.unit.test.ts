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
                invalidClaims: [{ id: "with-onFailureRedirection-returning-path" }],
                userContext: {},
            })
        ).toEqual({
            redirectPath: "/redirect-path",
            failedClaim: {
                id: "with-onFailureRedirection-returning-path",
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
                invalidClaims: [{ id: "second-in-globalClaims-array" }, { id: "first-in-globalClaims-array" }],
                userContext: {},
            })
        ).toEqual({
            redirectPath: "/first",
            failedClaim: {
                id: "first-in-globalClaims-array",
            },
        });
    });
});
