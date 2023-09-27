import React from "react";
import "./RejectLeaves.scss";
const RejectLeaves = ({ rejectFun }) => {
  return (
    <div className="RejectLeaves">
      <div className="rejactContainer">
        <div className="Reject_title">Reject Request </div>
        <div className="rejectComment">
          Do you really want to reject this leave application?
        </div>
        <div className="reject_button_container">
          <button className="cancel" onClick={rejectFun}>
            Cancel
          </button>
          <button className="reject" onClick={rejectFun}>
            Reject
          </button>
        </div>
      </div>
    </div>
  );
};

export default RejectLeaves;
