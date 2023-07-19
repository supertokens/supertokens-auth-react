const apiPort = process.env.REACT_APP_API_PORT || 3001;
export const websitePort = process.env.REACT_APP_WEBSITE_PORT || 3000;
export function getApiDomain() {
    const apiUrl = process.env.REACT_APP_API_URL || `http://example.com:${apiPort}`;
    return apiUrl;
}

export function getAuthDomain() {
    const websiteUrl = process.env.REACT_APP_WEBSITE_URL || `http://auth.example.com:${websitePort}`;
    return websiteUrl;
}

export function clearTenantId() {
    localStorage.removeItem("tenantId");
}
