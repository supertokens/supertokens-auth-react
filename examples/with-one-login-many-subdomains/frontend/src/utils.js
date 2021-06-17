import axios from "axios";
import Session from "supertokens-auth-react/recipe/session";

const apiPort = process.env.REACT_APP_API_PORT || 3001;
export const websitePort = process.env.REACT_APP_WEBSITE_PORT || 3000;
export function getApiDomain() {
    const apiUrl = process.env.REACT_APP_API_URL || `http://example.com:${apiPort}`;
    return apiUrl;
}

export const userSubdomainApi = `${getApiDomain()}/user-subdomain`;

export function getAuthDomain() {
    const websiteUrl = process.env.REACT_APP_WEBSITE_URL || `http://auth.example.com:${websitePort}`;
    return websiteUrl;
}

export async function getSubdomainForCurrentUser() {
    const res = await axios.get(userSubdomainApi);
    return res.data.subdomain;
}

export async function getRedirectionUrlForUser() {
    const subdomain = await getSubdomainForCurrentUser();
    return `http://${subdomain}.example.com:${websitePort}`;
}

export async function redirectIfOnWrongSubdomain() {
    try {
        if (Session.doesSessionExist()) {
            const currentSubdomain = window.location.hostname.split(".")[0];
            const currentUserSubdomain = await getSubdomainForCurrentUser();
            // location.origin check ensures that user gets the option to click
            // the continue button on verify-email page
            if (window.location.origin !== getAuthDomain() && currentSubdomain !== currentUserSubdomain) {
                window.location.href = `http://${currentUserSubdomain}.example.com:${websitePort}`;
                return true;
            }
            return false;
        }
    } catch (error) {}
    return false;
}
