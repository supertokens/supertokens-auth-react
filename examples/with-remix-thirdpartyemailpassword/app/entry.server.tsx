// This file is responsible for bootstrapping your Remix application on the server-side. It sets up the server environment, handles incoming requests, and renders the initial HTML markup to send back to the client. It typically imports the necessary server-side dependencies and sets up routing and middleware. This file is executed on the server when handling requests.

import type { EntryContext } from "@remix-run/node";
import { RemixServer } from "@remix-run/react";
import { renderToString } from "react-dom/server";
import { ensureSuperTokensInit } from "./config/backend";

ensureSuperTokensInit();

export default function handleRequest(
    request: Request,
    responseStatusCode: number,
    responseHeaders: Headers,
    remixContext: EntryContext
) {
    const markup = renderToString(<RemixServer context={remixContext} url={request.url} />);

    responseHeaders.set("Content-Type", "text/html");

    return new Response("<!DOCTYPE html>" + markup, {
        status: responseStatusCode,
        headers: responseHeaders,
    });
}
