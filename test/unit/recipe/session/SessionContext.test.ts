import { isDefaultContext } from "../../../../lib/ts/recipe/session/sessionContext";
import { SessionContextType } from "../../../../lib/ts/recipe/session";

describe("SessionContext", () => {
    test("return true if user id is DEFAULT_USER_ID", () => {
        // given
        const mockSessionContext: SessionContextType = {
            jwtPayload: {},
            userId: "DEFAULT_USER_ID",
            doesSessionExist: false,
        };

        // when
        const isDefault = isDefaultContext(mockSessionContext);

        // then
        expect(isDefault).toBe(true);
    });

    test("return false if user id isn't DEFAULT_USER_ID", () => {
        // given
        const mockSessionContext: SessionContextType = {
            jwtPayload: {},
            doesSessionExist: false,
            userId: "NOT_DEFAULT_USER_ID",
        };

        // when
        const isDefault = isDefaultContext(mockSessionContext);

        // then
        expect(isDefault).toBe(false);
    });
});
