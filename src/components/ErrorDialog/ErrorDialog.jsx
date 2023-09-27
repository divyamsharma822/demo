import React from "react";
import "./ErrorDialog.scss";
import ErrorPNG from "../../assests/error.png";

const ErrorDialog = ({ onConfirmFunc, msg }) => {
    return (
        <div className='confirmdialog'>
            <div className='content'>
                <div></div>
                <img src={ErrorPNG} alt='' />
                <div>{msg}</div>
                <button type='button' onClick={onConfirmFunc}>
                    Close
                </button>
                <div></div>
            </div>
        </div>
    );
};

export default ErrorDialog;
