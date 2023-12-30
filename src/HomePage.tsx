import React from "react";

interface HomePageProps {
    show: boolean
}

export const HomePage: React.FC<HomePageProps> = React.memo(({ show }) => {
    if (!show) return <></>;

    return (<div>HOMEPAGE</div>);
})