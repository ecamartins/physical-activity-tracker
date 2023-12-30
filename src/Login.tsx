import React from "react";

interface LoginProps {
    show: boolean
}

export const Login: React.FC<LoginProps> = React.memo(({ show }) => {
    if (!show) return <></>;

    return (<div>Login</div>);
})