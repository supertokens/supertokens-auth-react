import ActiveDirectoryLogo from "../../components/assets/logos/activeDirectory";
import AppleLogo from "../../components/assets/logos/apple";
import BitbucketLogo from "../../components/assets/logos/bitbucket";
import DiscordLogo from "../../components/assets/logos/discord";
import FacebookLogo from "../../components/assets/logos/facebook";
import GithubLogo from "../../components/assets/logos/github";
import GitlabLogo from "../../components/assets/logos/gitlab";
import GoogleLogo from "../../components/assets/logos/google";
import GoogleWorkspacesLogo from "../../components/assets/logos/googleWorkspaces";
import LinkedInLogo from "../../components/assets/logos/linkedin";
import OktaLogo from "../../components/assets/logos/okta";

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

export const getProviderLogo = (providerId: string): JSX.Element | undefined => {
    return providerId in providerLogoMap ? providerLogoMap[providerId as keyof typeof providerLogoMap] : undefined;
};
