import { isDefaultContext } from "../../../../lib/ts/recipe/session/sessionContext";

describe("SessionContext", () => {
    test("return true if isDefault is true", () => {
        // given
        const mockSessionContext: { loading: true; isDefault: true } = {
            loading: true,
            isDefault: true,
        };

        // when
        const isDefault = isDefaultContext(mockSessionContext);

        // then
        expect(isDefault).toBe(true);
    });

    test("return false if user isDefault is false", () => {
        // given
        const mockSessionContext = {
            accessTokenPayload: {},
            doesSessionExist: false,
            userId: "NOT_DEFAULT_USER_ID",
            invalidClaims: [],
            loading: false,
            isDefault: false,
        };

        // when
        const isDefault = isDefaultContext(mockSessionContext as any);

        // then
        expect(isDefault).toBe(false);
    });
});
