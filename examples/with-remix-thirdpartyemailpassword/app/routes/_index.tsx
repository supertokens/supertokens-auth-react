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
import {
  PreParsedRequest,
  CollectingResponse,
} from "supertokens-node/framework/custom/index.js";
import Session from "supertokens-node/lib/build/recipe/session/index.js";
import { HTTPMethod } from "supertokens-node/types";
import { useLoaderData } from "@remix-run/react";
import { ExtendedSession, SessionDataForUI } from "../lib/superTokensTypes";
import { SessionContainerInterface } from "supertokens-node/lib/build/recipe/session/types";

function getCookieFromRequest(request: Request) {
  const cookies: Record<string, string> = {};
  const cookieHeader = request.headers.get("Cookie");
  if (cookieHeader) {
    const cookieStrings = cookieHeader.split(";");
    for (const cookieString of cookieStrings) {
      const [name, value] = cookieString.trim().split("=");
      cookies[name] = value;
    }
  }
  return cookies;
}

function getQueryFromRequest(request: Request) {
  const query: Record<string, string> = {};
  const url = new URL(request.url);
  const searchParams = url.searchParams;
  searchParams.forEach((value, key) => {
    query[key] = value;
  });
  return query;
}

function createPreParsedRequest(request: Request): PreParsedRequest {
  return new PreParsedRequest({
    cookies: getCookieFromRequest(request),
    url: request.url as string,
    method: request.method as HTTPMethod,
    query: getQueryFromRequest(request),
    headers: request.headers,
    getFormBody: async () => {
      return await request.formData();
    },
    getJSONBody: async () => {
      return await request.json();
    },
  });
}

export async function loader({
  request,
}: LoaderFunctionArgs): Promise<{
  session: SessionContainerInterface | null;
  error: Error | null;
}> {
  const preParsedRequest = createPreParsedRequest(request);
  const baseResponse = new CollectingResponse();
  const options = {};
  const userContext = {};

  try {
    const session = await Session.getSession(
      preParsedRequest,
      baseResponse,
      options,
      userContext
    );
    return { session, error: null };
  } catch (error) {
    return {
      session: null,
      error: error instanceof Error ? error : new Error(String(error)),
    };
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
