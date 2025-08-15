import SpinnerIcon from "../../../../../components/assets/spinnerIcon";
import { withOverride } from "../../../../../components/componentOverride/withOverride";

export const WebauthnMFALoadingScreen = withOverride("WebauthnMFALoadingScreen", function WebauthnMFALoadingScreen() {
    return (
        <div data-supertokens="container delayedRender pwless-mfa loadingScreen">
            <div data-supertokens="row">
                <div data-supertokens="spinner delayedRender">
                    <SpinnerIcon />
                </div>
            </div>
        </div>
    );
});
