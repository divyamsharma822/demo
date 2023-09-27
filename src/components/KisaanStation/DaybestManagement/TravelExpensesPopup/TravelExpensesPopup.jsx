import React, { useRef, useState } from "react";
import "./TravelExpensesPopup.scss";
import icon from "../../../../assests/Image.svg";
import TravelApproved from "../TravelApproved/TravelApproved";
const TravelExpensesPopup = () => {
  const [photo, setPhoto] = useState("");
  const [travelPopup, setTravelPopup] = useState(false);
  const inputRef = useRef(null);

  const heldleUploadImage = () => {
    inputRef.current.click();
  };
  const imageChange = (e) => {
    const file = e.target.files[0];
    setPhoto(file);
    console.log(photo);
  };

  const travelApprovedFun = () => {
    setTravelPopup(!travelPopup);
  };
  return (
    <>
      {travelPopup && <TravelApproved travelApprovedFun={travelApprovedFun} />}

      <div className="TravelExpensesPopup">
        <div className="TravelExpensesPopup_Modal">
          <div className="userTitle">
            <div className="userTitle_heading">
              <div className="userName"> AJAY KUMAR DODIYA</div>
              <div className="userId" style={{ color: "#5c5c5c" }}>
                {" "}
                (#51124)
              </div>
            </div>
          </div>

          <div className="department">
            <div className="designation">Department - Designation</div>
            <div className="date">12-04-2021</div>
          </div>

          <div className="travelsDetails">
            <div className="travelDateContainer">
              <div className="DateTitle">Travel Dates - </div>
              <div className="travelDate">22/5/2022 - 25/5/2022</div>
            </div>

            <div className="travelAmountContainer">
              <div className="travelAmountTitle">Total Amount - </div>
              <div className="travelAmount">3050</div>
            </div>
          </div>

          <div className="numberOfDay">
            <div className="numberOfDayTitle">Number of Days - </div>
            <div className="numberDay">3</div>
          </div>

          <div className="discriptionContainer">
            <div className="discriptionTitle">Discription - </div>
            <div className="discription">
              "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
              do...
            </div>
          </div>

          <div className="linkContainer">
            <a href="https://www.google.com">View Invoice</a>
          </div>

          <div className="uploadImageContainer" onClick={heldleUploadImage}>
            {photo ? (
              <img
                src={URL.createObjectURL(photo)}
                alt="userImage"
                className="image"
              />
            ) : (
              <img src={icon} alt="pic" />
            )}
            <input
              type="file"
              ref={inputRef}
              onChange={imageChange}
              style={{ display: "none" }}
            />
          </div>

          <div className="buttonSection">
            <button className="Approve" onClick={travelApprovedFun}>
              Approve
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default TravelExpensesPopup;
