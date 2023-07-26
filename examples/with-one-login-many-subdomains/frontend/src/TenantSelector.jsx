import { useEffect, useState } from "react";
import { getApiDomain } from "./utils";

export const TenantSelector = ({ setHasSelectedTenantId }) => {
    const [selectedTenantId, setSelectedTenantId] = useState("");
    const [tenants, setTenants] = useState(undefined);

    const fetchTenants = async () => {
        const response = await fetch(`${getApiDomain()}/tenants`);

        if (response.status !== 200) {
            window.alert("Error fetching tenants");
            return;
        }

        const json = await response.json();
        const tenants = json.tenants.filter(({ tenantId }) => tenantId !== "public");
        setTenants(tenants);
        setSelectedTenantId(tenants[0].tenantId);
    };

    useEffect(() => {
        void fetchTenants();
    }, []);

    return (
        <div className="tenants-container">
            <div className="tenants-label">Select a tenant</div>
            {tenants === undefined ? (
                <div className="loader"></div>
            ) : (
                <select
                    value={selectedTenantId}
                    onChange={(event) => {
                        setSelectedTenantId(event.target.value);
                    }}
                    className="tenant-selector">
                    {tenants?.map((tenant) => {
                        return (
                            <option key={tenant.tenantId} value={tenant.tenantId}>
                                {tenant.tenantId}
                            </option>
                        );
                    })}
                </select>
            )}

            {tenants !== undefined && (
                <button
                    className="tenants-button"
                    onClick={() => {
                        if (selectedTenantId !== "") {
                            localStorage.setItem("tenantId", selectedTenantId);
                            setHasSelectedTenantId(true);
                        }
                    }}>
                    Continue
                </button>
            )}
        </div>
    );
};
