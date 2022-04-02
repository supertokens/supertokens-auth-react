import { AppBar, Button, Menu, MenuItem } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import RefreshIcon from "@mui/icons-material/Refresh";
import CheckIcon from "@mui/icons-material/Check";
import ClearIcon from "@mui/icons-material/Clear";
import { useNavigate } from "react-router-dom";
import { SessionAuth, useSessionContext } from "supertokens-auth-react/recipe/session";
import { api } from "../api";
import { NavLink } from "react-router-dom";

export const appRoles = ["user", "admin"];

const Header = () => {
    const navigate = useNavigate();

    const session = useSessionContext();

    let myRoles = [];
    let isVerified = undefined;
    let hasMFA = undefined;
    if (session.doesSessionExist) {
        myRoles = RolesClaim.getValueFromPayload(session.accessTokenPayload);
        isVerified = EmailVerifiedClaim.getValueFromPayload(session.accessTokenPayload);
        hasMFA = MFAClaim.getValueFromPayload(session.accessTokenPayload);
    }

    async function logoutClicked() {
        await signOut();
        navigate("/auth");
    }

    retrun(
        <AppBar>
            <NavLink to="/route1">Route1</NavLink>
            <NavLink to="/route2">Route2</NavLink>
            <NavLink to="/auth">Auth</NavLink>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                Test app
            </Typography>
            <Button onClick={() => api.secondFactorAuth()}>
                Secondary factor: {hasMFA ? <CheckIcon /> : <ClearIcon />}
            </Button>
            {session.doesSessionExist && (
                <PopupState variant="popover" popupId="email-verification-menu">
                    {(popupState) => (
                        <React.Fragment>
                            <Button size="large" {...bindTrigger(popupState)} onClick={handleMenu} color="inherit">
                                Email verification:{" "}
                                {isVerified === false ? "Not verified" : isVerified === true ? "Verified" : "Unknown"}
                            </Button>
                            <Menu {...bindMenu(popupState)}>
                                <MenuItem
                                    key={r}
                                    onClick={() =>
                                        api.verifyEmail({ userId: session.userId, unverify: isVerified === true })
                                    }>
                                    <ListItemIcon>
                                        {isVerified === true ? <DeleteIcon /> : <AddIcon />}
                                        <ContentCut fontSize="small" />
                                    </ListItemIcon>
                                    <ListItemText>
                                        {isVerified === true ? "Unverify email" : "Verify email"}
                                    </ListItemText>
                                </MenuItem>
                                <Divider />
                                <MenuItem onClick={() => api.refreshEmailVerifiedInToken()}>
                                    <ListItemIcon>
                                        <RefreshIcon fontSize="small" />
                                    </ListItemIcon>
                                    <ListItemText>Refresh status</ListItemText>
                                </MenuItem>
                            </Menu>
                        </React.Fragment>
                    )}
                </PopupState>
            )}
            {session.doesSessionExist && (
                <PopupState variant="popover" popupId="roles-menu">
                    {(popupState) => (
                        <React.Fragment>
                            <Button size="large" {...bindTrigger(popupState)} onClick={handleMenu} color="inherit">
                                Roles
                            </Button>
                            <Menu {...bindMenu(popupState)}>
                                {appRoles.map((r) => {
                                    const isMyRole = myRoles.includes(r);
                                    return (
                                        <MenuItem
                                            key={r}
                                            onClick={() =>
                                                isMyRole
                                                    ? api.setRoles(myRoles.filter((cr) => cr !== r))
                                                    : api.setRoles(myRoles.concat([r]))
                                            }>
                                            <ListItemIcon>
                                                {isMyRole ? <DeleteIcon /> : <AddIcon />}
                                                <ContentCut fontSize="small" />
                                            </ListItemIcon>
                                            <ListItemText>{r}</ListItemText>
                                        </MenuItem>
                                    );
                                })}
                                <Divider />
                                <MenuItem onClick={() => api.refreshRolesInToken()}>
                                    <ListItemIcon>
                                        <RefreshIcon fontSize="small" />
                                    </ListItemIcon>
                                    <ListItemText>Refresh roles</ListItemText>
                                </MenuItem>
                            </Menu>
                        </React.Fragment>
                    )}
                </PopupState>
            )}
            {session.doesSessionExist ? (
                <Button onClick={logoutClicked} color="inherit">
                    Logout
                </Button>
            ) : (
                <Button onClick={navigate("/auth")} color="inherit">
                    Login
                </Button>
            )}
        </AppBar>
    );
};

export default function HeaderWrapper() {
    return (
        <SessionAuth requireAuth={false}>
            <Header />
        </SessionAuth>
    );
}
