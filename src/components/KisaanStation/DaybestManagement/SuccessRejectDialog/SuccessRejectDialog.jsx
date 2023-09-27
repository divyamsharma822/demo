import React from "react";
import "./SuccessRejectDialog.scss";
import { ReactComponent as TickIcon } from "../../../../assests/daybestTickIcon.svg";

function SuccessRejectDialog({ type, continueFn, title }) {
  return (
    <div className="SuccessRejectDialog">
      <div className="SuccessRejectDialog_container">
        <div className="approveSvg">
          {type === "approved" ? <TickIcon /> : null}
        </div>
        <div className="Approved">{title}</div>
        <div className="Approved_button">
          <button onClick={continueFn}>Continue</button>
        </div>
      </div>
    </div>
  );
}

export default SuccessRejectDialog;
