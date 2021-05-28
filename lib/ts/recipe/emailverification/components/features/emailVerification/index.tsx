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
/** @jsx jsx */
import { jsx } from "@emotion/react";
import * as React from "react";
import { PureComponent, Fragment } from "react";
import { VerifyEmailLinkClickedThemeProps, SendVerifyEmailThemeProps } from "../../../types";
import { getWindowOrThrow } from "../../../../../utils";
import { verifyEmailAPI, sendVerifyEmailAPI } from "./api";
import Session from "../../../../session";
import SuperTokens from "../../../../../superTokens";
import { EmailVerificationTheme } from "../../themes/emailVerification";
import { FeatureBaseProps } from "../../../../../types";
import FeatureWrapper from "../../../../../components/featureWrapper";
import AuthRecipeModule from "../../../../authRecipeModule";
import Recipe from "../../../recipe";

type Prop = FeatureBaseProps & { recipe: Recipe };

class EmailVerification extends PureComponent<Prop, { token: string }> {
    /*
     * Constructor.
     */
    constructor(props: Prop) {
        super(props);

        const urlParams = new URLSearchParams(getWindowOrThrow().location.search);
        let token = urlParams.get("token");
        if (token === null) {
            token = "";
        }

        this.state = {
            token,
        };
    }

    /*
     * Methods.
     */

    getRecipeInstanceOrThrow = (): Recipe => {
        if (this.props.recipe.config.recipeId === undefined) {
            throw new Error("No recipeId props given to EmailVerification component");
        }

        const recipe = SuperTokens.getInstanceOrThrow().getRecipeOrThrow(this.props.recipe.config.recipeId);
        if (!(recipe instanceof AuthRecipeModule)) {
            throw new Error(
                `${recipe.config.recipeId} must be an instance of AuthRecipeModule to use EmailVerification component.`
            );
        }

        return recipe.emailVerification;
    };

    signOut = async (): Promise<void> => {
        try {
            await this.getRecipeInstanceOrThrow().config.signOut();
            return await this.getRecipeInstanceOrThrow().config.redirectToSignIn(this.props.history);
        } catch (e) {}
    };

    onTokenInvalidRedirect = async (): Promise<void> => {
        if ((await Session.doesSessionExist()) !== true) {
            return await this.getRecipeInstanceOrThrow().config.redirectToSignIn(this.props.history);
        }

        try {
            const response = await sendVerifyEmailAPI(this.getRecipeInstanceOrThrow());
            if (response.status === "EMAIL_ALREADY_VERIFIED_ERROR") {
                return await this.getRecipeInstanceOrThrow().config.postVerificationRedirect(this.props.history);
            }
        } catch (e) {}

        this.setState(() => ({
            token: "",
        }));
    };

    async componentDidMount(): Promise<void> {
        const hasToken = this.state.token.length !== 0;

        // Redirect to login if no existing session and no token in URL.
        const sessionExists = await Session.doesSessionExist();
        if (sessionExists === false && hasToken === false) {
            return await this.getRecipeInstanceOrThrow().config.redirectToSignIn(this.props.history);
        }

        try {
            if (hasToken === false) {
                const response = await sendVerifyEmailAPI(this.getRecipeInstanceOrThrow());
                if (response.status === "EMAIL_ALREADY_VERIFIED_ERROR") {
                    return await this.getRecipeInstanceOrThrow().config.postVerificationRedirect(this.props.history);
                }
            }
        } catch (e) {}
    }

    render = (): JSX.Element => {
        const sendVerifyEmailScreenFeature = this.getRecipeInstanceOrThrow().config.sendVerifyEmailScreen;

        const sendVerifyEmailScreen: SendVerifyEmailThemeProps = {
            styleFromInit: sendVerifyEmailScreenFeature.style,
            sendVerifyEmailAPI: async () => await sendVerifyEmailAPI(this.getRecipeInstanceOrThrow()),
            signOut: this.signOut,
            onSuccess: () =>
                this.getRecipeInstanceOrThrow().config.onHandleEvent({
                    action: "VERIFY_EMAIL_SENT",
                }),
            onEmailAlreadyVerified: () =>
                this.getRecipeInstanceOrThrow().config.postVerificationRedirect(this.props.history),
        };

        const verifyEmailLinkClickedScreenFeature = this.getRecipeInstanceOrThrow().config.verifyEmailLinkClickedScreen;

        const verifyEmailLinkClickedScreen: VerifyEmailLinkClickedThemeProps = {
            styleFromInit: verifyEmailLinkClickedScreenFeature.style,
            onTokenInvalidRedirect: this.onTokenInvalidRedirect,
            onSuccess: () =>
                this.getRecipeInstanceOrThrow().config.onHandleEvent({
                    action: "EMAIL_VERIFIED_SUCCESSFUL",
                }),
            onContinueClicked: () =>
                this.getRecipeInstanceOrThrow().config.postVerificationRedirect(this.props.history),
            verifyEmailAPI: async () => await verifyEmailAPI(this.getRecipeInstanceOrThrow(), this.state.token),
        };

        const hasToken = this.state.token.length !== 0;

        const props = {
            rawPalette: this.getRecipeInstanceOrThrow().config.palette,
            sendVerifyEmailScreen: sendVerifyEmailScreen,
            verifyEmailLinkClickedScreen: verifyEmailLinkClickedScreen,
            hasToken: hasToken,
        };

        return (
            <FeatureWrapper useShadowDom={this.getRecipeInstanceOrThrow().config.useShadowDom}>
                <Fragment>
                    {/* No custom theme, use default. */}
                    {this.props.children === undefined && <EmailVerificationTheme {...props} />}
                    {/* Otherwise, custom theme is provided, propagate props. */}
                    {this.props.children && React.cloneElement(this.props.children, props)}
                </Fragment>
            </FeatureWrapper>
        );
    };
}

export default EmailVerification;
