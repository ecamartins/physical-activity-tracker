import { Alert } from "@mui/material";
import React from "react";

interface SetupProfileAlertProps {
    show: boolean;
    goToProfileSetup: () => void;
}

export const SetupProfileAlert: React.FC<SetupProfileAlertProps> = React.memo(({ show, goToProfileSetup }) => {
    if (!show) return <></>;
    return (
        <Alert
            sx={{ marginTop: 1 }}
            severity="info">
            To begin adding to your activity log, finish setting up your profile <span className="alert-link" onClick={() => goToProfileSetup()}>here</span>.
        </Alert>
    )
})