import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import { Button, Card, CardActions, CardContent, CardHeader, Container, Typography } from "@mui/material";
import React from "react";
import { useNavigate, Navigate } from "react-router-dom";
import { signOut, useSessionContext } from "supertokens-auth-react/recipe/session";
import { EmailVerifiedClaim } from "../claims/emailVerifiedClaim";
import { MFAClaim } from "../claims/mfaClaim";
import { RolesClaim } from "../claims/rolesClaim";
import { useTestApi, useTestLogs } from "../test.context";

export const appRoles = ["user", "admin"];

export const Common = () => {
    const navigate = useNavigate();
    const api = useTestApi();

    const logs = useTestLogs();

    const session = useSessionContext();

    if (session.invalidClaim) {
        if (session.invalidClaim.validatorId === RolesClaim.hasRole.id) {
            // Update rolesclaim like this
            RolesClaim.hasRole.withValue("admin");
        }
        console.log("redirect", session.invalidClaim);
        return <Navigate to="/" />;
    }
    let myRoles = [];
    let isVerified = undefined;
    let hasMFA = undefined;

    if (session.doesSessionExist) {
        myRoles = RolesClaim.getValueFromPayload(session.accessTokenPayload) || [];
        isVerified = EmailVerifiedClaim.getValueFromPayload(session.accessTokenPayload);
        hasMFA = MFAClaim.getValueFromPayload(session.accessTokenPayload);
    }

    async function logoutClicked() {
        await signOut();
        navigate("/auth");
    }

    return (
        <Container
            maxWidth="lg"
            style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr 1fr",
                gridTemplateRows: "max-content max-content 1fr",
                gap: "1.5em",
                flexGrow: 1,
                padding: "1em",
            }}>
            <Card style={{ gridColumn: "1/-1" }}>
                <CardHeader
                    title="User"
                    action={
                        <Button onClick={() => logoutClicked()} variant="contained">
                            Logout
                        </Button>
                    }
                />
                <CardContent>UserId: {session.userId}</CardContent>
                <CardContent style={{ whiteSpace: "prewrap" }}>
                    {JSON.stringify(session.accessTokenPayload, null, 2)}
                </CardContent>
            </Card>
            <Card>
                <CardHeader title="Second factor" />
                <CardContent>
                    Value in token: {hasMFA === true ? "True" : hasMFA === false ? "False" : "Unknown"}
                </CardContent>
                <CardActions>
                    <Button onClick={() => api.secondFactorAuth()} variant="contained">
                        Verify
                    </Button>
                </CardActions>
            </Card>
            <Card>
                <CardHeader title="Email verification" />
                <CardContent>
                    Value in token: {isVerified === true ? "True" : isVerified === false ? "False" : "Unknown"}
                </CardContent>
                <CardActions>
                    <Button onClick={() => api.verifyEmail(session.userId, isVerified === true)} variant="contained">
                        {isVerified === true ? "Unverify email" : "Verify email"}
                    </Button>
                    <Button onClick={() => api.refreshEmailVerifiedInToken()} variant="contained">
                        Refresh token
                    </Button>
                </CardActions>
            </Card>
            <Card>
                <CardHeader title="Roles" />
                <CardContent>
                    Value in token: {myRoles === undefined ? "Unknown" : `[ ${myRoles.join(", ")} ]`}
                </CardContent>
                <CardActions>
                    {appRoles.map((r) => {
                        const isMyRole = myRoles.includes(r);
                        return (
                            <Button
                                key={r}
                                onClick={() =>
                                    isMyRole
                                        ? api.setRoles(
                                              session.userId,
                                              myRoles.filter((cr) => cr !== r)
                                          )
                                        : api.setRoles(session.userId, myRoles.concat([r]))
                                }
                                variant="contained">
                                {isMyRole ? <DeleteIcon /> : <AddIcon />}
                                {r}
                            </Button>
                        );
                    })}
                    <Button onClick={() => api.refreshRolesInToken()} variant="contained">
                        Refresh
                    </Button>
                </CardActions>
            </Card>
            <Card style={{ gridColumn: "1/-1" }}>
                <CardHeader
                    title="Logs"
                    action={
                        <>
                            <Button onClick={() => api.api1()}>Api1</Button>{" "}
                            <Button onClick={() => api.api2()}>Api2</Button>
                        </>
                    }
                />
                <CardContent style={{ overflow: "auto" }}>
                    {logs.map((txt, ind) => (
                        <Typography key={ind} variant="body1">
                            {txt}
                        </Typography>
                    ))}
                </CardContent>
            </Card>
        </Container>
    );
};
