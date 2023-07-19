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
