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
import { SessionDataForUI } from "../lib/superTokensTypes";
import { SessionContainerInterface } from "supertokens-node/lib/build/recipe/session/types";
import { getSessionDetails } from "../lib/superTokensHelpers";
import { TryRefreshComponent } from "../components/tryRefreshClientComponent";
import { SessionAuthForRemix } from "../components/sessionAuthForRemix";

export async function loader({ request }: LoaderFunctionArgs): Promise<{
  session: SessionContainerInterface | undefined;
  hasInvalidClaims: boolean;
  hasToken: boolean;
  nextResponse: Response | null;
}> {
  try {
    const { session, hasInvalidClaims, hasToken, nextResponse } =
      await getSessionDetails(request);
    console.log("does the user have invalid claims?", hasInvalidClaims);
    console.log("does the user have an access token??", hasToken);
    if (session) {
      console.log("there is an active session");;
    }
    if (!session) {
      console.log("session does not exist or has expired");
    }
    if (nextResponse) {
      return {
        session,
        hasInvalidClaims,
        hasToken,
        nextResponse,
      };
    } else {
      return {
        session,
        hasInvalidClaims,
        hasToken,
        nextResponse: null,
      };
    }
  } catch (error) {
    // throw new Error('');
    console.error("Error retrieving session:", error);
    throw error;
  }
}

export default function Home() {
  const loaderData = useLoaderData<{
    session: SessionContainerInterface | undefined;
    hasInvalidClaims: boolean;
    hasToken: boolean;
    nextResponse: Response | null;
  }>();

  if (!loaderData.session) {
    if (!loaderData.hasToken) {
      return redirect("/auth");
    }
    if (loaderData.hasInvalidClaims) {
      return <SessionAuthForRemix />;
    } else {
      return <TryRefreshComponent />;
    }
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
      <SessionAuthForRemix>
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
      </SessionAuthForRemix>
    );
  }
}
