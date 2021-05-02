import axios from "axios";
import Session from "supertokens-auth-react/recipe/session";

const apiPort = process.env.REACT_APP_API_PORT || 3001;
const websitePort = process.env.REACT_APP_WEBSITE_PORT || 3000;

export function getApiDomain() {
    const apiUrl = process.env.REACT_APP_API_URL || `http://example.com:${apiPort}`;
    return apiUrl;
}

export function getAuthDomain() {
    const windowLocation = window.location.hostname;
    const websiteUrl = process.env.REACT_APP_WEBSITE_URL || `http://${windowLocation}:${websitePort}`;
    return websiteUrl;
}

export const userSubdomainApi = `${getApiDomain()}/user-subdomain`;

export async function getSubdomainForCurrentUser() {
    const res = await axios.get(userSubdomainApi);
    return res.data.subdomain;
}

export async function getRedirectToIfOnWrongSubdomain() {
    try {
        if (await Session.doesSessionExist()) {
            const currentSubdomain = window.location.hostname.split(".")[0];
            const currentUserSubdomain = await getSubdomainForCurrentUser();
            // location.origin check ensures that user gets the option to click
            // the continue button on verify-email page
            if (currentSubdomain !== currentUserSubdomain) {
                return `http://${currentUserSubdomain}.example.com:${websitePort}`;
            }
        }
    } catch (error) {}
}
