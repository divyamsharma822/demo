import React from "react";
import styles from "./NavItem.module.scss";
import { NavLink, useMatch } from "react-router-dom";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";

const NavItem = ({ svg, link, name, drop, setSubnav, subnav, matchLink }) => {
    const match = useMatch(`${matchLink}`);

    return !drop ? (
        <NavLink
            to={link}
            className={({ isActive }) =>
                isActive
                    ? `${styles.active} row g-0 w-100 d-flex gap-2 align-items-center`
                    : `${styles.li} row g-0 w-100 d-flex gap-2 align-items-center`
            }
            style={{
                textDecoration: "none",
            }}>
            <div
                className={`col-sm-2 ${styles.svg}`}
                style={{
                    fill: "inherit",
                }}>
                {svg}
            </div>
            <div className='col-sm-9' style={{ color: "inherit" }}>
                {name}
            </div>
        </NavLink>
    ) : (
        <span
            className={
                match
                    ? `${styles.active} row g-0 w-100 d-flex gap-2 align-items-center`
                    : `${styles.li} row g-0 w-100 d-flex gap-2 align-items-center`
            }
            onClick={() => {
                setSubnav(!subnav);
            }}>
            <div
                className='col-sm-2'
                style={{
                    fill: "inherit",
                }}>
                {svg}
            </div>
            <div
                className='col-sm-9 d-flex justify-content-between align-items-center'
                style={{ color: "inherit", textAlign: "left" }}>
                {name}
                {subnav ? (
                    <IoIosArrowUp size={15} />
                ) : (
                    <IoIosArrowDown size={15} />
                )}
            </div>
        </span>
    );
};

export default NavItem;
