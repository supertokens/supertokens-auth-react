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

import root from "react-shadow/emotion";
import { ST_ROOT_ID } from "../constants";
import ErrorBoundary from "./errorBoundary";
import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";
import SuperTokens from "../superTokens";
import { TranslationContextProvider } from "../translation/translationContext";
import { TranslationStore } from "../translation/translationHelpers";
import { mergeObjects } from "../utils";
import { PropsWithChildren } from "react";

const superTokensEmotionCache = createCache({
    key: "supertokens",
});

/*
 * Props.
 */

type FeatureWrapperProps = {
    useShadowDom?: boolean;
    defaultStore: TranslationStore;
};

/*
 * Component.
 */

export default function FeatureWrapper({
    children,
    useShadowDom,
    defaultStore,
}: PropsWithChildren<FeatureWrapperProps>): JSX.Element {
    // eslint-disable-next-line no-console
    console.log("FeatureWrapper", useShadowDom);
    const st = SuperTokens.getInstanceOrThrow();
    return (
        <ErrorBoundary>
            <TranslationContextProvider
                defaultLanguage={st.languageTranslations.defaultLanguage}
                defaultStore={mergeObjects(defaultStore, st.languageTranslations.userTranslationStore)}
                translationControlEventSource={st.languageTranslations.translationEventSource}
                userTranslationFunc={st.languageTranslations.userTranslationFunc}>
                <WithOrWithoutShadowDom useShadowDom={useShadowDom}>{children}</WithOrWithoutShadowDom>
            </TranslationContextProvider>
        </ErrorBoundary>
    );
}

type WithOrWithoutShadowDomProps = {
    useShadowDom?: boolean;
};

function WithOrWithoutShadowDom({
    children,
    useShadowDom,
}: PropsWithChildren<WithOrWithoutShadowDomProps>): JSX.Element {
    // eslint-disable-next-line no-console
    console.log("WithOrWithoutShadowDom", useShadowDom);
    // If explicitely specified to not use shadow dom.
    if (useShadowDom === false) {
        return (
            <div id={ST_ROOT_ID}>
                <CacheProvider value={superTokensEmotionCache}>{children}</CacheProvider>
                <DisableAutoFillInput />
            </div>
        );
    }

    // Otherwise, use shadow dom.
    return (
        <root.div id={ST_ROOT_ID}>
            {children}
            <DisableAutoFillInput />
        </root.div>
    );
}

function DisableAutoFillInput(): JSX.Element {
    /* eslint-disable react/jsx-no-literals */
    return (
        <style type="text/css">
            {
                "input.supertokens-input:-webkit-autofill,input.supertokens-input:-webkit-autofill:focus,input.supertokens-input:-webkit-autofill:hover,select:-webkit-autofill,select:-webkit-autofill:focus,select:-webkit-autofill:hover,textarea:-webkit-autofill,textarea:-webkit-autofill:focus,textarea:-webkit-autofill:hover{transition:background-color 5000s ease-in-out 0s}"
            }
        </style>
    );
    /* eslint-enable react/jsx-no-literals */
}
