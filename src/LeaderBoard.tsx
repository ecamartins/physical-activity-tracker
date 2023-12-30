import React from "react";

interface LeaderBoardProps {
    show: boolean
}

export const LeaderBoard: React.FC<LeaderBoardProps> = React.memo(({ show }) => {
    if (!show) return <></>;

    return (<div>LeaderBoard</div>);
})