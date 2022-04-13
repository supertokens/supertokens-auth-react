import { isDefaultContext } from "../../../../lib/ts/recipe/session/sessionContext";
import { SessionContextType } from "../../../../lib/ts/recipe/session";

describe("SessionContext", () => {
    test("return true if user id is DEFAULT_USER_ID", () => {
        // given
        const mockSessionContext: SessionContextType = {
            accessTokenPayload: {},
            userId: "DEFAULT_USER_ID",
            doesSessionExist: false,
            invalidClaim: undefined,
        };

        // when
        const isDefault = isDefaultContext(mockSessionContext);

        // then
        expect(isDefault).toBe(true);
    });

    test("return false if user id isn't DEFAULT_USER_ID", () => {
        // given
        const mockSessionContext: SessionContextType = {
            accessTokenPayload: {},
            doesSessionExist: false,
            userId: "NOT_DEFAULT_USER_ID",
            invalidClaim: undefined,
        };

        // when
        const isDefault = isDefaultContext(mockSessionContext);

        // then
        expect(isDefault).toBe(false);
    });
});
