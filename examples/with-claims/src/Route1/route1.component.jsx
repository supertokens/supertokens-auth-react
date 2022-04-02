import { Container, Typography } from "@mui/material";
import { ClaimStatuses } from "./common.component";

export const Route1 = () => {
    return (
        <Container maxWidth="sm">
            <Typography variant="h1">Route1</Typography>
            <ClaimStatuses />
        </Container>
    );
};
