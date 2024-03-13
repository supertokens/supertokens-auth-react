import { CelebrateIcon, SeparatorLine, BlogsIcon, GuideIcon, SignOutIcon } from "../../assets/images";
import { useSessionContext } from "supertokens-auth-react/recipe/session/index.js";
import { signOut } from "supertokens-auth-react/recipe/thirdpartyemailpassword/index.js";
import { recipeDetails } from "../config/frontend";
import SuperTokens from "supertokens-auth-react";
import { LoaderFunctionArgs, json } from "@remix-run/node";
import { CollectingResponse } from "supertokens-node/lib/build/framework/custom/index.js";
import Session from "supertokens-node/lib/build/recipe/session/index.js"

export type BaseRequest = {
  method: string;
  url: string;
  query: string;
  headers: Headers;
  formData: () => Promise<FormData>;
  json: () => Promise<unknown>;
  cookies: {
    getAll: () => { name: string; value: string }[];
  };
}

function createBaseRequest(request: Request): BaseRequest {
  const headers = new Headers();
  request.headers.forEach((value, key) => {
    headers.append(key, value);
  });

  return {
    method: request.method as string,
    url: request.url as string,
    query: new URL(request.url).searchParams.toString(),
    headers: headers,
    formData: async () => await request.formData(),
    json: async () => await request.json(),
    cookies: {
      getAll: () => {
        const cookieHeader = request.headers.get("Cookie");
        if (cookieHeader) {
          return cookieHeader.split(";").map((cookieString) => {
            const [name, value] = cookieString.trim().split("=");
            return { name, value } as { name: string; value: string };
          });
        } else {
          return [];
        }
      },
    },
  };
}

// In a Remix application, the loader function is responsible for handling server-side logic. When a user accesses a specific route in your application, Remix calls the corresponding loader function to fetch data or perform any necessary server-side operations before rendering the page.

// Check if window is defined to determine if code is running in the browser
const isBrowser = typeof window !== 'undefined';

// Use isBrowser to conditionally execute client-side code
export async function loader({ request }: LoaderFunctionArgs) {
  try {
    const baseRequest = createBaseRequest(request);
    console.log("The base request looks like:", baseRequest);

    // Use CollectingResponse only on the server-side
    console.log("isBrowser is:", isBrowser)
    const baseResponse = isBrowser ? null : new CollectingResponse();
    console.log("The baseRespons looks like:", baseResponse);

    const options = undefined;
    const userContext = null;
    if (!isBrowser) {
      console.log("Running on server");
      const session = await Session.getSession(baseRequest, baseResponse, options, userContext);
      console.log("The session looks like:", session);
    } else {
      console.warn("Session.getSession called in browser environment. This should only be called on the server-side.");
    }
    return null;
  } catch (error) {
    return json({ error: "Internal server error" }, { status: 500 });
  }
}


// sAccessToken, sFrontToken, st-last-access-token-update

export default function Home() {
  const session = useSessionContext();

  if (session.loading) {
    return <div>Loading...</div>;
  }

  const data = {
    note: "Retrieve authenticated user-specific data from your application post-verification through the use of the verifySession middleware.",
    userId: session.userId,
    sessionHandle: session.accessTokenPayload.sessionHandle,
    accessTokenPayload: session.accessTokenPayload,
  };

  const displaySessionInformationWindow = () => {
    window.alert("Session Information: " + JSON.stringify(data));
};

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

          <div className="truncate userId">{session.userId}</div>

          <button
            onClick={displaySessionInformationWindow}
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
