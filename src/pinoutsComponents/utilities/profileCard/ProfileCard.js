import React, { useState, useEffect } from "react";
import "./profileCard.scss";

import mail from "../../images/mail.png";
import desig from "../../images/designation.png";
import user from "../../images/user-img.png";

const ProfileCard = ({ name, empId, email, designation, img }) => {
    const [image, setImage] = useState();
    const [preview, setPreview] = useState();

    const onChangeHandler = (e) => {
        // console.log(e.target.files)
        const file = e.target.files[0];
        if (file && file.type.substr(0, 5) === "image") {
            setImage(file);
        } else {
            setImage(null);
        }
    };

    useEffect(() => {
        if (image) {
            const reader = new FileReader();
            reader.onloadend = () => {
                console.log(reader.result);
                setPreview(reader.result);
            };
            reader.readAsDataURL(image);
        } else setPreview(null);
    }, [image]);

    return (
        <div className='profile-card p-4 mt-5'>
            <div className='row'>
                <div className='col-7'>
                    <h3 className='my-0 mb-2'>{name}</h3>
                    <p className='my-0 mb-3'>
                        Employee ID - <span>#{empId}</span>
                    </p>
                    <div>
                        <h6>
                            <img className='me-2' src={mail} alt='' />
                            {email}
                        </h6>
                        <h6>
                            <img className='me-2' src={desig} alt='' />
                            <span>{designation}</span>
                        </h6>
                    </div>
                </div>
                <div className='col-5'>
                    {preview == null && (
                        <div className='user-img-container'>
                            <img src={user} alt='' />
                        </div>
                    )}
                    {preview != null && (
                        <div className='user-img-container text-align-center'>
                            <img src={preview} alt='' />
                        </div>
                    )}
                    {
                        <div className='image-uploader mb-3'>
                            <label className='img-label' htmlFor='image-field'>
                                Add Image +
                            </label>
                            <input
                                type='file'
                                style={{ display: "none" }}
                                id='image-field'
                                accept='image/*'
                                onChange={(e) => {
                                    onChangeHandler(e);
                                }}
                            />
                        </div>
                    }
                </div>
            </div>
        </div>
    );
};

export default ProfileCard;
