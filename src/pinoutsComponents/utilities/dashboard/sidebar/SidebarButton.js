import React from "react";
import "./sidebarButton.scss";
import { Link } from "react-router-dom";

const SidebarButton = ({ iconClass, text, activeClass = "", goTo = "" }) => {
    return (
        <div
            className={"sidebar-button ps-4 align-items-center " + activeClass}
        >
            <i className={iconClass + " me-2"}></i>{" "}
            <Link to={goTo}>{text}</Link>{" "}
        </div>
    );
};

export default SidebarButton;
