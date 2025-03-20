import ActiveDirectoryLogo from "../../components/assets/logos/activeDirectory";
import AppleLogo from "../../components/assets/logos/apple";
import Auth0Logo from "../../components/assets/logos/auth0";
import BitbucketLogo from "../../components/assets/logos/bitbucket";
import DiscordLogo from "../../components/assets/logos/discord";
import FacebookLogo from "../../components/assets/logos/facebook";
import GithubLogo from "../../components/assets/logos/github";
import GitlabLogo from "../../components/assets/logos/gitlab";
import GoogleLogo from "../../components/assets/logos/google";
import GoogleWorkspacesLogo from "../../components/assets/logos/googleWorkspaces";
import JumpCloudLogo from "../../components/assets/logos/jumpCloud";
import LinkedInLogo from "../../components/assets/logos/linkedin";
import MicrosoftADFSLogo from "../../components/assets/logos/microsoftADFS";
import MicrosoftEntraIdLogo from "../../components/assets/logos/microsoftEntraId";
import OktaLogo from "../../components/assets/logos/okta";
import OneLoginLogo from "../../components/assets/logos/oneLogin";
import OpenIdLogo from "../../components/assets/logos/openId";
import PingOneLogo from "../../components/assets/logos/pingOne";
import RipplingLogo from "../../components/assets/logos/rippling";
import GenericSamlLogo from "../../components/assets/logos/saml";

export const providerLogoMap = {
    "active-directory": ActiveDirectoryLogo,
    apple: AppleLogo,
    bitbucket: BitbucketLogo,
    discord: DiscordLogo,
    facebook: FacebookLogo,
    github: GithubLogo,
    gitlab: GitlabLogo,
    linkedin: LinkedInLogo,
    okta: OktaLogo,
    google: GoogleLogo,
    "google-workspaces": GoogleWorkspacesLogo,
} as const;

function getBoxySamlLogo(name?: string) {
    switch (name) {
        case "microsoft entra id":
            return MicrosoftEntraIdLogo;
        case "microsoft ad fs":
            return MicrosoftADFSLogo;
        case "okta":
            return OktaLogo;
        case "auth0":
            return Auth0Logo;
        case "google":
            return GoogleLogo;
        case "oneLogin":
            return OneLoginLogo;
        case "pingone":
            return PingOneLogo;
        case "jumpcloud":
            return JumpCloudLogo;
        case "rippling":
            return RipplingLogo;
        case "openId":
            return OpenIdLogo;
        default:
            return GenericSamlLogo;
    }
}

export const getProviderLogo = (providerId: string, providerName?: string): JSX.Element | undefined => {
    if (providerId === "boxy-saml") {
        return getBoxySamlLogo(providerName);
    }
    return providerId in providerLogoMap ? providerLogoMap[providerId as keyof typeof providerLogoMap] : undefined;
};
