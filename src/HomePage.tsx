import { Typography } from "@mui/material";
import DirectionsRunIcon from '@mui/icons-material/DirectionsRun';
import React from "react";
import { AppPageType } from "./WebsiteWrapper";

interface HomePageProps {
    show: boolean;
    onLinkClick: (page: AppPageType) => void;
}

export const HomePage: React.FC<HomePageProps> = React.memo(({ show, onLinkClick }) => {
    if (!show) return <></>;

    return (<>
        <div className="home-page-content-wrapper">
            <div className="home-page-content">
                <div className="home-page-site-title">
                    <DirectionsRunIcon sx={{ mr: 1, fontSize: 50 }} />
                    <Typography
                        variant="h6"
                        noWrap
                        component="a"
                        sx={{
                            mr: 2,
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            letterSpacing: '.3rem',
                            color: 'inherit',
                            textDecoration: 'none',
                            fontSize: 50
                        }}
                    >
                        MvmtTracker
                    </Typography>
                </div>
                <p className="home-page-site-description">MvmtTracker makes it easy to track your active minutes and to compete with friends.</p>
                <p className="home-page-site-description">If you don't want to make an account, feel free to checkout the <span id="home-page-leaderboard-link" onClick={() => onLinkClick(AppPageType.LEADERBOARD)}>leaderboard</span>!</p>
            </div>
        </div>

    </>);
})