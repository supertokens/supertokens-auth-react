import { getFailureRedirectionInfo } from "../../../../lib/ts/recipe/session/utils";
import * as utils from "supertokens-web-js/utils";

beforeEach(() => {
    jest.spyOn(utils, "getGlobalClaimValidators").mockReturnValue([
        {
            id: "id-3",
            onFailureRedirection: undefined,
        },
        {
            id: "id-2",
            onFailureRedirection: () => undefined,
        },
        {
            id: "id-1",
            onFailureRedirection: () => "/id-1",
        },
    ] as any[]);
});

describe(`${getFailureRedirectionInfo.name} functionality`, () => {
    it("Failed claim has callback that returns string", async () => {
        expect(
            await getFailureRedirectionInfo({
                invalidClaims: [{ validatorId: "id-1" }],
                userContext: {},
            })
        ).toEqual({
            accessForbidden: false,
            redirectPath: "/id-1",
            failedClaim: {
                validatorId: "id-1",
            },
        });
    });

    it("One of the failed claims has callback that returns string and takes precedence in redirection", async () => {
        expect(
            await getFailureRedirectionInfo({
                invalidClaims: [{ validatorId: "id-1" }, { validatorId: "id-3" }],
                userContext: {},
            })
        ).toEqual({
            accessForbidden: false,
            redirectPath: "/id-1",
            failedClaim: {
                validatorId: "id-1",
            },
        });
    });

    it("One of the failed claims has callback that returns undefined so the one without takes precedence", async () => {
        expect(
            await getFailureRedirectionInfo({
                invalidClaims: [{ validatorId: "id-2" }, { validatorId: "id-3" }],
                userContext: {},
            })
        ).toEqual({
            accessForbidden: true,
            redirectPath: undefined,
            failedClaim: {
                validatorId: "id-3",
            },
        });
    });
});
