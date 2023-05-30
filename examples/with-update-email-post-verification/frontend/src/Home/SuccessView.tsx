import React from "react";
import { useNavigate } from "react-router-dom";
import { signOut } from "supertokens-auth-react/recipe/session";
import { recipeDetails } from "../config";
import CallAPIView from "./CallAPIView";
import { BlogsIcon, CelebrateIcon, GuideIcon, SeparatorLine, SignOutIcon } from "../assets/images";

interface ILink {
    name: string;
    onClick: () => void;
    icon: string;
}

export default function SuccessView(props: { userId: string }) {
    let userId = props.userId;
    const [newEmail, setNewEmail] = React.useState("");

    async function changeEmailClicked() {
        let email = newEmail.trim();
        if (email === "") {
            return;
        }
        localStorage.setItem("to-update-email", email);
    }

    const navigate = useNavigate();

    async function logoutClicked() {
        await signOut();
        navigate("/auth");
    }

    function openLink(url: string) {
        window.open(url, "_blank");
    }

    const links: ILink[] = [
        {
            name: "Blogs",
            onClick: () => openLink("https://supertokens.com/blog"),
            icon: BlogsIcon,
        },
        {
            name: "Documentation",
            onClick: () => openLink(recipeDetails.docsLink),
            icon: GuideIcon,
        },
        {
            name: "Sign Out",
            onClick: logoutClicked,
            icon: SignOutIcon,
        },
    ];

    return (
        <>
            <div className="main-container">
                <div className="top-band success-title bold-500">
                    <img src={CelebrateIcon} alt="Login successful" className="success-icon" /> Login successful
                </div>
                <div className="inner-content">
                    <div>Your userID is:</div>
                    <div className="truncate" id="user-id">
                        {userId}
                    </div>
                    <CallAPIView />
                </div>
                <div className="inner-content">
                    <div>Change email to:</div>
                    <input
                        onChange={(e) => {
                            setNewEmail(e.target.value);
                        }}
                        style={{
                            marginTop: "10px",
                            marginBottom: "10px",
                            borderRadius: "5px",
                            width: "200px",
                            height: "30px",
                        }}
                    />
                    <div onClick={changeEmailClicked} className="sessionButton">
                        Change email
                    </div>
                </div>
            </div>
            <div className="bottom-links-container">
                {links.map((link) => (
                    <div className="link" key={link.name}>
                        <img className="link-icon" src={link.icon} alt={link.name} />
                        <div role={"button"} onClick={link.onClick}>
                            {link.name}
                        </div>
                    </div>
                ))}
            </div>
            <img className="separator-line" src={SeparatorLine} alt="separator" />
        </>
    );
}
