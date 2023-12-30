import React from "react";

interface LogoutProps {
    show: boolean
}

export const Logout: React.FC<LogoutProps> = React.memo(({ show }) => {
    if (!show) return <></>;

    return (<div>Logout</div>);
})