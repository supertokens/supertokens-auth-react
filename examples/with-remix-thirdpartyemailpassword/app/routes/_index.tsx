import { CelebrateIcon, SeparatorLine, BlogsIcon, GuideIcon, SignOutIcon } from "../../assets/images";
import { useSessionContext } from "supertokens-auth-react/recipe/session/index.js";
import { useEffect } from "react";
import { signOut } from "supertokens-auth-react/recipe/thirdpartyemailpassword/index.js";
import { recipeDetails } from "../config/frontend";
import SuperTokens from "supertokens-auth-react";

export default function Home() {
  const session = useSessionContext();

  if (session.loading) {
    return <div>Loading...</div>;
  }

  if (session.doesSessionExist === false) {
    return <div>Session does not exist</div>;
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
