import { withSession } from "supertokens-node/nextjs";
import { ensureSuperTokensInit } from "./app/config/backend";
import { ssrConfig } from "./app/config/ssr";
import superTokensMiddleware from "supertokens-auth-react/nextjs/middleware";

ensureSuperTokensInit();

export default superTokensMiddleware(ssrConfig(), withSession);

export const config = {
    matcher: [
        "/((?!_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml|manifest.json|sw.js|workbox-|public/).*)",
    ],
};
