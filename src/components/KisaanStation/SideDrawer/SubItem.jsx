import * as React from "react";
import styles from "./SubItem.module.scss";
import { NavLink } from "react-router-dom";

const SubItem = ({ svg, link, name }) => {
    return (
        <NavLink
            to={link}
            className={({ isActive }) =>
                isActive
                    ? `${styles.active} row g-0 w-100 d-flex gap-2 d-flex align-items-center`
                    : `${styles.li} row g-0 w-100 d-flex gap-2 d-flex align-items-center`
            }
            style={{
                textDecoration: "none",
            }}>
            <div
                className='col-2'
                style={{
                    fill: "inherit",
                }}>
                {svg}
            </div>
            <div className='col-9' style={{ color: "inherit" }}>
                {name}
            </div>
        </NavLink>
    );
};

export default SubItem;
