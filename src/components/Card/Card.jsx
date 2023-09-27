import moment from "moment";
import React from "react";
import NoImage from "../../assests/noImage.jpg";
import { ReactComponent as OptionIcon } from "../../assests/options-icon.svg";
import { ReactComponent as PublishIcon } from "../../assests/publish.svg";
import { ReactComponent as EditIcon } from "../../assests/edit.svg";
import { ReactComponent as DeleteIcon } from "../../assests/del.svg";
import { useDispatch } from "react-redux";
import { add } from "../../redux/reducers/historySlice";
import { Link, useNavigate } from "react-router-dom";
import "./Card.scss";
import { useDelPostMutation } from "../../api/newsApi";

const Card = ({ data }) => {
    const [deletePost, { isSuccess: deleteSuccess, isError: deleteError }] =
        useDelPostMutation();
    let navigate = useNavigate();
    const dispatch = useDispatch();

    const handleDelete = (id) => {
        let result = window.confirm("Do you want to Delete this News?");
        if (result) {
            deletePost(id);
            if (deleteSuccess || !deleteError) {
                dispatch(
                    add({
                        title: data.title ? data.title : "No Title Available",
                        time: Date.now(),
                        changes: "deleted",
                    })
                );
            } else if (deleteError) {
                alert("Error, Try Again");
            }
            setTimeout(() => {
                if (data.status === "published") {
                    navigate("/admin/KisaanStation/krishiGyaan/AgriNews");
                } else {
                    navigate("/admin/KisaanStation/krishiGyaan/AgriNews/draft");
                }
            });
        } else {
        }
    };
    return (
        <div className='news-card'>
            <div className='image-button'>
                {data.image.length !== 0 ? (
                    <img src={data?.image[0]?.mediaUrl} alt='' />
                ) : (
                    <img src={NoImage} alt='' />
                )}

                <div className='dropdown' style={{ float: "right" }}>
                    <button className='dropbtn'>
                        &nbsp;&nbsp;
                        <OptionIcon className='icon' />
                        &nbsp;&nbsp;
                    </button>
                    <div className='dropdown-content'>
                        {data.status === "draft" ? (
                            <Link
                                to='/admin/KisaanStation/krishiGyaan/AgriNews'
                                className='dropdown-wrapper'>
                                <PublishIcon />
                                <span>Publish Post</span>
                            </Link>
                        ) : null}

                        <Link
                            style={{ textDecoration: "none" }}
                            to={{
                                pathname: `/admin/KisaanStation/krishiGyaan/AgriNews/edit/${data._id}`,
                            }}
                            state={{ type: data.status }}
                            className='dropdown-wrapper'>
                            <EditIcon />
                            <span>Edit Post</span>
                        </Link>
                        <Link
                            to='/'
                            onClick={() => handleDelete(data._id)}
                            className='dropdown-wrapper'>
                            <DeleteIcon />
                            <span>Delete Post</span>
                        </Link>
                    </div>
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

export default Card;
