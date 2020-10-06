import React from "react";
import "./style.css";

function Nav() {
    return (
        <nav className="navbar navbar-expand">
            <a className="navbar-brand" href="/"> Google Books </a>
            <a className="navbar-brand" href="/Search">   || Search ||</a>
            <a className="navbar-brand" href="/Saved">   Saved</a>
        </nav>
    );
}

export default Nav;