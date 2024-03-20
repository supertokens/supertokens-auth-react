import { Meta, Links, Scripts, LiveReload, Outlet, ScrollRestoration } from "@remix-run/react";
import SuperTokens, { SuperTokensWrapper } from "supertokens-auth-react";
import { frontendConfig } from "./config/frontend";
import { SessionAuth } from "supertokens-auth-react/recipe/session/index.js";
import { useLocation } from "react-router-dom";
import type { LinksFunction } from "@remix-run/node";
import appStylesHref from "./app.css";
export const links: LinksFunction = () => [{ rel: "stylesheet", href: appStylesHref }];

if (typeof window !== "undefined") {
    SuperTokens.init(frontendConfig());
}

export default function App() {
    const location = useLocation();
    const isUnprotectedRoute = location.pathname.startsWith("/auth");

    return (
        <html lang="en">
            <head>
                <Meta />
                <Links />
            </head>
            <body className="app-wrapper">
                <SuperTokensWrapper>
                    {isUnprotectedRoute ? (
                        <Outlet />
                    ) : (
                        <SessionAuth>
                            <Outlet />
                        </SessionAuth>
                    )}

                    <ScrollRestoration />
                    <Scripts />
                    <LiveReload />
                </SuperTokensWrapper>
            </body>
        </html>
    );
}
