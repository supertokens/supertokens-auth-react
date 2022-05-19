import React, { useEffect, useState } from "react";
import { BaseComponent, Home } from "./App";
import { canHandleRoute, getRoutingComponent } from "supertokens-auth-react";

function AppWithoutRouter() {
    return (
        <div className="App">
            <Nav />
            <h1>Without Routing</h1>
            <a href="/home">Switch</a>
            <Routing></Routing>
        </div>
    );
}

function Routing() {
    const [, setCurrentPath] = useState(window.location.pathname);

    useEffect(() => {
        const onLocationChange = () => {
            setCurrentPath(window.location.pathname);
        };

        window.addEventListener("popstate", onLocationChange);
    }, [setCurrentPath]);

    if (canHandleRoute()) {
        return <BaseComponent>{getRoutingComponent()}</BaseComponent>;
    }

    // Custom router...

    return (
        <BaseComponent>
            <Home />
        </BaseComponent>
    );
}

function Nav() {
    return (
        <div className="header__menu menu">
            <div className="menu__icon icon-menu">
                <span></span>
                <span></span>
                <span></span>
            </div>
            <nav className="menu__body">
                <ul className="menu__list">
                    <li>
                        <a className="menu__link" href="/home?router=no-router">
                            Home
                        </a>
                    </li>
                    <li>
                        <a className="menu__link" href="/auth?router=no-router">
                            Auth
                        </a>
                    </li>
                </ul>
            </nav>
        </div>
    );
}
export default AppWithoutRouter;
