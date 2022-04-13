import { Container, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { Common } from "./common.component";

export const TestScreen = ({ title, subTitle }) => {
    return (
        <Container
            maxWidth="lg"
            style={{
                display: "flex",
                alignItems: "center",
                flexDirection: "column",
                flexGrow: 1,
            }}>
            <Typography variant="h2">{title}</Typography>
            <Typography variant="subtitle1">{subTitle}</Typography>
            <Typography variant="subtitle2" style={{ paddingBottom: "2em" }}>
                <Link to="/route1">Route1</Link> <Link to="/route2">Route2</Link> <Link to="/">Home</Link>
            </Typography>
            <Common />
        </Container>
    );
};
