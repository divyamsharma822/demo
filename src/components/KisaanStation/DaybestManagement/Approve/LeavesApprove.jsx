import React from "react";
import "./LeavesApprove.scss";
import { ReactComponent as TickIcon } from "../../../../assests/daybestTickIcon.svg";
function LeavesApprove({ approveFun }) {
  return (
    <div className="LeavesApprove">
      <div className="LeavesApprove_container">
        <div className="approveSvg">
          <TickIcon />
        </div>
        <div className="Approved">Successfully Approved</div>
        <div className="Approved_button">
          <button onClick={approveFun}>Continue</button>
        </div>
      </div>
    </div>
  );
}

export default LeavesApprove;
