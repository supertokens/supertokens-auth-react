import { json } from "@remix-run/node";
import { ActionFunctionArgs, LoaderFunctionArgs } from "react-router-dom";
import handleAuthAPIRequest from "../lib/authAPIRequestHandler.js";
import { createPreParsedRequest } from "../lib/superTokensHelpers.js";

const handleCall = handleAuthAPIRequest(Response);

// Action function for handling POST requests
export async function action({ request }: ActionFunctionArgs) {
    try {
        const preParsedRequest = createPreParsedRequest(request);
        const res = await handleCall(preParsedRequest);
        return res;
    } catch (error) {
        return json({ error: "Internal server error" }, { status: 500 });
    }
}
// Loader function for handling GET requests that also adds cache control headers
export async function loader({ request }: LoaderFunctionArgs) {
    try {
        const preParsedRequest = createPreParsedRequest(request);
        const res = await handleCall(preParsedRequest);
        if (!res.headers.has("Cache-Control")) {
            res.headers.set("Cache-Control", "no-cache, no-store, max-age=0, must-revalidate");
        }
        return res;
    } catch (error) {
        return json({ error: "Internal server error" }, { status: 500 });
    }
}
