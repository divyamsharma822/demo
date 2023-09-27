import React from "react";
import "./ProfileHeader.scss";
const ProfileHeader = () => {
  return (
    <div className="main_ProfileHeader">
      <div className="ProfileHeader">
        <div className="userLogo">
          <img
            className="userImage"
            src={"https://picsum.photos/100/200"}
            alt="userImage"
          />
          <div className="userpostDetails">
            <div className="userName"> Raghu Ram</div>
            <div className="userPost"> Sr. Software Developer</div>
          </div>
        </div>

        <div className="userDetailes">
          {[
            { name: "Total Users", data: 340 },
            { name: "Total Users", data: 345 },
            { name: "Total Users", data: 346 },
            { name: "Total Users", data: 346 },
          ].map((curr, index) => (
            <div className="thirdDetails" key={index}>
              <div className="thirdDisit">{curr.data}</div>
              <div className="thirdText">{curr.name}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProfileHeader;
