import React from "react";

interface ActivityLogProps {
    show: boolean
}

export const ActivityLog: React.FC<ActivityLogProps> = React.memo(({ show }) => {
    if (!show) return <></>;

    return (<div>ActivityLog</div>);
})