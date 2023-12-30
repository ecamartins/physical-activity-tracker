import { Container, Typography } from "@mui/material";
import DirectionsRunIcon from '@mui/icons-material/DirectionsRun';
import React from "react";

interface HomePageProps {
    show: boolean
}

export const HomePage: React.FC<HomePageProps> = React.memo(({ show }) => {
    if (!show) return <></>;

    return (<>
        <Container component="main">
            <div className="home-page-content-wrapper">
                <div className="home-page-filler" />
                <div className="home-page-site-title">
                    <DirectionsRunIcon sx={{ mr: 1, fontSize: 40 }} />
                    <Typography
                        variant="h6"
                        noWrap
                        component="a"
                        href="#app-bar-with-responsive-menu"
                        sx={{
                            mr: 2,
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            letterSpacing: '.3rem',
                            color: 'inherit',
                            textDecoration: 'none',
                        }}
                    >
                        MvtTracker
                    </Typography>
                </div>
                <p className="home-page-site-description">MvtTracker makes it easy to track your active minutes and to compete with friends.</p>
                <p className="home-page-site-description">If you don't want to make an account, feel free to checkout the leaderboard!</p>
            </div>
        </Container>

    </>);
})