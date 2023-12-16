import SuccessView from "./SuccessView";
import { useSessionContext } from "supertokens-auth-react/recipe/session";
import "./Home.css";

export default function Home(props: { mfaRequirements: string }) {
    const sessionContext = useSessionContext();

    if (sessionContext.loading === true) {
        return null;
    }

    return (
        <div className="fill" id="home-container">
            <SuccessView userId={sessionContext.userId} mfaRequirement={props.mfaRequirements} />
        </div>
    );
}
