"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var jsx_runtime_1 = require("@emotion/react/jsx-runtime");
/* Copyright (c) 2021, VRAI Labs and/or its affiliates. All rights reserved.
 *
 * This software is licensed under the Apache License, Version 2.0 (the
 * "License") as published by the Apache Software Foundation.
 *
 * You may not use this file except in compliance with the License. You may
 * obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
 * License for the specific language governing permissions and limitations
 * under the License.
 */
/*
 * Imports.
 */
var react_1 = require("react");
var sessionContext_1 = tslib_1.__importStar(require("./sessionContext"));
var recipe_1 = tslib_1.__importDefault(require("./recipe"));
var usercontext_1 = require("../../usercontext");
var userContextWrapper_1 = tslib_1.__importDefault(require("../../usercontext/userContextWrapper"));
var utils_1 = require("../../utils");
// if it's not the default context, it means SessionAuth from top has
// given us a sessionContext.
var hasParentProvider = function (ctx) {
    return !(0, sessionContext_1.isDefaultContext)(ctx);
};
var SessionAuth = function (_a) {
    var children = _a.children,
        props = tslib_1.__rest(_a, ["children"]);
    if (props.requireAuth === true && props.redirectToLogin === undefined) {
        throw new Error("You have to provide redirectToLogin or onSessionExpired function when requireAuth is true");
    }
    var requireAuth = (0, react_1.useRef)(props.requireAuth);
    if (props.requireAuth !== requireAuth.current) {
        throw new Error(
            // eslint-disable-next-line @typescript-eslint/quotes
            'requireAuth prop should not change. If you are seeing this, it probably means that you are using SessionAuth in multiple routes with different values for requireAuth. To solve this, try adding the "key" prop to all uses of SessionAuth like <SessionAuth key="someUniqueKeyPerRoute" requireAuth={...}>'
        );
    }
    var parentSessionContext = (0, react_1.useContext)(sessionContext_1.default);
    // assign the parent context here itself so that there is no flicker in the UI
    var _b = (0, react_1.useState)(hasParentProvider(parentSessionContext) ? parentSessionContext : undefined),
        context = _b[0],
        setContext = _b[1];
    var session = (0, react_1.useRef)(recipe_1.default.getInstanceOrThrow());
    var userContext = (0, usercontext_1.useUserContext)();
    var buildContext = (0, react_1.useCallback)(function () {
        return tslib_1.__awaiter(void 0, void 0, void 0, function () {
            var sessionExists;
            var _a;
            return tslib_1.__generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (hasParentProvider(parentSessionContext)) {
                            return [2 /*return*/, parentSessionContext];
                        }
                        if (context) {
                            return [2 /*return*/, context];
                        }
                        return [
                            4 /*yield*/,
                            session.current.doesSessionExist({
                                userContext: userContext,
                            }),
                        ];
                    case 1:
                        sessionExists = _b.sent();
                        if (sessionExists === false) {
                            return [
                                2 /*return*/,
                                {
                                    doesSessionExist: false,
                                    accessTokenPayload: {},
                                    userId: "",
                                },
                            ];
                        }
                        _a = {
                            doesSessionExist: true,
                        };
                        return [
                            4 /*yield*/,
                            session.current.getAccessTokenPayloadSecurely({
                                userContext: userContext,
                            }),
                        ];
                    case 2:
                        _a.accessTokenPayload = _b.sent();
                        return [
                            4 /*yield*/,
                            session.current.getUserId({
                                userContext: userContext,
                            }),
                        ];
                    case 3:
                        return [2 /*return*/, ((_a.userId = _b.sent()), _a)];
                }
            });
        });
    }, []);
    var setInitialContextAndMaybeRedirect = (0, react_1.useCallback)(
        function (toSetContext) {
            return tslib_1.__awaiter(void 0, void 0, void 0, function () {
                return tslib_1.__generator(this, function (_a) {
                    // if this component is unmounting, or the context has already
                    // been set, then we don't need to proceed...
                    if (!toSetContext.doesSessionExist && props.requireAuth === true) {
                        props.redirectToLogin();
                    } else {
                        if (context === undefined) {
                            setContext(toSetContext);
                        }
                    }
                    return [2 /*return*/];
                });
            });
        },
        [props]
    );
    (0, utils_1.useOnMountAPICall)(buildContext, setInitialContextAndMaybeRedirect);
    // subscribe to events on mount
    (0, react_1.useEffect)(
        function () {
            function onHandleEvent(event) {
                switch (event.action) {
                    case "SESSION_CREATED":
                        setContext(event.sessionContext);
                        return;
                    case "REFRESH_SESSION":
                        setContext(event.sessionContext);
                        return;
                    case "ACCESS_TOKEN_PAYLOAD_UPDATED":
                        setContext(event.sessionContext);
                        return;
                    case "SIGN_OUT":
                        if (props.requireAuth !== true) {
                            setContext(event.sessionContext);
                        }
                        return;
                    case "UNAUTHORISED":
                        if (props.requireAuth === true) {
                            if (props.onSessionExpired !== undefined) {
                                props.onSessionExpired();
                            } else {
                                props.redirectToLogin();
                            }
                        } else {
                            setContext(event.sessionContext);
                            if (props.onSessionExpired !== undefined) {
                                props.onSessionExpired();
                            }
                        }
                        return;
                }
            }
            // we return here cause addEventListener returns a function that removes
            // the listener, and this function will be called by useEffect when
            // onHandleEvent changes or if the component is unmounting.
            return session.current.addEventListener(onHandleEvent);
        },
        [props]
    );
    if (context === undefined) {
        return null;
    }
    // this will display null only if initially the below condition is true.
    // cause if the session goes from existing to non existing, then
    // the context is not updated if props.requireAuth === true
    if (!context.doesSessionExist && props.requireAuth === true) {
        return null;
    }
    return (0, jsx_runtime_1.jsx)(
        sessionContext_1.default.Provider,
        tslib_1.__assign({ value: context }, { children: children })
    );
};
var SessionAuthWrapper = function (props) {
    return (0, jsx_runtime_1.jsx)(
        userContextWrapper_1.default,
        tslib_1.__assign(
            { userContext: props.userContext },
            { children: (0, jsx_runtime_1.jsx)(SessionAuth, tslib_1.__assign({}, props)) }
        )
    );
};
exports.default = SessionAuthWrapper;
