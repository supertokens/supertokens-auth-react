import { getQueryParams } from "./testContext";

export function getApiDomain() {
    const apiPort = process.env.REACT_APP_API_PORT || 8082;
    const apiUrl = process.env.REACT_APP_API_URL || `http://localhost:${apiPort}`;
    return apiUrl;
}

export function getWebsiteDomain() {
    const websitePort = process.env.REACT_APP_WEBSITE_PORT || 3031;
    const websiteUrl = process.env.REACT_APP_WEBSITE_URL || `http://localhost:${websitePort}`;
    return getQueryParams("websiteDomain") ?? websiteUrl;
}
