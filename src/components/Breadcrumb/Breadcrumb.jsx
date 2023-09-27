import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Breadcrumb.module.scss";

const Breadcrumb = () => {
    const navigate = useNavigate();

    const getBreadcrumbs = () => {
        const pathParts = window.location.pathname
            ?.split("/")
            .filter((part) => part?.trim() !== "");

        return (
            pathParts
                ?.map((part, partIndex) => {
                    const previousParts = pathParts.slice(0, partIndex);
                    return {
                        label: part,
                        href:
                            previousParts?.length > 0
                                ? `/${previousParts?.join("/")}/${part}`
                                : `/${part}`,
                    };
                })
                .splice(2) || []
        );
    };

    const list = getBreadcrumbs();

    return (
        <>
            <div className={`${styles.Breadcrumb} d-none d-md-flex`}>
                {list.reverse().map((curr, index) => (
                    <div key={index} className={styles.li}>
                        {index + 1 === list.length && (
                            <span
                                className={
                                    window.location.pathname === curr.href
                                        ? `${styles.activeCrum}`
                                        : `${styles.crum}`
                                }>
                                {curr.label.replace("%20", " ")}
                            </span>
                        )}
                        {index + 1 !== list.length && list.length !== 1 && (
                            <span
                                onClick={() => navigate(-index)}
                                className={
                                    window.location.pathname === curr.href
                                        ? `${styles.activeCrum}`
                                        : `${styles.crum}`
                                }>
                                &nbsp;&nbsp;&gt;&nbsp;&nbsp;{" "}
                                {curr.label.replaceAll("%20", " ")}
                            </span>
                        )}
                    </div>
                ))}
            </div>
            <div className={`${styles.Breadcrumb} d-flex d-md-none`}>
                {list.map(
                    (curr, index) =>
                        index === 0 && (
                            <div key={index}>
                                <span
                                    className={
                                        window.location.pathname === curr.href
                                            ? `${styles.activeCrum}`
                                            : ``
                                    }>
                                    {curr.label.replaceAll("%20", " ")}
                                </span>
                            </div>
                        )
                )}
            </div>
        </>
    );
};

export default Breadcrumb;
