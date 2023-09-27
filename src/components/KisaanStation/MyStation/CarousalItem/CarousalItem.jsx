import React from "react";
import styles from "./CarousalItem.module.scss";
import { NavLink } from "react-router-dom";

class Svg extends React.Component {
    state = {
        svg: null,
        loading: false,
    };

    componentDidMount() {
        fetch(this.props.url)
            .then((res) => res.text())
            .then((text) => this.setState({ svg: text }));
    }

    render() {
        const { loading, svg } = this.state;
        if (loading) {
            return <div className='spinner' />;
        } else if (!svg) {
            return <div className='error' />;
        }
        return <div dangerouslySetInnerHTML={{ __html: this.state.svg }} />;
    }
}

const CarousalItem = ({ element, nav }) => {
    return (
        <NavLink
            className={({ isActive }) =>
                isActive
                    ? `d-flex justify-content-center flex-column align-items-center ${styles.active}`
                    : `d-flex justify-content-center flex-column align-items-between ${styles.carousalItem}`
            }
            to={nav}>
            <Svg url={element.image} className={styles.svg} />
            <span>{element.title}</span>
        </NavLink>
    );
};

export default CarousalItem;
