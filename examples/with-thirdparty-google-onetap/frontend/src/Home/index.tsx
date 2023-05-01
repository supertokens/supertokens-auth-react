import SuccessView from "./SuccessView";
import { useSessionContext } from "supertokens-auth-react/recipe/session";
import GoogleOneTapLogin from '../google-one-tap';
import ThirdParty from 'supertokens-auth-react/recipe/thirdparty'
import "./Home.css";

// TODO: This screen needs to be more professional
export default function Home() {
    const sessionContext = useSessionContext();

    if (sessionContext.loading === true) {
        return null;
    }

    if (sessionContext.doesSessionExist) {
        return (
            <div className="fill" id="home-container">
                <SuccessView userId={sessionContext.userId} />
            </div>
        );
    }

    const doLogin = async (data: any) => {
        function insertUrlParam(key: string, value: string) {
            let searchParams = new URLSearchParams(window.location.search);
            searchParams.set(key, value);
            let newurl = window.location.protocol + "//" + window.location.host + window.location.pathname + '?' + searchParams.toString();
            window.history.pushState({path: newurl}, '', newurl);
        }

        if (data.credential) {
            await ThirdParty.getAuthorisationURLWithQueryParamsAndSetState({ providerId: "google", authorisationURL: window.location.toString() })
            const stateInfo = await ThirdParty.getStateAndOtherInfoFromStorage();
            if (data.credential && stateInfo !== undefined) {
                insertUrlParam("code", data.credential);
                insertUrlParam("state", stateInfo.stateForAuthProvider);

                ThirdParty.signInAndUp({userContext: {oneTap: true}});
            }
        }
    }

    return (
        <div className="fill" id="home-container">
            <GoogleOneTapLogin onSuccess={doLogin} googleAccountConfigs={{ client_id: "108198463123-skk48sqaa2ce7m0rmmcv2t5kst2qco2p.apps.googleusercontent.com" }} />
            <p>Use one tap login to continue</p>
        </div>
    )
}
