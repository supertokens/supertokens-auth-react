import { middleware, PreParsedRequest, CollectingResponse } from "supertokens-node/lib/build/framework/custom/index.js";
import { serialize } from "cookie";
import { HTTPMethod, PartialRemixRequest } from '../lib/superTokensTypes'

export default function handleAuthAPIRequest<T extends PartialRemixRequest>(RemixResponse: typeof Response) {
    const stMiddleware = middleware<T>((req) => {
        const query = Object.fromEntries(new URL(req.url).searchParams.entries());
        const cookies: Record<string, string> = Object.fromEntries(
            (req.cookies.getAll() as { name: string, value: string }[]).map((cookie) => [cookie.name, cookie.value])
        );

        return new PreParsedRequest({
            method: req.method as HTTPMethod,
            url: req.url,
            query: query,
            headers: req.headers,
            cookies,
            getFormBody: () => req.formData(),
            getJSONBody: () => req.json(),
        });
    });

    return async function handleCall(req: T) {
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