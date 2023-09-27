import React from "react";
import "./TravelApproved.scss";
import { ReactComponent as TickIcon } from "../../../../assests/daybestTickIcon.svg";
const TravelApproved = ({ travelApprovedFun }) => {
  // const [TravelApprovedPopup, setTravelApprovedPopup] = useState(false);
  // const TravelApprovedfun = () => {
  //   setTravelApprovedPopup(!TravelApprovedPopup);
  // };
  return (
    <div className="TravelApproved">
      <div className="LeavesApprove_container">
        <div className="approveSvg">
          <TickIcon />
        </div>
        <div className="Approved">Successfully Approved</div>
        <div className="Approved_button">
          <button onClick={travelApprovedFun}>Continue</button>
        </div>
      </div>
    </div>
  );
};

export default TravelApproved;
