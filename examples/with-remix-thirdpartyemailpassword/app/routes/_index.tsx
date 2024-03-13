import { CelebrateIcon, SeparatorLine, BlogsIcon, GuideIcon, SignOutIcon } from "../../assets/images";
// import { useSessionContext } from "supertokens-auth-react/recipe/session/index.js";
import { signOut } from "supertokens-auth-react/recipe/thirdpartyemailpassword/index.js";
import { recipeDetails } from "../config/frontend";
import SuperTokens from "supertokens-auth-react";
import { LoaderFunctionArgs, json, redirect } from "@remix-run/node";
import { PreParsedRequest, CollectingResponse } from "supertokens-node/framework/custom/index.js";
import Session from "supertokens-node/lib/build/recipe/session/index.js"
import { HTTPMethod } from "supertokens-node/types";
import { useLoaderData } from "@remix-run/react";

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

// In a Remix application, the loader function is responsible for handling server-side logic. When a user accesses a specific route in your application, Remix calls the corresponding loader function to fetch data or perform any necessary server-side operations before rendering the page.


export async function loader({ request }: LoaderFunctionArgs): Promise<{ session: object | null; error: Error | null }> {
  const preParsedRequest = createPreParsedRequest(request);
  const baseResponse = new CollectingResponse();
  const options = {};
  const userContext = {};

  try {
    const session = await Session.getSession(preParsedRequest, baseResponse, options, userContext);
    console.log("the typeof session on the server is:", typeof session)
    console.log("the session in the loader function looks like", session)
    return { session, error: null };
  } catch (error) {
    console.error('Error retrieving session:', error);
    return { session: null, error: error instanceof Error ? error : new Error(String(error)) };
  }
}

export default function Home() {
  const loaderData = useLoaderData<typeof loader>();
  if (!loaderData) {
    return <div>Loading...</div>;
  }
  if (loaderData.error) {
    return <div>Something went wrong while trying to get the session. Error - {loaderData.error.message}</div>;
  }

  if (!loaderData.session?.accessToken) {
    return redirect("/auth");
  }

  if (loaderData.session) {
    console.log("the session in the home component looks like:", loaderData.session)
    console.log("userId:", loaderData.session.userId)
    console.log("sessionHandle:", loaderData.session.userDataInAccessToken.sessionHandle)
    console.log("userDataInAccessToken:", loaderData.session.userDataInAccessToken)
    console.log("userDataInAccessToken:", loaderData.session.accessToken);
    return <div>Session found.</div>;
  }



    // if (!session) {
    //     if (!session.accessToken) {
    //         throw redirect("/auth", 302);
    //     }

    //     if (hasInvalidClaims) {
    //         return <SessionAuthForNextJS />;
    //     } else {
    //         return <TryRefreshComponent />;
    //     }
    // }

  console.log("the session in the home component looks like:", session)
  // const session = useSessionContext();

  // if (session.loading) {
  //   return <div>Loading...</div>;
  // }
  // console.log("the type of session is:", typeof session)

  // const data = {
  //   note: "Retrieve authenticated user-specific data from your application post-verification through the use of the verifySession middleware.",
  //   userId: session.userId,
  //   sessionHandle: session.userDataInAccessToken.sessionHandle,
  //   accessTokenPayload: session.userDataInAccessToken
  // };

//   const displaySessionInformationWindow = () => {
//     window.alert("Session Information: " + JSON.stringify(data));
// };

  const links: {
    name: string,
    link: string,
    icon: string,
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

          {/* <div className="truncate userId">{session.userId}</div> */}

          {/* <button
            onClick={displaySessionInformationWindow}
            className="sessionButton"
          >
            Call API
          </button> */}

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
