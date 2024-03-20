import { middleware, PreParsedRequest, CollectingResponse } from "supertokens-node/lib/build/framework/custom/index.js";
import { serialize } from "cookie";
// import { HTTPMethod, PartialRemixRequest } from '../lib/superTokensTypes'

export default function handleAuthAPIRequest<T extends PreParsedRequest>(NextResponse: typeof Response) {
    const stMiddleware = middleware<T>((req) => {
        return req;
    });

    return async function handleCall(req: T) {
        const baseResponse = new CollectingResponse();

        const { handled, error } = await stMiddleware(req, baseResponse);

        if (error) {
            throw error;
        }
        if (!handled) {
            return new NextResponse("Not found", { status: 404 });
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

        return new NextResponse(baseResponse.body, {
            headers: baseResponse.headers,
            status: baseResponse.statusCode,
        });
    };
}
