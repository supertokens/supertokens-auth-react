import Querier from "supertokens-web-js/utils/querier";
import NormalisedURLPath from "supertokens-web-js/utils/normalisedURLPath";
import NormalisedURLDomain from "supertokens-web-js/utils/normalisedURLDomain";

describe("Querier", () => {
    let querier: Querier;

    beforeAll(() => {
        querier = new Querier("mockRecipeId", {
            apiBasePath: new NormalisedURLPath("/"),
            apiDomain: new NormalisedURLDomain("http://api.example.com"),
            appName: "test",
            websiteBasePath: new NormalisedURLPath("/"),
        });
    });

    describe(".callPreAPIHook()", () => {
        test("don't modify request context if no preAPIHook", async () => {
            // given
            const mockRequestInit = {};
            const mockUrl = "/mock";

            // when
            const result = await querier.callPreAPIHook({
                requestInit: mockRequestInit,
                url: mockUrl,
            });

            // then
            expect(result).toMatchObject({
                url: mockUrl,
                requestInit: mockRequestInit,
            });
        });

        test("call preAPIHook and use return to modify request context", async () => {
            // given
            const mockReturnedRequestInit = {
                // Method is not important here, it's just a property that can be used to distinguish
                // provided value vs returned value
                method: "MOCK_RETURNED_METHOD",
            };
            const mockReturnedUrl = "http://api.example.com/mock-returned-url";

            const mockPreAPIHook = jest.fn().mockResolvedValueOnce({
                url: mockReturnedUrl,
                requestInit: mockReturnedRequestInit,
            });

            const mockUrl = "http://api.example.com/mock-url";
            const mockRequestInit: RequestInit = {
                method: "MOCK_METHOD",
            };

            // when
            const result = await querier.callPreAPIHook({
                url: mockUrl,
                requestInit: mockRequestInit,
                preAPIHook: mockPreAPIHook,
            });

            // then
            expect(mockPreAPIHook).toHaveBeenCalledWith({
                url: mockUrl,
                requestInit: mockRequestInit,
            });
            expect(result).toEqual({
                url: mockReturnedUrl,
                requestInit: mockReturnedRequestInit,
            });
        });
    });

    describe("common method behaviour", () => {
        let fetchSpy: jest.SpyInstance, callPreApiHookSpy: jest.SpyInstance;

        beforeAll(() => {
            // fetch is not available in jsdom, therefore we can set it to mock. See https://github.com/jsdom/jsdom/issues/1724
            global["fetch"] = jest.fn().mockResolvedValue({
                // Prevent error with calling .json() on response object
                json: jest.fn(),
            });
            fetchSpy = jest.spyOn(global, "fetch");

            callPreApiHookSpy = jest.spyOn(querier, "callPreAPIHook");
        });

        beforeEach(() => {
            jest.clearAllMocks();
        });

        const mockRequestInit = {
            method: "MOCK_METHOD",
        };

        const mockPreAPIHook = jest.fn().mockResolvedValue({
            url: "/mock-url",
            requestInit: {
                method: "MOCK_METHOD",
            },
        });

        test(`.get() should call .callPreAPIHook()`, async () => {
            // when
            await querier.get("/path", {}, {}, mockPreAPIHook);

            // then
            expect(callPreApiHookSpy).toHaveBeenCalledWith({
                preAPIHook: mockPreAPIHook,
                // ? added to url due to possible query param input
                url: "http://api.example.com/path?",
                requestInit: expect.any(Object),
            });
            expect(mockPreAPIHook).toHaveBeenCalledWith({
                url: "http://api.example.com/path?",
                requestInit: expect.any(Object),
            });
            expect(fetchSpy).toHaveBeenCalledWith("/mock-url", mockRequestInit);
        });

        test(`.post() should call .callPreAPIHook()`, async () => {
            // when
            await querier.post("/path", { body: JSON.stringify({}) }, mockPreAPIHook);

            // then
            expect(callPreApiHookSpy).toHaveBeenCalledWith({
                preAPIHook: mockPreAPIHook,
                url: "http://api.example.com/path",
                requestInit: expect.any(Object),
            });
            expect(mockPreAPIHook).toHaveBeenCalledWith({
                url: "http://api.example.com/path",
                requestInit: expect.any(Object),
            });
            expect(fetchSpy).toHaveBeenCalledWith("/mock-url", mockRequestInit);
        });

        test(`.delete() should call .callPreAPIHook()`, async () => {
            // when
            await querier.delete("/path", {}, mockPreAPIHook);

            // then
            expect(callPreApiHookSpy).toHaveBeenCalledWith({
                preAPIHook: mockPreAPIHook,
                url: "http://api.example.com/path",
                requestInit: expect.any(Object),
            });
            expect(mockPreAPIHook).toHaveBeenCalledWith({
                url: "http://api.example.com/path",
                requestInit: expect.any(Object),
            });
            expect(fetchSpy).toHaveBeenCalledWith("/mock-url", mockRequestInit);
        });

        test(`.put() should call .callPreAPIHook()`, async () => {
            // when
            await querier.put("/path", {}, mockPreAPIHook);

            // then
            expect(callPreApiHookSpy).toHaveBeenCalledWith({
                preAPIHook: mockPreAPIHook,
                url: "http://api.example.com/path",
                requestInit: expect.any(Object),
            });
            expect(mockPreAPIHook).toHaveBeenCalledWith({
                url: "http://api.example.com/path",
                requestInit: expect.any(Object),
            });
            expect(fetchSpy).toHaveBeenCalledWith("/mock-url", mockRequestInit);
        });
    });
});
