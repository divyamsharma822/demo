import React, { useState } from "react";
import "./LeavesPopup.scss";
import { GrClose } from "react-icons/gr";
// import LeavesApprove from "../Approve/LeavesApprove";
import RejectLeaves from "../Reject/RejectLeaves";
import SuccessRejectDialog from "../SuccessRejectDialog/SuccessRejectDialog";
function LeavesPopup({ openModal }) {
  // const [approve, setApprove] = useState(false);
  const [rejectLeave, setRejectLeave] = useState(false);
  const [dialog, setDialog] = useState(false);
  // function approveFun() {
  //   setApprove(!approve);
  // }
  function rejectFun() {
    setRejectLeave(!rejectLeave);
    console.log(rejectLeave);
  }

  const dialogFun = () => {
    setDialog(!dialog);
  };
  return (
    <>
      <div className="LeavesPopup">
        {/* {approve && <LeavesApprove approveFun={approveFun} />} */}
        {rejectLeave && <RejectLeaves rejectFun={rejectFun} />}
        {dialog && (
          <SuccessRejectDialog
            continueFn={dialogFun}
            title={"Successfully Approved"}
            type={"approved"}
          />
        )}
        {/* {dialog && <SuccessRejectDialog continueFn={dialogFun} title={"Successfully Rejected"} type={"reject"} />} */}
        <div className="LeavesPopup_modal">
          <div className="userTitle">
            <div className="userTitle_heading">
              <div className="userName"> AJAY KUMAR DODIYA</div>
              <div className="userId"> (#51124)</div>
            </div>

            <div className="removePopup">
              <div onClick={openModal}>
                <GrClose size={25} />
              </div>
            </div>
          </div>

          <div className="department">
            <div className="designation">Department - Designation</div>
            <div className="date">12-04-2021</div>
          </div>

          <div className="leaveReason">
            <div className="leavetype">
              <div className="leavetypeTitle">Leave Type - </div>
              <div className="leavetypeReason">Sick Leave</div>
            </div>
            <div className="numberDay">
              <div className="numberOfDay">Number Of Days - </div>
              <div className="numberOfDay_Day"> 3 </div>
            </div>
          </div>

          <div className="request">
            <div className="requestDate"> Requested Dates -</div>
            <div className="date">22/5/2022 - 25/5/2022</div>
          </div>

          <div className="reasonForLeave">
            <div className="reason">Reason for Leave -</div>
            <div className="reason_text">
              "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            </div>
          </div>

          <div className="leavesSection">
            <div className="totalLeaves">
              <div className="totalLeavesTitle">Total Leaves</div>
              <div className="sickContainer">
                <div className="sick">Sick leaves - {""}</div>
                <div className="sickLeavesDays"> 6</div>
              </div>
              <div className="casualContainer">
                <div className="casual">Casual leaves - </div>
                <div className="CasualLeavesDays"> 6</div>
              </div>
              <div className="WorkFromHomeContainer">
                <div className="WorkFromHome">Work from home - </div>
                <div className="WorkFromHomeLeavesDays">6</div>
              </div>
            </div>

            <div className="availableLeaves">
              <div className="availableLeavesTitle">Available Leaves</div>
              <div className="sickContainer">
                <div className="sick">Sick leaves - </div>
                <div className="sickLeavesDays"> 6</div>
              </div>
              <div className="casualContainer">
                <div className="casual">Casual leaves - </div>
                <div className="CasualLeavesDays"> 6</div>
              </div>
              <div className="WorkFromHomeContainer">
                <div className="WorkFromHome">Work from home - </div>
                <div className="WorkFromHomeLeavesDays">6</div>
              </div>
            </div>
          </div>

          <div className="buttonSection">
            <button className="Approve" onClick={dialogFun}>
              Approve
            </button>
            <button className="Reject" onClick={rejectFun}>
              Reject
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default LeavesPopup;
