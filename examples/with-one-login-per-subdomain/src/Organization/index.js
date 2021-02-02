import React from 'react';
import { useHistory, Link } from "react-router-dom";
import { getWebsiteDomain } from "../App"

export default function Organization() {
    const history = useHistory();
    return (
        <div className="fill">
            <button
                type="button"
                onClick={(e) => {
                    e.preventDefault();
                    window.location.href = getWebsiteDomain()+"/home";
                }}
            > a.example.com</button>
        </div>
    );


}
