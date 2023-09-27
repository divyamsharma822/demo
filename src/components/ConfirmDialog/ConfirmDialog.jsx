import React from "react";
import "./ConfirmDialog.scss";
import Tick from "../../assests/tick.png";

const ConfirmDialog = ({ onConfirmFunc, msg }) => {
    return (
        <div className='confirmdialog'>
            <div className='content'>
                <div></div>
                <img src={Tick} alt='' className='img' />
                <div>{msg}</div>
                <button type='button' onClick={onConfirmFunc}>
                    Continue
                </button>
                <div></div>
            </div>
        </div>
    );
};

export default ConfirmDialog;
