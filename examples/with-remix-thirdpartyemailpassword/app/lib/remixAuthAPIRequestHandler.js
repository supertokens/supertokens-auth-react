import { middleware, PreParsedRequest, CollectingResponse } from "supertokens-node/lib/build/framework/custom/index.js";
import { serialize } from "cookie";

export default function handleRemixAuthAPIRequest(RemixResponse) {
    const stMiddleware = middleware((req) => {
        const query = Object.fromEntries(new URL(req.url).searchParams.entries());
        const cookies = Object.fromEntries(req.cookies.getAll().map((cookie) => [cookie.name, cookie.value]));
        return new PreParsedRequest({
            method: req.method,
            url: req.url,
            query: query,
            headers: req.headers,
            cookies,
            getFormBody: () => req.formData(),
            getJSONBody: () => req.json(),
        });
    });
    return async function handleCall(req) {
        const baseResponse = new CollectingResponse();
        const { handled, error } = await stMiddleware(req, baseResponse);
        if (error) {
            throw error;
        }
        if (!handled) {
            return new RemixResponse("Not found", { status: 404 });
        }
        for (const respCookie of baseResponse.cookies) {
            baseResponse.headers.append(
                "Set-Cookie",
                serialize(respCookie.key, respCookie.value, {
                    domain: respCookie.domain,
                    expires: new Date(respCookie.expires),
                    httpOnly: respCookie.httpOnly,
                    path: respCookie.path,
                    sameSite: respCookie.sameSite,
                    secure: respCookie.secure,
                })
            );
        }
        return new RemixResponse(baseResponse.body, {
            headers: baseResponse.headers,
            status: baseResponse.statusCode,
        });
    };
}