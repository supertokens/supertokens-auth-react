import {
  CelebrateIcon,
  SeparatorLine,
  BlogsIcon,
  GuideIcon,
  SignOutIcon,
} from "../../assets/images";
import { signOut } from "supertokens-auth-react/recipe/thirdpartyemailpassword/index.js";
import { recipeDetails } from "../config/frontend";
import SuperTokens from "supertokens-auth-react";
import { LoaderFunctionArgs, redirect } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { ExtendedSession, SessionDataForUI } from "../lib/superTokensTypes";
import { SessionContainerInterface } from "supertokens-node/lib/build/recipe/session/types";
import { getSessionDetails } from '../lib/sessionUtils'

export async function loader({
  request,
}: LoaderFunctionArgs): Promise<{
  session: SessionContainerInterface | null;
  error: Error | null;
}> {
  try {
    const { session, error } = await getSessionDetails(request);
    return { session, error };
  } catch (error) {
    console.error('Error retrieving session:', error);
    return { session: null, error: error instanceof Error ? error : new Error(String(error)) };
  }
}

export default function Home() {
  const loaderData = useLoaderData<{
    session: ExtendedSession | null;
    error: Error | null;
  }>();

  if (!loaderData) {
    return <div>Loading...</div>;
  }
  if (loaderData.error) {
    return (
      <div>
        Something went wrong while trying to get the session. Error -
        {loaderData.error.message}
      </div>
    );
  }

  if (!loaderData.session?.accessToken) {
    return redirect("/auth");
  }

  if (loaderData.session) {
    const sessionData: SessionDataForUI = {
      note: "Retrieve authenticated user-specific data from your application post-verification through the use of the verifySession middleware.",
      userId: loaderData.session.userId,
      sessionHandle: loaderData.session.userDataInAccessToken.sessionHandle,
      accessTokenPayload: loaderData.session.userDataInAccessToken,
    };

    const displaySessionInformationWindow = (sessionData: SessionDataForUI) => {
      window.alert("Session Information: " + JSON.stringify(sessionData));
    };

    const links: {
      name: string;
      link: string;
      icon: string;
    }[] = [
      {
        name: "Blogs",
        link: "https://supertokens.com/blog",
        icon: BlogsIcon,
      },
      {
        name: "Guides",
        link: recipeDetails.docsLink,
        icon: GuideIcon,
      },
      {
        name: "Sign Out",
        link: "",
        icon: SignOutIcon,
      },
    ];

    return (
      <div className="homeContainer">
        <div className="mainContainer">
          <div className="topBand successTitle bold500">
            <img
              src={CelebrateIcon}
              alt="Login successful"
              className="successIcon"
            />
            Login successful
          </div>
          <div className="innerContent">
            <div>Your userID is: </div>

            <div className="truncate userId">{loaderData.session.userId}</div>

            <button
              onClick={() => displaySessionInformationWindow(sessionData)}
              className="sessionButton"
            >
              Call API
            </button>
          </div>
        </div>

        <div className="bottomLinksContainer">
          {links.map((link) => {
            if (link.name === "Sign Out") {
              return (
                <button
                  key={link.name}
                  className="linksContainerLink signOutLink"
                  onClick={async () => {
                    await signOut();
                    SuperTokens.redirectToAuth();
                  }}
                >
                  <img src={link.icon} alt={link.name} className="linkIcon" />
                  <div role="button">{link.name}</div>
                </button>
              );
            }
            return (
              <a
                href={link.link}
                className="linksContainerLink"
                key={link.name}
              >
                <img src={link.icon} alt={link.name} className="linkIcon" />
                <div role="button">{link.name}</div>
              </a>
            );
          })}
        </div>

        <img className="separatorLine" src={SeparatorLine} alt="separator" />
      </div>
    );
  }
}
