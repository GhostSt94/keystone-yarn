import React from "react";
import logo from "./logo.png"

const Logo = React.memo(({ ...props }) => {
    const logoStyles = {
        display: "block",
        height: "100%",
        width: "100%",
        maxWidth: "350px"
    };

    return (
        <img
            alt="The Arts on Tour logo."
            style={logoStyles}
            src={logo}
            {...props}
        />);
});

export default Logo;