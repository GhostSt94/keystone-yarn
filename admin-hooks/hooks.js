import React from "react"
import Logo from "./logo";

export default {
    logo: () => <Logo />,
    pages: () => {
        console.log("Pages hooks loaded")
        window.React = React;
        return []
    }
}