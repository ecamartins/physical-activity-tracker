import React from "react";

interface ProfileProps {
    show: boolean
}

export const Profile: React.FC<ProfileProps> = React.memo(({ show }) => {
    if (!show) return <></>;

    return (<div>Profile</div>);
})