import { Container, Typography } from "@mui/material";
import { ClaimStatuses } from "./common.component";

export const knownRoles = ["user", "admin"];

export const Route2 = () => {
    return (
        <Container maxWidth="sm">
            <Typography variant="h1">Route2</Typography>
            <ClaimStatuses />
        </Container>
    );
};
