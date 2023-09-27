import React from "react";
import "./NewsCard.scss";
import NoImage from "../../assests/noImage.jpg";
import moment from "moment";

const NewsCard = ({ data }) => {
    return (
        <div className='card news-card'>
            <div className='image-button'>
                {data.image ? (
                    <img src={data.image} alt='' />
                ) : (
                    <img src={NoImage} alt='' />
                )}

                <div>
                    <button type='button'>
                        <i className='fa-solid fa-ellipsis-vertical'></i>
                    </button>
                </div>
            </div>
            <div className='title'>{data.title}</div>
            <br />
            <div className='lastupdated'>
                Last updated on{" "}
                {moment
                    .utc(data.createdAt)
                    .local()
                    .startOf("seconds")
                    .fromNow()}
            </div>
        </div>
    );
};

export default NewsCard;
